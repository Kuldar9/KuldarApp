import { io } from "socket.io-client";

const SOCKET_URL = "http://127.0.0.1:25580"; 

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect(onLog) {
        if (this.socket) return;

        this.socket = io(SOCKET_URL, {
            transports: ['websocket'],
        });

        this.socket.on("connect", () => console.log("✅ Terminal connected!"));
        
        this.socket.on("logs", (log) => {
            if (onLog) onLog(log);
        });

        this.socket.on("logs_history", (history) => {
            history.forEach(log => onLog(log));
        });
    }

    sendCommand(command) {
        if (this.socket) {
            this.socket.emit("execute_command", command);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export default new SocketService();