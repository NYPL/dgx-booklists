import path from 'path';
import compression from 'compression';
import express from 'express';
import colors from 'colors';

// React
import React from 'react';
import Iso from 'iso';
import alt from './src/app/alt.js';

// Import Router
import Router from 'react-router';
import routes from './src/app/routes/routes.jsx';

// Server Configurations
import appConfig from './appConfig.js';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';

import ApiRoutes from './src/server/ApiRoutes/routes.js';

// Import components
import Application from './src/app/components/Application/Application.jsx';

// URL configuration
const ROOT_PATH = __dirname;
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const WEBPACK_DEV_PORT = appConfig.webpackDevServerPort || 3000;

// Boolean flag that determines if we are running
// our application in Production Mode.
// Assigning as let variables, since they are mutable
let isProduction = process.env.NODE_ENV === 'production';
let serverPort = process.env.PORT || (isProduction ? 3001 : appConfig.port);
let refineryData;

/* Express Server Configuration
 * ----------------------------
 * - Using .EJS as the view engine
*/
let app = express();

app.use(compression());

// Disables the Server response from
// displaying Express as the server engine
app.disable('x-powered-by');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the path where to find EJS files
app.set('views', INDEX_PATH);

// Assign the proper path where the
// application's dist files are located.
app.use(express.static(DIST_PATH));

app.use('/', ApiRoutes);

// Match all routes to render the index page.
app.use((req, res) => {
  // bootstrap will stringify the data
  alt.bootstrap(JSON.stringify(res.locals.data || {}));

  let iso = new Iso();

  let router = Router.create({location: req.path, routes: routes});
  router.run((Handler, state) => {
    // App is the component we are going to render. It is determined by route handler
    var App = React.renderToString(React.createElement(Handler));
    // Inject the stringified data in to App
    iso.add(App, alt.flush());
    // The data we render by iso and pass to index.ejs
    return res.render('index', {
      App: iso.render(), 
      appTitle: appConfig.appName, 
      favicon: appConfig.favIconPath,
      isProduction: isProduction
    });
  });
});

// Start the server.
app.listen(serverPort, (err, result) => {
  if (err) {
    console.log(colors.red(err));
  }
  console.log(colors.yellow.underline(appConfig.appName));
  console.log(colors.green('Express server is listening at'), colors.cyan('localhost:' + serverPort));
});


/* Development Environment Configuration
 * -------------------------------------
 * - Using Webpack Dev Server
*/
if (!isProduction) {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    inline: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:3000');
  });
}
