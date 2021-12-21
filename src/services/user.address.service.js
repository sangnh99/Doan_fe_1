import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8866/';
//const API_URL = "https://sang-delivery.herokuapp.com/";

class UserAddressService {
  getListAddressOfUser(user_app_id) {
    return axios.get(API_URL + 'address/' + user_app_id + "/get-address", { headers: authHeader()});
  }
  setActiveAddress(user_app_id, address_id){
    return axios.post(API_URL + 'address/' + user_app_id + "/active-address", {"address_id" : address_id}, {headers : authHeader()});
  }
  deleteAddress(user_app_id, address_id){
    return axios.post(API_URL + 'address/' + user_app_id + "/delete-address", {"address_id" : address_id}, {headers : authHeader()});
  }
}
  
  export default new UserAddressService();