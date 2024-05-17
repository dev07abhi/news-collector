// Action type

export const FETCH_NEWS_REQUEST = "FETCH_NEWS_REQUEST";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";
export const FETCH_NEWS_META = "FETCH_NEWS_META";

export const fetchNewsRequest = (params) => ({
  type: FETCH_NEWS_REQUEST,
  payload: params,
});

export const fetchNewsSuccess = (news) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: news,
});

export const fetchNewsFailure = (error) => ({
  type: FETCH_NEWS_FAILURE,
  payload: error,
});

export const fetchNewsMeta = (metaInfo) => ({
  type: FETCH_NEWS_META,
  payload: metaInfo,
});
