# deepl-translator-cli

[![Known Vulnerabilities](https://snyk.io/test/github/vsetka/deepl-translator-cli/badge.svg)](https://snyk.io/test/github/vsetka/deepl-translator-cli)
[![npm version](https://badge.fury.io/js/deepl-translator-cli.svg)](https://badge.fury.io/js/deepl-translator-cli)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](#badge)

This command line tool delivers text translation capabilities to your console, powered by DeepL (https://www.deepl.com/translator).

## Install

```shell
yarn global add deepl-translator-cli
```

## Usage examples

```shell
# Set your API key, or use the -k option to pass your key inline
export DEEPL_AUTH_KEY='<replace with your key>'

# Translate text into German
deepl translate -t 'DE' 'How do you do?'

# Pipe text from standard input
echo 'How do you do?' | deepl translate -t 'DE'

# Detect language
deepl detect 'Wie geht es Ihnen?'

# For help
deepl -h
deepl translate -h
deepl detect -h
```

## License

MIT
