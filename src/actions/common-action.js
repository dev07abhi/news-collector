export const FETCH_NEWS_SOURCES = "FETCH_NEWS_SOURCES";
export const FETCH_NEWS_AUTHORS = "FETCH_NEWS_AUTHORS";
export const RESET_NEWS_DATA = "RESET_NEWS_DATA"


export const fetchSources = (sources) => ({
    type: FETCH_NEWS_SOURCES,
    payload: sources,
  });
  
  export const fetchAuthors = (authors) => ({
    type: FETCH_NEWS_AUTHORS,
    payload: authors,
  });

  export const resetNewsData = () => ({
    type: RESET_NEWS_DATA,
    payload: [],
  });