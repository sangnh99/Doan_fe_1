import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:8866/food/";

class FoodService {
    getFoodByFoodType(food_type, offset, limit, column_sort, type_sort, search_value){
        return axios.get(API_URL + food_type, {params : { offset: offset, limit: limit, column_sort: column_sort, type_sort: type_sort, search_value: search_value}, headers : authHeader()});
    }
}
export default new FoodService();