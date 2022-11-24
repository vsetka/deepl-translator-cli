#!/usr/bin/env node
const { version } = require('./package.json');
const chalk = require('chalk');
const program = require('commander');
const initTranslator = require('./translator');

/**
 * Reads the text to translate from the standard input.
 * @return a promise resolved when the standard input
 * has been read.
 */
const read = () =>
  new Promise((resolve, reject) => {
    let data = '';
    process.stdin
      .on('data', chunk => (data += chunk))
      .on('end', () => resolve(data.trim()));
  });

/**
 * Executes the translation of the given text.
 * @param {*} text the text to translate.
 */
const translateText = text => {
  const translator = initTranslator();
  if (translator.error != undefined)
    console.error(chalk.bold.red(translator.error));
  else
    translator
      .translateText(text, null, program.opts().targetLanguage)
      .then(result => console.log(chalk.green(result.text)))
      .catch(error => console.error(chalk.bold.red(error.message)));
};

program
  .version(version)
  .arguments('[text]')
  .requiredOption(
    '-t, --targetLanguage <targetLanguage>',
    'target language code (EN, DE, FR, ES, IT, NL, PL, auto)'
  )
  .option(
    '-s, --sourceLanguage [sourceLanguage]',
    'source language code (EN, DE, FR, ES, IT, NL, PL, auto)'
  )
  .option(
    '-k, --authorizationKey <authorizationKey>',
    'specify an authorization key or set a dedicated DEEPL_AUTH_KEY environment variable'
  )
  .parse(process.argv);

if (program.rawArgs.length === 2) {
  program.help();
} else if (!program.args.length) {
  read().then(translateText);
} else {
  translateText(program.args[0]);
}
