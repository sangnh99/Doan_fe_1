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

const success = () => {
    message.success('Đã xóa cửa hàng khỏi danh sách ưa thích !');
};

export default function CardFavouriteStore(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);


    return (
        <FavouriteContext.Consumer >
            {({ showModal }) => (
                <div className="card3">
                    <Link to={"/store/" + props.id} >
                        <div className="card-header">
                            {/* <div className="profile">
          <span className="letter">{props.name[0]}</span>
        </div> */}

                            <div className="card-title-group">
                                <h5 className="card-title">{props.name}</h5>
                                <div className="card-store">{props.distance} km</div>
                            </div>
                        </div>
                        <img className="card-image" src={props.ima} alt="Logo" style={{ height: 160, width: 225 }} />
                        <div style={{height: 40}}>
                            {props.address}
                        </div>
                    </Link>
                    <div>
                        <Button style={{ marginTop: 5, marginLeft: 30, color: "#fa541c" }} onClick={() => { showModal(props.item, 1) }}><span style={{ fontFamily: "Nunito" }}>Xóa khỏi ưa thích</span></Button>
                    </div>
                    {/* <div className="rating-text">
          <b>{props.rating}</b> kişi bu tarifi beğendi.
        </div> */}


                </div>
            )}
        </FavouriteContext.Consumer>
    );
}