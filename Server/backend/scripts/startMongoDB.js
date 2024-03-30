// startMongoDB.js 
const fs = require('fs');
const path = require('path');
const { findMongoDBDataDirName, findMongoDBDataDirPath } = require('../config/config');

// Function to create or update the MongoDB data directory
function createOrUpdateMongoDBDataDir() {
    const dataDirName = findMongoDBDataDirName();
    const dataDirPath = findMongoDBDataDirPath();

    const mongoDBDataDir = path.join(dataDirPath, dataDirName);

    // Check if the specified directory path exists
    if (!fs.existsSync(dataDirPath)) {
        console.error(`Directory path ${dataDirPath} does not exist.`);
        return null;
    }

    // Check if the MongoDB data directory exists
    if (fs.existsSync(mongoDBDataDir)) {
        console.log(`MongoDB data directory ${dataDirName} already exists.`);
    } else {
        // Create the MongoDB data directory
        fs.mkdirSync(mongoDBDataDir);
        console.log(`MongoDB data directory ${dataDirName} created at ${mongoDBDataDir}.`);
    }

    return mongoDBDataDir;
}

// Find or create/update MongoDB data directory
const mongoDBDataDir = createOrUpdateMongoDBDataDir();

module.exports = {
    mongoDBDataDir
};