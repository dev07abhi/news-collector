// api.js
import axios from "axios";

const API_URL = "https://newsapi.org/v2/top-headlines?country=us&pageSize=10";

const fetchNews = async (params) => {
  let endpoint = API_URL;
  if (params?.Category) {
    endpoint = `${API_URL}&category=${params?.Category}`;
  }
  if (params?.Keyword) {
    endpoint = `${endpoint}&q=${params?.Keyword}`;
  }
  if (params?.Sources && params?.Sources?.length > 0) {
    endpoint = `${endpoint}&sources=${params?.Sources.join()}`;
  }
  try {
    const response = await axios.get(endpoint, {
      headers: {
        "X-Api-Key": "4fb6cd8709ad4f508cea09efff00efbc",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  fetchNews,
};
