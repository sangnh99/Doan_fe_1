import React, { useState, useEffect } from "react";
import { Card, Badge } from 'antd';
import { Link } from 'react-router-dom';
import "./card.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const { Meta } = Card;

export default function CardAntd(props) {
    return (
        <div>
            {
                props.item.discount_percent != null ? (
                    <Badge.Ribbon text={"giảm " + props.item.discount_percent + "%"} color="volcano">
                        <Link to={"/food/" + props.item.id} >
                            <Card
                                hoverable
                                style={{ width: props.width }}
                                cover={<img alt="example" src={props.item.avatar} style={{ height: props.height }} />}
                            >
                                {
                                    props.item.is_best_seller == 1 && (
                                        <div class="ribbon-wrapper-best-seller">
                                            <div class="ribbon-best-seller" style={{ fontSize: 12 }}>BEST SELLER</div>
                                        </div>
                                    )
                                }
                                <Meta title={props.item.name} description={<div>
                                    {
                                        props.item.discount_percent != null ? (
                                            <div>
                                                <span style={{ color: "orange" }}>{parseInt(props.item.price).toLocaleString()}đ</span>
                                                {
                                                    props.item.summary_rating != 0 ? (
                                                        <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating} ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>)  </span>
                                                    ) :
                                                        (
                                                            <span style={{ float: "right" }}>chưa có đánh giá ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>)  </span>
                                                        )
                                                }
                                            </div>
                                        ) : (
                                            <div>
                                                <span>{parseInt(props.item.price).toLocaleString()}đ</span>
                                                {
                                                    props.item.summary_rating != 0 ? (
                                                        <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating} ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>)  </span>
                                                    ) :
                                                        (
                                                            <span style={{ float: "right" }}>chưa có đánh giá ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>)  </span>
                                                        )
                                                }
                                            </div>
                                        )
                                    }
                                </div>} />
                            </Card>
                        </Link>
                    </Badge.Ribbon>
                ) : (
                    <Link to={"/food/" + props.item.id} >
                        <Card
                            hoverable
                            style={{ width: props.width }}
                            cover={<img alt="example" src={props.item.avatar} style={{ height: props.height }} />}
                        >
                            {
                                props.item.is_best_seller == 1 && (
                                    <div class="ribbon-wrapper-best-seller">
                                        <div class="ribbon-best-seller" style={{ fontSize: 12 }}>BEST SELLER</div>
                                    </div>
                                )
                            }
                            <Meta title={props.item.name} description={<div>
                                {
                                    props.item.discount_percent != null ? (
                                        <div>
                                            <span style={{ color: "orange" }}>{parseInt(props.item.price).toLocaleString()}đ</span>
                                            {
                                                props.item.summary_rating != 0 ? (
                                                    <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating} ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>)  </span>
                                                ) :
                                                    (
                                                        <span style={{ float: "right" }}>chưa có đánh giá ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>)  </span>
                                                    )
                                            }
                                        </div>
                                    ) : (
                                        <div>
                                            <span>{parseInt(props.item.price).toLocaleString()}đ</span>
                                            {
                                                props.item.summary_rating != 0 ? (
                                                    <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating} ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>)  </span>
                                                ) :
                                                    (
                                                        <span style={{ float: "right" }}>chưa có đánh giá ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>)  </span>
                                                    )
                                            }
                                        </div>
                                    )
                                }
                            </div>} />
                        </Card>
                    </Link>
                )
            }
        </div>
    )
}