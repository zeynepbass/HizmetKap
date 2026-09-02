import axios from "axios";

const API_BASE=process.env.NEXT_PUBLIC_BASE_URL
const apiClient = axios.create({

  baseURL:API_BASE,

  headers: {
    "Content-Type": "application/json",
  },

});


export default apiClient;