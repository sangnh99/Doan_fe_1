import React, {useState, useEffect} from "react";
import { Button } from "antd";
import paypalService from "../../services/paypal.service";
import { useHistory} from 'react-router-dom';



export default function PaypalPage(props){

    const [redirectUrl, setRedirectUrl] = useState("");

    const history = useHistory();

    const handleOnClick = () => {
        paypalService.getLinkPaypal(120).then(
            response => {
                setRedirectUrl(response.data.data)
            }
        );
    }

    return(
        <div>
            <Button onClick={handleOnClick} >Test paypal</Button>
            <a href={redirectUrl} >{redirectUrl}</a>
        </div>
    )
}