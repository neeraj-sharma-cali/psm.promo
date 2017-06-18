# PSM promo server 
This is the promotion images micro-service endpoint. It support HTTP GET only.

## Development Prerequisite:
1. Install Node.js 
2. check version : $node --version ^7.10.0
3. Clone the projects git repository

## Steps
4. cd into the project root. psm.promo
5. Install dependencies.
    * npm install
6. Run all tests
    * npm run test
7. Optionally run test with coverage
    * npm run test-coverage 

## Dependencies (for reference only. )
They can be found in package.json and are listed below
1. "body-parser": HTTP body parser
2. "express": Node.js web-framework. We only use it for HTTP handling and routing.
3. "lodash": A higher level functional toolkit/library for JavaScript.
4. "nconf": Hierarchical node.js configuration
5. "path": Interface to filesystem path
6. "rxjs": Reactive Extension library for Javascript. [Must Refer to Observables](http://reactivex.io/documentation/observable.html)
 
## Start Development Server
There are a few ways to start the server
1. node server/boot.js --MYSQL_HOST=mhost

2. nodemon server/boot.js --MYSQL_HOST=mhost

Consider using nodemon in development mode. 
This will allow you to make changes in real-time. The server restarts are handled by nodemon.

**A note:** 
When DB is integrated in this setup using a local Dockerized instance e.g. MySQL. The whole application development cycle is seamless.
The boot automatically picks up the new migration scripts and applies them and the app is in sync with the data with at auto-start. 
 
##Testing:
#### Warning.
Please ensure the Dev server is down to avoid port binding issues.

In development mode
* npm run test

and run test with coverage
* npm run test-coverage 

For other kinds of testing:
You can use Postman, Or the browser directly. Or even Curl, if you are technically inclined.
 
## Design notes
The entry point is server/boot.js, which 
1. first calls the db_migrator simulation to simulate DB upgrade.. The DB and app must be in sync and this avoids human errors.
2. The server starts on port 3000.

In terms of functional code and request handling, refer to server/domain/promos directory. The rest of the code is supporting code to boot etc. 
The different files are as follows
* **images.protocol.js** : The file with the input/output/error messages.
* **images.svc.js** : The service, where the business logic resides. Coordinates between route (HTTP) and DB.
* **images.routes.js** : The route to handle HTTP and pass to the service, streams respone back to the client.
* **images.repo.js** : The database related code. Queries etc. NOT DONE.
* **images.repo.mock.js** : A mock DB implementation with image data.

 **NOTE to Reviewer:** I chose node.js and reactive functional programming model with REST architecture. I love different technologies and am well versed with other programming paradigms and can be highly effective with them.
 
## Extensibility and Code Maintainability
Adding more functionality to this code is quite easy. You can 
* add more endpoints and it can scale easily.
* also add more verbs to the same endpoint.
* Add DB layers easily without touching other code. Manage risk of change.
* Add more functional logic in the right layers.
* To support new functionality if you need a third party library:
    * npm install <lib-x> --save

## Error Handling
There are different levels of error handling.
1. There are default error handlers to gracefully handle as follows:
    * Generic error handler for unidentified endpoints. Gives 404. Provides security.
    * Coding errors that slip the development net. Gives 500. Risk management. 
2. Then there is error handling for Functional and System errors also returning 500.

## Production: (above and beyond)
A Docker containerized instance is available and running on the cloud GCP at:
 http://35.186.190.133/api/promos/images
 
 example endpoint:
 http://35.186.190.133/api/promos/images?keywords=flowers&numImages=3

This is a Kubernetes based deployment on Google Container Engine. I will keep this running for a week. Please let me know if it is required for longer.
 
## What is not covered?
Business and Operational monitoring and detailed logging. In the interest of time, I have skipped this for now and it needs to be covered. 