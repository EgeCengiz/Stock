
const API_BASE_URL = "http://localhost:3000";



const Api = {
  API_BASE_URL,


  ENDPOINTS: {
    POST_LOGIN: `${API_BASE_URL}/auth/login`,
    GET_ALL_PRODUCT: `${API_BASE_URL}/products`,

  },
};

export default Api;