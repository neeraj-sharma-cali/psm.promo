# PSM promo server 
This is the promotion images micro-service endpoint. It support HTTP GET only.

## Development Prerequisite:
1. Install Node.js 
2. Check version : $node --version 
    * should be ^7.10.0
3. Clone the projects git repository
    * project-root$ git clone https://github.com/neeraj-sharma-cali/psm.promo.git

## Steps
4. cd into the project-root/psm.promo
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

#### Notes:
1. --MYSQL might be misleading. It is there only for illustrative purposes. This project does not use a DB. 
2. Consider using nodemon in development mode. 
This will allow you to make changes in real-time. The server restarts are handled by nodemon.

**A note:** 
When DB is integrated in this setup using a local Dockerized instance e.g. MySQL. The whole application development cycle is seamless.
The boot automatically picks up the new migration scripts and applies them and the app is in sync with the data upon auto-start. 
 
## Test:
#### Warning.
Please ensure the Dev server is down to avoid port binding issues.

In development mode
* npm run test

and run test with coverage
* npm run test-coverage 

#### Some Other Ways to Test:
This is an HTTP app. You can also use Postman/Browser/Curl/HTTPie or anything similar.

#### And what about Test Data:
The server has 10 image items between the 3 keywords 'desert', 'flowers' and 'blue'. You can look at **images.repo.mock.js** for this data and how it is returned.
 
 
## Design notes

For functional code and request handling, refer to server/domain/promos directory. The rest of the code is supporting code to boot, DB related etc. 
The different files are as follows
* **images.protocol.js** : The file with the input/output/error messages.
* **images.svc.js** : The service, where the business logic resides. Coordinates between route (HTTP) and DB.
* **images.routes.js** : The route to handle HTTP and pass to the service, streams respone back to the client.
* **images.repo.js** : The database related code. Queries etc. NOT DONE.
* **images.repo.mock.js** : A mock DB implementation with image data.

If you want to review other related code, the entry point is server/boot.js, which: 
1. first boots db proxy simulation, which simulates DB init and DB upgrade. This keeps app and DB in sync.
3. The server starts on port 3000.
 
## Extensibility and Code Maintainability
Adding more functionality to this code is quite easy. You can 
* Add more endpoints. server/domain/... 
* Add more verbs to the same endpoint. server/domain/promos/images.route.js
* Add DB layers easily without touching other code. Manage risk of change.
* Add functional logic in the right layers.
* To support new functionality if you need a third party library:
    * npm install **lib-x** --save

## Error Handling
There are different levels of error handling.
1. Graceful error handling through default handlers. server/app.js
    * Generic error handler for unidentified endpoints. Gives 404 HTTP status. Provides security.
    * Coding errors that slip the development net. Gives 500 HTTP status. Risk management. 
2. Then there is Functional and System error handling. Returns 500 with more details in the message.

## Production: (above and beyond)
A Docker containerized instance is available and running on the cloud GCP at:
 http://35.186.190.133/api/promos/images
 
 example endpoint:
 http://35.186.190.133/api/promos/images?keywords=flowers&numImages=3

This is a Kubernetes based deployment on Google Container Engine. I will keep this running for a week. Please let me know if it is required for longer.
 
## What is not covered?
Business and Operational monitoring and detailed logging. In the interest of time, I have skipped this for now. 