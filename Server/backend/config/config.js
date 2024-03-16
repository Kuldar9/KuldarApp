const fs = require('fs');
const path = require('path');

function findMongoDBDataDirName() {
    // Return the MongoDB data directory name
    return 'mongodb_data';
}

function findMongoDBDataDirPath() {
    // Return the MongoDB data directory path
    return 'C:\\Users\\Kuldar\\Desktop\\FirstMassiveProject\\Server';
}

module.exports = {
    findMongoDBDataDirName,
    findMongoDBDataDirPath
};