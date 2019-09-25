import Command from './base'

export default class Inventory extends Command {
  
  static hidden = false
  static description = 'Take an inventory of our stock!'
  
  async run() {
    const {args, flags} = this.parse(Inventory)

    
    let inputData = await this.sqs.getQueueAttributes( { QueueUrl: this.inputQueueUrl, AttributeNames: [ 
      'ApproximateNumberOfMessages', 
      'ApproximateNumberOfMessagesNotVisible' 
    ] }).promise() 

    console.log ( `Input: ${inputData.Attributes.ApproximateNumberOfMessages}/${inputData.Attributes.ApproximateNumberOfMessagesNotVisible}`)
   
    let outputData = await this.sqs.getQueueAttributes( 
      { QueueUrl: this.outputQueueUrl, AttributeNames: [ 
        'ApproximateNumberOfMessages', 
        'ApproximateNumberOfMessagesNotVisible' 
      ] }).promise() 

      console.log ( `Output: ${outputData.Attributes.ApproximateNumberOfMessages}/${outputData.Attributes.ApproximateNumberOfMessagesNotVisible}`)
      
  }

    
}
