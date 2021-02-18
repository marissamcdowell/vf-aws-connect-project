var AWS = require('aws-sdk');

// get last 5 dynamo db updates
async function getLast5Callers() {
    let results = [];
    // const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    // const tableName = "MarissaInterviewProjectStack-vanityNumbersDBEDEA79-1HFWTVTI2Y3DG"; 
    // try {
    //   const result = await dynamodb.get({
    //       "TableName": tableName
    //   }).promise();
    //   return result;
    // } catch (error) {
    //   throw new Error(`Error in dynamoDB: ${JSON.stringify(error)}`);
    // }  
    return ['last','five','callesr','were'];
}

exports.handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2));

    let result = await getLast5Callers();
    console.log('dynamo result: ', result);

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: result
    };
};
  