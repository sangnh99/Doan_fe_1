import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { food_category_vn } from '../../enum/food-category-vn';
import { food_category } from '../../enum/food-category';
import foodService from '../../services/food-service';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { InputNumber, Cascader, Button, message, Tabs, Input, Rate, Tooltip } from 'antd';
import { ShoppingCartOutlined, DollarCircleOutlined, HeartOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import CommentBox from '../comment-box/comment-box';
import { CartContext } from '../../contexts/cart-context';
import CardSmall from '../card/card-small';
import Card from '../card/card';
import userFavouriteService from '../../services/user.favourite.service';
import TextField from '@mui/material/TextField';
import Loading from '../loading/loading-component';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./food-detail.css";
import SharePost from '../facebook/share-post';
import HelmetMetaData from '../facebook/helmet-metadata';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardAntdFood from '../card/card-antd-food';
import ArrowBlockRecommend from '../popular-component/arrow-block-recommend';

const { TabPane } = Tabs;

const success = () => {
    message.success('Đã thêm vào sách ưa thích !');
};

// slick
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ display: "block", background: "gray" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ background: "gray" }}
            onClick={onClick}
        >
            aaa
        </div>
    );
}

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};


export default function FoodDetail() {
    const noteInput = useRef(null);
    const [id, setId] = useState(useParams().id);
    const [foodDetail, setFoodDetail] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [storeId, setStoreId] = useState(null);
    const [listComment, setListComment] = useState([]);
    const [foodOfStore, setFoodOfStore] = useState([]);
    const [isFavourite, setIsFavourite] = useState(null);
    const [note, setNote] = useState("");

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
                setNote(response.data.data.note);
                setStoreId(response.data.data.store_id);
                console.log(response.data.data);
                noteInput.current.value = response.data.data.note;
            }
        );
    }

    const clickNewFood = (id) => {
        getFoodDetail(id);
    }

    const clickNewFoodRecommend = (foodId, store) => {
        if (store == storeId){
            getFoodDetail(foodId);
        } else {
            getFoodDetail(foodId);
            foodService.getAllFoodOfStoreByFoodId(foodId).then(
                response => {
                    setFoodOfStore(response.data.data);
                }
            );            
        }
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
        <div>
            {
                foodDetail != 0 ? (
                    <div className="container">
                        <span style={{ color: "#C0C0C0", fontSize: 16 }}><Link to={"/home"}> Trang chủ </Link> </span> <span style={{ color: "#C0C0C0", fontSize: 10 }}>>> </span> <span style={{ color: "#C0C0C0", fontSize: 16 }}><Link to={"/menu/" + food_category[foodDetail.food_type_id]} >{food_category_vn[foodDetail.food_type_id]} </Link></span><span style={{ color: "#C0C0C0", fontSize: 10 }}> >> </span> <span style={{ color: "#187caa", fontSize: 16 }}>{foodDetail.food_name}</span>

                        <div className="row" style={{marginBottom : 30}}>
                            <div className="col-xl-5" style={{ paddingRight: 0, paddingLeft: 0, border: "1px solid gray" }}>
                                <div className="ava-card" style={{ position: "relative" }}>
                                    {
                                        foodDetail.discount_percent != null && (
                                            <div class="ribbon ribbon-top-right">
                                                <span>Giảm {foodDetail.discount_percent}%</span>
                                            </div>
                                        )
                                    }
                                    {
                                        foodDetail.is_best_seller == 1 && (
                                            <img className="best-seller-icon-card-food-detail" src="https://previews.123rf.com/images/artag/artag1211/artag121100001/16235733-best-seller-icon.jpg" />
                                        )
                                    }
                                    <img src={foodDetail.avatar != null ? foodDetail.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl85MbwvCl_l-ri_GAYI2iCr8F8cSze8Ho8A&usqp=CAU"} alt="" style={{ backgroundSize: "cover", width: "100%", height: 312 }} />
                                </div>
                                <div className='row' style={{ marginTop: 20 }}>
                                    {
                                        isFavourite != 1 ? (
                                            <Tooltip title="Thêm vào ưa thích" color={"red"}><div className='col-xl-4' style={{ paddingLeft: 0, paddingRight: 0 }}><FavoriteBorderIcon style={{ color: "red", marginLeft: 75 }} onClick={addToFavourite} /><span style={{ float: "right" }}>|</span></div></Tooltip>
                                        ) : (
                                            <Tooltip title="Đã thêm vào ưa thích !" color={"red"}><div className='col-xl-4' style={{ paddingLeft: 0, paddingRight: 0 }}><FavoriteIcon style={{ color: "red", marginLeft: 75 }} /><span style={{ float: "right" }}>|</span></div></Tooltip>
                                        )
                                    }

                                    <Tooltip title="Chia sẻ lên facebook" color={"red"}><div className='col-xl-4' style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <SharePost
                                            url={"https://sang-delivery-fe.herokuapp.com/food/" + foodDetail.food_id}
                                            quote={foodDetail.food_name + "-" + foodDetail.store_name + "ngon tuyệt !"}
                                        />
                                        <span style={{ float: "right" }}>|</span></div></Tooltip>
                                    <Tooltip title={foodDetail.total_buy + " lượt mua"} color={"red"}><div className='col-xl-4' style={{ paddingLeft: 0, paddingRight: 0 }}><span style={{ marginLeft: 70, fontSize: 16, color: "" }}>{foodDetail.total_buy}</span><ShoppingCartOutlinedIcon style={{ color: "orange" }} /></div></Tooltip>
                                </div>
                            </div>
                            <div className="col-xl-7" style={{ paddingLeft: 30 }}>
                                <h1 style={{ fontFamily: "Nunito" }}>{foodDetail.food_name}</h1>
                                <Link to={"/store/" + foodDetail.store_id}><p style={{ fontFamily: 'Nunito', fontSize: 16 }}>{foodDetail.store_name} -  &nbsp; {foodDetail.distance}km</p></Link>
                                <p><RoomOutlinedIcon style={{ fontSize: 20, color: "orange" }} /> {foodDetail.store_address.substring(0, foodDetail.store_address.length - 16)}</p>
                                {
                                    foodDetail.number_of_vote != 0 ? <p><Rate disabled value={parseFloat(foodDetail.summary_rating + 0.25)} allowHalf={true} readOnly />({foodDetail.number_of_vote} đánh giá)</p>
                                        : <p><Rate value={foodDetail.summary_rating} allowHalf={true} readOnly />(chưa có đánh giá)</p>
                                }
                                <div>

                                </div>

                                <CartContext.Consumer >
                                    {({ }) => (
                                        <div>
                                            <span>Số lượng :  </span>
                                            <InputNumber
                                                addonBefore={<Cascader placeholder="cascader" style={{ width: 250 }} />}
                                                defaultValue={quantity}
                                                style={{ height: 37 }}
                                                onChange={(event) => {
                                                    setQuantity(event);
                                                }}
                                            />

                                            <span>
                                                <DriveFileRenameOutlineOutlinedIcon />
                                            </span>
                                            <TextField
                                                inputRef={noteInput}
                                                label="Ghi chú"
                                                id="outlined-size-small"
                                                size="small"
                                                onChange={(event) => {
                                                    setNote(event.target.value)
                                                }}
                                            />

                                        </div>
                                    )}

                                </CartContext.Consumer>


                                <div style={{ marginTop: 9 }}>
                                    {
                                        foodDetail.discount_percent != null ? (
                                            <span style={{ fontFamily: "Nunito", fontSize: 22, paddingTop: 4 }}><LocalOfferOutlinedIcon style={{ color: "red" }} />
                                                {foodDetail.price}đ <i class='fas fa-long-arrow-alt-left' style={{ fontSize: 24 }}></i>&ensp;
                                                <span style={{ textDecoration: "line-through" }}> {foodDetail.original_price}đ </span>
                                                <span><img src="https://www.publicdomainpictures.net/pictures/120000/t2/red-sale-label-1425210027dkz.jpg" style={{ width: 46, height: 36, paddingBottom: 6 }}></img></span></span>
                                        ) : (
                                            <span style={{ fontFamily: "Nunito", fontSize: 22, paddingTop: 4 }}><LocalOfferOutlinedIcon style={{ color: "red" }} />
                                                {foodDetail.price}đ</span>
                                        )
                                    }
                                </div>
                                <div>
                                    <CartContext.Consumer >
                                        {({ confirmAddToCart, confirmAddToCartAndBuy }) => (
                                            <div>
                                                <div>
                                                    <Button onClick={() => { confirmAddToCart(foodDetail, quantity, note) }} type="primary" icon={<ShoppingCartOutlined style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"} style={{ marginTop: 20, width: 250 }}>
                                                        Thêm vào giỏ hàng
                                                    </Button>

                                                </div>
                                                <div style={{ marginTop: 20 }}>
                                                    <Button type="primary" onClick={() => { confirmAddToCartAndBuy(foodDetail, quantity, note, history) }} icon={<DollarCircleOutlined style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"} style={{ backgroundColor: "#d0011b", width: 250 }}>
                                                        Mua hàng
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                    </CartContext.Consumer>

                                </div>
                            </div>
                        </div>

                        {/* slick */}
                        
                        <ArrowBlockRecommend title={"Có thể bạn cũng sẽ thích"} />

                        <div style={{ marginTop: 40, marginBottom: 70 }}>
                            <Slider {...settings}>
                                {
                                    foodDetail.list_recommend_same_food.map(item => {
                                        return (
                                            <Link to={"/food/" + item.id} >
                                                <div onClick={() => { clickNewFoodRecommend(item.id, item.store_id) }}>
                                                    <CardAntdFood
                                                        item={item}
                                                        width={"255px"}
                                                        height={"230px"}
                                                    />
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </Slider>
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
                                                                                rating={item.summary_rating}
                                                                                price={item.price}
                                                                                discountPercent={item.discount_percent}
                                                                                distance={item.distance}
                                                                                isBestSeller={item.is_best_seller}
                                                                                totalBuy={item.total_buy}
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
                ) : <div>
                    <Loading />
                </div>
            }
        </div>
    );

}

