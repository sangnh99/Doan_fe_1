import React, {useState, useEffect} from "react";
import './arrow-block.css';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function ArrowBlockRecommend(props){
    return (
        <div className="arrow-steps clearfix">
        <div className="step current"> <span><RestaurantIcon style={{fontSize : 24}}/> {props.title}</span> </div>
        </div>
    )
}