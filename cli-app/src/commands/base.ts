import {Command, flags} from '@oclif/command'

export default abstract class extends Command {

  sdk: any
  sqs: any
  ssmParameterName = '/bpimb/aws-demo-sqs/sqs/name'
  queue: any
  queueInfo: any
  queueName: string = ''
  
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

  async receiveMessage( ){
    
    let results = await this.sqs.receiveMessage( {
      QueueUrl: this.queueInfo.QueueUrl
    }).promise()
    
    .catch( (err:any) => {
      this.error( err )
    })

    if ( ! results.Messages ) { 
      return undefined
    }
    
    let bakedGood =  results.Messages.reduce( (acc:any, cur:any ) => { return cur } )

    this.sqs.deleteMessage( {
      QueueUrl: this.queueInfo.QueueUrl,
      ReceiptHandle: bakedGood.ReceiptHandle
    }).promise()

    .catch ( (err:any ) => {
      this.error( err ) 
    })

    return bakedGood.Body
  }

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
      Name: this.ssmParameterName 
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