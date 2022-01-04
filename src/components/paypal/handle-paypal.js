import React, { useEffect, useState, useRef } from "react";
import paypalService from "../../services/paypal.service";
import Loading from "../loading/loading-component";
import {message} from 'antd';
import { useHistory } from "react-router-dom";

export default function HandlePaypal(props) {
    const val = useRef();

    useEffect(
        () => {
          val.current = props;
        },
        [props]
      );

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const paymentId = params.get('paymentId');
        const payerID = params.get('PayerID');

        paypalService.showPaymentResult(JSON.parse(localStorage.getItem("user")).id, paymentId, payerID).then(
            response => {
                if (response.data.data != "success"){
                    message.error("Thanh toán không thành công, vui lòng thử lại sau giây lát !");
                    setTimeout(() => {history.push("/payment");}, 1000);
                } else{
                    message.success("Thanh toán thành công !");
                    setTimeout(() => {history.push("/user/transaction");}, 1000);
                }
            }
        )

        return () => {
            window.location.reload();
          };
    }, []);

    const history = useHistory();

    return (
        <Loading />
    )
}