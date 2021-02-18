exports.handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2));

    const inputNumber = event.inputNumber;

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `Hello! Received input #: ${event.inputNumber}\n`
    };
};
  