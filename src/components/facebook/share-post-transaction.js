import React, { useState, useEffect } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { Button } from "antd";
import FacebookIcon from '@mui/icons-material/Facebook';

export default function SharePostTransaction(props) {

    // useEffect(() => {
    //     loadFbLoginApi();
    // }, [])

    // const loadFbLoginApi = () => {

    //     window.fbAsyncInit = function () {
    //         // Example: Standard initialization code:
    //         window.FB.init({
    //             appId: '2351310685011028',
    //             status: true,
    //             xfbml: true,
    //             version: 'v2.4' // or v2.0, v2.1, v2.2, v2.3
    //         });
    //         window.FB.XFBML.parse();
    //     };

    //     (function (d, s, id) {
    //         const fjs = d.getElementsByTagName(s)[0];
    //         if (d.getElementById(id)) {
    //             return;
    //         }
    //         const js = d.createElement(s); js.id = id;
    //         js.async = true;
    //         js.src = '//connect.facebook.net/vi_VN/sdk.js';
    //         fjs.parentNode.insertBefore(js, fjs);
    //     }(document, 'script', 'facebook-jssdk'));
    // }

    // const shareFb = () => {
    //     window.FB.ui({
    //         display: 'popup',
    //         method: 'share',
    //         href: 'https://www.sang-delivery-fe.herokuapp.com',
    //     }, function (response) {
    //         console.log("response :" + response);
    //     });

    // }
    return (
        <div style={{display : "inline", float : "right", marginLeft : 5}}>
            {/* <div className="fb-share-button" data-href="http://sang-delivery-fe.herokuapp.com/store/1" data-layout="button_count" data-size="small"><a target="_blank" href="https: //www.facebook.com/sharer.php?u=https:example.com?imageurl=https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" class="fb-xfbml-parse-ignore">Chia sẻ</a></div>
            <div>
                <button onClick={shareFb}>click aaaa</button>
            </div> */}
            <FacebookShareButton
                url={props.url}
                quote={props.quote}
                hashtag={"#SangOrder"}
                description={"aiueo"}
                className="Demo__some-network__share-button"
            >
            <Button><span style={{color : "#1890ff"}}>Chia sẻ</span></Button>
            </FacebookShareButton>
        </div>
    )
}