import React from 'react';
import Router from 'react-router';
import ga from 'react-ga';

import Iso from 'iso';
import alt from '../app/alt.js';

import routes from '../app/routes/routes.jsx';

import Widget from '../app/components/Widget/Widget.jsx';

import './styles/main.scss';

if (typeof window !== 'undefined') {
	window.onload = () => {
    if (!window.ga) {
      console.log('Analytics not available - loading through React.');
      let gaOpts = { debug: false };
      ga.initialize('UA-1420324-122', gaOpts);
    }

		// Render Isomorphically
	  Iso.bootstrap((state, meta, container) => {
      let node;

	  	console.log('Application rendered Isomorphically.');

	    alt.bootstrap(state);

      if (window.widget === 'false') {
  	    Router.run(routes.client, Router.HistoryLocation, (Handler, routerState) => {
          node = React.createElement(Handler);

          ga.pageview(routerState.pathname);
          React.render(node, container);
        });
      } else {
        node = React.createElement(Widget);
        React.render(node, container);
      }
	  });
	}
}
