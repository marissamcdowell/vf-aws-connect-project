var AWS = require('aws-sdk');

// get last 5 dynamo db updates
async function getLast5Callers() {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName : process.env.VANITY_NUMBERS_TABLE,
        ScanIndexForward: false,
        Limit: 5
    };
    try {
        const result = await docClient.query(params).promise();
        return result;
    } catch (error) {
        throw new Error(`Error in dynamoDB: ${JSON.stringify(error)}`);
    }
}

exports.handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2));

    let result = await getLast5Callers();
    console.log('dynamo result: ', result);

    return {
        statusCode: 200,
        headers: { 
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(result)
    };
};
  