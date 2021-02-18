var AWS = require('aws-sdk');

const digitToCharsMap = {
    0: [],
    1: [],
    2: ['a','b','c'],
    3: ['d','e','f'],
    4: ['g','h','i'],
    5: ['j','k','l'],
    6: ['m','n','o'],
    7: ['p','q','r','s'],
    8: ['t','u','v'],
    9: ['w','x','y','z']
};

// helper function to determine if an input number is invalid
// TODO more notes here
function isInvalidInput(input) {

    // should be numbers only!
    if(!isNaN(input)) {
        return false;
    }
    return true;
}

// takes array of digits, returns array of string of character representations
function getCharacterOptionsForNumber(inputNumbers) {
    // ex inputNumbers: [4,1,2,2,3,3,3,3,3,3]
    const options = [];

    // TODO -- do this!
    digitToCharsMap[2].forEach(x => {
        options.push(x);

    });

    return options;
}

// writes a phone number & its vanity options to dynamo table
async function writeToDynamo(phoneNum, options) {
    const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    const tableName = "MarissaInterviewProjectStack-VanityNumbers9448E191-OML96G7T9XLP"; 
    var params = {
        "TableName": tableName,
        "Item" : {
            "PHONE_NUMBER": {'S': phoneNum},
            "VANITY_OPTIONS": {'SS': options},
            "TIMESTAMP": {'N': Date.now().toString()}
        }
    };
    try {
      const result = await dynamodb.putItem(params).promise();
      return result;
    } catch (error) {
      throw new Error(`Error in dynamoDB: ${JSON.stringify(error)}`);
    }  
}

exports.handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2));

    // sanitize input & return 400 if bad
    // could expand on this further, expand on error codes
    if(!event.inputNumber) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "text/plain" },
            body: `Input error: no input number provided...`
        };
    }
    if(isInvalidInput(event.inputNumber)) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "text/plain" },
            body: `Input error: bad input number provided...`
        };
    }

    const vanityOptions = getCharacterOptionsForNumber(event.inputNumber);
    console.log('vanity options: ', vanityOptions);

    // write output to dynamo
    const result = await writeToDynamo(event.inputNumber, vanityOptions);
    console.log('dynamo result: ', result);

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `Hello! first digit options for ${event.inputNumber} are ${vanityOptions}`
    };
};
  