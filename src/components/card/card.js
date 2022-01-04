import React from "react";
import "./card.css";

export default function Card(props) {
  return (
    <div className="card">
      {
        props.discountPercent != null && (
          <div class="ribbon ribbon-top-right">
            <span>Giảm {props.discountPercent}%</span>
          </div>
        )
      }
      <div className="card-header">
        {/* <div className="profile">
          <span className="letter">{props.name[0]}</span>
        </div> */}
        <div className="card-title-group">
          <h5 className="card-title">{props.name}</h5>
          <div className="card-store">{props.store}</div>
        </div>
      </div>
      <img className="card-image" src={props.ima} alt="Logo" style={{ height: 170, width: 225 }} />
      {/* {
        props.discountPercent == null ? (<div className="card-text">{parseInt(props.price).toLocaleString()} đ</div>)
        : (
          // <div className="card-text"><span style={{textDecoration: "line-through"}}>{props.price} đ</span> -> {parseInt(props.price)/100*(100-props.discountPercent)} đ</div>
          <div className="card-text" style={{color : "#d4380d"}}>{parseInt(props.price).toLocaleString()} đ</div>
        )
      } */}
      {
        props.discountPercent == null ? (<div><div className="card-text" style={{ display: "inline" }}>{parseInt(props.price).toLocaleString()} đ</div><div style={{ float: "right" }}>{props.distance} km</div></div>)
          : (
            // <div className="card-text"><span style={{textDecoration: "line-through"}}>{props.price} đ</span> -> {parseInt(props.price)/100*(100-props.discountPercent)} đ</div>
            <div><div className="card-text" style={{ display: "inline" }}> <span style={{ color: "#d4380d" }}> {parseInt(props.price).toLocaleString()} đ </span></div><div style={{ float: "right" }}>{props.distance} km</div></div>
          )
      }
      <div className="card-like-bar">
        <i className="far fa-star"></i> <b>{props.rating}</b>
        {/* <div className="rating-text">
          <b>{props.rating}</b> kişi bu tarifi beğendi.
        </div> */}
      </div>
    </div>
  );
}