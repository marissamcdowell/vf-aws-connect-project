Marissa's VoiceFoundry Mid-Level Development Interview Project

Active stack web app endpoint
http://marissainterviewprojects-last5callsappbucket0d978-1049v74uuj0m.s3-website-us-east-1.amazonaws.com

Test phone number to use: 1 866-872-4191


This project contains 3 parts

1. CDK application at `marissa-interview-project` that includes 
        - 2 lambda functions
        - 1 dynamo table
        - API gateway endpoint
        - s3 bucket for hosting react app

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

   struggles / problems
      -- Getting dynamo tables to destroy by CDK. Used removalPolicy to overcome.
      -- Getting dynamo table to sort by last 5. Used a GSI to overcome.

2. What shortcuts did you take that would be a bad practice in production?

   -- no high availability considerations (multi region tables, etc)
   -- lack of test coverage
   -- React app has hardcoded values that change with cdk project deployment.
   -- React app and Last 5 calls endpoints have no considerations for no/less than 5 calls in Dynamo table.
   -- web app doesn't have SSL set up

3. What would you have done with more time? We know you have a life. :-)

   -- the best choices from all vanity options could be improved upon with more time.
   -- additional test coverage
   -- further error handling

4. BONUS - Please include an architecture diagram.

   -- please find this at `diagram/`. 