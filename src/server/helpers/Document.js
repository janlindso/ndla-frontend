/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import ScriptLoader from '@ndla/polyfill/lib/ScriptLoader';
import { GoogleTagMangerScript, GoogleTagMangerNoScript } from './Gtm';
import config from '../../config';

const Document = ({ helmet, assets, css, data }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,700|Source+Serif+Pro:400,700"
        />
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        {config.gaTrackingId && (
          <script async src="https://www.google-analytics.com/analytics.js" />
        )}
        <GoogleTagMangerScript />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {assets.css && <link rel="stylesheet" href={assets.css} />}
        <link
          rel="shortcut icon"
          href="/static/ndla-favicon.png"
          type="image/x-icon"
        />
      </head>
      <body {...bodyAttrs}>
        <GoogleTagMangerNoScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            window.originalLocation = { originalLocation: document.location.protocol + '//' + document.location.hostname + document.location.pathname + document.location.search };
            window.dataLayer.push(window.originalLocation);`,
          }}
        />
        <div id="root">REPLACE_ME</div>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.DATA = ${serialize(data)}; `,
          }}
        />
        <ScriptLoader polyfill={assets.polyfill} scripts={assets.js} />
        {helmet.script.toComponent()}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.twttr = (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
              t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.async = true;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
            t._e = [];
            t.ready = function (f) {
              t._e.push(f);
            };
            return t;
          }(document, "script", "twitter-wjs")); `,
          }}
        />
      </body>
    </html>
  );
};

Document.propTypes = {
  helmet: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  css: PropTypes.string,
  assets: PropTypes.shape({
    css: PropTypes.string,
    js: PropTypes.array.isRequired,
  }).isRequired,
};

export default Document;
