# README

**Node.js API Testing Guide for:**  a standard Node.js web API. Shows how to test an API that interacts with a database using all four CRUD operations (Create-Read-Update-Delete). 

**Stack:** JavaScript/Node.js, Express web framework, MongoDB NoSQL database, Mocha testing framework, and Chai assertion library.  

**Status:** Unfinished first draft. Not ready for use.

**Documentation:** https://www.techandstartup.com/guides/nodejs-api-testing

**Work in progress** folder contains notes for unresolved questions. 

**Run this app:**
To use this app you need to have either a local or cloud version of MongoDB. 
Then change the .env-example file name to just .env, and make sure the MONGODB_URI constant is set to the right URI of your database. If you have MongoDB running locally and have a database named my_test_db then it is set correctly.

Start a local MongoDB server from any window in your computer's terminal with the command:
mongod

To run the tests from the command line enter:
npm test

To exit the test environment enter CTRL+C.