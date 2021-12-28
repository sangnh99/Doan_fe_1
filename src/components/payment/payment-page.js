import React, { useState, useRef, useEffect } from 'react';
import './payment.css';
import { Divider, InputNumber, Badge, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart-context';
import Loading from '../loading/loading-component';
import userAddressService from "../../services/user.address.service";
import { PlusOutlined } from '@ant-design/icons';
import { width } from '@mui/system';

export default function PaymentPage(props) {
    const [activeAddress, setActiveAddress] = useState(null);
    const [foodPrice, setFoodPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItemsCopy, setCartItemsCopy] = useState([]);
    const [visibleConfirm, setVisibleConfirm] = useState(false);

    useEffect(() => {
        userAddressService.getActiveAddress(JSON.parse(localStorage.getItem("user")).id).then(
            response => {
                setActiveAddress(response.data.data);
            }
        )
    }, []);

    const handlePayment = (listCart) => {
        setCartItemsCopy(listCart);
        const total = listCart.reduce((tota, item) => {
            return parseInt(tota + item.amount * item.price)
        }, parseInt(listCart[0].distance * 7) * 1000);
        setTotalPrice(total);
    }

    const handleOk = () => {
        setVisibleConfirm(false);
    }

    const handleCancel = () => {
        setVisibleConfirm(false);
    }

    return (
        <CartContext.Consumer>
            {
                ({ amount, cartItems, addToCart }) =>

                    activeAddress != null ? (

                        <div className="container">
                            <a href='/user/favourite' >hello</a>

                            <Modal title="Tạo giỏ hàng mới ?" visible={visibleConfirm} onOk={handleOk} onCancel={handleCancel}>
                                <p style={{ fontFamily: "Nunito" }}>Bạn có muốn xác nhận thanh toán đơn hàng trị giá  {totalPrice.toLocaleString()}đ ?</p>
                            </Modal>

                            <p style={{ fontSize: 35, marginTop: 30 }}>Trang thanh toán</p>

                            {
                                activeAddress != null &&
                                <div style={{ display: "inline" }}>
                                    <span style={{ fontFamily: "Nunito", fontSize: 20 }}>Địa chỉ chính : <span> {activeAddress.name} - {activeAddress.address}</span></span>
                                    <Link to={"/user/delivery-address"}> <Button size="large" style={{ display: "inline", float: "right" }}><span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><PlusOutlined style={{ fontSize: 16 }} />&nbsp; Thay đổi địa chỉ</span></Button></Link>
                                </div>
                            }

                            <Divider />

                            {
                                cartItems.length != 0 ? (
                                    <div className="cart">

                                        <div className="products">

                                            {
                                                cartItems.map(item => (
                                                    <div>
                                                        {
                                                            item.discount_percent != null ? (
                                                                <Badge.Ribbon color={"red"} text={"giảm " + item.discount_percent + "̀%"}>
                                                                    <div className="product">
                                                                        <div style={{ width: 400, height: 200 }}>
                                                                            <img src={item.avatar} style={{ width: "100%", height: "100%" }} />
                                                                        </div>
                                                                        <div className="product-info">

                                                                            <Link to={"/food/" + item.food_id} ><p className="product-name" style={{ fontSize: 30 }}>{item.food_name}</p></Link>

                                                                            <p className="product-price">{item.store_name}</p>

                                                                            <p style={{ marginBottom: 5 }}>Ghi chú : {item.note != "" ? item.note : "Không có"}</p>

                                                                            {
                                                                                item.discount_percent != null ? (
                                                                                    <p className="product-offer"><span style={{ color: "red" }}> {item.price}Đ </span><span>{"<--"}</span> <span style={{ textDecoration: "line-through" }}> {item.original_price}Đ </span> </p>
                                                                                ) :
                                                                                    (
                                                                                        <p className="product-offer">{item.price}Đ </p>
                                                                                    )
                                                                            }

                                                                            <span style={{ marginRight: 50 }}>  Số lượng :  <InputNumber value={item.amount} onChange={(value) => {
                                                                                addToCart(item, value - item.amount)
                                                                            }} /> </span>

                                                                            <p className="product-remove" onClick={() => { addToCart(item, parseInt(-(parseInt(item.amount)))) }}>

                                                                                <i class="fa fa-trash" aria-hidden="true"></i>

                                                                                <span class="remove">Xóa</span>

                                                                            </p>

                                                                        </div>
                                                                    </div>
                                                                </Badge.Ribbon>
                                                            ) : (
                                                                <div className="product">
                                                                    <div style={{ width: 400, height: 200 }}>
                                                                        <img src={item.avatar} style={{ width: "100%", height: "100%" }} />
                                                                    </div>
                                                                    <div className="product-info">

                                                                        <Link to={"/food/" + item.food_id} ><p className="product-name" style={{ fontSize: 30 }}>{item.food_name}</p></Link>

                                                                        <p className="product-price">{item.store_name}</p>

                                                                        <p style={{ marginBottom: 5 }}>Ghi chú : {item.note != "" ? item.note : "Không có"}</p>

                                                                        <p className="product-offer">{item.price}Đ</p>

                                                                        <span style={{ marginRight: 50 }}>  Số lượng :  <InputNumber value={item.amount} onChange={(value) => {
                                                                            addToCart(item, value - item.amount)
                                                                        }} /> </span>

                                                                        <p className="product-remove" onClick={() => { addToCart(item, parseInt(-(parseInt(item.amount)))) }}>

                                                                            <i class="fa fa-trash" aria-hidden="true"></i>

                                                                            <span class="remove">Xóa</span>

                                                                        </p>

                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                ))
                                            }

                                        </div>
                                        <div class="cart-total">

                                            <p>
                                                <span>Tạm tính({amount} món) :</span>
                                                <span>
                                                    {
                                                        (cartItems.reduce((tota, item) => {
                                                            return parseInt(tota + item.amount * item.price)
                                                        }, 0)).toLocaleString() + "đ"
                                                    }
                                                </span>
                                            </p>

                                            <p>
                                                <span>Phí vận chuyển({cartItems[0].distance}km):</span>
                                                <span>{(parseInt(cartItems[0].distance * 7) * 1000).toLocaleString()}đ</span>
                                            </p>

                                            <p>

                                                <span>Tổng tiền : </span>
                                                <span>
                                                    {
                                                        cartItems.length != 0 && (cartItems.reduce((tota, item) => {
                                                            return parseInt(tota + item.amount * item.price)
                                                        }, parseInt(cartItems[0].distance * 7) * 1000)).toLocaleString() + "đ"
                                                    }
                                                </span>


                                            </p>

                                            <Button size='large' style={{ width: "100%", backgroundColor: "#52c41a", color: "white", marginBottom : 12 }} onClick={
                                                () => {
                                                    handlePayment(cartItems);
                                                    setVisibleConfirm(true);
                                                }

                                            }>Thanh toán khi nhận hàng</Button>

                                            <Button size='large' style={{ width: "100%", backgroundColor: "#fa541c", color: "white" }} onClick={
                                                () => {
                                                    handlePayment(cartItems);
                                                    setVisibleConfirm(true);
                                                }

                                            }>Thanh toán bằng paypal</Button>

                                        </div>


                                    </div>
                                ) : <div style={{ fontSize: 26, fontFamily: "Nunito", marginBottom: 150 }}>Giỏ hàng của bạn đang trống !</div>
                            }

                        </div>
                    ) : <Loading />
            }
        </CartContext.Consumer>
    );
}
