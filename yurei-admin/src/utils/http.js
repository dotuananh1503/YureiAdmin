import axios from 'axios'

const API = axios.create({
    baseURL: 'https://www.googleapis.com/blogger/v3/blogs/',
    timeout: 10000,
  });

export default API;