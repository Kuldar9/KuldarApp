const express = require('express');
const Logger = require('./Logger');

class MonitoringInterface {
    constructor(serviceManager) {
        this.app = express();
        this.port = 3001;
        this.serviceManager = serviceManager;

        this.app.get('/status', (req, res) => {
            const statuses = Object.keys(this.serviceManager.services).map(name => ({
                name,
                running: !this.serviceManager.services[name].killed,
                pid: this.serviceManager.services[name].pid
            }));
            res.json(statuses);
        });

        this.app.listen(this.port, () => {
            Logger.log(`Monitoring interface listening on port ${this.port}`, 'info');
        });
    }
}

module.exports = MonitoringInterface;