const AWS = require('aws-sdk');

// get last 5 dynamo db updates
async function getLast5Callers() {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const timestamp = Date.now();
    const params = {
        TableName : process.env.VANITY_NUMBERS_TABLE,
        IndexName: 'timestampGSI',
        KeyConditionExpression: '#s = :hkey and #t >= :rkey',
        ExpressionAttributeNames: {
            '#s': 'STATUS',
            '#t': 'TIMESTAMP'
        },
        ExpressionAttributeValues: {
            ':hkey': 'OK',
            ':rkey': timestamp
        },
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

    const result = await getLast5Callers();
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
  