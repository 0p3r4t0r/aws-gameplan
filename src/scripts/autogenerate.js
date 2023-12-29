"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var child_process_1 = require("child_process");
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
        // ------------------------------------------------------------------------
        // Imports
        // ------------------------------------------------------------------------
        writeStream.write("\n      import React from 'react';\n      import { GroupNode } from '../components/services/Group';\n\n    ");
        // ------------------------------------------------------------------------
        // Imports: SVG files
        // ------------------------------------------------------------------------
        filteredFiles.forEach(function (file) {
            writeStream.write("import ".concat(format(file), "Data from '").concat(directoryPath).concat(file, "';\n"));
        });
        writeStream.write('\n');
        // ------------------------------------------------------------------------
        // Code
        // ------------------------------------------------------------------------
        writeStream.write("\n      export namespace AWS {\n        export namespace Groups {\n    ");
        // Generate components
        filteredFiles.forEach(function (file) {
            var componentName = format(file);
            writeStream.write("const ".concat(componentName, " = () => <GroupNode data={").concat(componentName, "Data} title=\"").concat(componentName, "\" />;\n"));
        });
        writeStream.write('\n');
        writeStream.write('export const nodeTypes = {\n');
        filteredFiles.forEach(function (file) {
            var componentName = format(file);
            writeStream.write("".concat(componentName, ",\n"));
        });
        writeStream.write('}}}');
        writeStream.end();
    });
    (0, child_process_1.exec)('npx prettier groups.tsx --write --print-width 1000', function (err, stdout, stderr) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    });
}
// Replace 'path/to/your/directory' with the actual path of the directory you want to list
var targetDirectory = '../assets/awsIcons/Architecture-Group-Icons/';
listFilesInDirectory(targetDirectory);
