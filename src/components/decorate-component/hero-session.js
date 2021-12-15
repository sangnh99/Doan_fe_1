/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Radio } from 'antd';
import { SearchOutlined, TagOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';

export default function HeroSession() {

  return (
    <div style={{ position: "relative" }}>
      <div style={{ width: 1100, height: 500, backgroundSize: "cover", background: 'url("http://nextrestaurants.com/wp-content/uploads/2019/10/Restaurant-Instagram-Photography.png")' }}>
        <div style={{
          position: "absolute", bottom: 200,
          left: 30
        }}>
          <h1 style={{ color: "white", fontFamily: 'Nunito' }}>Lựa chọn món ăn bạn yêu </h1>
          <h2 style={{ color: "white", fontFamily: 'Nunito' }}> thích trong nháy mắt</h2>
          <Link to={"/search"} ><Button type="primary" style={{marginTop : 20}} icon={<SearchOutlined style={{fontSize : 18, marginBottom : 5}}/>} size={"large"} shape= "round">
          Tìm kiếm món ăn
          </Button>&emsp;
          </Link>
          <Button  type="primary" style={{marginTop : 20, backgroundColor: "#52c41a"}} icon={<TagOutlined  style={{fontSize : 18, marginBottom : 5}}/>} size={"large"} shape= "round">
          Khám phá
          </Button>
        </div>
      </div>
    </div>
  )
}
