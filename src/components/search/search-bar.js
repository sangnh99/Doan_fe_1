import { Divider, message } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import foodService from "../../services/food-service";
import './search.css';
import { Radio, Pagination } from "antd";
import Card from "../card/card";
import { BrowserRouter as Router, useHistory, Link } from 'react-router-dom';

export default function SearchBar() {
    const [valueSearch, setValueSearch] = useState("");
    const [typeSearch, setTypeSearch] = useState("1");
    const [listItem, setListItem] = useState([]);
    const [offset, setOffset] = useState(1);
    const [typeSearchResult, setTypeSearchResult] = useState(null);

    const onSearch = () => {
        foodService.getAllByValueSearch(valueSearch, typeSearch, offset).then(
            response => {
                setListItem(response.data.data);
                setTypeSearchResult(response.data.message);
                console.log("message :" + response.data.data);
            }
        );
    }

    const onSearchOffset = (page) => {
        foodService.getAllByValueSearch(valueSearch, typeSearch, page).then(
            response => {
                setListItem(response.data.data);
                setTypeSearchResult(response.data.message);
                console.log("message :" + response.data.typeSearchResult);
            }
        );
    }

    const onChangePage = (page) => {
        console.log("change page")
        setOffset(page);
        onSearchOffset(page);
    };

    const history = useHistory();

    return (
        <div style={{ marginBottom: 150, marginTop: 100 }} >
            <h2 style={{ textAlign: "center", fontFamily: 'Nunito' }}>Tìm kiếm nhà hàng, món ăn</h2>
            <Radio.Group defaultValue="1" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }} onChange={(event) => { setTypeSearch(event.target.value) }}>
                <Radio.Button value="1">Nhà hàng</Radio.Button>
                <Radio.Button value="2">Món ăn</Radio.Button>
            </Radio.Group>
            <form action="" className="search-bar">
                <input placeholder="Tìm nhà hàng, quán ăn" className="input-search" type="search" name="search" required onChange={(event) => { setValueSearch(event.target.value) }} />
                <button className="search-btn" type="button" onClick={onSearch}>
                    <span>Search</span>
                </button>
            </form>
            <div className="container">
                <Divider />
                <div>
                    {
                        (listItem.length != 0 && typeSearchResult == 1) && (
                            <div className="row">
                                {
                                    listItem.map(item => {// nha hang
                                        return (
                                            <div className="col-xl-3">
                                                <Link to={"/store/" + item.id} >
                                                    <div>
                                                        <Card
                                                            name={item.name}
                                                            store={item.store_name}
                                                            ima={item.avatar}
                                                            rating={item.rating}
                                                            price={item.price}
                                                        />

                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    }
                    {
                        (listItem.length != 0 && typeSearchResult == 2) && (// quan an
                            <div className="row">
                                {
                                    listItem.map(item => {
                                        return (
                                            <div className="col-xl-3">
                                                <Link to={"/food/" + item.id} >
                                                    <div>
                                                        <Card
                                                            name={item.name}
                                                            store={item.store_name}
                                                            ima={item.avatar != null ? item.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl85MbwvCl_l-ri_GAYI2iCr8F8cSze8Ho8A&usqp=CAU"}
                                                            rating={item.rating}
                                                            price={item.price}
                                                            discountPercent = {item.discount_percent}
                                                            originalPrice = {item.original_price}
                                                        />

                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    }
                    {
                        typeSearchResult != null && (
                            <div>
                                <Pagination current={offset} onChange={onChangePage} total={50} style={{ marginBottom: 50, paddingLeft: 420 }} />;
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}