const ServiceManager = require('./components/ServiceManager');
const Logger = require('./components/Logger');
const MonitoringInterface = require('./components/MonitoringInterface');

const manager = new ServiceManager();
new MonitoringInterface(manager);

manager.on('service-output', ({ name, output }) => {
    Logger.log(`${name}: ${output}`);
});

manager.on('service-error', ({ name, error }) => {
    Logger.log(`${name} Error: ${error}`, 'error');
});

manager.on('service-stopped', ({ name, code }) => {
    Logger.log(`${name} stopped with code ${code}`, code === 0 ? 'info' : 'error');
});

const projectRoot = path.resolve(__dirname);

// Start services
manager.startService('LoggingService', './microServices/gateways/loggingGateway.js');
manager.startService('DatabaseService', './microServices/databaseHandling/databaseServiceJson.js', [], {}, ['LoggingService']);
manager.startService('AppGateway', './microServices/gateways/appGateway.js', [], {}, ['DatabaseService']);
manager.startServiceMinimized('Image Processing Service', 'python', [path.join(projectRoot, 'microServices/imageProcessing/server.py')], path.join(projectRoot, 'microServices/imageProcessing/python_env/Scripts'));
