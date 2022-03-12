import { Divider, message, Spin } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import foodService from "../../services/food-service";
import './search.css';
import { Radio, Pagination } from "antd";
import { BrowserRouter as Router, useHistory, Link } from 'react-router-dom';
import Loading from "../loading/loading-component";
import CardFindFood from "../card/card-find-food.js";
import CardFindStore from "../card/card-find-store.js";

export default function SearchBar() {
    const [valueSearch, setValueSearch] = useState("");
    const [typeSearch, setTypeSearch] = useState("1");
    const [listItem, setListItem] = useState([]);
    const [offset, setOffset] = useState(1);
    const [typeSearchResult, setTypeSearchResult] = useState(null);
    const [totalRow, setTotalRow] = useState(null);
    const [isFind, setIsFind] = useState(0);
    const [isSpin, setIsSpin] = useState(false);

    const onSearch = (page = offset) => {
        if (typeSearch != typeSearchResult){
            page = 1;
            setOffset(1);
        }
        foodService.getAllByValueSearch(valueSearch, typeSearch, page).then(
            response => {
                setTypeSearchResult(parseInt(response.data.message));
                setTimeout(() => {
                    setListItem(response.data.data);
                    setTotalRow(response.data.total_rows);
                }, 50);
                setIsFind(1);
                setIsSpin(false);
                console.log("message :" + response.data.total_rows);
            }
        );
    }

    // const onSearchOffset = (page = offset) => {
    //     foodService.getAllByValueSearch(valueSearch, typeSearch, page).then(
    //         response => {
    //             setListItem(response.data.data);
    //             setTypeSearchResult(response.data.message);
    //             console.log("message :" + response.data.typeSearchResult);
    //         }
    //     );
    // }

    // const onChangePage = (page) => {
    //     console.log("change page")
    //     setOffset(page);
    //     onSearchOffset(page);
    // };

    const resetPage = () => {
        setOffset(1);
    }

    const history = useHistory();

    return (
        <Spin spinning={isSpin}>
        <div style={{ marginBottom: 150, marginTop: 100 }} >
            <h2 style={{ textAlign: "center", fontFamily: 'Nunito' }}>Tìm kiếm nhà hàng, món ăn</h2>
            <Radio.Group defaultValue="1" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }} onChange={(event) => { setTypeSearch(event.target.value);}}>
                <Radio.Button value="1">Nhà hàng</Radio.Button>
                <Radio.Button value="2">Món ăn</Radio.Button>
            </Radio.Group>
            <form action="" className="search-bar">
                <input placeholder="Tìm nhà hàng, quán ăn" className="input-search" type="search" name="search" required onChange={(event) => { setValueSearch(event.target.value) }} />
                <button className="search-btn" type="button" onClick={() => {setIsSpin(true); onSearch() }}>
                    <span>Search</span>
                </button>
            </form>
            <div className="container">
                <Divider />
                {
                    listItem.length != 0 && (
                        <div>
                            {
                                (typeSearchResult == 1) && (
                                    <div className="row">
                                        {
                                            listItem.map(item => {// nha hang
                                                return (
                                                    <div className="col-xl-3" style={{ marginTop: 25 }}>
                                                        <CardFindStore item={item}
                                                            width={"255px"} />
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                )
                            }
                            {
                                (typeSearchResult == 2) && (// quan an
                                    <div className="row">
                                        {
                                            listItem.map(item => {
                                                return (
                                                    <div className="col-xl-3" style={{ marginTop: 50 }}>
                                                        <Link to={"/food/" + item.id} >
                                                            <div>
                                                                <CardFindFood
                                                                    name={item.name}
                                                                    store={item.store_name}
                                                                    ima={item.avatar != null ? item.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl85MbwvCl_l-ri_GAYI2iCr8F8cSze8Ho8A&usqp=CAU"}
                                                                    rating={item.summary_rating}
                                                                    price={item.price}
                                                                    discountPercent={item.discount_percent}
                                                                    originalPrice={item.original_price}
                                                                    distance={item.distance}
                                                                    isBestSeller={item.is_best_seller}
                                                                    totalBuy={item.total_buy}
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
                                    <div style={{ marginTop: 40 }}>
                                        <Pagination current={offset} onChange={(value) => { setOffset(value);setIsSpin(true); onSearch(value) }} total={totalRow} pageSize={12} style={{ display : "flex", justifyContent : "center", alignItems : "center" }} />;
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                {
                    (listItem.length == 0 && isFind == 1 && isSpin == false) && (
                        <p style={{ textAlign: "center" }}>Không có kết quả cần tìm!</p>
                    )
                }
            </div>
        </div>
        </Spin>
    )
}


