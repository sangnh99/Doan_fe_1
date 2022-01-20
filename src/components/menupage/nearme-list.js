import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './nearme-list.css';
import foodService from "../../services/food-service";
import Loading from "../loading/loading-component";
import CardAntd from "../card/card-antd";
import CardAntdStore from "../card/card-antd-store";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ background: "gray"}}
      onClick={onClick}
    >
      aaa
    </div>
  );
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

export default function NearMeList(props) {
  const [listNearItem, setListNearItem] = useState(null);

  useEffect(() => {
    foodService.getListNearFood(JSON.parse(localStorage.getItem("user")).id).then(
      response => {
        setListNearItem(response.data.data);
      }
    );
  }, [])

  return (
    <div style={{marginTop : 30, marginBottom : 25}}>
      {
        listNearItem != null ? (
          <Slider {...settings}>
                {
                  listNearItem.map(item => {
                    return (
                      <Link to={"/store/" + item.id} >
                      <CardAntdStore 
                        item = {item}
                        width={"255px"}
                      />
                      </Link>
                    )
                  })
                }
        </Slider>
        ) : <Loading />
      }
</div>
  );
}


