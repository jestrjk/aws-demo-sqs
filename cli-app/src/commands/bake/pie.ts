import Command from '../base'

export default class BakePie extends Command {
  
  static description = 'No you FOOL! Pie is the best!'

  async run() {
    const {args, flags} = this.parse(BakePie)

    this.sendMessage( 'A delicious Pie!' )    
 
  }
}
