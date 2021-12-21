import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { food_category_vn } from '../../enum/food-category-vn';
import { food_category } from '../../enum/food-category';
import foodService from '../../services/food-service';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { InputNumber, Cascader, Button, message, Tabs } from 'antd';
import { ShoppingCartOutlined, DollarCircleOutlined, HeartOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import CommentBox from '../comment-box/comment-box';
import { CartContext } from '../../contexts/cart-context';
import CardSmall from '../card/card-small';
import Card from '../card/card';
import userFavouriteService from '../../services/user.favourite.service';

const { TabPane } = Tabs;

const success = () => {
    message.success('Đã thêm vào sách ưa thích !');
};


export default function FoodDetail() {
    const [id, setId] = useState(useParams().id);
    const [foodDetail, setFoodDetail] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [listComment, setListComment] = useState([]);
    const [foodOfStore, setFoodOfStore] = useState([]);
    const [isFavourite, setIsFavourite] = useState(null);

    useEffect(() => {
        getFoodDetail(id);
        foodService.getAllFoodOfStoreByFoodId(id).then(
            response => {
                setFoodOfStore(response.data.data);
            }
        );
    }, []);

    const history = useHistory();

    const getFoodDetail = (id) => {
        foodService.getFoodDetail(id).then(
            response => {
                setFoodDetail(response.data.data);
                setListComment(response.data.data.list_comments);
                setIsFavourite(response.data.data.is_favourite);
                console.log(response.data.data)
            }
        );
    }

    const clickNewFood = (id) => {
        getFoodDetail(id);
    }

    const addToFavourite = () => {
        userFavouriteService.addToFavourite(JSON.parse(localStorage.getItem("user")).id, foodDetail.food_id, 2).then(
            response => {
                setIsFavourite(1);
                success();
            }
        );
    }


    return (
        <div className="container">
            <span style={{ color: "#C0C0C0", fontSize: 16 }}><Link to={"/home"}> Trang chủ </Link> </span> <span style={{ color: "#C0C0C0", fontSize: 10 }}>>> </span> <span style={{ color: "#C0C0C0", fontSize: 16 }}><Link to={"/menu/" + food_category[foodDetail.food_type_id]} >{food_category_vn[foodDetail.food_type_id]} </Link></span><span style={{ color: "#C0C0C0", fontSize: 10 }}> >> </span> <span style={{ color: "#187caa", fontSize: 16 }}>{foodDetail.food_name}</span>
            <div className="row">
                <div className="col-xl-5">
                    <img className="card-image" src={foodDetail.avatar != null ? foodDetail.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl85MbwvCl_l-ri_GAYI2iCr8F8cSze8Ho8A&usqp=CAU"} alt="" style={{ backgroundSize: "cover", width: 450, height: 300 }} />
                </div>
                <div className="col-xl-7">
                    <h1 style={{ fontFamily: "Nunito" }}>{foodDetail.food_name}</h1>
                    <Link to={"/store/" + foodDetail.store_id}><h3 style={{ color: "#187caa" }}>{foodDetail.store_name}</h3></Link>
                    <div >
                        <Rating name="read-only" value={foodDetail.summary_rating} precision={0.5} readOnly /><span style={{ fontSize: 20 }}> {foodDetail.summary_rating} ({foodDetail.number_of_vote})</span>
                    </div>
                    <div>
                        <span>Số lượng :  </span>
                        <InputNumber
                            addonBefore={<Cascader placeholder="cascader" style={{ width: 250 }} />}
                            defaultValue={quantity}
                            onChange={(event) => {
                                setQuantity(event);
                            }}
                        />
                    </div>
                    <div style={{marginTop : 5}}>
                        <h2 style={{color : "#d4380d"}}>{foodDetail.price}đ</h2>
                        {
                            foodDetail.discount_percent != null && (<span><span style={{textDecoration : "line-through"}}>{foodDetail.original_price}đ </span><span>&nbsp;-{foodDetail.discount_percent}%</span></span>)
                        }
                    </div>
                    <Button disabled={isFavourite == 1 ? true : false}
                            type="primary" icon={<HeartOutlined
                            style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"}
                            style={{ backgroundColor: "#52c41a", marginTop: 20 }}
                            onClick={addToFavourite}
                            >
                        {isFavourite == 1 ? "Đã thêm vào ưa thích" : "Thêm vào ưa thích"}
                    </Button>
                    <div>
                        <CartContext.Consumer >
                            {({ confirmAddToCart }) => (
                                <Button onClick={() => { confirmAddToCart(foodDetail, quantity) }} type="primary" icon={<ShoppingCartOutlined style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"} style={{ marginTop: 20 }}>
                                    Thêm vào giỏ hàng
                                </Button>
                            )}

                        </CartContext.Consumer>
                        <Button type="primary" icon={<DollarCircleOutlined style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"} style={{ backgroundColor: "#52c41a" }}>
                            Mua hàng
                        </Button>
                    </div>
                </div>
            </div>
            <Divider />
            <div>
                <h3>Xem thêm của {foodDetail.store_name}</h3>
                <br />
                <div>
                    <Tabs defaultActiveKey="1" type="card" size={"large"}>
                        {
                            foodOfStore.map(type => {
                                return (
                                    <TabPane tab={type.sub_food_type_name} key={type.key}>
                                        <div className="row">

                                            {
                                                type.list_food.map(item => {
                                                    return (
                                                        <Link to={"/food/" + item.id} >
                                                            <div className="col-xl-3" onClick={() => { clickNewFood(item.id) }}>
                                                                <CardSmall
                                                                    name={item.name}
                                                                    store={item.store_name}
                                                                    ima={item.avatar}
                                                                    rating={item.rating}
                                                                    price={item.price}
                                                                    discountPercent = {item.discount_percent}
                                                                />
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }

                                        </div>
                                    </TabPane>
                                )
                            })
                        }
                    </Tabs>
                </div>
            </div>
            <div style={{ marginTop: 100 }}>
                <h3>Bình luận</h3>
                <Divider />
                {
                    listComment.length !== 0 && (
                        <div>
                            {
                                listComment.map(item => {
                                    return (
                                        <CommentBox id={item.id}
                                            name={item.user_app_name}
                                            rating={item.rating}
                                            comment={item.comment}
                                            likenum={item.like_number}
                                            dislikenum={item.dislike_number} />
                                    );
                                })
                            }
                        </div>
                    )
                }
                {
                    listComment.length === 0 && (<div style={{ marginBottom: 100 }}>Hiện chưa có đánh giá cho sản phẩm</div>)
                }
            </div>
        </div>
    );

}