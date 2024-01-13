cd ./src

echo 'Compling TypeScript files...';
npx tsc generators/generateGroups.ts generators/generateServices.ts generators/generateGamePlanIcons.ts;

echo -e '\nGenerating components...';
node generators/generateGroups.js;
node generators/generateServices.js;
node generators/generateGamePlanIcons.js;

echo -e '\nFormatting...';
npx prettier './__generated__/**/*.tsx' --write --print-width 1000;

echo 'Cleaning up...';
rm generators/*.js;

cd --