import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import { Duration } from '@aws-cdk/core';

export class MarissaInterviewProjectStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // dynamo table
    const vanityNumbersTable = new dynamodb.Table(this, 'VanityNumbers', {
      partitionKey: { name: 'PHONE_NUMBER', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'TIMESTAMP', type: dynamodb.AttributeType.NUMBER },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      // replicationRegions: ['us-east-1', 'us-east-2', 'us-west-2'],    IRL we'd want this table replicated for high availabilty across regions
    });
    // add index for getting most recent updates
    vanityNumbersTable.addGlobalSecondaryIndex({
      indexName: 'timestampGSI',
      partitionKey: { name: 'STATUS', type: dynamodb.AttributeType.STRING }, 
      sortKey: { name: 'TIMESTAMP', type: dynamodb.AttributeType.NUMBER },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // vanity converter lambda function
    const vanities = new lambda.Function(this, 'VanitiesHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'vanities.handler',
      environment: {'VANITY_NUMBERS_TABLE':vanityNumbersTable.tableName},
      timeout: Duration.seconds(8)
    });
    vanityNumbersTable.grantWriteData(vanities);

    // last 5 calls lambda function
    const last5callers = new lambda.Function(this, 'LastFiveHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'last5calls.handler',
      environment: {'VANITY_NUMBERS_TABLE':vanityNumbersTable.tableName}
    });
    vanityNumbersTable.grantReadData(last5callers);

    // api gateway
    const apiGateway = new apigateway.LambdaRestApi(this, 'Last5CallsEndpoint', {
      handler: last5callers
    });

    // s3 bucket for react app
    const bucketLast5CallsApp = new s3.Bucket(this, 'Last5CallsAppBucket', {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,        
      websiteIndexDocument: "index.html"
    });
    const s3DeploymentLast5CallsApp = new s3Deployment.BucketDeployment(this, "deployStaticWebsite", {
      sources: [s3Deployment.Source.asset("../last-five-calls-app/build")],
      destinationBucket: bucketLast5CallsApp
   });
  }
}
