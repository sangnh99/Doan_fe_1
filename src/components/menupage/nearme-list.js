import React, { useRef, useState, useEffect } from "react";
import Card from '../card/card';
import { Link } from "react-router-dom";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './nearme-list.css';
import foodService from "../../services/food-service";
import Loading from "../loading/loading-component";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray"}}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
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
    <div>
      {
        listNearItem != null ? (
          <Slider {...settings}>
                {
                  listNearItem.map(item => {
                    return (
                      <Link to={"/store/" + item.id} >
                      <Card 
                      name={item.name}
                      store={item.distance + "km"}
                      ima={item.avatar}
                      distance={item.distance}
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


