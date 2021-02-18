## PROJECT NOTES
- This react app currently relies on hard-coded api endpoint value. IRL this would be supplied via env variable or in another more reliable fashion.
- It can be deployed to S3 and accessed as a static site
- Caveats for this project
    - uses an endpoint that it expects `marissa-interview-project` cdk app to have deployed
    - deploying also uses an S3 bucket created by `marissa-interview-project` to hold the files
    - src/App.js `endpoint` value on line 33 must be manually updated to match output URL from cdk app
    - To run locally, run `npm start` after updating enpoint value
    - No CI/CD built for this react app
- To deploy this app, after the `marissa-interview-project` cdk app has been deployed to an AWS environment:
    1. update src/App.js `endpoint` value on line 33 to use if url has changed. 
    2. Also validate that the s3 bucket referenced in the package.json scripts/deploy command matches the currently deployed bucket name from the CDK app. 
    3. Then run `npm run build` to create the build artifacts folder 
    4. then `npm run deploy` to sync these to appropriate s3 bucket.
- To access this app, navigate to http://`appropriate-s3-bucket-name`.s3-website-us-east-1.amazonaws.com
    - In production or with more time, I would automate these steps further so that the deploy script and dynamo
    endpoints do not need to be manually updated should they change.
    

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Currently has 1 test implemented, but would include more in real life