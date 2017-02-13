# NYPL Booklists

React Web App that renders the NYPL Booklists.

## Version
2.0.10

## Change Log

### v2.0.10
> Added HTTPS fix and the JavaScript fallback for log in button on the Header Component.

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