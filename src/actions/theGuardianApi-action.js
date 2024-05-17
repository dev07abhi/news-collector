// Action type

export const FETCH_THEGUARDIAN_NEWS_REQUEST = "FETCH_THEGUARDIAN_NEWS_REQUEST";
export const FETCH_THEGUARDIAN_NEWS_SUCCESS = "FETCH_THEGUARDIAN_NEWS_SUCCESS";
export const FETCH_THEGUARDIAN_NEWS_FAILURE = "FETCH_THEGUARDIAN_NEWS_FAILURE";
export const FETCH_THEGUARDIAN_NEWS_META = "FETCH_THEGUARDIAN_NEWS_META";

export const fetchNewsRequestTheGuardian = (params) => ({
  type: FETCH_THEGUARDIAN_NEWS_REQUEST,
  payload: params,
});

export const fetchNewsSuccessTheGuardian = (news) => ({
  type: FETCH_THEGUARDIAN_NEWS_SUCCESS,
  payload: news,
});

export const fetchNewsFailureTheGuardian = (error) => ({
  type: FETCH_THEGUARDIAN_NEWS_FAILURE,
  payload: error,
});

export const fetchNewsMetaTheGuardian = (metaInfo) => ({
  type: FETCH_THEGUARDIAN_NEWS_META,
  payload: metaInfo,
});
