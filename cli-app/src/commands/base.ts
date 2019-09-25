import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'

import { args } from '@oclif/parser'

export default abstract class extends Command {
  
  static args = []
  static flags = {}
  
  static hidden = true 

  sdk: any
  sqs: any
  inputQueueUrlParamName = '/bpimb/aws-demo-sqs/sqs/inputQueue/url'
  outputQueueUrlParamName = '/bpimb/aws-demo-sqs/sqs/outputQueue/url'
  inputQueueUrl: any
  outputQueueUrl: any
 
  //
  // SEND-ING MESSAGES
  //
  async sendMessage( message: string, messageAttributes: any = {}) {

    await this.sqs.sendMessage( {
      MessageBody: message,
      QueueUrl: this.inputQueueUrl,
      MessageAttributes: messageAttributes
    }).promise()
    
    .then( (data:any) => {
      //this.log( data ) 
    })
    .catch( (err:any) => {
      this.error( err ) 
    })
  }

  // ---

  //
  // RECEIVE-ING MESSAGES
  //
  async receiveMessage( ){

    //
    // Receive the message
    // 
    let results = await this.sqs.receiveMessage( {
      QueueUrl: this.outputQueueUrl,
      MessageAttributeNames: [ 'icing' ]
    }).promise()
    //
    // Catch any errors
    //
    .catch( (err:any) => {
      this.error( err )
    })
        
    if ( ! results.Messages ) { 
      return undefined
    }

    
    let bakedGoodMessage =  results.Messages.reduce( (acc:any, cur:any ) => { return cur }, 'Nothing!'  )
    //this.log ( bakedGoodMessage ) 

    //
    // We received the message, everything is going fine, let's delete it.
    //
    this.sqs.deleteMessage( {
      QueueUrl: this.outputQueueUrl,
      ReceiptHandle: bakedGoodMessage.ReceiptHandle
    }).promise()

    .catch ( (err:any ) => {
      this.error( err ) 
    })

    //
    // Assemble our return value and return it!
    //

    let icingValue:any = undefined
    
    if ( bakedGoodMessage.MessageAttributes && bakedGoodMessage.MessageAttributes.icing ) {
      icingValue = bakedGoodMessage.MessageAttributes.icing.StringValue
    }

    let returnValue = {
      bakedGood: bakedGoodMessage.Body, 
      icing: icingValue 
    }
    
    //this.log( `With: ${withValue}` )
    return returnValue
  }
 
  // ---

  async init() {
    await this.initSdk()
    this.sqs = new this.sdk.SQS()

    this.inputQueueUrl = await this.getSSMParameter( this.inputQueueUrlParamName )
    this.outputQueueUrl = await this.getSSMParameter( this.outputQueueUrlParamName )

    this.sqs = new this.sdk.SQS()
  }

  async getSSMParameter( paramName:string ) {
    let ssm = new this.sdk.SSM()
    
    let param = await ssm.getParameter({
      Name: paramName 
    }).promise()

    return param.Parameter.Value
  }

  
  async initSdk() {
    this.sdk = require( 'aws-sdk' )

    let sdkInitialization = new Promise( (resolve, reject) => {
      this.sdk.config.getCredentials((err:any) => {
        if (err) {
          reject( err ) 
          console.log( err ) 
        } 
        else {
          
          this.sdk.config.update({region: 'us-east-1'});
          resolve(this.sdk)
        }
      })
    })

    return sdkInitialization
  }
}