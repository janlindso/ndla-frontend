/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Content, Masthead, MastheadItem, Logo } from '@ndla/ui';
import { Trans } from '@ndla/i18n';
import { DefaultErrorMessage } from '../../components/DefaultErrorMessage';
import Page from '../Page/Page';

const ErrorPage = ({ locale }) => (
  <Page locale={locale}>
    <Content>
      <Masthead showLoaderWhenNeeded={false} fixed>
        <MastheadItem right>
          <Trans>
            {({ t }) => (
              <Logo to="/" locale={locale} label={t('logo.altText')} />
            )}
          </Trans>
        </MastheadItem>
      </Masthead>
      <DefaultErrorMessage />
    </Content>
  </Page>
);

ErrorPage.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default ErrorPage;
