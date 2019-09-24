import {Command, flags} from '@oclif/command'
import Base from '../base'

export default class BakeCake extends Base {
  
  static description = 'Cake is the best!'

  static flags = {
    ...Base.flags,
    icing: flags.string({options: [ 'Vanilla', 'Chocolate', 'Crazy'], default: 'Vanilla'})
  }

  async run() {
    const {args, flags} = this.parse(BakeCake)

    this.sendMessage( 'A delicious Cake(not a lie)!', { 
      icing: { 
        DataType: 'String', 
        StringValue: flags.icing 
      }
    })    
  }
}
