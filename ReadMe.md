# NYPL Booklists

React Web App that renders the NYPL Booklists.

## Version
2.0.11

## Change Log

### v2.0.11
> Updated the Header Component to v1.5.5. The update is to integrate the log in related functions with login server.

> Updated the Header Component to v1.5.4. The update is to integrate the log in related functions with beta-ouath server.

> Updated the Header Component to v1.5.3. The update is to remove console loggings for patron token expiration.

> Updated the Header Component to v1.5.2. The update is to turn off the feature flag of OAuth Login and set it as default.

### v2.0.10
> Updated the Header Component to v1.5.1. The update includes HTTPS fix and the JavaScript fallback for the log in button on the Header Component.

## Node Configuration
Pass in the following environment variables:  

* PORT={{portNumber}} // Desired port where the server will reside, defaults to ***3001***

*Ignore the curly braces, as it is only meant to help you see the assignments.*  

## Installation
To install all npm dependencies, run:
```sh
$ npm install
```

## Development
Passing in no NODE_ENV, defaults to using the development config.
```sh
$ npm start
```

## Production
To run the server in ***Production Mode***, use the following options:

1) Run a two part command that will build the assets and then fire up the server.

```sh
$ npm run build  (builds the assets to /dist path)
```

```sh
$ NODE_ENV=production npm run start  (starts the Node Server with proper environment) 
```

2) Run in a single command
```sh
$ NODE_ENV=production npm run build-start
```


License
----