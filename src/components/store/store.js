import { Divider, Tabs, Pagination, Rate, List, Avatar, Card } from "antd";
import CommentBox from "../comment-box/comment-box";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import storeService from "../../services/store-service";
import { Link } from 'react-router-dom';
import CardSmall from "../card/card-small";
import { Button, message, Select } from 'antd';
import userFavouriteService from "../../services/user.favourite.service";
import { HeartOutlined } from '@ant-design/icons';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import Loading from "../loading/loading-component";
import ShowMap1 from "../test-ggmap/show-map1";
import { width } from "@mui/system";
import CardAntd from '../card/card-antd';

const { Meta } = Card;

const { TabPane } = Tabs;
const { Option } = Select;

const success = () => {
    message.success('Đã thêm vào sách ưa thích !');
};

export default function Store(props) {
    const [storeId, setStoreId] = useState(useParams().id);
    const [storeDetail, setStoreDetail] = useState(null);
    const [listComment, setListComment] = useState([]);
    const [listCommentFilterd, setListCommentFilterd] = useState([]);
    const [isFavourite, setIsFavourite] = useState(null);
    const [commentPage, setCommentPage] = useState(1);
    const [filterComment, setFilterComment] = useState("0");  

    useEffect(() => {
        storeService.getStoreDetail(storeId).then(
            response => {
                setStoreDetail(response.data.data);
                setListComment(response.data.data.list_comments);
                setListCommentFilterd(response.data.data.list_comments);
                setIsFavourite(response.data.data.is_favourite);
                console.log(response.data.data);
            }
        );
    }, []);

    const addToFavourite = () => {
        userFavouriteService.addToFavourite(JSON.parse(localStorage.getItem("user")).id, storeDetail.id, 1).then(
            response => {
                setIsFavourite(1);
                success();
            }
        );
    }

    const onChangePageComment = (page) => {
        setCommentPage(page);
    }

    const getCommentFilterd = (value) => {
        setCommentPage(1);
        setFilterComment(value);
        if (value != "0"){
            setListCommentFilterd(listComment.filter(t => t.rating == parseInt(value)));
        } else {
            setListCommentFilterd(listComment);
        }
    }

    return (
        <div>
            {
                storeDetail != null ? (
                    <div className="container">
                        <span ><Link to={"/home"}> Trang chủ </Link> </span> <span style={{ color: "#C0C0C0", fontSize: 16 }}> >> </span> <span style={{ color: "#187caa", fontSize: 16 }}>{storeDetail.name}</span>
                        <div className="row">
                            <div className="col-xl-5">
                                <img className="card-image" src={storeDetail.avatar} alt="Logo" style={{ backgroundSize: "cover", width: 450, height: 300 }} />
                            </div>
                            <div className="col-xl-7">
                                <h1 style={{ fontFamily: 'Nunito' }}>{storeDetail.name}</h1>
                                <p><RoomOutlinedIcon style={{ fontSize: 20, color: "orange" }} /> {storeDetail.address.substring(0, storeDetail.address.length - 16)}</p>
                                <p style={{ fontSize: 16 }}>Số điện thoại : {storeDetail.phone}</p>
                                <p style={{ fontSize: 16 }}>Giờ mở cửa : {storeDetail.open_time}</p>
                                {
                                    storeDetail.number_of_rating != 0 ? <p><Rate disabled value={storeDetail.summary_rating + 0.25} allowHalf={true} readOnly />({storeDetail.number_of_rating} đánh giá)</p>
                                        : <p><Rate value={storeDetail.summary_rating} allowHalf={true} readOnly />(chưa có đánh giá)</p>
                                }
                                <p style={{ fontSize: 17 }}><LocalOfferOutlinedIcon style={{ color: "red" }} /> {storeDetail.price_range}</p>
                                <Button disabled={isFavourite == 1 ? true : false}
                                    type="primary" icon={<HeartOutlined
                                        style={{ fontSize: 20, marginBottom: 5 }} />} size={"large"}
                                    style={{ backgroundColor: "#52c41a", marginTop: 5 }}
                                    onClick={addToFavourite}
                                >
                                    {isFavourite == 1 ? "Đã thêm vào ưa thích" : "Thêm vào ưa thích"}
                                </Button>
                            </div>
                        </div>
                        <Divider />
                        <div className="row">
                            <div className="col-xl-6" style={{ height: 340, width: "100%" }}>
                                <img style={{height: 100, width : 170, marginLeft : 170}} src="https://thumbs.dreamstime.com/b/advertising-sticker-best-seller-red-thumb-up-illustration-vector-best-seller-advertising-sticker-183771394.jpg" ></img>
                                {
                                    storeDetail.list_recommend_food.length != 0 ? (
                                        <List
                                        itemLayout="horizontal"
                                        dataSource={storeDetail.list_recommend_food}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={item.avatar} />}
                                                    title={<Link to={"/food/" + item.id}>{item.name}</Link>}
                                                    description={
                                                        <div>
                                                            {
                                                                item.discount_percent != null ? (
                                                                    <p><span style={{ color: "red" }}> {parseInt(item.price).toLocaleString()}đ </span><span>{"<--"}</span> <span style={{ textDecoration: "line-through" }}> {item.original_price.toLocaleString()}đ </span> </p>
                                                                ) :
                                                                    (
                                                                        <p>{parseInt(item.price).toLocaleString()}đ </p>
                                                                    )
                                                            }
                                                        </div>
                                                    }
                                                />
                                                <img src={item.top_image_url} style={{width: 50, height : 50}}></img>
                                            </List.Item>
                                        )}
                                    />
                                    ) : <p>Hiện chưa có dữ liệu</p>
                                }
                            </div>
                            <div className="col-xl-6" style={{ height: 350, width: "100%" , marginBottom : 50}}>
                                <ShowMap1 lat={storeDetail.latitude} lng={storeDetail.longitude} marginLeft={"0px"} marginBottom={"0px"} height={"350px"} width={"100%"} />
                            </div>
                        </div>

                        <div style={{marginBottom : 100}}>
                        <h3 style={{ fontFamily: 'Nunito', display : "flex", justifyContent : "center", alignItems : "center" }}>Nhất định phải thử<img src="http://res.cloudinary.com/djifhw3lo/image/upload/v1641896887/wlpltanjk298led1itos.png" style={{width: 150, height : 60}}/></h3>
                        <div className="row" style={{marginTop : 45}}>
                            {
                                storeDetail.list_must_try_food.map(item =>  {
                                    return (
                                        <div className="col-xl-3" style={{paddingRight : 0}}>
                                            <CardAntd item={item} width={"100%"} height={255}/>
                                      </div>
                                    )
                                })
                            }
                        </div>
                        </div>

                        <div>
                            <h3 style={{ fontFamily: 'Nunito' }}>Menu của {storeDetail.name}</h3>
                            <br />
                            <div>
                                <Tabs defaultActiveKey="1" type="card" size={"large"}>
                                    {
                                        storeDetail.list_sub_food_type != undefined && storeDetail.list_sub_food_type.map(type => {
                                            return (
                                                <TabPane tab={type.sub_food_type_name} key={type.key}>
                                                    <div className="row">

                                                        {
                                                            type.list_food.map(item => {
                                                                return (
                                                                    <Link to={"/food/" + item.id} >
                                                                        <div className="col-xl-3">
                                                                            <CardSmall
                                                                                name={item.name}
                                                                                store={item.store_name}
                                                                                ima={item.avatar}
                                                                                rating={item.summary_rating}
                                                                                price={item.price}
                                                                                distance={item.distance}
                                                                                discountPercent={item.discount_percent}
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
                            <span style={{fontSize : 26, fontFamily : "Nunito", fontWeight : "200"}}>Bình luận {listComment.length !== 0 && <span>({listComment.length})</span>} </span>
                            <span style={{float : 'right'}}> Lọc theo : &ensp;
                            <Select defaultValue={filterComment} onChange={(value) => {
                                getCommentFilterd(value);
                            }}>
                                <Option value="0">Tất cả</Option>
                                <Option value="5">5 sao</Option>
                                <Option value="4">4 sao</Option>
                                <Option value="3">3 sao</Option>
                                <Option value="2">2 sao</Option>
                                <Option value="1">1 sao</Option>
                            </Select>
                            </span>
                            <Divider />
                            {
                                listCommentFilterd.length !== 0 && (
                                    <div>
                                        {
                                            listCommentFilterd.slice(5 * (commentPage - 1), 5 * commentPage).map(item => {
                                                return (
                                                    <CommentBox id={item.id}
                                                        name={item.user_app_name}
                                                        foodName={item.food_name}
                                                        rating={item.rating}
                                                        comment={item.comment}
                                                        likenum={item.like_number}
                                                        dislikenum={item.dislike_number} 
                                                        createddate={item.created_date}
                                                        listimage={item.list_image}
                                                        useravatar={item.user_avatar}
                                                        />
                                                );
                                            })
                                        }
                                        <Pagination current={commentPage} pageSize={5} onChange={onChangePageComment} total={listCommentFilterd.length} style={{ marginTop: 20, marginBottom: 50, display: "flex", justifyContent: "center", alignItems: "center" }} />
                                    </div>
                                )
                            }
                            {
                                listCommentFilterd.length === 0 && (<div style={{ marginBottom: 100 }}>Hiện chưa có đánh giá cho nhà hàng</div>)
                            }
                        </div>
                    </div>
                ) : <Loading />
            }
        </div>
    )
}