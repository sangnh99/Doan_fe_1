// import React, { useState, useEffect } from "react";
// import "./card.css";
// import { Link } from 'react-router-dom';
// import { Button, Modal, message } from "antd";
// import Item from "antd/lib/list/Item";
// import userFavouriteService from "../../services/user.favourite.service";
// import { FavouriteContext } from "../../contexts/favourite-context";

// const success = () => {
//     message.success('Đã xóa cửa hàng khỏi danh sách ưa thích !');
//   };

// export default function CardFavouriteStore(props) {
//     const [isModalVisible, setIsModalVisible] = useState(false);


//     const handleOk = () => {
//         userFavouriteService.deleteFromFavourite(JSON.parse(localStorage.getItem("user")).id, props.id, 1).then (
//             response => {
//                 success();
//             }
//         );
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };
//     return (
//         <FavouriteContext.Consumer >
//             {({ handleOk }) => (
//         <div className="card">
//             <Link to={"/store/" + props.id} >
//                 <div className="card-header">
//                     {/* <div className="profile">
//           <span className="letter">{props.name[0]}</span>
//         </div> */}

//                     <div className="card-title-group">
//                         <h5 className="card-title">{props.name}</h5>
//                         <div className="card-store">{props.store}</div>
//                     </div>
//                 </div>
//                 <img className="card-image" src={props.ima} alt="Logo" style={{ height: 170, width: 225 }} />
//                 <div>
//                     {props.address}
//                 </div>
//             </Link>
//             <div>
//                 <Button style={{ marginTop: 20, marginLeft: 30, color: "#fa541c" }} onClick={() => { setIsModalVisible(true) }}><span style={{ fontFamily: "Nunito" }}>Xóa khỏi ưa thích</span></Button>
//             </div>
//             {/* <div className="rating-text">
//           <b>{props.rating}</b> kişi bu tarifi beğendi.
//         </div> */}

//             <Modal title="Xóa khỏi ưa thích" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                 <p style={{ fontFamily: "Nunito" }}>Bạn có chắc chắn muốn xóa cửa hàng {props.name} khỏi danh sách ưa thích ?</p>
//             </Modal>
//         </div>
//             )}
//         </FavouriteContext.Consumer>
//     );
// }


import React, { useState, useEffect } from "react";
import "./card-favourite.css";
import { Link } from 'react-router-dom';
import { Button, Modal, message } from "antd";
import Item from "antd/lib/list/Item";
import userFavouriteService from "../../services/user.favourite.service";
import { FavouriteContext } from "../../contexts/favourite-context";

export default function CardFavouriteStore(props) {
    return (
        <FavouriteContext.Consumer >
            {({ showModal }) => (
                <div className="card4">
                    <Link to={"/food/" + props.id} >
                        {
                            props.discountPercent != null && (
                                <div class="ribbon4 ribbon-top-right4">
                                    <span>Giảm {props.discountPercent}%</span>
                                </div>
                            )
                        }
                        <div className="card-header">


                            <div className="card-title-group">
                                <h5 className="card-title">{props.name}</h5>
                                <div className="card-store">{props.store}</div>
                            </div>
                        </div>
                        {/* <div className="card-image" style={{ height: 170, width: 225 }}>
                            {
                                props.isBestSeller == 1 && (
                                    <img className="best-seller-icon-card" src="https://previews.123rf.com/images/artag/artag1211/artag121100001/16235733-best-seller-icon.jpg" />
                                )
                            }
                            <img src={props.ima} alt="Logo" style={{ height: 158, width: 208, borderRadius: 10 }} />
                        </div> */}
                        {
                            props.name.length < 20 ? (
                                <div className="card-image" style={{ height: 170, width: 225 }}>
                                    {
                                        props.isBestSeller == 1 && (
                                            <img className="best-seller-icon-card" src="https://previews.123rf.com/images/artag/artag1211/artag121100001/16235733-best-seller-icon.jpg" />
                                        )
                                    }
                                    <img src={props.ima} alt="Logo" style={{ height: 158, width: 208, borderRadius: 10 }} />
                                </div>
                            ) : (
                                <div className="card-image" style={{ height: 148, width: 225 }}>
                                    {
                                        props.isBestSeller == 1 && (
                                            <img className="best-seller-icon-card" src="https://previews.123rf.com/images/artag/artag1211/artag121100001/16235733-best-seller-icon.jpg" />
                                        )
                                    }
                                    <img src={props.ima} alt="Logo" style={{ height: 136, width: 208, borderRadius: 10 }} />
                                </div>
                            )
                        }
                        <div>
                            {props.address}
                        </div>
                    </Link>
                    <div>
                        {
                            props.discountPercent == null ? (<div><div className="card-text" style={{ display: "inline" }}>{parseInt(props.price).toLocaleString()} đ</div><div style={{ float: "right" }}>{props.distance} km</div></div>)
                                : (
                                    // <div className="card-text"><span style={{textDecoration: "line-through"}}>{props.price} đ</span> -> {parseInt(props.price)/100*(100-props.discountPercent)} đ</div>
                                    <div><div className="card-text" style={{ display: "inline" }}> <span style={{ color: "#d4380d" }}> {parseInt(props.price).toLocaleString()} đ </span></div><div style={{ float: "right" }}>{props.distance} km</div></div>
                                )
                        }
                    </div>
                    <div>
                        <Button style={{ marginTop: 10, marginLeft: 30, color: "#fa541c" }} onClick={() => { showModal(props.item, 2) }}><span style={{ fontFamily: "Nunito" }}>Xóa khỏi ưa thích</span></Button>
                    </div>
                    {/* <div className="rating-text">
          <b>{props.rating}</b> kişi bu tarifi beğendi.
        </div> */}


                </div>
            )}
        </FavouriteContext.Consumer>
    );
}