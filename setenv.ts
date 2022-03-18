const { writeFile, mkdirSync } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ?  __dirname + `/src/environments/environment.prod.ts`
   :  __dirname + `/src/environments/environment.ts`;

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   titleApp: "${process.env.VAR_TITLE}"
};
`;

// create dir
try {
  mkdirSync(__dirname + `/src/environments`);
} catch (error) {
  console.log("Error: " + error);
}

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
});
