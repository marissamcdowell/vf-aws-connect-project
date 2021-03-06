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

// helper function to strip out non numbers from phone numbers
function cleanseNumberInput(input) {
    return input.replace("+","").replace("-",""); 
}

// takes array of digits, returns array of strings of character representations
function getCharacterOptionsForNumber(inputNumbers) {
    // ex inputNumbers: [4,1,2,2,3,3,3,3,3,3]
    let options = [];

    // loop through each digit
    for (const digit of inputNumbers) {

        if(digitToCharsMap[digit].length > 0) {
            // has letters available (not 0 or 1)
            const newOptionsList = [];
            options.forEach(opt => {
                // loop through characters and add new options
                digitToCharsMap[digit].forEach(letter => {
                    newOptionsList.push(`${opt}${letter}`);
                });
            });
            options = newOptionsList;

            // when no existing options yet
            if(options.length === 0) {
                options = digitToCharsMap[digit];
            }
        }
    }
    return options;
}

// takes array of vanity number strings, returns top 5 choices 
function getBestOptions(vanityOptions) {
    return vanityOptions.slice(0,5);
}

// writes a phone number & its vanity options to dynamo table
async function writeToDynamo(phoneNum, options) {
    const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    const tableName = process.env.VANITY_NUMBERS_TABLE;
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

exports.handler = async function(event, context, callback) {
    try {
        console.log("request:", JSON.stringify(event, undefined, 2));
        var inputNumber = event['Details']['Parameters']['inputNumber'];
        console.log(inputNumber);

        // sanitize input & return 400 if bad
        // could expand on this further, expand on error codes
        if(!inputNumber || inputNumber.length === 0) {
            console.log("no input number found in request");
            return {
                statusCode: 400,
                headers: { "Content-Type": "text/plain" },
                body: `Input error: no input number provided...`
            };
        }
        inputNumber = cleanseNumberInput(inputNumber);

        if(isInvalidInput(inputNumber)) {
            console.log("invalid input number found in request");
            return false;
        }

        const vanityOptions = getCharacterOptionsForNumber(inputNumber);
        console.log('vanity options: ', vanityOptions);
        const bestOptions = getBestOptions(vanityOptions);

        // write output to dynamo
        const result = await writeToDynamo(inputNumber, bestOptions);

        var resultMap = {
            input: inputNumber,
            opt1: bestOptions[0],
            opt2: bestOptions[1],
            opt3: bestOptions[2],
            opt4: bestOptions[3],
            opt5: bestOptions[4]
        };
        console.log(`result map: ${JSON.stringify(resultMap)}`);
        return resultMap;
    } catch(e) {
        console.log('error: ' + e);
        return e;
    }
};
  