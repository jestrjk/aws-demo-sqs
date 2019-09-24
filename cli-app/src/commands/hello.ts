import {Command, flags} from '@oclif/command'
const sdk = require('aws-sdk')

export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ cli-app hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    sdk.config.getCredentials((err:any) => {
      if (err) console.log( err ) 
      else {
        console.log( `aws-sdk: credentials retrieved` )
      }
    })
    sdk.config.update({region: 'us-east-1'});

    let ssm = new sdk.SSM()

    let sqsName = await ssm.getParameter({
      Name: '/bpimb/aws-demo-sqs/sqs/name'
    }).promise()


    const {args, flags} = this.parse(Hello)

    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/commands/hello.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
