const AWS = require('aws-sdk')

exports.handler = async function ( event, context ) {

  let sqs = new AWS.SQS() 
  let ssm = new AWS.SSM()

  // When Lambda reads a batch, the messages stay in the queue but become hidden for 
  // the length of the queue's visibility timeout. If your function successfully 
  // processes the batch, Lambda deletes the messages from the queue. If your function 
  // is throttled, returns an error, or doesn't respond, the message becomes visible 
  // again. All messages in a failed batch return to the queue, so your function code 
  // must be able to process the same message multiple times without side effects.

  console.log( event )

  var outputQueueUrlSSM = await ssm.getParameter({
    Name: '/bpimb/aws-demo-sqs/sqs/outputQueue/url' 
  }).promise()

  var queueUrl = outputQueueUrlSSM.Parameter.Value 

  var messages = []

  event.Records.forEach( async (bakedGood) => {
    console.log ( `processing bakedGood`)
    console.log( bakedGood )

    if ( bakedGood.body.includes( 'Pie' )) {
      if ( Math.random() < .5 ) {
        // eat the pie !!!
        console.log( 'I ate the pie! tee hee!')
        return
      }
    }

    //
    // If we didnt eat the pie, send it to the output queue
    //
    let params = {
      MessageBody: bakedGood.body,
      QueueUrl: queueUrl,
    }

    if ( bakedGood.messageAttributes && bakedGood.messageAttributes.icing ) {
      
      //
      // Really? The attributes are not capitalized, but the sdk requires capitalized letters?
      //
      params.MessageAttributes = {
        icing: {
          DataType: bakedGood.messageAttributes.icing.dataType,
          StringValue: bakedGood.messageAttributes.icing.stringValue,
        }
      }
      
      console.log( 'including icing')
      console.log( params.MessageAttributes )
    }
    
    let messagePromise = sqs.sendMessage( params ).promise()
    messages.push( messagePromise )

    messagePromise    
      .then( (data) => {
        console.log( data )
        console.log( 'I sent the baked good along to the outout queue')
      })

      .catch( (err) => {
        console.log( err ) 
        console.log( 'Problem sending to the output queue : (')
      })
      
  })
    
  await Promise.all( messages )
    .then( () => context.succeed() )
    .catch( (err) => context.fail(err) )

}