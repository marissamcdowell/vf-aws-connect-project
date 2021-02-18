
######
# CDK project that builds 
 * 2 lambda functions, 1 for converting callers numbers to vanity numbers and 1 for finding 5 last callers
 * 1 dynamo table to store data from contact flow.
 * API gateway endpoint for fronting last 5 caller lambda function
 * s3 bucket for hosting static react app code

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
