import axios from "axios";
import authHeader from './auth-header';
//const API_URL = "http://localhost:8866/";
const API_URL = "https://sang-delivery.herokuapp.com/";


class ImageService{
    postImage(fd){
        axios.post(API_URL + "image/upload", fd, { headers : authHeader()})
    };
    //     postImage(fd){
    //     httpCommon.post("/image/upload", fd)
    // };
}

export default new ImageService();