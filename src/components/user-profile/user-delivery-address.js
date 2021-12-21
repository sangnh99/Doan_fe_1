import { Divider, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { List, Modal } from 'antd';
import userAddressService from "../../services/user.address.service";
import { IoLocationOutline } from 'react-icons/io5';
import TestGoogleMapAutoComplete from "../test-ggmap/test-ggmap-autocomplete";

export default function UserDeliveryAddress(props) {
    const [data, setData] = useState([]);
    const [activeAddress, setActiveAddress] = useState(null);
    const [messageActiveAddress, setMessageActiveAddress] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [isVisibleActiveModal, setIsVisibleActiveModal] = useState(false);
    const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);

    useEffect(() => {
        userAddressService.getListAddressOfUser(JSON.parse(localStorage.getItem("user")).id).then(
            response => {
                setData(response.data.data);
                if (response.data.data.length != 0) {
                    setActiveAddress(response.data.data[0])
                }
            }
        );
    }, []);

    const changeAciveAddress = (item) => {
        setCurrentAddress(item);
        if (item.id == activeAddress.id) {
            // setMessageActiveAddress("Địa chỉ này đã được đặt làm địa chỉ chính !");
            info();
        } else {
            setMessageActiveAddress("Bạn muốn đặt " + item.address + " làm địa chỉ chính ?");
            setIsVisibleActiveModal(true);
        }
    }

    const info = () => {
        message.info("Địa chỉ này đã được đặt làm địa chỉ chính !");
    };

    const success = () => {
        message.success("Thay đổi địa chỉ chính thành công !");
    };

    const successDelete = () => {
        message.success("Xóa địa chỉ thành công !");
    };
    

    const handleOkActive = () => {

        userAddressService.setActiveAddress(JSON.parse(localStorage.getItem("user")).id, currentAddress.id).then(
            response => {
                setData(response.data.data);
                if (response.data.data.length != 0) {
                    setActiveAddress(response.data.data[0])
                }
                success();
            }
        )

        setIsVisibleActiveModal(false);
      };
    
      const handleCancelActive = () => {
        setIsVisibleActiveModal(false);
      };

      // =====

      const handleOkDelete = () => {
        userAddressService.deleteAddress(JSON.parse(localStorage.getItem("user")).id, currentAddress.id).then(
            response => {
                setData(response.data.data);
                if (response.data.data.length != 0) {
                    setActiveAddress(response.data.data[0])
                }
                successDelete();
            }
        )

        setIsVisibleDeleteModal(false);
      };
    
      const handleCancelDelete = () => {
        setIsVisibleDeleteModal(false);
      };

      // =======

      const handleOkAdd = () => {
        setIsVisibleAddModal(false);
      };
    
      const handleCancelAdd = () => {
        setIsVisibleAddModal(false);
      };

    return (
        <div className="container" style={{ marginTop: 35 }}>
            <Modal title="Thay đổi địa chỉ giao hàng" visible={isVisibleActiveModal} onOk={handleOkActive} onCancel={handleCancelActive}>
                <p>{messageActiveAddress}</p>
            </Modal>
            <Modal title="Xóa địa chỉ giao hàng" visible={isVisibleDeleteModal} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <p>Bạn có chắc muốn xóa địa chỉ {currentAddress != null && currentAddress.address} không ?</p>
            </Modal>
            <Modal width={1000} title="Thêm địa chỉ" visible={isVisibleAddModal} onOk={handleOkAdd} onCancel={handleCancelAdd}>
                <span style={{ marginLeft : 127, fontFamily: "Nunito", marginBottom : 50}}> Nhập tên địa điểm :</span>
                <Input type="text" style={{width :  700, marginLeft : 127}}/>
                <span style={{ marginLeft : 127, fontFamily: "Nunito", marginBottom : 50}}>Nhập ghi chú : </span>
                <Input type="text" style={{width : 700, marginLeft : 127, marginBottom : 20}}/>
                <TestGoogleMapAutoComplete />
            </Modal>
            <div>
                <span style={{ fontFamily: "Nunito", fontSize: 30 }}>Địa chỉ giao hàng </span>
                <Button size="large" style={{ float: "right" }} onClick={() => {setIsVisibleAddModal(true)}}><span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><PlusOutlined style={{ fontSize: 16 }} />&nbsp; Thêm địa chỉ</span></Button>
            </div>
            <Divider />
            <div>
                {
                    data.length != 0 ? (
                        <div>
                            {
                                activeAddress != null &&
                                <div style={{ marginBottom: 10 }}><span style={{ fontFamily: "Nunito", fontSize: 24 }}>Địa chỉ chính : <span> {activeAddress.name} - {activeAddress.address}</span></span></div>
                            }
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<IoLocationOutline fontSize="26px" style={{ color: "#fa541c" }} />}
                                            title={<a href="#">{item.name}</a>}
                                            description={(<span>{item.address}  {item.note != '' ? "-" + item.note : ''}</span>)}
                                        />
                                        <div><a style={{ color: "rgba(0, 0, 0, 0.85)" }} href="#" onClick={() => {
                                            changeAciveAddress(item)
                                        }}>Đặt làm địa chỉ chính</a>
                                            <Divider type="vertical" />
                                            <a style={{ color: "#f5222d" }} href="#" onClick={() => {setCurrentAddress(item) ; setIsVisibleDeleteModal(true)}}>Xóa</a></div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    ) : <div><span style={{ fontFamily: "Nunito", fontSize: 26 }}>Bạn chưa có địa chỉ giao hàng </span></div>
                }
            </div>
        </div>
    )
}