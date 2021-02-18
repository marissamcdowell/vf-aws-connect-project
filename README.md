## VoiceFoundry Mid-Level Development Interview Project

### Test phone number to use 
1 866-872-4191

### web app endpoint
http://marissainterviewprojects-last5callsappbucket0d978-1049v74uuj0m.s3-website-us-east-1.amazonaws.com


### This project contains 3 parts

1. CDK application at `marissa-interview-project`

    To deploy CDK app, 
    1. `aws configure`
    2. `cdk deploy`

    To tear down the CDK app,
    1. `cdk destroy`
    2. If there are still files in the S3 bucket, it will fail to destroy. Manually remove the files then re-destroy to get rid of the bucket. (would further automate this in real life)
    
    For additional info, see `./marissa-interview-project/README.md`

2. Contact Flow JSON - Exported Amazon Connect contact flow to be used in Amazon Connect instance with vanites lambda function from CDK app. This flow will accept incoming calls then pass along the calling phone number to vanities.js lambda function. The function returns the 5 best vanity options for the provided phone number. The contact flow will say these options to the caller before disconnecting.

    To use contact flow with an Amazon Connect Instance, do the following: 
    1. Create a new connect instance.
    2. From the AWS Connect console, choose the instance and navigate to Contact Flows section.
    3. In the AWS Lambda section, select the function starting with     `MarissaInterviewProjectSta-VanitiesHandler` and click Add Lambda Function.
    4. Navigate back to the Overview section & launch the Connect instance & login.
    5. Choose Routing > Contact Flows from left hand menu within your Connect instance.
    6. Click Create contact flow.
    7. In the upper right, choose Import Flow and select the `mainFlow` in `contactflow/`. 
    8. Click Import.
    9. Find the 3rd block in the flow, which invokes a Lambda. Click the title and change the selected lambda function to the one you added during step 3.
    10. Click Save in the Invoke Lambda dialogue.
    11. Click Save in the Contact Flow page, then click Publish.
    12. Navigate to Routing > Phone numbers from the left hand menu.
    13. Select a phone number to use with your contact flow (or add one first if you need to :-)).
    14. Select `mainFlow` as the Contact Flow from the dropdown.
    15. Click Save.
    16. Call in!

3. React app to display last 5 callers from `VanityNumbers` Dynamo table. 

    To deploy react web app, refer to `./last-five-calls-app/README.md`.


Writing and Documentation
1. Record your reasons for implementing the solution the way you did, struggles you faced and problems you overcame.

   I used the CDK framework for this project. I hadn't used it before but it seemed like a clean way to build the project and also was a learning opportunity to get exposed to AWS CDK. I like how this feels more like writing code than terraform code does.

   Struggles & problems I faced
    - Originally, my dynamo tables weren't destroying by CDK. I used the removalPolicy parameter to overcome this.
    - Getting dynamo table to sort by timestamp & return the last 5 callers was tricky. I used a GSI to overcome this and sort by timestamp. I had to add an additional status column with the same value for each entry in order to query the entire table by sorted timestamp. There could be some room for improvement in my Dynamo table design!
    - I ran into an issue with my cdk app unit test that had been passing starting to fail with an error "RangeError: Maximum call stack size exceeded". After some google research, I found out this was due to mismatched versions across cdk node modules. I updated my package.json to use consistent aws-cdk versioning and that fixed the problem.

2. What shortcuts did you take that would be a bad practice in production?

   - There were no high availability considerations taken. (multi region tables, etc)
   - I have a lack of test coverage across my project. Initial tests are included as well as testing frameworks but many more unit tests would be needed.
   - The react app has hardcoded values that change with cdk project deployment. As is, the 2 hard-coded values (hosting s3 bucket in deploy script and s3 static hosting endpoint) have to be updated and the react app has to be redeployed anytime the CDK app's stack is brought up and down.
   - The react app and Last 5 calls endpoints have no considerations for no/less than 5 calls in Dynamo table. This makes it not obvious to an end user why less than 5 or no calls show up in the table.
   - The web app doesn't have SSL set up.
   - The web app doesn't auto reload so if another call comes in while viewing, a user will have to refresh the page to see that change.

3. What would you have done with more time? We know you have a life. :-)

   - The best choices from all vanity options could be improved upon with more time. It would be nice to have my best options function select more pronouncible options. It is fun listening to the TTS attempt their pronunciations though.
   - I would have included additional unit test coverage. Both the react app and cdk app contain test suites of 1 passing test each. But this could be much further expanded on.
   - I would have added further error handling for cases like long execution times or bad input somewhere. During dev work on the best options function specifically, depending on how much I analyzed that array, the lambda could take longer than the timeout set. I imagine timeouts could come up as is as well and should be better handled.

4. BONUS - Please include an architecture diagram.

   - please find this at `diagram/`. 