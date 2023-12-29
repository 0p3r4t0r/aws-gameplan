import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

/**
 * Remove Arch_ prefix from each directory name.
 * 
 * ex: Arch_App-Integration -> AppIntegration
 */
function makeFileName(str: string) {
  const suffix = str.split('_')[1];
  const camelCase = suffix.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  return `${camelCase.charAt(0).toLowerCase() + camelCase.slice(1)}.tsx`;
}


/**
 * Generate all code for groups
 */

function generate(directoryPath: string, outFilePath: string): void {
  const outDir = path.dirname(outFilePath);
  fs.mkdirSync(outDir, { recursive: true });

  fs.readdir(directoryPath, (err, directories) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    directories.forEach(directory => {
      const fileName = makeFileName(directory);
      const writeStream = fs.createWriteStream(path.join(outDir, fileName), { flags: 'w' });
        // ------------------------------------------------------------------------
        // Imports
        // ------------------------------------------------------------------------
        writeStream.write(`
          import React from 'react';
          import { ServiceNode } from '../../components/services/Service';\n
        `);

      // // ------------------------------------------------------------------------
      // // Imports: SVG files
      // // ------------------------------------------------------------------------
      // filteredFiles.forEach(file => {
      //   writeStream.write(`import ${toCamelCase(file)}Data from '${directoryPath}${file}';\n`);
      // });
      // writeStream.write('\n');
      // writeStream.end();
      // console.log(path.join(directoryPath, directory))
    })
    // const filteredFiles = files.filter(file => !file.endsWith('_Dark.svg'));


    // // ------------------------------------------------------------------------
    // // Imports: SVG files
    // // ------------------------------------------------------------------------
    // filteredFiles.forEach(file => {
    //   writeStream.write(`import ${toCamelCase(file)}Data from '${directoryPath}${file}';\n`);
    // });
    // writeStream.write('\n');


    // // ------------------------------------------------------------------------
    // // Code
    // // ------------------------------------------------------------------------
    // writeStream.write(`
    //   export namespace AWS {
    //     export namespace Groups {
    // `)


    // // ------------------------------------------------------------------------
    // // Components
    // // ------------------------------------------------------------------------
    // filteredFiles.forEach(file => {
    //   const componentName = toCamelCase(file);
    //   writeStream.write(
    //     `const ${componentName} = () => <GroupNode data={${componentName}Data} title="${componentName}" />;\n`
    //   );
    // });
    // writeStream.write('\n');


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

    // writeStream.write('}}}');

    // writeStream.end();
  });


  // --------------------------------------------------------------------------
  // Format
  // --------------------------------------------------------------------------
  // exec(`npx prettier ${outFilePath} --write --print-width 1000`, (err, stdout, stderr) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(stdout);
  //   console.error(stderr);
  // });
}

// Replace 'path/to/your/directory' with the actual path of the directory you want to list
const targetDirectory = '../assets/awsIcons/Architecture-Service-Icons/';
generate(targetDirectory, '../__generated__/services/services.tsx');
