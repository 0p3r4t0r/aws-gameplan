import * as fs from 'fs'
import * as path from 'path'
import { camelCase } from 'lodash'

const toComponentName = (fileName: string) => {
    const name = fileName.split('.')[0]
    const camel = camelCase(name)
    return camel.charAt(0).toUpperCase() + camel.slice(1)
}

/**
 * Generate all code for groups
 */

function generate(directoryPath: string, outFilePath: string): void {
    console.log('Generate from files in', directoryPath + ':')

    fs.mkdirSync(path.dirname(outFilePath), { recursive: true })
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err)
            return
        }

        const writeStream = fs.createWriteStream(outFilePath, { flags: 'w' })

        // ------------------------------------------------------------------------
        // Imports
        // ------------------------------------------------------------------------
        writeStream.write(`
      import React from 'react';
      import { Icon } from '../components/atoms/Icon';\n
    `)

        // ------------------------------------------------------------------------
        // Imports: SVG files
        // ------------------------------------------------------------------------
        files.forEach((file) => {
            writeStream.write(
                `import ${toComponentName(file)}Data from '${path.join(
                    '..',
                    directoryPath,
                    file
                )}';\n`
            )
        })
        writeStream.write('\n')

        // ------------------------------------------------------------------------
        // Code
        // ------------------------------------------------------------------------
        writeStream.write('export const GamePlanIcons = {\n')

        // ------------------------------------------------------------------------
        // Components
        // ------------------------------------------------------------------------
        files.forEach((file) => {
            const componentName = toComponentName(file)
            writeStream.write(
                `${componentName}: () => <Icon data={${componentName}Data} title="${componentName}" />,\n`
            )
        })

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

        writeStream.write('}')

        writeStream.end()
    })
}

// Replace 'path/to/your/directory' with the actual path of the directory you want to list
const targetDirectory = './assets/icons/'
generate(targetDirectory, './__generated__/icons.tsx')
