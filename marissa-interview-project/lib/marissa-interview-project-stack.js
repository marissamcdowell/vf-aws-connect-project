"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarissaInterviewProjectStack = void 0;
const cdk = require("@aws-cdk/core");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const lambda = require("@aws-cdk/aws-lambda");
const apigateway = require("@aws-cdk/aws-apigateway");
const s3 = require("@aws-cdk/aws-s3");
const s3Deployment = require("@aws-cdk/aws-s3-deployment");
class MarissaInterviewProjectStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // dynamo table
        const vanityNumbersTable = new dynamodb.Table(this, 'VanityNumbers', {
            partitionKey: { name: 'PHONE_NUMBER', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'TIMESTAMP', type: dynamodb.AttributeType.NUMBER },
            removalPolicy: cdk.RemovalPolicy.DESTROY,
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
            environment: { 'VANITY_NUMBERS_TABLE': vanityNumbersTable.tableName }
        });
        vanityNumbersTable.grantWriteData(vanities);
        // last 5 calls lambda function
        const last5callers = new lambda.Function(this, 'LastFiveHandler', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'last5calls.handler',
            environment: { 'VANITY_NUMBERS_TABLE': vanityNumbersTable.tableName }
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
exports.MarissaInterviewProjectStack = MarissaInterviewProjectStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyaXNzYS1pbnRlcnZpZXctcHJvamVjdC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmlzc2EtaW50ZXJ2aWV3LXByb2plY3Qtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCw4Q0FBOEM7QUFDOUMsc0RBQXNEO0FBQ3RELHNDQUFzQztBQUN0QywyREFBMkQ7QUFFM0QsTUFBYSw0QkFBNkIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN6RCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLGVBQWU7UUFDZixNQUFNLGtCQUFrQixHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ25FLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQzNFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ25FLGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87U0FFekMsQ0FBQyxDQUFDO1FBQ0gsNENBQTRDO1FBQzVDLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDO1lBQ3pDLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3JFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ25FLGNBQWMsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUc7U0FDNUMsQ0FBQyxDQUFDO1FBRUgsbUNBQW1DO1FBQ25DLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDNUQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsV0FBVyxFQUFFLEVBQUMsc0JBQXNCLEVBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFDO1NBQ25FLENBQUMsQ0FBQztRQUNILGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1QywrQkFBK0I7UUFDL0IsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUNoRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixXQUFXLEVBQUUsRUFBQyxzQkFBc0IsRUFBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUM7U0FDbkUsQ0FBQyxDQUFDO1FBQ0gsa0JBQWtCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRS9DLGNBQWM7UUFDZCxNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQzFFLE9BQU8sRUFBRSxZQUFZO1NBQ3RCLENBQUMsQ0FBQztRQUVILDBCQUEwQjtRQUMxQixNQUFNLG1CQUFtQixHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUU7WUFDckUsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPO1lBQ3hDLG9CQUFvQixFQUFFLFlBQVk7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUU7WUFDL0YsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUNwRSxpQkFBaUIsRUFBRSxtQkFBbUI7U0FDeEMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBckRELG9FQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ0Bhd3MtY2RrL2F3cy1zMyc7XG5pbXBvcnQgKiBhcyBzM0RlcGxveW1lbnQgZnJvbSAnQGF3cy1jZGsvYXdzLXMzLWRlcGxveW1lbnQnO1xuXG5leHBvcnQgY2xhc3MgTWFyaXNzYUludGVydmlld1Byb2plY3RTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBkeW5hbW8gdGFibGVcbiAgICBjb25zdCB2YW5pdHlOdW1iZXJzVGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywgJ1Zhbml0eU51bWJlcnMnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1BIT05FX05VTUJFUicsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICBzb3J0S2V5OiB7IG5hbWU6ICdUSU1FU1RBTVAnLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLk5VTUJFUiB9LFxuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAgIC8vIHJlcGxpY2F0aW9uUmVnaW9uczogWyd1cy1lYXN0LTEnLCAndXMtZWFzdC0yJywgJ3VzLXdlc3QtMiddLCAgICBJUkwgd2UnZCB3YW50IHRoaXMgdGFibGUgcmVwbGljYXRlZCBmb3IgaGlnaCBhdmFpbGFiaWx0eSBhY3Jvc3MgcmVnaW9uc1xuICAgIH0pO1xuICAgIC8vIGFkZCBpbmRleCBmb3IgZ2V0dGluZyBtb3N0IHJlY2VudCB1cGRhdGVzXG4gICAgdmFuaXR5TnVtYmVyc1RhYmxlLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ3RpbWVzdGFtcEdTSScsXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ1NUQVRVUycsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sIFxuICAgICAgc29ydEtleTogeyBuYW1lOiAnVElNRVNUQU1QJywgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5OVU1CRVIgfSxcbiAgICAgIHByb2plY3Rpb25UeXBlOiBkeW5hbW9kYi5Qcm9qZWN0aW9uVHlwZS5BTEwsXG4gICAgfSk7XG5cbiAgICAvLyB2YW5pdHkgY29udmVydGVyIGxhbWJkYSBmdW5jdGlvblxuICAgIGNvbnN0IHZhbml0aWVzID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnVmFuaXRpZXNIYW5kbGVyJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICAgICAgaGFuZGxlcjogJ3Zhbml0aWVzLmhhbmRsZXInLFxuICAgICAgZW52aXJvbm1lbnQ6IHsnVkFOSVRZX05VTUJFUlNfVEFCTEUnOnZhbml0eU51bWJlcnNUYWJsZS50YWJsZU5hbWV9XG4gICAgfSk7XG4gICAgdmFuaXR5TnVtYmVyc1RhYmxlLmdyYW50V3JpdGVEYXRhKHZhbml0aWVzKTtcblxuICAgIC8vIGxhc3QgNSBjYWxscyBsYW1iZGEgZnVuY3Rpb25cbiAgICBjb25zdCBsYXN0NWNhbGxlcnMgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdMYXN0Rml2ZUhhbmRsZXInLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgICBoYW5kbGVyOiAnbGFzdDVjYWxscy5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7J1ZBTklUWV9OVU1CRVJTX1RBQkxFJzp2YW5pdHlOdW1iZXJzVGFibGUudGFibGVOYW1lfVxuICAgIH0pO1xuICAgIHZhbml0eU51bWJlcnNUYWJsZS5ncmFudFJlYWREYXRhKGxhc3Q1Y2FsbGVycyk7XG5cbiAgICAvLyBhcGkgZ2F0ZXdheVxuICAgIGNvbnN0IGFwaUdhdGV3YXkgPSBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFSZXN0QXBpKHRoaXMsICdMYXN0NUNhbGxzRW5kcG9pbnQnLCB7XG4gICAgICBoYW5kbGVyOiBsYXN0NWNhbGxlcnNcbiAgICB9KTtcblxuICAgIC8vIHMzIGJ1Y2tldCBmb3IgcmVhY3QgYXBwXG4gICAgY29uc3QgYnVja2V0TGFzdDVDYWxsc0FwcCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ0xhc3Q1Q2FsbHNBcHBCdWNrZXQnLCB7XG4gICAgICBwdWJsaWNSZWFkQWNjZXNzOiB0cnVlLFxuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSwgICAgICAgIFxuICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6IFwiaW5kZXguaHRtbFwiXG4gICAgfSk7XG4gICAgY29uc3QgczNEZXBsb3ltZW50TGFzdDVDYWxsc0FwcCA9IG5ldyBzM0RlcGxveW1lbnQuQnVja2V0RGVwbG95bWVudCh0aGlzLCBcImRlcGxveVN0YXRpY1dlYnNpdGVcIiwge1xuICAgICAgc291cmNlczogW3MzRGVwbG95bWVudC5Tb3VyY2UuYXNzZXQoXCIuLi9sYXN0LWZpdmUtY2FsbHMtYXBwL2J1aWxkXCIpXSxcbiAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBidWNrZXRMYXN0NUNhbGxzQXBwXG4gICB9KTtcbiAgfVxufVxuIl19