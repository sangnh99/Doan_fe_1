import React, { useState, useEffect } from "react";
import './menu-option.css';

export default function MenuOption(props) {
    return (
        <div>
            <button class="button-52_com" role="button">Cơm</button>
            <button class="button-52_bun" role="button">Bún/phở</button>
            <button class="button-52_anvat" role="button">Ăn vặt/Đồ ăn nhanh</button>
            <button class="button-52_dacsan" role="button">Đặc sản</button>
            <button class="button-52_healthy" role="button">Healthy</button>
            <button class="button-52_drink" role="button">Đồ uống</button>
        </div>
    );
}