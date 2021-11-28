import React from "react";
import "./card.css";

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
      {/* <div className="profile">
          <span className="letter">{props.name[0]}</span>
        </div> */}
        <div className="card-title-group">
          <h5 className="card-title">{props.name}</h5>
          <div className="card-store">{props.store}</div>
        </div>
      </div>
      <img className="card-image" src={props.ima} alt="Logo" style={{height: 170, width:225}}/>
      <div className="card-text">{props.price} đ</div>
      <div className="card-like-bar">
      <i className="far fa-star"></i> <b>{props.rating}</b>
        {/* <div className="rating-text">
          <b>{props.rating}</b> kişi bu tarifi beğendi.
        </div> */}
      </div>
    </div>
  );
}