// api.js
import axios from "axios";

const API_URL =
  "https://content.guardianapis.com/search?api-key=b77a4947-2631-4831-8aa3-5cfb14e181b6&show-fields=thumbnail&show-fields=all";

const fetchNewsTheGuardian = async (params) => {
  let endpoint = API_URL;
  if (params?.Category) {
    endpoint = `${API_URL}&section=${params?.Category}`;
  }
  if (params?.Keyword) {
    endpoint = `${endpoint}&q=${params?.Keyword}`;
  }

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  fetchNewsTheGuardian,
};
