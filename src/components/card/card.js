import React from "react";
import "./card.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Card(props) {
  return (
    <div className="card1">
      {
        props.discountPercent != null && (
          <div class="ribbon ribbon-top-right">
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
        props.name.length < 20 ? (
          <div className="card-image" style={{ height: 180, width: 225 }}>
            {
              props.isBestSeller == 1 && (
                <img className="best-seller-icon-card" src="https://previews.123rf.com/images/artag/artag1211/artag121100001/16235733-best-seller-icon.jpg" />
              )
            }
            <img src={props.ima} alt="Logo" style={{ height: 168, width: "100%", borderRadius: 10 }} />
          </div>
        ) : (
          <div className="card-image" style={{ height: 158, width: 225 }}>
            {
              props.isBestSeller == 1 && (
                <img className="best-seller-icon-card" src="https://previews.123rf.com/images/artag/artag1211/artag121100001/16235733-best-seller-icon.jpg" />
              )
            }
            <img src={props.ima} alt="Logo" style={{ height: 146, width: "100%", borderRadius: 10 }} />
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
          props.rating != 0 ? (
            <span>{props.rating.substring(0, 3)}</span>
          ) : (
            <span style={{ fontFamily: "Nunito" }}>Chưa có đánh giá</span>
          )
        }
        <span style={{ float: "right" }}>{props.totalBuy} <span><ShoppingCartOutlinedIcon style={{ fontSize: 13 }} /></span></span>
        {/* <div className="rating-text">
          <b>{props.rating}</b> kişi bu tarifi beğendi.
        </div> */}
      </div>
    </div>
  );
}