// newsSaga.js
import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  FETCH_NEWS_REQUEST,
  fetchNewsSuccess,
  fetchNewsFailure,
  fetchNewsMeta,
} from "../actions/newsApi-action";
import {
  FETCH_NYTIMES_NEWS_REQUEST,
  fetchNewsSuccessNyTimes,
  fetchNewsFailureNyTimes,
  fetchNewsMetaNyTimes,
} from "../actions/nyTimesApi-action";
import {
  FETCH_THEGUARDIAN_NEWS_REQUEST,
  fetchNewsSuccessTheGuardian,
  fetchNewsFailureTheGuardian,
  fetchNewsMetaTheGuardian,
} from "../actions/theGuardianApi-action";
import { fetchSources, fetchAuthors } from "../actions/common-action";
import api from "../apis/newsApi-news-api";
import api2 from "../apis/nyTimes-news-api";
import api3 from "../apis/theGuardianApi-news-api";

import sagaHelper from "./saga-helper/newsPaser";

function* fetchNews(action) {
  const { payload } = action;
  try {
    const news = yield call(api.fetchNews, payload);
    const { TransformedList, Sources, Authors, MetaInfo } =
      sagaHelper.newsOrgParser(news);
    if (payload.Authors.length > 0 && payload.Sources.length === 0) {
      const TransformedListbyAuthors = TransformedList.filter((tf) =>
        payload.Authors.includes(tf?.Author)
      );
      yield put(fetchNewsSuccess(TransformedListbyAuthors));
    } else if (payload.Sources.length > 0 && payload.Authors.length === 0) {
      const TransformedListbySources = TransformedList.filter((tf) =>
        payload.Sources.includes(tf?.Source)
      );
      yield put(fetchNewsSuccess(TransformedListbySources));
    } else if (payload.Authors.length > 0 && payload.Sources.length > 0) {
      const TransformedListbySourcesAndAuthor = TransformedList.filter(
        (tf) =>
          payload.Sources.includes(tf?.Source) &&
          payload.Authors.includes(tf?.Author)
      );
      yield put(fetchNewsSuccess(TransformedListbySourcesAndAuthor));
    } else {
      yield put(fetchNewsSuccess(TransformedList));
    }

    yield put(fetchSources(Sources));
    yield put(fetchAuthors(Authors));
    yield put(fetchNewsMeta(MetaInfo));
  } catch (error) {
    yield put(fetchNewsFailure(error));
  }
}

function* fetchNewsNyTimes(action) {
  const { payload } = action;
  try {
    const news = yield call(api2.fetchNewsNyTimes, payload);
    const { TransformedList, Sources, Authors, MetaInfo } =
      sagaHelper.nyTimesParser(news);

    if (payload.Authors.length > 0 && payload.Sources.length === 0) {
      const TransformedListbyAuthors = TransformedList.filter((tf) =>
        payload.Authors.includes(tf?.Author)
      );
      yield put(fetchNewsSuccessNyTimes(TransformedListbyAuthors));
    } else if (payload.Sources.length > 0 && payload.Authors.length === 0) {
      const TransformedListbySources = TransformedList.filter((tf) =>
        payload.Sources.includes(tf?.Source)
      );
      yield put(fetchNewsSuccessNyTimes(TransformedListbySources));
    } else if (payload.Authors.length > 0 && payload.Sources.length > 0) {
      const TransformedListbySourcesAndAuthor = TransformedList.filter(
        (tf) =>
          payload.Sources.includes(tf?.Source) &&
          payload.Authors.includes(tf?.Author)
      );
      yield put(fetchNewsSuccessNyTimes(TransformedListbySourcesAndAuthor));
    } else {
      yield put(fetchNewsSuccessNyTimes(TransformedList));
    }

    yield put(fetchSources(Sources));
    yield put(fetchAuthors(Authors));
    yield put(fetchNewsMetaNyTimes(MetaInfo));
  } catch (error) {
    yield put(fetchNewsFailureNyTimes(error));
  }
}

function* fetchNewsTheGuardian(action) {
  const { payload } = action;
  try {
    const news = yield call(api3.fetchNewsTheGuardian, payload);
    const { TransformedList, MetaInfo } = sagaHelper.theGuardianParser(news);

    if (payload.Authors.length > 0 && payload.Sources.length === 0) {
      const TransformedListbyAuthors = TransformedList.filter((tf) =>
        payload.Authors.includes(tf?.Author)
      );
      yield put(fetchNewsSuccessTheGuardian(TransformedListbyAuthors));
    } else if (payload.Sources.length > 0 && payload.Authors.length === 0) {
      const TransformedListbySources = TransformedList.filter((tf) =>
        payload.Sources.includes(tf?.Source)
      );
      yield put(fetchNewsSuccessTheGuardian(TransformedListbySources));
    } else if (payload.Authors.length > 0 && payload.Sources.length > 0) {
      const TransformedListbySourcesAndAuthor = TransformedList.filter(
        (tf) =>
          payload.Sources.includes(tf?.Source) &&
          payload.Authors.includes(tf?.Author)
      );
      yield put(fetchNewsSuccessTheGuardian(TransformedListbySourcesAndAuthor));
    } else {
      yield put(fetchNewsSuccessTheGuardian(TransformedList));
    }
    yield put(fetchNewsMetaTheGuardian(MetaInfo));
  } catch (error) {
    yield put(fetchNewsFailureTheGuardian(error));
  }
}

function* newsSaga() {
  yield all([
    takeLatest(FETCH_NEWS_REQUEST, fetchNews),
    takeLatest(FETCH_NYTIMES_NEWS_REQUEST, fetchNewsNyTimes),
    takeLatest(FETCH_THEGUARDIAN_NEWS_REQUEST, fetchNewsTheGuardian),
  ]);
}

export default newsSaga;
