const { spawn, exec } = require('child_process');
const EventEmitter = require('events');
const path = require('path');

class ServiceManager extends EventEmitter {
    constructor() {
        super();
        this.services = {};
    }

    startService(name, scriptPath, args = [], options = {}, dependencies = []) {
        const start = () => {
            const service = spawn('node', [scriptPath, ...args], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'], ...options });
            this.setupServiceHandlers(name, service);
        };

        if (dependencies.length) {
            Promise.all(dependencies.map(dep => this.waitForService(dep))).then(start);
        } else {
            start();
        }
    }

    startServiceMinimized(name, command, args = [], cwd = '.') {
        const argsString = args.join(' ');
        const fullCommand = `${command} ${argsString}`;
        
        exec(`start /min cmd.exe /c "${fullCommand}"`, { cwd }, (error, stdout, stderr) => {
            if (error) {
                this.emit('service-error', { name, error: error.toString() });
                return;
            }
            if (stdout) {
                this.emit('service-output', { name, output: stdout.toString() });
            }
            if (stderr) {
                this.emit('service-error', { name, error: stderr.toString() });
            }
        });
    }

    setupServiceHandlers(name, service) {
        service.stdout.on('data', (data) => {
            this.emit('service-output', { name, output: data.toString() });
        });

        service.stderr.on('data', (data) => {
            this.emit('service-error', { name, error: data.toString() });
        });

        service.on('close', (code) => {
            this.emit('service-stopped', { name, code });
            if (code !== 0) {
                this.startService(name, scriptPath, args, options);
            }
        });
    }

    waitForService(serviceName) {
        return new Promise(resolve => {
            if (this.services[serviceName] && !this.services[serviceName].killed) {
                resolve();
            } else {
                this.once('service-started', event => {
                    if (event.name === serviceName) resolve();
                });
            }
        });
    }

    stopService(name) {
        if (this.services[name]) {
            this.services[name].kill();
            delete this.services[name];
        }
    }
}

module.exports = ServiceManager;