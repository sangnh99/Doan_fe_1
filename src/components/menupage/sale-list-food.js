import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './nearme-list.css';
import foodService from "../../services/food-service";
import Loading from "../loading/loading-component";
import CardAntdFood from "../card/card-antd-food";


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

export default function SaleListFood(props) {
  const [listSaleItem, setListSaleItem] = useState(null);

  useEffect(() => {
    foodService.getListSaleFood(JSON.parse(localStorage.getItem("user")).id).then(
      response => {
        setListSaleItem(response.data.data);
      }
    );
  }, [])

  return (
    <div style={{marginTop : 30, marginBottom : 50}}>
      {
        listSaleItem!= null ? (
          <Slider {...settings}>
                {
                  listSaleItem.map(item => {
                    return (
                      <Link to={"/food/" + item.id} >
                      <CardAntdFood
                        item = {item}
                        width={"255px"}
                        height={"230px"}
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


