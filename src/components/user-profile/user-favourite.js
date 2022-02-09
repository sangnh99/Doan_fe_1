import React, { useState, useEffect } from "react";
import userFavouriteService from "../../services/user.favourite.service";
import CardSmall from "../card/card-small";
import { message, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import CardFavouriteStore from "../card/card-favourite-store";
import CardFavouriteFood from "../card/card-favourite-food";
import { FavouriteContext, FavouriteProvider } from "../../contexts/favourite-context";
const { TabPane } = Tabs;

export default function UserFavourite(props) {
    const [favourite, setFavourite] = useState(null);
    const [listFood, setListFood] = useState([]);
    const [listStore, setListStore] = useState([]);

    // useEffect(() => {
    //     userFavouriteService.getListFavouriteItem(JSON.parse(localStorage.getItem("user")).id).then(
    //         response => {
    //             setFavourite(response.data.data);
    //             setListFood(response.data.data.list_foods);
    //             setListStore(response.data.data.list_stores);
    //         }
    //     );
    // }, []);

    return (
        <FavouriteProvider >
            <FavouriteContext.Consumer >
                {({ favourite, listFood, listStore }) => (

                    <div className="container">
                        {
                            favourite != null && (
                                <Tabs defaultActiveKey="1" type="card" size={"large"} style={{ marginTop: 45 }}>
                                    <TabPane tab={"Cửa hàng"} key={"1"}>
                                        <div className="row">
                                            {
                                                listStore.length != 0 ? listStore.map(item => {
                                                    return (
                                                        // <Link to={"/store/" + item.id} >
                                                        <div className="col-xl-3">
                                                            <CardFavouriteStore
                                                                item={item}
                                                                id={item.id}
                                                                name={item.name}
                                                                store={item.store_name}
                                                                ima={item.avatar}
                                                                address={item.address}
                                                                distance={item.distance}
                                                            />
                                                        </div>

                                                    )
                                                })
                                                    : <div style={{ marginLeft : 40}}><h2 style={{ fontFamily: 'Nunito', fontSize : 30 }}>Bạn chưa có nhà hàng ưa thích nào !</h2> </div>
                                            }


                                        </div>


                                    </TabPane>
                                    <TabPane tab={"Món ăn"} key={"2"}>
                                        <div className="row">

                                            {
                                                listFood.length != 0 ? listFood.map(item => {
                                                    return (
                                                        <div className="col-xl-3">
                                                            <CardFavouriteFood
                                                                item={item}
                                                                id={item.id}
                                                                name={item.name}
                                                                store={item.store_name}
                                                                ima={item.avatar}
                                                                rating={item.rating}
                                                                price={item.price}
                                                                discountPercent = {item.discount_percent}
                                                                distance={item.distance}
                                                                isBestSeller={item.is_best_seller}
                                                                totalBuy={item.total_buy}
                                                            />
                                                        </div>
                                                    )
                                                })
                                                    : <div style={{ marginLeft : 40}}><h2 style={{ fontFamily: 'Nunito', fontSize : 30 }}>Bạn chưa có món ăn ưa thích nào !</h2> </div>
                                            }


                                        </div>
                                    </TabPane>
                                </Tabs>
                            )
                        }
                    </div>
                )
                }
            </FavouriteContext.Consumer>
        </FavouriteProvider>
    );
}