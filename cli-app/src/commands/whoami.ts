import {Command, flags} from '@oclif/command'

export default class Whoami extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Whoami)

    const name = flags.name || 'world'
    this.log(`hello ${name} from /home/jjester/github/jestrjk/aws-demo-sqs/cli-app/src/commands/whoami.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
