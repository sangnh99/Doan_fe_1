import axios from "axios";
import authHeader from './auth-header';
//const API_URL = "http://localhost:8866/";
const API_URL = "https://sang-delivery.herokuapp.com/";

class FoodService {
    getFoodByFoodType(food_type, offset, limit, column_sort, type_sort, search_value){
        return axios.get(API_URL + "food/" + food_type, {params : { offset: offset, limit: limit, column_sort: column_sort, type_sort: type_sort, search_value: search_value}, headers : authHeader()});
    }

    getFoodDetail(id){
        return axios.get(API_URL + "food/" +id + "/detail", { headers : authHeader()});
    }
    updateVoteForFood(rating_id, vote){
        return axios.post(API_URL + "food/vote", { "rating_id" : rating_id, "vote" : vote}, { headers : authHeader()});
    }
}
export default new FoodService();