import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8866/';
//const API_URL = "https://sang-delivery.herokuapp.com/";

class PaypalService {
  getLinkPaypal(total_price) {
    return axios.post(API_URL + 'paypal/pay' , {"total_price" : total_price}, { headers: authHeader()});
  }
  showPaymentResult(user_app_id, paymentId, PayerID){
    return axios.get(API_URL + 'paypal/show-payment-result', {params : {user_app_id: user_app_id, paymentId : paymentId, PayerID : PayerID}, headers : authHeader()});
  }
}
  
  export default new PaypalService();