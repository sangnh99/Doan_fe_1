import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:8866/";
//const API_URL = "https://sang-delivery.herokuapp.com/";

class FoodService {
    getFoodByFoodType(food_type, offset, limit, column_sort, type_sort, search_value){
        return axios.get(API_URL + "food/" + food_type, {params : { offset: offset, limit: limit, column_sort: column_sort, type_sort: type_sort, search_value: search_value}, headers : authHeader()});
    }

    // getFoodDetail(id){
    //     return axios.get(API_URL + "food/" +id + "/detail", { headers : authHeader()});
    // }
    getFoodDetail(id){
        return axios.get(API_URL + "food/" +id + "/detail",  {params : {user_app_id: JSON.parse(localStorage.getItem("user")).id}, headers : authHeader()});
    }
    updateVoteForFood(rating_id, vote){
        return axios.post(API_URL + "food/vote", { "rating_id" : rating_id, "vote" : vote}, { headers : authHeader()});
    }
    getAllFoodOfStoreByFoodId(food_id){
        return axios.get(API_URL + "food/" + food_id +"/store", { headers : authHeader()});
    }
    getAllByValueSearch(value_search, type_search, offset){
        return axios.get(API_URL + "food/search", {params : { value_search : value_search, type_search : type_search, offset: offset}, headers : authHeader()});
    }
}
export default new FoodService();