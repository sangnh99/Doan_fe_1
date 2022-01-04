import React, { Component } from 'react';
import userFavouriteService from '../services/user.favourite.service';
import { Button, Modal, message } from "antd";
export const FavouriteContext = React.createContext();

const success = () => {
    message.success('Đã xóa danh sách ưa thích !');
};


export class FavouriteProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favouriteContext: null,
            listFoodContext: [],
            listStoreContext: [],
            isModalVisible : false,
            item : null,
            type :null
        }
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        userFavouriteService.getListFavouriteItem(JSON.parse(localStorage.getItem("user")).id).then(
            response => {
                this.setState({
                    favouriteContext: response.data.data,
                    listFoodContext: response.data.data.list_foods,
                    listStoreContext: response.data.data.list_stores
                });
            }
        );
    }

    handleOk() {
        userFavouriteService.deleteFromFavourite(JSON.parse(localStorage.getItem("user")).id, this.state.item.id, this.state.type).then(
            response => {
                this.setState({
                    favouriteContext: response.data.data,
                    listFoodContext: response.data.data.list_foods,
                    listStoreContext: response.data.data.list_stores,
                    isModalVisible : false,
                    item : null
                });
                success();
            }
        );
    };

    showModal(item, type){
        this.setState({
            ...this.state,
            isModalVisible : true,
            item : item,
            type : type
        });
    }

    handleCancel () {
        this.setState({
            ...this.state,
            isModalVisible : false
        });
    };

    render() {
        return <FavouriteContext.Provider value={{
            favourite: this.state.favouriteContext,
            listFood: this.state.listFoodContext,
            listStore: this.state.listStoreContext,
            handleOk: this.handleOk,
            showModal : this.showModal
        }}>
            <div>
                {this.props.children}
                <Modal title="Xóa khỏi ưa thích" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p style={{ fontFamily: "Nunito" }}>Bạn có chắc chắn muốn xóa {this.state.item != null && this.state.item.name} khỏi danh sách ưa thích ?</p>
                </Modal>
            </div>
        </FavouriteContext.Provider>
    }
}