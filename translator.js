const { version } = require('./package.json');
const chalk = require('chalk');
const program = require('commander');
const deepl = require('deepl-node');

module.exports = () => {
  const authorizationKey =
    program.opts().authorizationKey == undefined
      ? process.env.DEEPL_AUTH_KEY
      : program.opts().authorizationKey;
  if (authorizationKey == undefined) {
    return {
      error:
        'Specify an authorization key or set a dedicated DEEPL_AUTH_KEY environment variable',
    };
  }
  return new deepl.Translator(authorizationKey);
};
