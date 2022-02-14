import React, { useState, useEffect } from "react";
import { Card, Badge } from 'antd';
import { Link } from 'react-router-dom';
import "./card.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const { Meta } = Card;

export default function CardAntdFood(props) {
    return (
        <div style={{ width: props.width }}>
            {
                props.item.discount_percent != null ? (
                    <Link to={"/food/" + props.item.id} >
                        <Badge.Ribbon text={"giảm " + props.item.discount_percent + "%"} color="volcano">
                            <Card
                                hoverable
                                style={{ width: "100%" }}
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
                                                <div><span><Link to={"/food/" + props.item.id}>{props.item.store_name}</Link></span><span style={{ float: "right" }}>{props.item.distance}km</span></div>
                                                <div>
                                                    <span style={{ color: "orange" }}>{parseInt(props.item.price).toLocaleString()}đ</span>

                                                    {
                                                        props.item.summary_rating != 0 ? (
                                                            <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating}  ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>) </span>
                                                        ) :
                                                            (
                                                                <span style={{ float: "right" }}>chưa có đánh giá ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>) </span>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div>
                                                    <div><span><Link to={"/food/" + props.item.id}>{props.item.store_name}</Link></span><span style={{ float: "right" }}>{props.item.distance}km</span></div>
                                                    <span>{parseInt(props.item.price).toLocaleString()}đ</span>
                                                    {
                                                        props.item.summary_rating != 0 ? (
                                                            <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating} ({props.item.total_buy} <span><ShoppingCartOutlinedIcon /></span>) </span>
                                                        ) :
                                                            (
                                                                <span style={{ float: "right" }}>chưa có đánh giá ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>) </span>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>} />
                            </Card>
                        </Badge.Ribbon>
                    </Link>
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
                                            <div>
                                                <div><span><Link to={"/food/" + props.item.id}>{props.item.store_name}</Link></span><span style={{ float: "right" }}>{props.item.distance}km</span></div>
                                                <span style={{ color: "orange" }}>{parseInt(props.item.price).toLocaleString()}đ</span>
                                                {
                                                    props.item.summary_rating != 0 ? (
                                                        <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating} ({props.item.total_buy}+ <span><ShoppingCartOutlinedIcon /></span>) </span>
                                                    ) :
                                                        (
                                                            <span style={{ float: "right" }}>chưa có đánh giá ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>) </span>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div>
                                                <div><span><Link to={"/food/" + props.item.id}>{props.item.store_name}</Link></span><span style={{ float: "right" }}>{props.item.distance}km</span></div>
                                                <span>{parseInt(props.item.price).toLocaleString()}đ</span>
                                                {
                                                    props.item.summary_rating != 0 ? (
                                                        <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating} ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>) </span>
                                                    ) :
                                                        (
                                                            <span style={{ float: "right" }}>chưa có đánh giá ({props.item.total_buy} <span><ShoppingCartOutlinedIcon style={{fontSize : 12}}/></span>) </span>
                                                        )
                                                }
                                            </div>
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