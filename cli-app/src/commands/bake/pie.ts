import cli from 'cli-ux'
import Command from '../base'

export default class BakePie extends Command {
  
  static hidden = false
  static description = 'No you FOOL! Pie is the best!'

  async run() {
    const {args, flags} = this.parse(BakePie)

    cli.action.start( 'Baking a pie! (Hope no one steals it)' )

    await this.sendMessage( 'A delicious Pie!' )    
 
    cli.action.stop()
  }
}
