import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8866/';
const API_URL = "https://sang-delivery.herokuapp.com/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'user/profile', { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
