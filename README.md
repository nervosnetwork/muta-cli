muta-cli
========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/muta-cli.svg)](https://npmjs.org/package/muta-cli)
[![Downloads/week](https://img.shields.io/npm/dw/muta-cli.svg)](https://npmjs.org/package/muta-cli)
[![License](https://img.shields.io/npm/l/muta-cli.svg)](https://github.com/huwenchao/muta-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g muta-cli
$ muta-cli COMMAND
running command...
$ muta-cli (-v|--version|version)
muta-cli/0.2.0-dev.2 darwin-x64 node-v12.4.0
$ muta-cli --help [COMMAND]
USAGE
  $ muta-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`muta-cli help [COMMAND]`](#muta-cli-help-command)
* [`muta-cli repl`](#muta-cli-repl)

## `muta-cli help [COMMAND]`

display help for muta-cli

```
USAGE
  $ muta-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `muta-cli repl`

muta client REPL

```
USAGE
  $ muta-cli repl

OPTIONS
  -e, --endpoint=endpoint  chain endpoint to connect
  -h, --help               show CLI help
```

_See code: [src/commands/repl.ts](https://github.com/huwenchao/muta-cli/blob/v0.2.0-dev.2/src/commands/repl.ts)_
<!-- commandsstop -->
