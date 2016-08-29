/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { take, call, put } from 'redux-saga/effects';
import * as constants from './articleConstants';
import * as actions from './articleActions';
import * as api from './articleApi';

function* fetchArticle(id) {
  try {
    const article = yield call(api.fetchArticle, id);
    yield put(actions.setArticle(article));
  } catch (error) {
    // TODO: handle error
    // yield put(actions.applicationError());
  }
}

function* watchFetchArticle() {
  while (true) {
    const { payload: id } = yield take(constants.FETCH_ARTICLE);
    yield call(fetchArticle, id);
  }
}

export default [
  watchFetchArticle,
];