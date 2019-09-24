#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { AwsDemoSqsStack } from '../lib/cdk-stack'

const app = new cdk.App();
new AwsDemoSqsStack(app, 'AwsDemoSQSStack');
