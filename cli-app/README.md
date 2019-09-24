cli-app
=======



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cli-app.svg)](https://npmjs.org/package/cli-app)
[![Downloads/week](https://img.shields.io/npm/dw/cli-app.svg)](https://npmjs.org/package/cli-app)
[![License](https://img.shields.io/npm/l/cli-app.svg)](https://github.com/jestrjk/aws-demo-sqs/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cli-app
$ cli-app COMMAND
running command...
$ cli-app (-v|--version|version)
cli-app/0.0.0 linux-x64 node-v12.4.0
$ cli-app --help [COMMAND]
USAGE
  $ cli-app COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cli-app hello [FILE]`](#cli-app-hello-file)
* [`cli-app help [COMMAND]`](#cli-app-help-command)

## `cli-app hello [FILE]`

describe the command here

```
USAGE
  $ cli-app hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ cli-app hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/jestrjk/aws-demo-sqs/blob/v0.0.0/src/commands/hello.ts)_

## `cli-app help [COMMAND]`

display help for cli-app

```
USAGE
  $ cli-app help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->
