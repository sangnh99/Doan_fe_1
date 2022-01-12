import React, { useState, useEffect } from "react";
import { Card, Badge } from 'antd';
import { Link } from 'react-router-dom';
import "./card.css";

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
                                style={{ width: 255 }}
                                cover={<img alt="example" src={props.item.avatar} style={{ height: 255 }} />}
                            >
                                <Meta title={props.item.name} description={<div>
                                    {
                                        props.item.discount_percent != null ? (
                                            <div>
                                                <span style={{ color: "orange" }}>{parseInt(props.item.price).toLocaleString()}đ</span>
                                                {
                                                    props.item.summary_rating != 0 ? (
                                                        <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating}</span>
                                                    ) :
                                                        (
                                                            <span style={{ float: "right" }}>chưa có đánh giá</span>
                                                        )
                                                }
                                            </div>
                                        ) : (
                                            <div>
                                                <span>{parseInt(props.item.price).toLocaleString()}đ</span>
                                                {
                                                    props.item.summary_rating != 0 ? (
                                                        <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating}</span>
                                                    ) :
                                                        (
                                                            <span style={{ float: "right" }}>chưa có đánh giá</span>
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
                            style={{ width: 255 }}
                            cover={<img alt="example" src={props.item.avatar} style={{ height: 255 }} />}
                        >
                            <Meta title={props.item.name} description={<div>
                                {
                                    props.item.discount_percent != null ? (
                                        <div>
                                            <span style={{ color: "orange" }}>{parseInt(props.item.price).toLocaleString()}đ</span>
                                            {
                                                    props.item.summary_rating != 0 ? (
                                                        <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating}</span>
                                                    ) :
                                                        (
                                                            <span style={{ float: "right" }}>chưa có đánh giá</span>
                                                        )
                                                }
                                        </div>
                                    ) : (
                                        <div>
                                            <span>{parseInt(props.item.price).toLocaleString()}đ</span>
                                            {
                                                    props.item.summary_rating != 0 ? (
                                                        <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating}</span>
                                                    ) :
                                                        (
                                                            <span style={{ float: "right" }}>chưa có đánh giá</span>
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