/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer, { initalState } from '../topicReducer';
import * as constants from '../topicConstants';
import { topics, topicsFlattened } from './mockTopics';

test('reducers/topic initalState', () => {
  const nextState = reducer(undefined, { type: 'Noop' });

  expect(nextState).toEqual({
    all: {},
    topicIntroductions: {},
  });
});


test('reducers/topics handle set topics', () => {
  const nextState = reducer(initalState, {
    type: constants.SET_TOPICS,
    payload: {
      subjectId: 'urn:subject:1',
      topics,
    },
  });

  expect(nextState).toEqual({
    all: { 'urn:subject:1': topicsFlattened },
    topicIntroductions: {},
  });

  const nextNextState = reducer(nextState, {
    type: constants.SET_TOPICS,
    payload: {
      subjectId: 'urn:subject:2',
      topics: [],
    },
  });

  expect(nextNextState.all).toEqual({
    'urn:subject:1': topicsFlattened,
    'urn:subject:2': [],
  });
});

test('reducers/topics handle set topic introductions', () => {
  const nextState = reducer(initalState, {
    type: constants.SET_TOPIC_INTRODUCTIONS,
    payload: {
      articleIntroductions: [{ id: '1', intro: 'Test1' }, { id: '2', intro: 'Test2' }, { id: '3', intro: 'Test3' }],
      topics: [{ id: 'topicId1', contentUri: 'urn:article:1' }, { id: 'topicId2', contentUri: 'urn:article:3' }, { id: 'topicId3', contentUri: 'urn:image:3' }],
    },
  });

  expect(nextState.topicIntroductions).toEqual({
    topicId1: {
      id: '1',
      intro: 'Test1',
    },
    topicId2: {
      id: '3',
      intro: 'Test3',
    },
  });
});
