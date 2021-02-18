const { isNumericLiteral } = require("typescript");

// helper function to determine if an input number is valid
// TODO more notes here
function isValidInput(input) {
    if(input !== 'hi') {
        return true;
    }
    return false;
}

exports.handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2));

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

    // sanitize input & return 400 if bad
    // could expand on this further 
    if(!event.inputNumber || !isValidInput(event.inputNumber)) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "text/plain" },
            body: `Input error.`
          };
    }

    const firstDigitOptions = digitToCharsMap[event.inputNumber[0]];

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `Hello! first digit options for ${event.inputNumber} are ${firstDigitOptions}`
    };
};
  