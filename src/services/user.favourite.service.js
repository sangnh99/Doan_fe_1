import axios from 'axios';
import authHeader from './auth-header';
//const API_URL = 'http://localhost:8866/';
const API_URL = "https://sang-delivery.herokuapp.com/";

class UserFavouriteService {
  getListFavouriteItem(user_app_id) {
    return axios.get(API_URL + 'favourite/list-favourite/' + user_app_id, { headers: authHeader()});
  }

  addToFavourite(user_app_id, item_id, type){
    return axios.post(API_URL + 'favourite/add-to-favourite', {"user_app_id" : user_app_id, "item_id" : item_id, "type" : type}, {headers : authHeader()});
  }

  deleteFromFavourite(user_app_id, item_id, type){
    return axios.post(API_URL + 'favourite/delete-favourite', {"user_app_id" : user_app_id, "item_id" : item_id, "type" : type}, {headers : authHeader()});
  }

}
  
  export default new UserFavouriteService();