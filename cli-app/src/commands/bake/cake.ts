import Command from '../base'

export default class BakeCake extends Command {
  static description = 'describe the command here'

  async run() {
    const {args, flags} = this.parse(BakeCake)

    this.sendMessage( 'A delicious Cake(not a lie)!' )    
  }
}
