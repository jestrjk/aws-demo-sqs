import Command from './base'

export default class Eat extends Command {
  
  static hidden = false
  static description = 'Try and find a delicious treat from the message queue to eat!'
  
  async run() {
    const {args, flags} = this.parse(Eat)

    let returnMessage = await this.receiveMessage()

    //
    // Nothing in the queue!
    //
    if ( !returnMessage ) {
      this.log( `Nothing to eat. ;( So Sad.`)
      return
    }

    //
    // Deconstruct the return Message into its bakedGood and icing components
    //
    let {bakedGood, icing} = returnMessage 

    if ( icing ) {
      this.log( `I have eaten ${bakedGood} with ${icing} icing!`)  
    }
    else {
      this.log( `I have eaten ${bakedGood}!`)
    }
  }
}
