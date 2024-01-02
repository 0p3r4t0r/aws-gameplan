import * as esbuild from 'esbuild'
import * as fs from 'fs'

const PATH = 'public-dev'

console.log('Building dev...')

// Clean
fs.rmSync(PATH, { recursive: true, force: true })
fs.mkdirSync(PATH)

// Copy files
fs.copyFileSync('src/index.html', `${PATH}/index.html`)
fs.copyFileSync('src/index.css', `${PATH}/index.css`)

const context = await esbuild.context({
    bundle: true,
    entryPoints: ['src/app.tsx'],
    outfile: `${PATH}/app.js`,
    platform: 'browser',
    sourcemap: true,
    loader: { '.svg': 'dataurl' },
})

await context.watch()

await context
    .serve({
        servedir: PATH,
    })
    .then((serveResult) => {
        console.log(serveResult)
    })
