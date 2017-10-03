#!/usr/bin/env node
const program = require('commander');
const { detectLanguage } = require('deepl-translator');
const { version } = require('./package.json');
const chalk = require('chalk');

program
  .version(version)
  .arguments('<text>')
  .action(text =>
    detectLanguage(text)
      .then(({ languageName, languageCode }) =>
        console.log(
          `${chalk.green(languageName)} (${chalk.magenta(languageCode)})`
        )
      )
      .catch(error => console.error(chalk.bold.red(error.message)))
  )
  .parse(process.argv);

if (program.args.length > 2) {
  console.error(chalk.bold.red('Invalid usage'));
  program.help();
} else if (!program.args.length) {
  program.help();
}
