import React, { useState, useRef, useEffect } from 'react';
import './payment.css';
import { Divider, InputNumber, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart-context';
import Loading from '../loading/loading-component';

export default function PaymentPage(props) {
    
    return (
        <CartContext.Consumer>
            {
                ({ amount, cartItems, addToCart }) =>

                        cartItems != [] ? (
                
                        <div className="container">

                        <p style={{ fontSize: 35, marginTop: 30 }}>Trang thanh toán</p>

                        <Divider />

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

                            {
                                cartItems.length != 0 && (
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
                                        <span>{(parseInt(cartItems[0].distance * 7)*1000).toLocaleString()}Đ</span>
                                    </p>
    
                                    <p>
    
                                        <span>Tổng tiền : </span>
                                        <span>
                                            {
                                                cartItems.length != 0 && (cartItems.reduce((tota, item) => {
                                                    return parseInt(tota + item.amount * item.price)
                                                }, 0)).toLocaleString() + "đ"
                                            }
                                        </span>
    
    
                                    </p>
    
                                    <p>
    
                                        <span>You Save</span>
    
                                        <span>₹ 1,000</span>
    
                                    </p>
    
                                    <a href="#">Proceed to Checkout</a>
    
                                </div>
                                ) 
                            }

                        </div>

                    </div>
                        ) : <Loading />
                }
        </CartContext.Consumer>
    );
}
