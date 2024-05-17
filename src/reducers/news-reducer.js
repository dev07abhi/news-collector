// newsReducer.js
import { FETCH_NEWS_SUCCESS, FETCH_NEWS_META } from "../actions/newsApi-action";
import {
  FETCH_NEWS_SOURCES,
  FETCH_NEWS_AUTHORS,
  RESET_NEWS_DATA,
} from "../actions/common-action";
import {
  FETCH_NYTIMES_NEWS_SUCCESS,
  FETCH_NYTIMES_NEWS_META,
} from "../actions/nyTimesApi-action";
import {
  FETCH_THEGUARDIAN_NEWS_SUCCESS,
  FETCH_THEGUARDIAN_NEWS_META,
} from "../actions/theGuardianApi-action";

const initialState = {
  news: [],
  newsNyTimes: [],
  newsTheGuardian: [],
  sources: [],
  authors: [],
  newsMeta: {},
  newsNyTimesMeta: {},
  newsTheGuardianMeta: {},
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        news: [...state.news, ...action.payload],
      };
    case FETCH_NYTIMES_NEWS_SUCCESS:
      return {
        ...state,
        news: [...state.news, ...action.payload],
      };
    case FETCH_THEGUARDIAN_NEWS_SUCCESS:
      return {
        ...state,
        news: [...state.news, ...action.payload],
      };
    case FETCH_NEWS_SOURCES:
      return {
        ...state,
        sources: [...state.sources, ...action.payload],
      };
    case FETCH_NEWS_AUTHORS:
      return {
        ...state,
        authors: [...state.authors, ...action.payload],
      };
    case FETCH_NEWS_META:
      return {
        ...state,
        newsMeta: action.payload,
      };
    case FETCH_NYTIMES_NEWS_META:
      return {
        ...state,
        newsNyTimesMeta: action.payload,
      };
    case FETCH_THEGUARDIAN_NEWS_META:
      return {
        ...state,
        newsTheGuardianMeta: action.payload,
      };
    case RESET_NEWS_DATA:
      return {
        ...state,
        news: action.payload,
      };
    default:
      return state;
  }
};

export default newsReducer;
