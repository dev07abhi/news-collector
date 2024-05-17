// Action type

export const FETCH_NYTIMES_NEWS_REQUEST = "FETCH_NYTIMES_NEWS_REQUEST";
export const FETCH_NYTIMES_NEWS_SUCCESS = "FETCH_NYTIMES_NEWS_SUCCESS";
export const FETCH_NYTIMES_NEWS_FAILURE = "FETCH_NYTIMES_NEWS_FAILURE";
export const FETCH_NYTIMES_NEWS_META = "FETCH_NYTIMES_NEWS_META";

export const fetchNewsRequestNyTimes = (params) => ({
  type: FETCH_NYTIMES_NEWS_REQUEST,
  payload: params,
});

export const fetchNewsSuccessNyTimes = (news) => ({
  type: FETCH_NYTIMES_NEWS_SUCCESS,
  payload: news,
});

export const fetchNewsFailureNyTimes = (error) => ({
  type: FETCH_NYTIMES_NEWS_FAILURE,
  payload: error,
});

export const fetchNewsMetaNyTimes = (metaInfo) => ({
  type: FETCH_NYTIMES_NEWS_META,
  payload: metaInfo,
});
