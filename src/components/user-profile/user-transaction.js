import React, { useState, useEffect, useRef } from "react";
import { messagge, Divider, Collapse, Comment, Avatar, List, Button, Modal, Rate, Input, message, Pagination, Upload, Spin } from 'antd';
import { Link } from "react-router-dom";
import userService from "../../services/user.service";
import Loading from "../loading/loading-component";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import './user-transaction.css';
import foodService from "../../services/food-service";
import { PlusOutlined } from '@ant-design/icons';
import authHeader from '../../services/auth-header';

const { Panel } = Collapse;
const { TextArea } = Input;

const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};

export default function UserTransaction(props) {
    const [transaction, setTransaction] = useState(null);
    const [visibleRating, setVisibleRating] = useState(false);
    const [currentStoreName, setCurrentStoreName] = useState("");
    const [currentItem, setCurrentItem] = useState(0);
    const [currentRating, setCurrentRating] = useState(0);
    const [currentComment, setCurrentComment] = useState("");

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);


    useEffect(() => {
        userService.getUserTransaction(JSON.parse(localStorage.getItem("user")).id).then(
            response => {
                setTransaction(response.data.data);
                console.log(response.data.data);
            }
        );
        const interval = setInterval(() => {
            userService.getUserTransaction(JSON.parse(localStorage.getItem("user")).id).then(
                response => {
                    setTransaction(response.data.data);
                    console.log(response.data.data);
                }
            );
        }, 1000 * 60);
        return () => {
            console.log(`clearing interval`);
            clearInterval(interval);
        };
    }, [])

    const handleCancelAntd = () => {
        setPreviewVisible(false)
    }

    const handlePreviewAntd = file => {
        setPreviewImage(file.thumbUrl);
        setPreviewVisible(true);
    };

    const handleUploadAntd = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleOk = () => {

        if (currentRating != 0) {
            let formData = new FormData();

            for (let i = 0; i < fileList.length; i++) {
                formData.append("files", fileList[i].originFileObj);
            }


            formData.append("user_app_id", JSON.parse(localStorage.getItem("user")).id);
            formData.append("rating", currentRating);
            formData.append("comment", currentComment);
            formData.append("food_id", currentItem.food_id);

            foodService.addRatingForFood(currentItem.food_id, formData).then(
                response => {
                    if ("success" != response.data.data) {
                        message.error("Đã có lỗi xảy ra trong quá trình đánh giá, vui lòng thử lại sau !")
                    } else {
                        message.success("Đã đánh giá thành công !");
                    }
                    setCurrentComment("");
                    setFileList([]);
                    setPreviewVisible(false);
                    setPreviewImage("");

                    setCurrentRating(0);
                    setVisibleRating(false);
                }
            );


            // foodService.addRatingForFood(JSON.parse(localStorage.getItem("user")).id, currentItem.food_id, currentRating, currentComment).then(
            //     response => {
            //         if ("success" != response.data.data) {
            //             message.error("Đã có lỗi xảy ra trong quá trình đánh giá, vui lòng thử lại sau !")
            //         } else {
            //             message.success("Đã đánh giá thành công !");
            //         }
            //         setCurrentComment("");
            //         setVisibleRating(false);
            //     }
            // );
        } else {
            message.info("Vui lòng lựa chọn điểm đánh giá !");
        }

    }

    const handleCancel = () => {
        setCurrentComment("");
        setFileList([]);
        setPreviewVisible(false);
        setPreviewImage("");

        setCurrentRating(0);
        setVisibleRating(false);
    }

    return (
        <div className="container" style={{ paddingRight: 200 }}>
            <p style={{ fontFamily: "Nunito", fontSize: 30, marginTop: 20 }}>Đơn hàng của bạn</p>
            <Modal title="Đánh giá về món ăn " visible={visibleRating} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ width: "100%", height: "100%" }}>
                    <p style={{ fontFamily: "Nunito", display: "flex", justifyContent: "center", alignItems: "center" }}>Đánh giá của bạn về món {currentItem.food_name} của {currentStoreName} ?</p>
                    <Rate onChange={(value) => { setCurrentRating(value) }} style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: 40 }} defaultValue={0} character={({ index }) => customIcons[index + 1]} />
                    <TextArea rows={4} style={{ fontFamily: "Nunito", display: "flex", justifyContent: "center", alignItems: "center" }} placeholder="Bình luận của bạn về món ăn" onChange={(event) => { setCurrentComment(event.target.value) }} />
                    <div style={{ marginTop: 12 }}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreviewAntd}
                            onChange={handleUploadAntd}
                            beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                        >
                            <div>
                                <PlusOutlined />
                                <div className="ant-upload-text">Upload ảnh đánh giá</div>
                            </div>
                        </Upload>

                        <Modal
                            visible={previewVisible}
                            footer={null}
                            onCancel={handleCancelAntd}
                        >
                            <img alt="example" style={{ width: "100%" }} src={previewImage} />
                        </Modal>
                    </div>
                </div>
            </Modal>
            <Divider />
            {
                transaction != null ? (
                    <div className="food-list">
                        {
                            transaction.length != 0 ? (
                                <div>
                                    {
                                        transaction.map(item => {
                                            return (
                                                <Collapse style={{ marginBottom: 10 }} style={{ backgroundColor: "#ffffff" }} className="transaction">
                                                    <Panel showArrow={false} header={(
                                                        <div className="row">
                                                            <div className="col-xl-2" style={{ height: 120 }}><img src={item.store_avatar} style={{ width: "100%", height: "100%", backgroundSize: "cover" }}></img></div>
                                                            <div className="col-xl-8" style={{ fontFamily: "Nunito" }}>
                                                                <p style={{ marginBottom: 2, fontSize: 18 }}><Link to={"/store/" + item.store_id}>{item.store_name}</Link>{item.status != "đã giao thành công" && <span>{" - " + item.status + " "}<Spin /> </span>}</p>
                                                                <p style={{ marginBottom: 2 }}>{item.address.substring(0, item.address.length - 16)}</p>
                                                                <p style={{ marginBottom: 2 }}>Phí áp dụng({item.distance}km): {(parseInt(item.distance * 7) * 1000).toLocaleString()}đ</p>
                                                                <p style={{ marginBottom: 2 }}>Phương thức thanh toán : {item.payment_method}</p>
                                                                <p style={{ marginBottom: 2 }}>Thời gian : {item.create_date}</p>
                                                            </div>
                                                            <div className="col-xl-2">
                                                                <p style={{ padding: "50px 10px", fontSize: 20 }}>{item.total.toLocaleString()}đ</p>
                                                            </div>
                                                        </div>
                                                    )} key="1" style={{ marginBottom: 10 }}>
                                                        <List
                                                            itemLayout="horizontal"
                                                            dataSource={item.list_item}
                                                            renderItem={childItem => (
                                                                <div>
                                                                    {

                                                                        childItem.amount != 0 ? (
                                                                            <List.Item>
                                                                                <List.Item.Meta
                                                                                    avatar={<Avatar src={childItem.food_avatar} />}
                                                                                    title={<Link to={"/food/" + childItem.food_id}>{childItem.food_name} x {childItem.amount}</Link>}
                                                                                    description={
                                                                                        <div>
                                                                                            {
                                                                                                childItem.discount_percent != null ? (
                                                                                                    <span><span style={{ color: "red" }}> {childItem.price.toLocaleString()}đ </span><span>{"<--"}</span> <span style={{ textDecoration: "line-through" }}> {childItem.original_price.toLocaleString()}đ </span> </span>
                                                                                                ) :
                                                                                                    (
                                                                                                        <span>{childItem.price.toLocaleString()}đ </span>
                                                                                                    )
                                                                                            }
                                                                                        </div>
                                                                                    }
                                                                                />
                                                                                {
                                                                                    item.status == "đã giao thành công" && (
                                                                                        <Button type="default" style={{ color: "#fa541c", display: "inline-block", float: "right" }} onClick={
                                                                                            () => {
                                                                                                setCurrentStoreName(item.store_name);
                                                                                                setCurrentItem(childItem);
                                                                                                setVisibleRating(true);
                                                                                            }
                                                                                        }>Đánh giá</Button>
                                                                                    )
                                                                                }
                                                                            </List.Item>
                                                                        ) : (
                                                                            <List.Item>
                                                                                <List.Item.Meta
                                                                                    avatar={<Avatar src={childItem.food_avatar} />}
                                                                                    title={"Món ăn đã bị xóa !"}
                                                                                    description={"Món ăn này đã bị xóa khỏi hệ thống !"}
                                                                                />
                                                                            </List.Item>
                                                                        )
                                                                    }
                                                                </div>
                                                            )}
                                                        />
                                                    </Panel>
                                                </Collapse>
                                            );
                                        })
                                    }
                                </div>
                            ) : <div style={{ fontFamily: "Nunito", fontSize: 30 }} >Bạn không có đơn hàng nào để hiển thị .</div>
                        }
                    </div>
                ) : <Loading />
            }
        </div>
    );
}