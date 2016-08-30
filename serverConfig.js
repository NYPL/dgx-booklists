import path from 'path';
import fs from 'fs';
import compression from 'compression';
import express from 'express';
import colors from 'colors';

// React
import React from 'react';
import Iso from 'iso';
import alt from 'dgx-alt-center';

// Import Router
import { Router, match, RouterContext } from 'react-router';
import ReactDOMServer from 'react-dom/server';
import appRoutes from './src/app/routes/routes.jsx';
import DocMeta from 'react-doc-meta';

// Server Configurations
import appConfig from './appConfig.js';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';

import ApiRoutes from './src/server/ApiRoutes/routes.js';
import WidgetRoutes from './src/server/ApiRoutes/widgetRoutes.js';

// Import components
import Application from './src/app/components/Application/Application.jsx';
import Widget from './src/app/components/Widget/Widget.jsx';

// URL configuration
const ROOT_PATH = __dirname;
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const WEBPACK_DEV_PORT = appConfig.webpackDevServerPort || 3000;

// Boolean flag that determines if we are running
// our application in Production Mode.
const isProduction = process.env.NODE_ENV === 'production';
const serverPort = process.env.PORT || (isProduction ? 3001 : appConfig.port);
const buildAssets = (isProduction) ?
  JSON.parse(fs.readFileSync(path.join(DIST_PATH, 'assets.json'))) : '';

/* Express Server Configuration
 * ----------------------------
 * - Using .EJS as the view engine
*/
const app = express();

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
app.use('*/dist', express.static(DIST_PATH));
// app.use(express.static(DIST_PATH));

// Assign the path for static client files
app.use('*/src/client', express.static(INDEX_PATH));

app.use('/widget', WidgetRoutes);

// Match all routes to render the index page.
app.use('/widget', (req, res) => {
  let iso = new Iso(),
    App = ReactDOMServer.renderToString(<Widget />);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  // bootstrap will stringify the data
  alt.bootstrap(JSON.stringify(res.locals.data || {}));

  // Inject the stringified data in to App
  iso.add(App, alt.flush());

  // The data we render by iso and pass to index.ejs
  res.render('index', {
    App: iso.render(),
    appTitle: appConfig.appName,
    favicon: appConfig.favIconPath,
    isProduction: isProduction,
    assets: buildAssets,
    metatags: [],
    appEnv: process.env.APP_ENV || 'no APP_ENV',
    widget: 'true',
    apiUrl: res.locals.data.completeApiUrl
  });
});


app.use('/', (req, res, next) => {
  if (req.path === '/browse/recommendations/lists') {
    return res.redirect('/browse/recommendations/lists/');
  }
  next();
});

app.use('/', ApiRoutes);

app.use('/', (req, res) => {
  let iso;

  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  iso = new Iso();

  const blogAppUrl = (req.url).indexOf('browse/recommendations/lists') !== -1;
  const routes = blogAppUrl ? appRoutes.client : appRoutes.server;

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const html = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
      const metaTags = DocMeta.rewind();
      const renderedTags = metaTags.map((tag, index) =>
        ReactDOMServer.renderToString(<meta data-doc-meta="true" key={index} {...tag} />));
      iso.add(html, alt.flush());

      res
        .status(200)
        .render('index', {
          apiUrl: res.locals.data.completeApiUrl,
          App: iso.render(),
          appTitle: appConfig.appTitle,
          favicon: appConfig.favIconPath,
          isProduction: isProduction,
          assets: buildAssets,
          metatags: renderedTags,
          appEnv: process.env.APP_ENV || 'no APP_ENV',
          path: req.path,
          webpackPort: WEBPACK_DEV_PORT,
          endpoint: res.locals.data.endpoint,
          widget: false
        });
    } else {
      res.status(404).send('Not found')
    }
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
  }).listen(WEBPACK_DEV_PORT, 'localhost', (err, result) => {
    if (err) {
      console.log(colors.red(err));
    }
    console.log(colors.magenta('Webpack Dev Server listening at'), colors.cyan('localhost' + WEBPACK_DEV_PORT));
  });
}
