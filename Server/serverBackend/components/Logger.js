class Logger {
    static log(message, level = 'info') {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} [${level.toUpperCase()}]: ${message}`);
    }
}

module.exports = Logger;