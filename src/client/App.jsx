import React from 'react';
import Iso from 'iso';
// Import Router
import Router from 'react-router';
import ga from 'react-ga';

import alt from '../app/alt.js';
import routes from '../app/routes/routes.jsx';

import './styles/main.scss';

if (typeof window !== 'undefined') {
	window.onload = () => {
    if (!window.ga) {
      console.log('Analytics not available - loading through React.');
      let gaOpts = { debug: true };
      ga.initialize('UA-1420324-122', gaOpts);
    }

		// Render Isomorphically
	  Iso.bootstrap(function (state, meta, container) {
	  	console.log('Application rendered Isomorphically.');
	    alt.bootstrap(state);

	    Router.run(routes, Router.HistoryLocation, function (Handler, routerState) {
        ga.pageview(routerState.pathname);
        var node = React.createElement(Handler);
        React.render(node, container);
      });
	  });
	}
}