import React, { useState, useEffect } from "react";
import { Card, Badge } from 'antd';
import { Link } from 'react-router-dom';
import "./card.css";

const { Meta } = Card;

export default function CardAntdStore(props) {
    return (
        <div>

            <Link to={"/store/" + props.item.id} >
                <Card
                    hoverable
                    style={{ width: props.width }}
                    cover={<img alt="example" src={props.item.avatar} style={{ height: 230 }} />}
                >
                    <Meta title={props.item.name} description={
                        <div>
                            <p>{props.item.address.substring(0, props.item.address.length - 26)}&emsp;&ensp;</p>
                            <span>{props.item.distance} km</span>
                            {
                                props.item.summary_rating != 0 ? (
                                    <span style={{ float: "right" }}><i class="fas fa-star" style={{ color: "yellow" }}></i>&ensp;{props.item.summary_rating}(<span style={{ fontSize: 12 }}>{props.item.number_of_rating}+</span>)</span>
                                ) :
                                    (
                                        <span style={{ float: "right" }}>chưa có đánh giá</span>
                                    )
                            }
                        </div>
                    } />
                </Card>
            </Link>


        </div>
    )
}