import path = require( 'path')

import cdk = require('@aws-cdk/core');
import sqs = require('@aws-cdk/aws-sqs')
import ssm = require( '@aws-cdk/aws-ssm')
import lambda = require( '@aws-cdk/aws-lambda')
import targets = require( '@aws-cdk/aws-events-targets')
import sources = require( '@aws-cdk/aws-lambda-event-sources')
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources';

export class AwsDemoSqsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    let inputQueue = new sqs.Queue( this, 'aws-demo-sqs-inputQueue')
    let outputQueue = new sqs.Queue( this, 'aws-demo-sqs-outputQueue')

    let inputQueueParam = new ssm.StringParameter( this, "aws-demo-ssm-inputQueueName", {
      parameterName: "/bpimb/aws-demo-sqs/sqs/inputQueue/url",
      stringValue: inputQueue.queueUrl
    })
    
    let outputQueueParam = new ssm.StringParameter( this, "aws-demo-ssm-outputQueueName", {
      parameterName: "/bpimb/aws-demo-sqs/sqs/outputQueue/url",
      stringValue: outputQueue.queueUrl
    })
    

    let pieThief = new lambda.Function( this, 'aws-demo-sqs-pie-thief', {
      code: lambda.Code.fromAsset( path.join(__dirname, '../../pie-thief')),
      handler: 'pie-thief.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
    })

    pieThief.addEventSource( new SqsEventSource( inputQueue ) )     

    inputQueue.grantConsumeMessages( pieThief )
    inputQueue.grantPurge( pieThief )
    inputQueue.grantSendMessages( pieThief )

    outputQueue.grantSendMessages( pieThief )
        
    inputQueueParam.grantRead( pieThief )
    outputQueueParam.grantRead( pieThief )

  }
}
