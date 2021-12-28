import React, { useRef, useState, useEffect } from "react";
import Card from '../card/card';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './nearme-list.css';


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red"}}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

export default function NearMeList(props) {
  return (
    <div>
    <Slider {...settings}>
      <Card
        ima="https://www.thaistreet.com.vn/wp-content/uploads/2021/04/Food.jpg"
        liked={1}
        likeCount={1}
      />
      <Card
        ima="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
        liked={1}
        likeCount={1}
        />
      <Card
        ima="https://www.thaistreet.com.vn/wp-content/uploads/2021/04/Food.jpg"
        liked={1}
        likeCount={1}
        />
      <Card
        ima="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
        liked={1}
        likeCount={1}
      />
      <Card
        ima="https://www.thaistreet.com.vn/wp-content/uploads/2021/04/Food.jpg"
        liked={1}
        likeCount={1}
      />
      <Card
        ima="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
        liked={1}
        likeCount={1}
        />
    </Slider>
</div>
  );
}


{/* <Card
ima="https://www.thaistreet.com.vn/wp-content/uploads/2021/04/Food.jpg"
liked={1}
likeCount={1}
/>
<Card
ima="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
liked={1}
likeCount={1}
/> */}