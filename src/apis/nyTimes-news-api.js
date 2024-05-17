// api.js
import axios from "axios";

const API_URL =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=DCFUl6PSG47F2Pv7A9sa4aMGvs2LA97J";

const fetchNewsNyTimes = async (params) => {
  let endpoint = API_URL;
  if (params?.Category) {
    const supporter = `news_desk:(${params?.Category})`;
    endpoint = `${API_URL}&fq=${encodeURI(supporter)}`;
  }
  if (params?.Keyword) {
    endpoint = `${endpoint}&q=${params?.Keyword}`;
  }
  if (params?.Sources && params?.Sources?.length > 0) {
    const supporter1 = `source:(${params?.Sources.join()})`;
    if (params?.Category) {
      const supporter2 = `news_desk:(${
        params?.Category
      }) OR source:(${params?.Sources.join()})`;

      endpoint = `${API_URL}&fq=${encodeURI(supporter2)}`;
    } else {
      endpoint = `${API_URL}&fq=${encodeURI(supporter1)}`;
    }
    if (params?.Keyword) {
      endpoint = `${endpoint}&q=${params?.Keyword}`;
    }
  }
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
    fetchNewsNyTimes,
};
