import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FoodService from '../../services/food-service';
import Card from '../card/card';
import { Link } from 'react-router-dom';
import { Pagination, Row, Col } from 'antd';
import { useState, useEffect } from 'react';


// export default class MenuSpecific extends Component {
//     constructor(props) {
//         super(props);
//         console.log("constructor");
//         this.state = {
//             type: this.props.type,
//             sortType : "ASC",
//             sortValue: "price",
//             offset: 0,
//             listItems: []
//         }

//         console.log("state" + JSON.stringify(this.state));

//         this.onChangePage = this.onChangePage.bind(this);

//         this.getListFood = this.getListFood.bind(this);
//         this.getListFoodStart = this.getListFoodStart.bind(this);
//     }



//     componentDidMount() {
//         console.log("didmount");
//         this.getListFoodStart();
//     }

//     async getListFoodStart(offset = 0) {
//         console.log("start");
//         const response = await FoodService.getFoodByFoodType(this.props.type, 0, 9, "price", "ASC");
//         console.log(response.data.data);



//         this.setState({
//             ...this.state,
//             listItems: response.data.data
//         });
//     }

//     componentDidUpdate(pp, ps) {
//         console.log("update");
//         console.log(this.state.sortValue);
//         if (this.state.offset != ps.offset || this.state.sortType != this.props.sortType || this.state.sortValue != this.props.sortValue) {
//             this.getListFood(this.state.offset);
//             console.log('before', pp);
//             console.log('after', ps);
//         }
//     }

//     onChangePage(page) {
//         console.log(page);
//         this.setState({
//             ...this.state,
//             offset: page
//         });

//     };


//     async getListFood(offset = 0) {
//         const response = await FoodService.getFoodByFoodType(this.props.type, offset, 9, this.props.sortValue, this.props.sortType);
//         console.log(response.data.data);



//         this.setState({
//             ...this.state,
//             type: this.props.type,
//             sortType : this.props.sortType,
//             sortValue: this.props.sortValue,
//             listItems: response.data.data
//         });
//     }

//     render() {
//         console.log("render");
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-xl-3" style={{ display: "inline" }}>{this.props.type}</div>
//                     <div className="col-xl-9">
//                         {
//                             JSON.stringify(this.state)
//                         }
//                         <div className="row">
//                             {
//                                 this.state.listItems.map(item => {
//                                     return (
//                                         <div className="col-xl-4">
//                                             <Link to={"/menu/" + item.id} >
//                                                 <Card
//                                                     name={item.name}
//                                                     store={item.store_name}
//                                                     ima={item.avatar}
//                                                     rating={item.rating}
//                                                     price={item.price}
//                                                 />

//                                             </Link>
//                                         </div>
//                                     );
//                                 })
//                             }
//                             <Pagination current={this.state.offset} onChange={this.onChangePage} total={50} style={{ marginBottom: 50, display: "flex", justifyContent: "center", alignItems: "center" }} />;
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }


// =======================================================================================

// 

// =======================================================================================
export default function MenuSpecific(props) {
    const [type, setType] = useState(props.type);
    const [sortValue, setSortValue] = useState(props.sortValue);
    const [searchValue, SetSearchValue] = useState(props.searchValue);
    const [sortType, setSortType] = useState(props.sortType);
    const [listItems, setListItems] = useState([]);
    const [offset, setOffset] = useState(1);

    useEffect(() => {
        getListFood();
    }, []);

    useEffect(() => {
        console.log("update props");
        setSortValue(props.sortValue);
        setSortType(props.sortType);
        SetSearchValue(props.searchValue);
        // getListFood();
    }, [props.sortType, props.sortValue, props.searchValue]);

    useEffect(() => {
        console.log("update state");
        getListFood();
    }, [sortType, sortValue, offset, searchValue]);


    const getListFood = () => {
        FoodService.getFoodByFoodType(type, offset, 9, sortValue, sortType, searchValue).then(
            response => {
                console.log(response.data.data);
                setListItems(response.data.data);
            }
        );
    }


    function onChangePage(page) {
        console.log(page);
        setOffset(page);
    };

         return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-3" style={{ display: "inline", marginTop: 50 }}>
                    <div className="w3-light-grey w3-bar-block" style={{ width: 270, height: 400, }}>
                                    <h3 className="w3-bar-item" style={{

                                    }}>Bạn muốn ăn gì </h3>

                                    <Link to={"/menu/rice"}> <p href="#" className="w3-bar-item w3-button">Cơm</p></Link>
                                    <p href="#" className="w3-bar-item w3-button">Bún/phở</p>
                                    <p href="#" className="w3-bar-item w3-button">Ăn vặt</p>
                                    <p href="#" className="w3-bar-item w3-button">Đặc sản</p>
                                    <p href="#" className="w3-bar-item w3-button">Healthy</p>
                                    <p href="#" className="w3-bar-item w3-button">Đồ uống</p>
                                </div>
                    </div>
                    <div className="col-xl-9">
                        <div className="row">
                            {
                                listItems.map(item => {
                                    return (
                                        <div className="col-xl-4">
                                            <Link to={"/menu/" + item.id} >
                                                <Card
                                                    name={item.name}
                                                    store={item.store_name}
                                                    ima={item.avatar}
                                                    rating={item.rating}
                                                    price={item.price}
                                                />

                                            </Link>
                                        </div>
                                    );
                                })
                            }
                            <Pagination current={offset} onChange={onChangePage} total={50} style={{ marginBottom: 50, paddingLeft: 350 }} />;
                        </div>
                    </div>
                </div>
            </div>
        );
    
}