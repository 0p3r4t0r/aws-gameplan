import * as esbuild from 'esbuild';
import * as fs from 'fs';

const PATH = 'public';

console.log('Building...');

// Clean
fs.rmSync(PATH, { recursive: true, force: true });
fs.mkdirSync(PATH);

// Copy index.html
fs.copyFileSync('src/index.html', `${PATH}/index.html`);

const options = {
    bundle: true,
    minify: true,
    entryPoints: ['src/app.tsx'],
    outfile: `${PATH}/app.js`,
    platform: 'browser',
    loader: { '.svg': 'dataurl' },
}

const context = await esbuild.context(options);

await context.watch()

await context.serve({
    servedir: PATH,
})
.then((serveResult) => { console.log(serveResult); });