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

                <Router>
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
                                <Option value="id">Sản phẩm mới</Option>
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
                            <MenuSpecific type="1" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
                        </Route>
                        <Route path="/menu/noodle">
                            <MenuSpecific type="2" sortValue={this.state.sortValue} sortType={this.state.sortType} searchValue={this.state.searchValue} />
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
                </Router>
            </div>
        );
    }
}