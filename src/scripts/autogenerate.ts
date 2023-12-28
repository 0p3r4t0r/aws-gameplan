import * as fs from 'fs';

// TODO: Cast filename to camel case
function format(str: string) {
  const prefix = str.split('_')[0];
  const camelCase = prefix.split('-')
    .map(word => (word.charAt(0).toUpperCase() + word.slice(1)))
    .join('');
  return camelCase;
}

/**
 * Generate all code for groups and services
 */

function listFilesInDirectory(directoryPath: string): void {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const filteredFiles = files.filter(file => !file.endsWith('_Dark.svg'));
    const writeStream = fs.createWriteStream('groups.tsx', { flags: 'w' });

    console.log('Files in', directoryPath + ':');

    // Other imports
    writeStream.write("import React from 'react'\n");
    writeStream.write("import { GroupNode } from '../components/services/Group'\n");
    writeStream.write('\n');

    // Generate svg imports
    filteredFiles.forEach(file => {
      writeStream.write(`import ${format(file)}Data from '${directoryPath}${file}'\n`);
    });
    writeStream.write('\n');

    // Generate components
    filteredFiles.forEach(file => {
      const componentName = format(file);
      writeStream.write(
        `export const ${componentName} = () => <GroupNode data={${componentName}Data} title="${componentName}" />\n`
      );
    });

    writeStream.end();
  });
}

// Replace 'path/to/your/directory' with the actual path of the directory you want to list
const targetDirectory = '../assets/awsIcons/Architecture-Group-Icons/';
listFilesInDirectory(targetDirectory);
