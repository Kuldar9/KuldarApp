const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));  // Serve static files from 'public' directory

io.on('connection', (socket) => {
    console.log('New client connected');

    setInterval(() => {
        socket.emit('systemStats', {
            memoryUsage: process.memoryUsage().rss,  // Send memory usage stats
            cpuUsage: os.loadavg()[0],  // Send average CPU load
            uptime: process.uptime()  // Send system uptime
        });
    }, 1000);

    // Mock sending logs every 2 seconds
    setInterval(() => {
        socket.emit('logs', { message: `Log entry from the server at ${new Date()}` });
    }, 2000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Listening on *:3000');
});