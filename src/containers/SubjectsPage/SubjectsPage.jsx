/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { OneColumn } from 'ndla-ui';
import { SubjectLinkList } from '../../components';
import { injectSubjects } from '../SubjectPage/subjectHOCs';
import { injectT } from '../../i18n';

const SubjectsPage = ({ t, subjects }) => (
  <OneColumn>
    <h2>{t('subjectsPage.chooseSubject')}</h2>
    <SubjectLinkList subjects={subjects} />
  </OneColumn>
);

SubjectsPage.propTypes = {
  subjects: PropTypes.array.isRequired,
};

export default compose(
  injectT,
  injectSubjects,
)(SubjectsPage);