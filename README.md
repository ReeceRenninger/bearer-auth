# LAB - Class 07

## Project: Bearer Auth

### Author: Reece

### Problem Domain

Build off our existing auth-server ability to create an account and handle basic authentication.  This server builds on that with utilizing tokens to re-authenticate users to shield routes that require a valid login.

### Links and Resources

  [PR for Lab Original Submission](https://github.com/ReeceRenninger/bearer-auth/pull/1)
  [GitHub Actions ci/cd](https://github.com/ReeceRenninger/bearer-auth)
  back-end server url (when applicable)
  
### Collaborators

-

### Setup

- PORT=your-choice
- DATABASE_URL=postgres://localhost:5432/db.name
- SECRET=your-secret-is-here

 ### How to initialize/run your application (where applicable)

    To start we need to init:config and then do a db:create to get your SQL DB created.  Once that is working you can run nodemon to get your server connected to your selected PORT from your env file.  From here you should be able to execute the routes on thunderclient to POST or GET depending on the route you have selected.

### How to use your library (where applicable)
Features / Routes

    Feature One: Details of feature
    GET : /users - grab all users from DB
    POST : /signup - generate a new user
    POST : /signin - signin in as an EXISTING user
    


### Tests

    npm test or npm test (fileName)

UML

![bearer-auth uml](./assets/bearer-auth-uml.png)