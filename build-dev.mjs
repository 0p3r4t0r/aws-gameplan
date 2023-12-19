import * as esbuild from 'esbuild';
import * as fs from 'fs';

const PATH = 'public-dev';

console.log('Building dev...');

// Clean
fs.rmSync(PATH, { recursive: true, force: true });
fs.mkdirSync(PATH);

// TODO: Copy files with esbuild?
fs.copyFileSync('src/index.html', `${PATH}/index.html`);

const context = await esbuild.context({
    bundle: true,
    entryPoints: ['src/app.tsx'],
    outfile: `${PATH}/app.js`,
    platform: 'browser',
    sourcemap: true,
});

await context.watch()

await context.serve({
    servedir: PATH,
})
.then((serveResult) => { console.log(serveResult); });