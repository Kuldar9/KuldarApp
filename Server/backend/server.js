const { spawn, exec } = require('child_process');

function startServiceMinimized(name, path, args = []) {
    console.log(`Starting ${name} in a new minimized CMD window...`);
    let cmd = path;
    if (args.length > 0) {
        cmd += ' ' + args.join(' ');
    }
    // Use exec to run the command in a new minimized command prompt
    exec(`start /min cmd.exe /c "${cmd}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`${name} Output: ${stdout}`);
        if (stderr) {
            console.error(`${name} Error: ${stderr}`);
        }
    });
}

function startLoggingServiceThenOthers() {
    // Starts the Logging Service first and directly within the server.js
    console.log('Starting Logging Service...');
    const loggingService = spawn('node', ['./microServices/loggingService/loggingService.js'], { stdio: 'inherit' });
    
    loggingService.on('error', (error) => {
        console.error(`Logging Service failed to start:`, error);
    });

    loggingService.on('close', (code) => {
        if (code !== 0) {
            console.log(`Logging Service exited with code ${code}`);
        }
    });

    setTimeout(() => startServiceMinimized('Database Service', 'node', ['./microServices/databaseHandling/databaseService.js']), 0);
    setTimeout(() => startServiceMinimized('Gateway Service', 'node', ['./microServices/AppRequestHandler/gateway.js']), 3000);
    //setTimeout(() => startServiceMinimized('Image Processing Service', './microServices/imageProcessing/python_env/Scripts/python.exe', ['./microServices/imageProcessing/server.py']), 6000); Weirdly enough didn't work...
    setTimeout(() => startServiceMinimized('Image Processing Service', './start.bat'), 6000);
}

startLoggingServiceThenOthers();