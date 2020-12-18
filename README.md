# NYPL Booklists

React Web App that renders the NYPL Booklists discoverable at https://nypl.org/books-music-dvds/recommendations. Note that most of that section is powered by Drupal. This app serves [select endpoints](https://docs.google.com/spreadsheets/d/18wBJD7clMATm7tQYZrCGKlMjPYfHXonTDbuJ9gFevbk/edit#gid=0). (Note you'll need to swap '-movies' for '-dvds' in all those URLs.) A few examples from that sheet:

* /books-music-dvds/recommendations/lists/nypl_bronx_library_ctr
* /books-music-dvds/recommendations/lists/nypl_selection
* /books-music-dvds/recommendations/lists/asknypl

## Version
> v2.2.18

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
$ npm run dist # (builds the assets to /dist path)
```

```sh
$ NODE_ENV=production npm run start # (starts the Node Server with proper environment)
```

2) Run in a single command
```sh
$ NODE_ENV=production npm run eb-start
```

## Contributing

 * Cut feature branches from `development`
 * Create PR against `development`
 * Merge `development` > `qa` > `master` (production)
