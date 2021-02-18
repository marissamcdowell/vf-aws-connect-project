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
// for now, check to ensure only numeric
// should include other checks for accurate phone numbers in real life
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
    // trying to get a good ratio of vowels to consonants
    // filter out options with less than 1/4 vowels, since those are important for words
    // filter out options with less than half non-vowels bc those are important too
    let filteredOptions = vanityOptions.filter(option => {
        const vowels = (option.match(/[aeiou]/gi) || []).length;
        if(vowels > option.length/4 && vowels < option.length/2) return true;
        return false;
    }); 
    console.log(`remaining options: ${filteredOptions.length}`);

    // Tried this but execution time went up to 5-6 s so commented out
    // filteredOptions.sort(function(a, b){
    //     // sort by vowel count
    //     const aCount = (a.match(/[aeiou]/gi) || []).length;
    //     const bCount = (b.match(/[aeiou]/gi) || []).length;
    //     return bCount-aCount;
    // });
    // console.log(`remaining options: ${filteredOptions.length}`);    

    if(filteredOptions.length > 5) {
        // if there are filtered options
        return filteredOptions.slice(0,5);
    } else {
        // if no vowels, just use first 5 for now, boring!
        return vanityOptions.slice(0,5);
    }    
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
            "TIMESTAMP": {'N': Date.now().toString()},
            "STATUS": {'S': 'OK'}
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
            return false;
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

        // return top 3 from function for consumption by contact flow
        var resultMap = {
            input: inputNumber,
            opt1: bestOptions[0],
            opt2: bestOptions[1],
            opt3: bestOptions[2]
        };
        console.log(`result map: ${JSON.stringify(resultMap)}`);
        return resultMap;
    } catch(e) {
        console.log('error: ' + e);
        return e;
    }
};
  