const fs = require('fs');
const path = require('path');

function findMongoDBDataDirName() {
    // MongoDB directory name
    return 'mongodb_data';
}

function findMongoDBDataDirPath() {
    // Change the path if necessary
    return 'C:\\Users\\Kuldar\\Desktop\\FirstMassiveProject\\Server';
}

module.exports = {
    findMongoDBDataDirName,
    findMongoDBDataDirPath
};