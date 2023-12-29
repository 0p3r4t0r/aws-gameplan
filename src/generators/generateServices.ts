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

function toCamelCase(str: string) {
  const replaced = str.replace('&', '-And-');
  const prefix = replaced.split('_')[1];
  return prefix.split('-')
    .map(word => (word.charAt(0).toUpperCase() + word.slice(1)))
    .join('');
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
      fs.readdir(path.join(directoryPath, directory), (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return;
        }

        const filteredFiles = files.filter(file => !file.endsWith('_Dark.svg'));
        const writeTo = path.join(outDir, fileName);
        const writeStream = fs.createWriteStream(writeTo, { flags: 'w' });


        // ------------------------------------------------------------------------
        // Imports
        // ------------------------------------------------------------------------
        writeStream.write(`
          import React from 'react';
          import { ServiceNode } from '../../components/services/Service';\n
        `);


        // ------------------------------------------------------------------------
        // Imports: SVG files
        // ------------------------------------------------------------------------
        filteredFiles.forEach(file => {
          writeStream.write(`import ${toCamelCase(file)}Data from '${path.join('..', directoryPath, directory, file)}';\n`);
        });
        writeStream.write('\n');


        // ------------------------------------------------------------------------
        // Code
        // ------------------------------------------------------------------------
        const nameSpace = fileName.split('.')[0].charAt(0).toUpperCase() + fileName.split('.')[0].slice(1); 
        writeStream.write(`
          export namespace AWS {
            export namespace Services {
              export namespace ${nameSpace} {
        `)


        // ------------------------------------------------------------------------
        // Components
        // ------------------------------------------------------------------------
        filteredFiles.forEach(file => {
          const componentName = toCamelCase(file);
          writeStream.write(
            `const ${componentName} = () => <ServiceNode data={${componentName}Data} title="${componentName}" />;\n`
          );
        });
        writeStream.write('\n');


        // ------------------------------------------------------------------------
        // Node Types
        // ------------------------------------------------------------------------
        writeStream.write('export const nodeTypes = {\n');
        filteredFiles.forEach(file => {
          const componentName = toCamelCase(file);
          writeStream.write(
            `${componentName},\n`
          );
        });


        writeStream.write('}}}}');
        writeStream.end();
        // --------------------------------------------------------------------------
        // Format
        // --------------------------------------------------------------------------
        exec(`npx prettier ${writeTo} --write --print-width 1000`, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(stdout);
          console.error(stderr);
        });
      });
    })
    // const filteredFiles = files.filter(file => !file.endsWith('_Dark.svg'));


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


}

// Replace 'path/to/your/directory' with the actual path of the directory you want to list
const targetDirectory = '../assets/awsIcons/Architecture-Service-Icons/';
generate(targetDirectory, '../__generated__/services/services.tsx');
