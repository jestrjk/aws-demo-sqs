import cdk = require('@aws-cdk/core');
import sqs = require('@aws-cdk/aws-sqs')
import ssm = require( '@aws-cdk/aws-ssm')

export class AwsDemoSqsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    let queue = new sqs.Queue( this, 'aws-demo-sqs')

    new ssm.StringParameter( this, "aws-demo-ssm-queueName", {
      parameterName: "/bpimb/aws-demo-sqs/sqs/name",
      stringValue: queue.queueName
    })

    new ssm.StringParameter( this, "aws-demo-ssm-queueArn", {
      parameterName: "/bpimb/aws-demo-sqs/sqs/arn",
      stringValue: queue.queueArn
    })

  }
}
