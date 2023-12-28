"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// TODO: Cast filename to camel case
function format(str) {
    var prefix = str.split('_')[0];
    var camelCase = prefix.split('-')
        .map(function (word) { return (word.charAt(0).toUpperCase() + word.slice(1)); })
        .join('');
    return camelCase;
}
/**
 * Generate all code for groups and services
 */
function listFilesInDirectory(directoryPath) {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        var filteredFiles = files.filter(function (file) { return !file.endsWith('_Dark.svg'); });
        var writeStream = fs.createWriteStream('groups.tsx', { flags: 'w' });
        console.log('Files in', directoryPath + ':');
        // Other imports
        writeStream.write("import React from 'react'\n");
        writeStream.write("import { GroupNode } from '../components/services/Group'\n");
        writeStream.write('\n');
        // Generate svg imports
        filteredFiles.forEach(function (file) {
            writeStream.write("import ".concat(format(file), "Data from '").concat(directoryPath).concat(file, "'\n"));
        });
        writeStream.write('\n');
        // Generate components
        filteredFiles.forEach(function (file) {
            var componentName = format(file);
            writeStream.write("export const ".concat(componentName, " = () => <GroupNode data={").concat(componentName, "Data} title=\"").concat(componentName, "\" />\n"));
        });
        writeStream.end();
    });
}
// Replace 'path/to/your/directory' with the actual path of the directory you want to list
var targetDirectory = '../assets/awsIcons/Architecture-Group-Icons/';
listFilesInDirectory(targetDirectory);
