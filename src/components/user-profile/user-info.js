import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button } from 'antd';
import imageService from '../../services/image-service';
import userService from '../../services/user.service';
import { EditOutlined, CloseSquareFilled } from '@ant-design/icons';


const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default function UserInfo () {
  const [fullName, setFullName] = useState(JSON.parse(localStorage.getItem("userInfo")).full_name);
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("userInfo")).email);
  const [phone, setPhone] = useState(JSON.parse(localStorage.getItem("userInfo")).phone);
  const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userInfo")).address);
  const [ima, setIma] = useState(JSON.parse(localStorage.getItem("userInfo")).avatar);
  const [ava, setAva] = useState("https://abcgcabogados.com/wp-content/uploads/2019/11/sin-perfil.jpg");
  const [canUpdate, setCanUpdate] = useState(false);


  const onFinish = (values) => {
  };

  // const getBase64 = (file, cb) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //       cb(reader.result)
  //   };
  //   reader.onerror = function (error) {
  //       console.log('Error: ', error);
  //   };
  // }

  const fileSeletedHandler = event => {
    setIma(event.target.files[0]);
    console.log(event.target.files[0]);

  }

  const fileUploadHandler = () => {

    console.log(fullName);
    console.log(phone);
    console.log(address);
    console.log(ava)
    
    const formData = new FormData();
    formData.append('filea', ima);

    userService.updateUserInfo(JSON.parse(localStorage.getItem("userInfo")).id, fullName, phone, address, ava);
    ima !== null && imageService.postImageUserAvatar(formData, JSON.parse(localStorage.getItem("user")).id);
  }

  return (
    <Form name="nest-messages" validateMessages={validateMessages} style={{marginTop : 100}}>
      <div className="row">

      <div className="col-xl-6">
        <Form.Item>
        {canUpdate === true ? <CloseSquareFilled onClick={() => {setCanUpdate(false)}} style={{fontSize : 30}}/> : <EditOutlined onClick={() => {setCanUpdate(true)}}  style={{fontSize : 30}}/>}
        </Form.Item>

      <Form.Item
        name={['user', 'name']}
        label="Tên đầy đủ"
        >
        <Input defaultValue={fullName} onChange={(event) => {
          setFullName(event.target.value);
        }} disabled={!canUpdate}/>

      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label={(<span>Email &emsp;&emsp;&emsp;</span>)}
        >
        <Input defaultValue={email} disabled="true" onChange={(event) => {
          setEmail(event.target.value);
        }} />&emsp;
      </Form.Item>
      {/* <Form.Item
        name={['user', 'age']}
        label="Age"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
        >
        <InputNumber />
      </Form.Item> */}
      <Form.Item name={['user', 'phone']} label="Số điện thoại:">
        <Input defaultValue={phone} onChange={(event) => {
          setPhone(event.target.value);
        }} disabled={!canUpdate}/>&emsp;
      </Form.Item>
      <Form.Item name={['user', 'address']} label={(<span>Địa chỉ &emsp;&emsp;&ensp;</span>)}>
        <Input.TextArea defaultValue ={address} onChange={(event) => {
          setAddress(event.target.value);
        }} disabled={!canUpdate}/>&emsp;
      </Form.Item>
      <Form.Item name={['user', 'avatar']} label={(<span>Ảnh đại diện</span>)}>
            <Input type="file" accept="image/*" onChange={fileSeletedHandler} disabled={!canUpdate}/>
      </Form.Item>
      <Form.Item >
        {/* <Button type="primary" htmlType="submit"> */}
        <Button type="primary" onClick={fileUploadHandler} disabled={!canUpdate} htmlType="submit">
          Submit  
        </Button>
      </Form.Item>

        </div>
        <div className="col-xl-5">
          <img src={ima != null ? ima : "https://abcgcabogados.com/wp-content/uploads/2019/11/sin-perfil.jpg"} style = {{height : 300}}></img>
        </div>
      </div>
    </Form>
  );
};