// Polyfill Promise for legacy browsers
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { gaUtils, config } from 'dgx-react-ga';

import Iso from 'iso';
import alt from 'dgx-alt-center';

import routes from '../app/routes/routes.jsx';

import Widget from '../app/components/Widget/Widget.jsx';

import FeatureFlags from 'dgx-feature-flags';

import './styles/main.scss';

if (typeof window !== 'undefined') {
  window.onload = () => {
    if (!window.ga) {
      const isProd = process.env.NODE_ENV === 'production';
      const gaOpts = { debug: !isProd, titleCase: false };

      gaUtils.initialize(config.google.code(isProd), gaOpts);
    }

    if (!window.dgxFeatureFlags) {
      window.dgxFeatureFlags = FeatureFlags.utils;
    }

    // Render Isomorphically
    Iso.bootstrap((state, container) => {
      let node;

      console.log('Application rendered Isomorphically.');

      alt.bootstrap(state);

      if (window.widget === 'false') {
        const appHistory = useScroll(useRouterHistory(createBrowserHistory))();
        ReactDOM.render(
          <Router history={appHistory}>{routes.client}</Router>,
          container
        );
      } else {
        node = React.createElement(Widget);
        ReactDOM.render(node, container);
      }
    });
  };
}
