#!/usr/bin/env node
const program = require('commander');
const { version } = require('./package.json');

program
  .version(version)
  .command('translate <text>', 'translates the text to a target language')
  .command('detect <text>', 'detects the text language')
  .parse(process.argv);
