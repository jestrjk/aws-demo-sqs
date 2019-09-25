import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'

import Base from '../base'

export default class BakeCake extends Base {
  
  static description = 'Cake is the best!'

  static flags = {
    ...Base.flags,
    icing: flags.string({options: [ 'Vanilla', 'Chocolate', 'Crazy'], default: 'Vanilla'})
  }

  async run() {
    const {args, flags} = this.parse(BakeCake)

    cli.action.start( 'Baking a cake!' )

    await this.sendMessage( 'A delicious Cake(not a lie)!', { 
      icing: { 
        DataType: 'String', 
        StringValue: flags.icing 
      }
    })

    cli.action.stop()
  }
}
