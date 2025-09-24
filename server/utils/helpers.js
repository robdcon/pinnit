const { createHmac } = require('crypto');
const path = require('path');
const fs = require('fs');
const { fileURLToPath } = require('url');

exports.genId = function (str, secret) {
    const unique = createHmac('sha256', secret)
                 .update(str)
                 .digest('hex');
    return unique;
}

exports.bulkCreateFromJson = function(json, client) {
    // read file from path
    const data = fs.readFileSync(file, 'utf8');
    const jsonData = JSON.parse(data);
    jsonData.forEach(async (item) => {
        await client.query(item);
    });
}

exports.readFileFromFolder = (folderPath) => {
    try {
        // Get all files in the folder
        const files = fs.readdirSync(folderPath);

        // Filter for JSON files
        const jsonFiles = files.filter((file) => file.endsWith('.json'));

        // Ensure there is at least one JSON file in the folder
        if (jsonFiles.length === 0) {
            throw new Error(`No JSON files found in the folder: ${folderPath}`);
        }

        // Get the full path of the first JSON file
        const filePath = path.join(folderPath, jsonFiles[0]);

        // Read and return the contents of the file
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        throw new Error(`Error reading JSON file from folder: ${error.message}`);
    }
};
