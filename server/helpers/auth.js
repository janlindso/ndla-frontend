/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const fetch = require('node-fetch');

const url = `https://ndla.eu.auth0.com/oauth/token`;

const ndlaFrontendClientId = process.env.NDLA_FRONTEND_CLIENT_ID;
const ndlaFrontendClientSecret = process.env.NDLA_FRONTEND_CLIENT_SECRET;

export const getToken = () =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: `${ndlaFrontendClientId}`,
      client_secret: `${ndlaFrontendClientSecret}`,
      audience: 'ndla_system'
    }),
    json: true
  }).then(res => res.json());
