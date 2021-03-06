import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { food_category_vn } from '../../enum/food-category-vn';
import foodService from '../../services/food-service';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { InputNumber, Cascader, Button} from 'antd';
import { ShoppingCartOutlined, DollarCircleOutlined } from '@ant-design/icons';
import {Divider} from 'antd';
import CommentBox from '../comment-box/comment-box';


export default function FoodDetail() {
    const [id, setId] = useState(useParams().id);
    const [foodDetail, setFoodDetail] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [listComment, setListComment] = useState([]);

    useEffect(() => {
        getFoodDetail();
    }, []);

    const getFoodDetail = () => {
        foodService.getFoodDetail(id).then(
            response => {
                setFoodDetail(response.data.data);
                setListComment(response.data.data.list_comments)
                console.log(response.data.data);
            }
        );
    }

    return (
        <div className="container">
            <span style={{ color: "#C0C0C0", fontSize: 16 }}>Trang chủ </span> <span style={{ color: "#C0C0C0", fontSize: 10 }}>>> </span> <span style={{ color: "#C0C0C0", fontSize: 16 }}>{food_category_vn[foodDetail.food_type_id]}</span><span style={{ color: "#C0C0C0", fontSize: 10 }}> >> </span> <span style={{ color: "#187caa", fontSize: 16 }}>{foodDetail.name}</span>
            <div className="row">
                <div className="col-xl-5">
                    <img className="card-image" src={foodDetail.avatar} alt="Logo" style={{ backgroundSize: "cover", width: 450, height: 300 }} />
                </div>
                <div className="col-xl-7">
                    <h1 style={{ fontFamily: "Shadows Into Light", fontFamily: "cursive" }}>{foodDetail.name}</h1>
                    <Link to={"/store/1"}><h3 style={{ color: "#187caa" }}>{foodDetail.store_name}</h3></Link>
                    <div >
                        <Rating name="read-only" value={foodDetail.summary_rating} precision={0.5} readOnly /><span style={{ fontSize: 20 }}> {foodDetail.summary_rating} ({foodDetail.number_of_vote})</span>
                    </div>
                    <div>
                        <span>Số lượng :  </span>
                        <InputNumber
                            addonBefore={<Cascader placeholder="cascader" style={{ width: 250 }} />}
                            defaultValue={quantity}
                            onChange={(value) => {
                                setQuantity(value);
                            }}
                        />
                    </div>
                    <div>
                        <Button type="primary" icon={<ShoppingCartOutlined style={{fontSize : 20, marginBottom:5}}/>} size={"large"} style={{marginTop : 50}}>
                            Thêm vào giỏ hàng
                        </Button>
                        <Button type="primary" icon={<DollarCircleOutlined  style={{fontSize : 20, marginBottom:5}}/>} size={"large"} style={{backgroundColor : "#52c41a"}}>
                            Mua hàng
                        </Button>
                    </div>
                </div>
            </div>

            <div style={{marginTop: 100}}>
                <h3>Bình luận</h3>
                <Divider />
                {
                    listComment.length !== 0 && (
                        <div>
                            {
                                listComment.map(item => {
                                    return (
                                        <CommentBox id = {item.id}
                                         name = {item.user_app_name}
                                          rating = {item.rating} 
                                          comment = {item.comment}
                                          likenum = {item.like_number}
                                          dislikenum = {item.dislike_number}/>
                                    );
                                })
                            }
                        </div>
                    ) 
                }
                {
                    listComment.length === 0 && (<div style = {{marginBottom : 100}}>Hiện chưa có đánh giá cho sản phẩm</div>)
                }
            </div>
        </div>
    );

}