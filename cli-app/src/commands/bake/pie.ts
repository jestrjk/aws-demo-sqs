import Command from '../base'

export default class BakePie extends Command {
  static description = 'describe the command here'

  static args = [{name: 'file'}]

  async run() {

    this.sendMessage( 'A delicious Pie!' )    
 
  }
}
