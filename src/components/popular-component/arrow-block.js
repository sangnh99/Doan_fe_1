import React, {useState, useEffect} from "react";
import './arrow-block.css';
import { HomeOutlined } from "@mui/icons-material";

export default function ArrowBlock(props){
    return (
        <div className="arrow-steps clearfix">
        <div className="step current"> <span><HomeOutlined style={{fontSize : 24}}/> {props.title}</span> </div>
        </div>
    )
}