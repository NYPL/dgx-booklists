import React from 'react';
import Router from 'react-router';
import routes from '../app/routes/routes.jsx';

import Iso from 'iso';
import alt from '../app/alt.js';

import './styles/main.scss';

if (typeof window !== 'undefined') {
	window.onload = () => {
		// Render Isomorphically
	  Iso.bootstrap((state, meta, container) => {
	  	console.log('Application rendered Isomorphically.');

	    alt.bootstrap(state);
	    Router.run(routes, Router.HistoryLocation, (Handler) => {
        let node = React.createElement(Handler);
        React.render(node, container);
      });
	  });
	}
}
