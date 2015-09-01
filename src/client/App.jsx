import React from 'react';
import Iso from 'iso';
import alt from '../app/alt.js';
import Booklists from '../app/components/Booklists/Booklists.jsx';
import Ownerlists from '../app/components/Ownerlists/Ownerlists.jsx';

import './styles/main.scss';

if (typeof window !== 'undefined') {

	let isRenderedByServer = false;

	window.onload = () => {
		// Render Isomorphically
	  Iso.bootstrap(function (state, meta, container) {
	  	console.log('Application rendered Isomorphically.');
	    alt.bootstrap(state);
	    React.render(React.createElement(Ownerlists), container);
	    isRenderedByServer = true;
	  });

	  // Render Client Side Only, attached to ID
	  if (!isRenderedByServer) {
	  	console.log('Application rendered via Client');
	  	React.render(React.createElement(Booklists), document.getElementById('Booklists'));
	  }
	}
}
