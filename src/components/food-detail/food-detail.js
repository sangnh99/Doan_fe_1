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

const { TabPane } = Tabs;

const success = () => {
    message.success('Đã thêm vào sách ưa thích !');
};


export default function FoodDetail() {
    const noteInput = useRef(null);
    const [id, setId] = useState(useParams().id);
    const [foodDetail, setFoodDetail] = useState(0);
    const [quantity, setQuantity] = useState(1);
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
                console.log(response.data.data);
                noteInput.current.value = response.data.data.note;
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
        <div>
            {
                foodDetail != 0 ? (
                    <div className="container">
                        <span style={{ color: "#C0C0C0", fontSize: 16 }}><Link to={"/home"}> Trang chủ </Link> </span> <span style={{ color: "#C0C0C0", fontSize: 10 }}>>> </span> <span style={{ color: "#C0C0C0", fontSize: 16 }}><Link to={"/menu/" + food_category[foodDetail.food_type_id]} >{food_category_vn[foodDetail.food_type_id]} </Link></span><span style={{ color: "#C0C0C0", fontSize: 10 }}> >> </span> <span style={{ color: "#187caa", fontSize: 16 }}>{foodDetail.food_name}</span>

                        <div className="row">
                            <div className="col-xl-5" style={{ paddingRight: 0, paddingLeft: 0, border: "1px solid gray" }}>
                                <div className="ava-card">
                                    {
                                        foodDetail.discount_percent != null && (
                                            <div class="ribbon ribbon-top-right">
                                                <span>Giảm {foodDetail.discount_percent}%</span>
                                            </div>
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

                                    <Tooltip title="Chia sẻ lên facebook" color={"red"}><div className='col-xl-4' style={{paddingLeft: 0, paddingRight: 0 }}>
                                        <SharePost
                                        url={"https://sang-delivery-fe.herokuapp.com/food/" + foodDetail.food_id}
                                        quote={foodDetail.food_name + "-" + foodDetail.store_name + "ngon tuyệt !"}
                                        />
                                        <span style={{ float: "right" }}>|</span></div></Tooltip>
                                    <Tooltip title="Tùy chọn" color={"red"}><div className='col-xl-4' style={{ paddingLeft: 0, paddingRight: 0 }}><SettingsOutlinedIcon style={{ color: "orange", marginLeft: 75 }} /></div></Tooltip>
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
                                                    <Button onClick={() => { confirmAddToCart(foodDetail, quantity, note) }} type="primary" icon={<ShoppingCartOutlined style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"} style={{ marginTop: 20, width : 250 }}>
                                                        Thêm vào giỏ hàng
                                                    </Button>

                                                </div>
                                                <div style={{marginTop : 20}}>
                                                    <Button type="primary"  onClick={() => { confirmAddToCartAndBuy(foodDetail, quantity, note, history) }} icon={<DollarCircleOutlined style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"} style={{ backgroundColor: "#d0011b", width : 250 }}>
                                                        Mua hàng
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                    </CartContext.Consumer>

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
                                                                                discountPercent={item.discount_percent}
                                                                                distance={item.distance}
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

// =======================================================





// import React, { Component } from 'react';
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
// import { Link, useHistory } from 'react-router-dom';
// import { food_category_vn } from '../../enum/food-category-vn';
// import { food_category } from '../../enum/food-category';
// import foodService from '../../services/food-service';
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
// import { InputNumber, Cascader, Button, message, Tabs, Input } from 'antd';
// import { ShoppingCartOutlined, DollarCircleOutlined, HeartOutlined } from '@ant-design/icons';
// import { Divider } from 'antd';
// import CommentBox from '../comment-box/comment-box';
// import { CartContext } from '../../contexts/cart-context';
// import CardSmall from '../card/card-small';
// import Card from '../card/card';
// import userFavouriteService from '../../services/user.favourite.service';
// import TextField from '@mui/material/TextField';
// import Loading from '../loading/loading-component';

// const { TabPane } = Tabs;

// const success = () => {
//     message.success('Đã thêm vào sách ưa thích !');
// };


// export default function FoodDetail() {
//     const [id, setId] = useState(useParams().id);
//     const [foodDetail, setFoodDetail] = useState(0);
//     const [quantity, setQuantity] = useState(1);
//     const [listComment, setListComment] = useState([]);
//     const [foodOfStore, setFoodOfStore] = useState([]);
//     const [isFavourite, setIsFavourite] = useState(null);
//     // const [note, setNote] = useState("");

//     useEffect(() => {
//         getFoodDetail(id);
//         foodService.getAllFoodOfStoreByFoodId(id).then(
//             response => {
//                 setFoodOfStore(response.data.data);
//             }
//         );
//     }, []);

//     const history = useHistory();

//     const getFoodDetail = (id) => {
//         foodService.getFoodDetail(id).then(
//             response => {
//                 setFoodDetail(response.data.data);
//                 setListComment(response.data.data.list_comments);
//                 setIsFavourite(response.data.data.is_favourite);
//                 console.log(response.data.data)
//             }
//         );
//     }

//     const clickNewFood = (id) => {
//         getFoodDetail(id);
//     }

//     const addToFavourite = () => {
//         userFavouriteService.addToFavourite(JSON.parse(localStorage.getItem("user")).id, foodDetail.food_id, 2).then(
//             response => {
//                 setIsFavourite(1);
//                 success();
//             }
//         );
//     }


//     return (
//         <div>
//             {
//                 foodDetail != 0 ? (
//                     <div className="container">
//                         <span style={{ color: "#C0C0C0", fontSize: 16 }}><Link to={"/home"}> Trang chủ </Link> </span> <span style={{ color: "#C0C0C0", fontSize: 10 }}>>> </span> <span style={{ color: "#C0C0C0", fontSize: 16 }}><Link to={"/menu/" + food_category[foodDetail.food_type_id]} >{food_category_vn[foodDetail.food_type_id]} </Link></span><span style={{ color: "#C0C0C0", fontSize: 10 }}> >> </span> <span style={{ color: "#187caa", fontSize: 16 }}>{foodDetail.food_name}</span>

//                         <div className="row">
//                             <div className="col-xl-5">
//                                 <img className="card-image" src={foodDetail.avatar != null ? foodDetail.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl85MbwvCl_l-ri_GAYI2iCr8F8cSze8Ho8A&usqp=CAU"} alt="" style={{ backgroundSize: "cover", width: 450, height: 300 }} />
//                             </div>
//                             <div className="col-xl-7">
//                                 <h1 style={{ fontFamily: "Nunito" }}>{foodDetail.food_name}</h1>
//                                 <Link to={"/store/" + foodDetail.store_id}><h3 style={{ color: "#187caa" }}>{foodDetail.store_name} || {foodDetail.distance} km</h3></Link>
//                                 <div >
//                                     <Rating name="read-only" value={foodDetail.summary_rating} precision={0.5} readOnly /><span style={{ fontSize: 20 }}> {foodDetail.summary_rating} ({foodDetail.number_of_vote})</span>
//                                 </div>
//                                 <div>
//                                     <span>Số lượng :  </span>
//                                     <InputNumber
//                                         addonBefore={<Cascader placeholder="cascader" style={{ width: 250 }} />}
//                                         defaultValue={quantity}
//                                         onChange={(event) => {
//                                             setQuantity(event);
//                                         }}
//                                     />
//                                 </div>

//                                 <CartContext.Consumer >
//                                     {({ addToCart }) => (
//                                         <div>
//                                             <TextField
//                                                 label="Ghi chú"
//                                                 id="outlined-size-small"
//                                                 defaultValue={foodDetail.note}
//                                                 // onChange={(event) => {
//                                                 //     onChangeCurrentNote(event.target.value)
//                                                 // }}
//                                             />
//                                         </div>
//                                     )}

//                                 </CartContext.Consumer>


//                                 <div style={{ marginTop: 5 }}>
//                                     <h2 style={{ color: "#d4380d" }}>{foodDetail.price}đ</h2>
//                                     {
//                                         foodDetail.discount_percent != null && (<span><span style={{ textDecoration: "line-through" }}>{foodDetail.original_price}đ </span><span>&nbsp;-{foodDetail.discount_percent}%</span></span>)
//                                     }
//                                 </div>
//                                 <Button disabled={isFavourite == 1 ? true : false}
//                                     type="primary" icon={<HeartOutlined
//                                         style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"}
//                                     style={{ backgroundColor: "#52c41a", marginTop: 20 }}
//                                     onClick={addToFavourite}
//                                 >
//                                     {isFavourite == 1 ? "Đã thêm vào ưa thích" : "Thêm vào ưa thích"}
//                                 </Button>
//                                 <div>
//                                     <CartContext.Consumer >
//                                         {({ confirmAddToCart }) => (
//                                             <Button onClick={() => { confirmAddToCart(foodDetail, quantity) }} type="primary" icon={<ShoppingCartOutlined style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"} style={{ marginTop: 20 }}>
//                                                 Thêm vào giỏ hàng
//                                             </Button>
//                                         )}

//                                     </CartContext.Consumer>
//                                     <Button type="primary" icon={<DollarCircleOutlined style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"} style={{ backgroundColor: "#52c41a" }}>
//                                         Mua hàng
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>

//                         <Divider />
//                         <div>
//                             <h3>Xem thêm của {foodDetail.store_name}</h3>
//                             <br />
//                             <div>
//                                 <Tabs defaultActiveKey="1" type="card" size={"large"}>
//                                     {
//                                         foodOfStore.map(type => {
//                                             return (
//                                                 <TabPane tab={type.sub_food_type_name} key={type.key}>
//                                                     <div className="row">

//                                                         {
//                                                             type.list_food.map(item => {
//                                                                 return (
//                                                                     <Link to={"/food/" + item.id} >
//                                                                         <div className="col-xl-3" onClick={() => { clickNewFood(item.id) }}>
//                                                                             <CardSmall
//                                                                                 name={item.name}
//                                                                                 store={item.store_name}
//                                                                                 ima={item.avatar}
//                                                                                 rating={item.rating}
//                                                                                 price={item.price}
//                                                                                 discountPercent={item.discount_percent}
//                                                                                 distance={item.distance}
//                                                                             />
//                                                                         </div>
//                                                                     </Link>
//                                                                 )
//                                                             })
//                                                         }

//                                                     </div>
//                                                 </TabPane>
//                                             )
//                                         })
//                                     }
//                                 </Tabs>
//                             </div>
//                         </div>
//                         <div style={{ marginTop: 100 }}>
//                             <h3>Bình luận</h3>
//                             <Divider />
//                             {
//                                 listComment.length !== 0 && (
//                                     <div>
//                                         {
//                                             listComment.map(item => {
//                                                 return (
//                                                     <CommentBox id={item.id}
//                                                         name={item.user_app_name}
//                                                         rating={item.rating}
//                                                         comment={item.comment}
//                                                         likenum={item.like_number}
//                                                         dislikenum={item.dislike_number} />
//                                                 );
//                                             })
//                                         }
//                                     </div>
//                                 )
//                             }
//                             {
//                                 listComment.length === 0 && (<div style={{ marginBottom: 100 }}>Hiện chưa có đánh giá cho sản phẩm</div>)
//                             }
//                         </div>
//                     </div>
//                 ) : <div>
//                     <Loading />
//                 </div>
//             }
//         </div>
//     );

// }