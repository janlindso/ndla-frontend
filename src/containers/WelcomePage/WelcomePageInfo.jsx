/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { injectT } from 'ndla-i18n';

import { InfoWidget, FrontpageInfo } from 'ndla-ui';
import { EmailOutline, Facebook, Twitter } from 'ndla-icons/common';

const WelcomePageInfo = ({ t }) => (
  <FrontpageInfo>
    <InfoWidget
      heading={t('newsLetter.heading')}
      description={t('newsLetter.description')}
      mainLink={{
        name: t('newsLetter.mainLinkName'),
        to: 'http://om.ndla.no/nyhetsbrev/',
      }}
      iconLinks={[
        {
          icon: <EmailOutline />,
          name: t('newsLetter.iconLinkName'),
        },
      ]}
    />
    <InfoWidget
      heading={t('welcomePage.socialMedia.heading')}
      description={t('welcomePage.socialMedia.description')}
      mainLink={{
        name: t('welcomePage.socialMedia.mainLink.name'),
        to: 'https://www.facebook.com/ndla.no/',
      }}
      iconLinks={[
        {
          name: 'Facebook',
          to: 'https://www.facebook.com/ndla.no/',
          icon: <Facebook />,
        },
        {
          name: 'Twitter',
          to: 'https://twitter.com/ndla_no',
          icon: <Twitter />,
        },
      ]}
    />
    <InfoWidget
      heading={t('welcomePage.aboutNDLA.heading')}
      description={t('welcomePage.aboutNDLA.description')}
      mainLink={{
        name: t('welcomePage.aboutNDLA.mainLink.name'),
        to: 'https://om.ndla.no/',
      }}
    />
  </FrontpageInfo>
);

export default injectT(WelcomePageInfo);