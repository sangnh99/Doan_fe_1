import React, {useRef, useState, useEffect} from "react";
import Card from '../card/card';
import {ArrowBackIosOutlined, ArrowForwardIosOutlined} from '@mui/icons-material';

export default function NearMeList (props){
    const [slideNumber, setSlideNumber] = useState(0);
    const listRef = useRef();
    const [isMoved, setIsMoved] = useState(false);

    const handleSlide = (direction) => {
        setIsMoved(true);

        const distance = listRef.current.getBoundingClientRect().x - 50;

        if (direction === 'left' && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${330 + distance}px)`;
        }

        if (direction === 'right' && slideNumber < 10) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-330 + distance}px)`;
        }
    }

    return (
        <div className='wrapper'>
            <ArrowBackIosOutlined
                className='sliderArrow left'
                onClick={() => handleSlide('left')}
                style={{ display: !isMoved && 'none' }}
            />

            <div className='container' ref={listRef}>
                
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
              ima="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
              liked={1}
              likeCount={1}
            /> 
                
            </div>

            <ArrowForwardIosOutlined className='sliderArrow right' onClick={() => handleSlide('right')} />
            
            {/* <Card
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
              ima="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
              liked={1}
              likeCount={1}
            /> */}
        </div>
    );
}