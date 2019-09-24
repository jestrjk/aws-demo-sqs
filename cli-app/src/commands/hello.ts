import Command from './base'
const chalk = require( 'chalk' )

export default class Hello extends Command {
  static description = 'Tests the various connectivity needed'

  static examples = [``]

  static flags = {
    // help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
  }

  static args = [/*{name: 'file'}*/]

  async run() {
        
    let sqsName = await this.getSqsName()

    this.log( chalk.cyan( `SQS Queue Name:` ) )
    this.log( sqsName )

    let sqsQueueInfo = await this.getSqsQueue( sqsName.Parameter.Value )

    this.log( chalk.cyan( `SQS Queue:` ))
    this.log( sqsQueueInfo )

    const {args, flags} = this.parse(Hello)

    this.log(`Hello from ./src/commands/hello.ts`)
  }

  async getSqsName() {
    let ssm = new this.sdk.SSM()
    
    let sqsName = await ssm.getParameter({
      Name: '/bpimb/aws-demo-sqs/sqs/name'
    }).promise()

    return sqsName
  }

  async getSqsQueue( queueName : string) {
    let sqs = new this.sdk.SQS()
    
    let sqsInfo = await sqs.getQueueUrl({
      QueueName: queueName
    }).promise()

    return sqsInfo
  }

}
