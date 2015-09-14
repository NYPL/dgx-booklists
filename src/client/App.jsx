import React from 'react';
import Iso from 'iso';
import alt from '../app/alt.js';
// Import Router
import Router from 'react-router';
import routes from '../app/routes/routes.jsx';

import './styles/main.scss';

if (typeof window !== 'undefined') {
	window.onload = () => {
		// Render Isomorphically
	  Iso.bootstrap(function (state, meta, container) {
	  	console.log('Application rendered Isomorphically.');
	    alt.bootstrap(state);
	    Router.run(routes, Router.HistoryLocation, function (Handler) {
        var node = React.createElement(Handler);
        React.render(node, container);
      });
	  });
	}
}