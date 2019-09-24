import Command from './base'

export default class EatPie extends Command {
  static description = 'describe the command here'
  
  async run() {
    const {args, flags} = this.parse(EatPie)

    let bakedGood = await this.receiveMessage()

    if ( bakedGood ) {
      this.log( `I have eaten ${bakedGood}!`)
    }
    else {
      this.log( `Nothing to eat. ;( So Sad.`)
    }
    
  }
}
