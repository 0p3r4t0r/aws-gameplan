import * as fs from 'fs';
import * as path from 'path';

function toCamelCase(str: string) {
  const prefix = str.split('_')[0];
  return prefix.split('-')
    .map(word => (word.charAt(0).toUpperCase() + word.slice(1)))
    .join('');
}


/**
 * Generate all code for groups
 */

function generate(directoryPath: string, outFilePath: string): void {
  console.log('Generate from files in', directoryPath + ':');

  fs.mkdirSync(path.dirname(outFilePath), { recursive: true });
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const filteredFiles = files.filter(file => !file.endsWith('_Dark.svg'));
    const writeStream = fs.createWriteStream(outFilePath, { flags: 'w' });


    // ------------------------------------------------------------------------
    // Imports
    // ------------------------------------------------------------------------
    writeStream.write(`
      import React from 'react';
      import { GroupNode } from '../components/services/Group';\n
    `);


    // ------------------------------------------------------------------------
    // Imports: SVG files
    // ------------------------------------------------------------------------
    filteredFiles.forEach(file => {
      writeStream.write(`import ${toCamelCase(file)}Data from '${path.join('..', directoryPath, file)}';\n`);
    });
    writeStream.write('\n');


    // ------------------------------------------------------------------------
    // Code
    // ------------------------------------------------------------------------
    writeStream.write('export const Groups = {\n');


    // ------------------------------------------------------------------------
    // Components
    // ------------------------------------------------------------------------
    filteredFiles.forEach(file => {
      const componentName = toCamelCase(file);
      writeStream.write(
        `${componentName}: () => <GroupNode data={${componentName}Data} title="${componentName}" />,\n`
      );
    });


    // // ------------------------------------------------------------------------
    // // Node Types
    // // ------------------------------------------------------------------------
    // writeStream.write('export const nodeTypes = {\n');
    // filteredFiles.forEach(file => {
    //   const componentName = toCamelCase(file);
    //   writeStream.write(
    //     `${componentName},\n`
    //   );
    // });

    writeStream.write('}');

    writeStream.end();
  });
}

// Replace 'path/to/your/directory' with the actual path of the directory you want to list
const targetDirectory = './assets/awsIcons/Architecture-Group-Icons/';
generate(targetDirectory, './__generated__/groups.tsx');
