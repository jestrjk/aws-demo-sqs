import Command from './base'

export default class Whoami extends Command {
  static description = 'shows who the user is, as determined by IAM.getUser'

  static flags = {
    
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Whoami)

    const iam = new this.sdk.IAM()
    const user =  await iam.getUser().promise()

    this.log ( user.User.Arn )

  }
}
