import Command from './base'

export default class Eat extends Command {
  
  static description = 'Try and find a delicious treat from the message queue to eat!'
  
  async run() {
    const {args, flags} = this.parse(Eat)

    let returnMessage = await this.receiveMessage()

    if ( !returnMessage ) {
      this.log( `Nothing to eat. ;( So Sad.`)
      return
    }

    let {bakedGood, icing} = returnMessage 

    if ( bakedGood ) {
      if ( icing ) {
        this.log( `I have eaten ${bakedGood} with ${icing} icing!`)  
      }
      else {
        this.log( `I have eaten ${bakedGood}!`)
      }
    }
    else {
      
    }
    
  }
}
