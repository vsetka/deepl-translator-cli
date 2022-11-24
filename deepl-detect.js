#!/usr/bin/env node
const { version } = require('./package.json');
const chalk = require('chalk');
const program = require('commander');
const initTranslator = require('./translator');
const languages = require('./languages');

function detectLanguage(text) {
  const translator = initTranslator();
  if (translator.error != undefined) {
    console.error(chalk.bold.red(translator.error));
    return -1;
  }
  translator
    .translateText(text, null, 'en-US')
    .then(result => {
      const languageCode = result.detectedSourceLang;
      const languageName = result.detectedSourceLang
        .split(',')
        .map(code => languages[code.toUpperCase()])
        .join(',');
      console.log(
        `${chalk.green(languageName)} (${chalk.magenta(languageCode)})`
      );
    })
    .catch(error => console.error(chalk.bold.red(error.message)));
}

program
  .version(version)
  .arguments('<text>')
  .option(
    '-k, --authorizationKey <authorizationKey>',
    'specify an authorization key or set a dedicated DEEPL_AUTH_KEY environment variable'
  )
  .parse(process.argv);

if (program.args.length > 2) {
  console.error(chalk.bold.red('Invalid usage'));
  program.help();
} else if (!program.args.length) {
  program.help();
} else {
  detectLanguage(program.args[0]);
}
