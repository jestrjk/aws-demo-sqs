import {Command, flags} from '@oclif/command'

import { args } from '@oclif/parser'

export default abstract class extends Command {
  
  static args = []
  static flags = {}
  
  static hidden = true 

  sdk: any
  sqs: any
  queueInfo: any
  ssmParameterQueueName = '/bpimb/aws-demo-sqs/sqs/queueName'
  queueName: string = ''
  
 
  //
  // SEND-ING MESSAGES
  //
  async sendMessage( message: string, messageAttributes: any = {}) {

    await this.sqs.sendMessage( {
      MessageBody: message,
      QueueUrl: this.queueInfo.QueueUrl,
      MessageAttributes: messageAttributes
    }).promise()

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
      QueueUrl: this.queueInfo.QueueUrl,
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
      QueueUrl: this.queueInfo.QueueUrl,
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
    this.queueName = await this.getSqsQueueName()
    await this.initSqsQueue(this.queueName)

    this.sqs = new this.sdk.SQS()
  }

  async initSqsQueue( queueName : string) {
    let sqs = new this.sdk.SQS()
    //this.log( `Init: SQS Queue: ${queueName}`)

    this.queueInfo = await sqs.getQueueUrl({
      QueueName: queueName
    }).promise()

    //this.log( this.queueInfo  )

    this.sqs = new this.sdk.SQS()
    return this.sqs
  }

  async getSqsQueueName() {
    let ssm = new this.sdk.SSM()
    
    let sqsName = await ssm.getParameter({
      Name: this.ssmParameterQueueName 
    }).promise()

    return sqsName.Parameter.Value
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