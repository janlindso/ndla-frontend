/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import defined from 'defined';
import groupBy from 'lodash/groupBy';
import { getArticle } from '../ArticlePage/articleSelectors';
import { introductionI18N } from '../../util/i18nFieldFinder';
import { getLocale } from '../Locale/localeSelectors';


const getTopicsFromState = state => state.topics;

export const getTopicIntroductions = createSelector(
    [getTopicsFromState],
    topics => topics.topicIntroductions,
);

export const hasFetchedTopicsBySubjectId = subjectId => createSelector(
  [getTopicsFromState],
  topics => topics.all[subjectId] !== undefined,
);

export const getTopicsBySubjectId = subjectId => createSelector(
  [getTopicsFromState],
  topics => defined(topics.all[subjectId], []),
);

export const getTopic = (subjectId, topicId = undefined) => createSelector(
  [getTopicsBySubjectId(subjectId)],
  topics => topics.find(topic => topicId === topic.id),
);

export const getTopicArticle = (subjectId, topicId) => createSelector(
  [getTopic(subjectId, topicId), state => state],
  (topic, state) => (topic && topic.contentUri ? getArticle(topic.contentUri.replace('urn:article:', ''))(state) : undefined),
);

export const getSubtopics = (subjectId, topicId) => createSelector(
  [getTopicsBySubjectId(subjectId)],
  topics => topics.filter(topic => topicId === topic.parentId),
);

export const getSubjectMenu = subjectId => createSelector(
  [getTopicsBySubjectId(subjectId)],
  (topics) => {
    const groupedSubtopicsByParent = groupBy(topics.filter(topic => topic.parentId), 'parentId');

    const toMenu = (topic) => {
      const subtopics = defined(groupedSubtopicsByParent[topic.id], []);

      const subtopicsWithSubtopics = subtopics.map(child => toMenu(child));

      return { ...topic, subtopics: subtopicsWithSubtopics };
    };

    return topics.filter(t => !t.parentId).map(root => toMenu(root));
  },
);

export const getSubtopicsWithIntroduction = (subjectId, topicId) => createSelector(
  [getSubtopics(subjectId, topicId), getTopicIntroductions, getLocale],
  (topics, topicIntroductions, locale) => topics.map((topic) => {
    if (topic && topicIntroductions) {
      const topicIntroduction = topicIntroductions[topic.id];
      const introduction = topicIntroduction ? introductionI18N(topicIntroduction, locale, true) : undefined;
      return { ...topic, introduction };
    }
    return topic;
  }),
);
