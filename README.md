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
muta-cli/0.0.0 darwin-x64 node-v10.15.0
$ muta-cli --help [COMMAND]
USAGE
  $ muta-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`muta-cli hello [FILE]`](#muta-cli-hello-file)
* [`muta-cli help [COMMAND]`](#muta-cli-help-command)

## `muta-cli hello [FILE]`

describe the command here

```
USAGE
  $ muta-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ muta-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/huwenchao/muta-cli/blob/v0.0.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
