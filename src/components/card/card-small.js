// import React from "react";
// import "./card.css";
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// export default function CardSmall(props) {
//   return (
//     <div className="card1" style={{ width: 250, height: 350 }}>
//       {
//         props.discountPercent != null && (
//           <div class="ribbon ribbon-top-right">
//             <span>Giảm {props.discountPercent}%</span>
//           </div>
//         )
//       }
//       <div className="card-header">
//         <div className="card-title-group">
//           <h5 className="card-title">{props.name}</h5>
//           <div className="card-store">{props.store}</div>
//         </div>
//       </div>
//       <div className="card-image" style={{ height: 170, width: 207 }}>
//         {
//           props.isBestSeller == 1 && (
//             <img className="best-seller-icon-card" src="https://previews.123rf.com/images/artag/artag1211/artag121100001/16235733-best-seller-icon.jpg" />
//           )
//         }
//         <img src={props.ima} alt="Logo" style={{ height: 150, width: "100%", borderRadius: 10 }} />
//       </div>
//       {
//         props.discountPercent == null ? (<div><div className="card-text" style={{ display: "inline" }}>{parseInt(props.price).toLocaleString()} đ</div><div style={{ float: "right" }}>{props.distance} km</div></div>)
//           : (
//             <div><div className="card-text" style={{ display: "inline" }}> <span style={{ color: "#d4380d" }}> {parseInt(props.price).toLocaleString()} đ </span></div><div style={{ float: "right" }}>{props.distance} km</div></div>
//           )
//       }
//       <div className="card-like-bar">
//         <i className="fas fa-star" style={{ color: "#fadb14" }}></i>&nbsp;
//         {
//           props.rating != 0 ? (
//             <span>{props.rating.substring(0, 3)}</span>
//           ) : (
//             <span style={{ fontFamily: "Nunito" }}>Chưa có đánh giá</span>
//           )
//         }
//         <span style={{ float: "right" }}>{props.totalBuy} <span><ShoppingCartOutlinedIcon style={{ fontSize: 13 }} /></span></span>
//       </div>
//     </div>
//   );
// }


import React from "react";
import "./card.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function CardSmall(props) {
  return (
    <div className="card2">
      {
        props.discountPercent != null && (
          <div class="ribbon2 ribbon-top-right2">
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
      {
        props.name.length < 19 ? (
          <div className="card-image" style={{ height: 170, width: 207 }}>
            {
              props.isBestSeller == 1 && (
                <img className="best-seller-icon-card" src="https://previews.123rf.com/images/artag/artag1211/artag121100001/16235733-best-seller-icon.jpg" />
              )
            }
            <img src={props.ima} alt="Logo" style={{ height: "100%", width: "100%", borderRadius: 10 }} />
          </div>
        ) : (
          <div className="card-image" style={{ height: 148, width: 207 }}>
            {
              props.isBestSeller == 1 && (
                <img className="best-seller-icon-card" src="https://previews.123rf.com/images/artag/artag1211/artag121100001/16235733-best-seller-icon.jpg" />
              )
            }
            <img src={props.ima} alt="Logo" style={{ height: 145, width: "100%", borderRadius: 10 }} />
          </div>
        )
      }
      {
        props.discountPercent == null ? (<div><div className="card-text" style={{ display: "inline" }}>{parseInt(props.price).toLocaleString()} đ</div><div style={{ float: "right" }}>{props.distance} km</div></div>)
          : (
            <div><div className="card-text" style={{ display: "inline" }}> <span style={{ color: "#d4380d" }}> {parseInt(props.price).toLocaleString()} đ </span></div><div style={{ float: "right" }}>{props.distance} km</div></div>
          )
      }
      <div className="card-like-bar">
        <i className="fas fa-star" style={{ color: "#fadb14" }}></i>&nbsp;
        {
          (props.rating != 0 && props.rating != null ) ? (
            <span>{props.rating.substring(0, 3)}</span>
          ) : (
            <span style={{ fontFamily: "Nunito" }}>Chưa có đánh giá</span>
          )
        }
        <span style={{ float: "right" }}>{props.totalBuy} <span><ShoppingCartOutlinedIcon style={{ fontSize: 13 }} /></span></span>
      </div>
    </div>
  );
}