import {Command, flags} from '@oclif/command'

export default abstract class extends Command {

  sdk: any

  async init() {

    this.sdk = require( 'aws-sdk' )

    let sdkInitialization = new Promise( (resolve, reject) => {
      this.sdk.config.getCredentials((err:any) => {
        if (err) {
          reject( err ) 
          console.log( err ) 
        } 
        else {
          console.log( `AWS.config.getCredentials() // SUCCESS` )
          this.sdk.config.update({region: 'us-east-1'});
          resolve(this.sdk)
        }
      })
    })

    return sdkInitialization
  }
}