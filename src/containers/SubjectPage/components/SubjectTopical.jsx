/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Image, SubjectArchive } from '@ndla/ui';
import { injectT } from '@ndla/i18n';
import { GraphQLResourceShape } from '../../../graphqlShapes';
import { toSubjects } from '../../../routeHelpers';
import SubjectPageFlexChild from './SubjectPageFlexChild';

const SubjectTopical = ({ topical, twoColumns, t }) => {
  if (!topical || !topical.resource || !topical.resource.meta) {
    return null;
  }
  const {
    resource: {
      meta: { metaImage, title, metaDescription },
      path,
    },
  } = topical;

  return (
    <SubjectPageFlexChild twoColumns={twoColumns}>
      <SubjectArchive
        featuringArticle={{
          media:
            metaImage && metaImage.url ? (
              <Image alt={metaImage.alt} src={metaImage.url} />
            ) : null,
          heading: title,
          description: metaDescription,
          url: toSubjects() + path,
        }}
        archiveArticles={[]}
        sectionHeading={t('subjectPage.subjectArchive.heading')}
        messages={{
          archive: t('subjectPage.subjectArchive.archive'),
          close: t('subjectPage.subjectArchive.close'),
        }}
      />
    </SubjectPageFlexChild>
  );
};

SubjectTopical.propTypes = {
  topical: GraphQLResourceShape,
  twoColumns: PropTypes.bool,
};

SubjectTopical.defaultProps = {
  twoColumns: false,
};

export default injectT(SubjectTopical);
