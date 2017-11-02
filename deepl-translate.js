#!/usr/bin/env node
const program = require('commander');
const { translate } = require('deepl-translator');
const { version } = require('./package.json');
const chalk = require('chalk');

/**
 * Reads the text to translate from the standard input.
 * @return a promise resolved when the standard input
 * has been read.
 */
const read = () => new Promise((resolve, reject) => {
  let data = '';
  process.stdin
    .on('data', (chunk) => data += chunk)
    .on('end', () => resolve(data.trim()));
});

/**
 * Executes the translation of the given text.
 * @param {*} text the text to translate.
 */
const translateText = (text) => {
  translate(text, program.targetLanguage, program.sourceLanguage)
    .then(({ translation }) => console.log(chalk.green(translation)))
    .catch(error => console.error(chalk.bold.red(error.message)))
};

program
  .version(version)
  .arguments('[text]')
  .option(
    '-t, --targetLanguage <targetLanguage>',
    'target language code (EN, DE, FR, ES, IT, NL, PL, auto)'
  )
  .option(
    '-s, --sourceLanguage [sourceLanguage]',
    'source language code (EN, DE, FR, ES, IT, NL, PL, auto)'
  )
  .parse(process.argv);

if (program.rawArgs.length === 2) {
  program.help();
} else if (!program.args.length) {
  read().then(translateText);
} else {
  translateText(program.args[0]);
}
