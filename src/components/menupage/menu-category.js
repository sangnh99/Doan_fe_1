import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MenuRice from "../menu-specific/menu-specific";
import TemporaryDrawer from '../sidebar/sidebar-menu';
import { Divider, Select, Input } from 'antd';
import MenuSpecific from '../menu-specific/menu-specific';
// import Divider from '@mui/material/Divider';
import { Pagination } from 'antd';


export default class MenuCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortValue: "id",
            sortType: "ASC",
            searchValue: ""
        }
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(value) {
        console.log(value);
    }


    render() {
        const { Option } = Select;
        const { Search } = Input;
        return (
            <div>

                    <div className="container" style={{ marginTop: 50 }}>
                        {/* <TemporaryDrawer>

                        </TemporaryDrawer> */}

                        <Search placeholder="Tìm nhà hàng, món ăn" onSearch={(value) => {
                            this.setState({
                                ...this.state,
                                searchValue: value
                            })
                        }} enterButton style={{ width: 300 }} />

                        <div style={{ float: "right", display: "inline" }}>
                            <span><b>Thứ tự: </b></span>
                            <Select defaultValue="ASC" onChange={(value) => {
                                this.setState({
                                    ...this.state,
                                    sortType: value
                                });
                            }}>
                                <Option value="ASC">Tăng dần</Option>
                                <Option value="DESC">Giảm dần</Option>
                            </Select>



                        </div>

                        <div style={{ float: "right", display: "inline" }}>
                            <span><b>  Sắp xếp theo: </b></span>
                            <Select defaultValue="id" onChange={(value) => {
                                this.setState({
                                    ...this.state,
                                    sortValue: value
                                });
                            }}>
                                <Option value="id">Món ăn mới</Option>
                                <Option value="price">Giá tiền</Option>
                                <Option value="summaryRating">Rating</Option>
                            </Select>
                            <Divider type="vertical" />


                        </div>
                        <Divider style={{ marginBottom: 0 }} />
                    </div>

                    );



                    <Switch>
                        <Route path="/menu/rice">
                            <MenuSpecific type="1" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} thisThing = {this} />
                        </Route>
                        <Route path="/menu/noodle">
                            <MenuSpecific type="2" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} thisThing = {this}/>
                        </Route>
                        <Route path="/menu/fastfood">
                            <MenuSpecific type="3" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
                        </Route>
                        <Route path="/menu/speciality">
                            <MenuSpecific type="4" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
                        </Route>
                        <Route path="/menu/healthy">
                            <MenuSpecific type="5" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
                        </Route>
                        <Route path="/menu/drink">
                            <MenuSpecific type="6" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
                        </Route>
                    </Switch>
            </div>
        );
    }
}

//===================================================================================================

// import React, { Component } from 'react';
// import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
// import MenuRice from "../menu-specific/menu-specific";
// import TemporaryDrawer from '../sidebar/sidebar-menu';
// import { Divider, Select, Input } from 'antd';
// import MenuSpecific from '../menu-specific/menu-specific';
// // import Divider from '@mui/material/Divider';
// import { Pagination } from 'antd';
// import { Link } from 'react-router-dom';


// export default class MenuCategory extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             sortValue: "id",
//             sortType: "ASC",
//             type: 0,
//             searchValue: ""
//         }
//         this.onSearch = this.onSearch.bind(this);
//         this.onChangeType= this.onChangeType.bind(this);
//     }

//     onSearch(value) {
//         console.log(value);
//     }

//     onChangeType(value){
//         this.setState({
//             ...this.state,
//             type: 2
//         });
//     }

//     render() {
//         const { Option } = Select;
//         const { Search } = Input;
//         return (
//             <div>

//                 <div className="container" style={{ marginTop: 50 }}>
//                     {/* <TemporaryDrawer>

//                         </TemporaryDrawer> */}

//                     <Search placeholder="Tìm nhà hàng, món ăn" onSearch={(value) => {
//                         this.setState({
//                             ...this.state,
//                             searchValue: value
//                         })
//                     }} enterButton style={{ width: 300 }} />

//                     <div style={{ float: "right", display: "inline" }}>
//                         <span><b>Thứ tự: </b></span>
//                         <Select defaultValue="ASC" onChange={(value) => {
//                             this.setState({
//                                 ...this.state,
//                                 sortType: value
//                             });
//                         }}>
//                             <Option value="ASC">Tăng dần</Option>
//                             <Option value="DESC">Giảm dần</Option>
//                         </Select>



//                     </div>

//                     <div style={{ float: "right", display: "inline" }}>
//                         <span><b>  Sắp xếp theo: </b></span>
//                         <Select defaultValue="id" onChange={(value) => {
//                             this.setState({
//                                 ...this.state,
//                                 sortValue: value
//                             });
//                         }}>
//                             <Option value="id">Sản phẩm mới</Option>
//                             <Option value="price">Giá tiền</Option>
//                             <Option value="summaryRating">Rating</Option>
//                         </Select>
//                         <Divider type="vertical" />


//                     </div>
//                     <Divider style={{ marginBottom: 0 }} />

//                     <div>
//                         <div className="row">
//                             <div className="col-xl-3">
//                                 <div className="w3-light-grey w3-bar-block" style={{ width: 270, height: 400, }}>
//                                     <h3 className="w3-bar-item" style={{


//                                     }}>Bạn muốn ăn gì </h3>

//                                     <Link to={"/menu/rice"}> <p className="w3-bar-item w3-button">Cơm</p></Link>
//                                     <Link to={"/menu/noodle"} onClick={this.onChangeType}> <p className="w3-bar-item w3-button">bun/pho</p></Link>
//                                     <Link to={"/menu/fastfood"}> <p className="w3-bar-item w3-button">an vat</p></Link>

//                                 </div>
//                             </div>
//                             <div className="col-xl-9">
//                                 <Switch>
//                                     <Route path="/menu/rice">
//                                         <MenuSpecific type="1" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
//                                     </Route>
//                                     <Route path="/menu/noodle">
//                                         <MenuSpecific type={this.state.type} sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
//                                     </Route>
//                                     <Route path="/menu/fastfood">
//                                         <MenuSpecific type="3" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
//                                     </Route>
//                                     <Route path="/menu/speciality">
//                                         <MenuSpecific type="4" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
//                                     </Route>
//                                     <Route path="/menu/healthy">
//                                         <MenuSpecific type="5" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
//                                     </Route>
//                                     <Route path="/menu/drink">
//                                         <MenuSpecific type="6" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
//                                     </Route>
//                                 </Switch>
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//                 );




//             </div>
//         );
//     }
// }