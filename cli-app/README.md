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
* [`cli-app bake:cake [FILE]`](#cli-app-bakecake-file)
* [`cli-app bake:pie [FILE]`](#cli-app-bakepie-file)
* [`cli-app base`](#cli-app-base)
* [`cli-app eat:cake [FILE]`](#cli-app-eatcake-file)
* [`cli-app eat:pie [FILE]`](#cli-app-eatpie-file)
* [`cli-app hello`](#cli-app-hello)
* [`cli-app help [COMMAND]`](#cli-app-help-command)
* [`cli-app whoami`](#cli-app-whoami)

## `cli-app bake:cake [FILE]`

describe the command here

```
USAGE
  $ cli-app bake:cake [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/bake/cake.ts](https://github.com/jestrjk/aws-demo-sqs/blob/v0.0.0/src/commands/bake/cake.ts)_

## `cli-app bake:pie [FILE]`

describe the command here

```
USAGE
  $ cli-app bake:pie [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/bake/pie.ts](https://github.com/jestrjk/aws-demo-sqs/blob/v0.0.0/src/commands/bake/pie.ts)_

## `cli-app base`

```
USAGE
  $ cli-app base
```

_See code: [src/commands/base.ts](https://github.com/jestrjk/aws-demo-sqs/blob/v0.0.0/src/commands/base.ts)_

## `cli-app eat:cake [FILE]`

describe the command here

```
USAGE
  $ cli-app eat:cake [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/eat/cake.ts](https://github.com/jestrjk/aws-demo-sqs/blob/v0.0.0/src/commands/eat/cake.ts)_

## `cli-app eat:pie [FILE]`

describe the command here

```
USAGE
  $ cli-app eat:pie [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/eat/pie.ts](https://github.com/jestrjk/aws-demo-sqs/blob/v0.0.0/src/commands/eat/pie.ts)_

## `cli-app hello`

Tests the various connectivity needed

```
USAGE
  $ cli-app hello

EXAMPLE
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

## `cli-app whoami`

shows who the user is, as determined by IAM.getUser

```
USAGE
  $ cli-app whoami
```

_See code: [src/commands/whoami.ts](https://github.com/jestrjk/aws-demo-sqs/blob/v0.0.0/src/commands/whoami.ts)_
<!-- commandsstop -->
