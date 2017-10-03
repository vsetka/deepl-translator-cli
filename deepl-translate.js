#!/usr/bin/env node
const program = require('commander');
const { translate } = require('deepl-translator');
const { version } = require('./package.json');
const chalk = require('chalk');

program
  .version(version)
  .arguments('<text>')
  .option(
    '-t, --targetLanguage <targetLanguage>',
    'target language code (EN, DE, FR, ES, IT, NL, PL, auto)'
  )
  .option(
    '-s, --sourceLanguage [sourceLanguage]',
    'source language code (EN, DE, FR, ES, IT, NL, PL, auto)'
  )
  .action((text, targetLanguage, sourceLanguage) =>
    translate(text, program.targetLanguage, program.sourceLanguage)
      .then(({ translation }) => console.log(chalk.green(translation)))
      .catch(error => console.error(chalk.bold.red(error.message)))
  )
  .parse(process.argv);

if (program.args.length > 4) {
  console.error(chalk.bold.red('Invalid usage'));
  program.help();
} else if (!program.args.length) {
  program.help();
}
