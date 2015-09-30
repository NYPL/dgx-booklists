import React from 'react';
import Router from 'react-router';
import ga from 'react-ga';

import Iso from 'iso';
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
	  Iso.bootstrap((state, meta, container) => {
	  	console.log('Application rendered Isomorphically.');

	    alt.bootstrap(state);
	    Router.run(routes, Router.HistoryLocation, (Handler, routerState) => {
        let node = React.createElement(Handler);
        
        ga.pageview(routerState.pathname);
        React.render(node, container);
      });
	  });
	}
}
