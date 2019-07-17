import axios from 'axios';
import API_BASE_PATH from './url';

export default axios.create({
  baseURL: API_BASE_PATH
});
