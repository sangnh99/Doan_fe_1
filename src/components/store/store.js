import { Divider, Tabs} from "antd";
import CommentBox from "../comment-box/comment-box";
import React, {useState, useEffect} from "react";
import { useParams } from 'react-router';
import storeService from "../../services/store-service";
import { Link } from 'react-router-dom';
import CardSmall from "../card/card-small";

const { TabPane } = Tabs;

export default function Store(props){
    const [storeId, setStoreId] = useState(useParams().id);
    const [storeDetail, setStoreDetail] = useState(0);
    const [listComment, setListComment] = useState([]);
    useEffect(() => {
        storeService.getStoreDetail(storeId).then(
            response => {
                setStoreDetail(response.data.data);
                setListComment(response.data.data.list_comments);
                console.log(response.data.data);
            }
        );
    }, []);

    return(
        <div className="container">
            <span ><Link to={"/home"}> Trang chủ </Link> </span> <span style={{ color: "#C0C0C0", fontSize: 16 }}> >> </span> <span style={{ color: "#187caa", fontSize: 16 }}>{storeDetail.name}</span>
            <div className="row">
                <div className="col-xl-5">
                    <img className="card-image" src={storeDetail.avatar} alt="Logo" style={{ backgroundSize: "cover", width: 450, height: 300 }} />
                </div>
                <div className="col-xl-7">
                    <h1 style={{ fontFamily: 'Nunito' }}>{storeDetail.name}</h1>
                    <h2>{storeDetail.address}</h2>  
                    <h4>Số điện thoại : {storeDetail.phone}</h4>
                </div>
            </div>
            <Divider />
            <div>
                <h3 style={{fontFamily: 'Nunito'}}>Menu của {storeDetail.name}</h3>
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
                                                                    rating={item.rating}
                                                                    price={item.price}
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
                                            foodName = {item.food_name}
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
                    listComment.length === 0 && (<div style={{ marginBottom: 100 }}>Hiện chưa có đánh giá cho nhà hàng</div>)
                }
            </div>
        </div>
    )
}