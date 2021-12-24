import axios from "axios";
import authHeader from './auth-header';
//const API_URL = "http://localhost:8866/";
const API_URL = "https://sang-delivery.herokuapp.com/";


class StoreService{
    async getStoreDetail(store_id){
        return axios.get(API_URL + "store/" + store_id, {params : {user_app_id: JSON.parse(localStorage.getItem("user")).id}, headers : authHeader()});
    };
}

export default new StoreService();