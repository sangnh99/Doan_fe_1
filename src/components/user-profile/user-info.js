// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { Form, Input, InputNumber, Button, message } from 'antd';
// import imageService from '../../services/image-service';
// import userService from '../../services/user.service';
// import { EditOutlined, CloseSquareFilled } from '@ant-design/icons';
// import { UserInfoContext } from '../../contexts/user-info-context';

// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not a valid email!',
//     number: '${label} is not a valid number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };

// export default function UserInfo () {
//   const [fullName, setFullName] = useState(JSON.parse(localStorage.getItem("userInfo")).full_name);
//   const [email, setEmail] = useState(JSON.parse(localStorage.getItem("userInfo")).email);
//   const [phone, setPhone] = useState(JSON.parse(localStorage.getItem("userInfo")).phone);
//   const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userInfo")).address);
//   const [ima, setIma] = useState(JSON.parse(localStorage.getItem("userInfo")).avatar);
//   const [ava, setAva] = useState(JSON.parse(localStorage.getItem("userInfo")).avatar != null ? JSON.parse(localStorage.getItem("userInfo")).avatar : "https://abcgcabogados.com/wp-content/uploads/2019/11/sin-perfil.jpg");
//   const [canUpdate, setCanUpdate] = useState(false);


//   const onFinish = (values) => {
//   };

//   const success = () => {
//     message.success('Cập nhật thông tin cá nhân thành công !');
//   };


//   const fileSeletedHandler = event => {
//     var reader = new FileReader();
//     var url = reader.readAsDataURL(event.target.files[0]);
//     reader.onloadend = function (e) {
//       setAva([reader.result])
//     };
//     setIma(event.target.files[0]);
//   }

//   const fileUploadHandler = () => {

//     console.log(fullName);
//     console.log(phone);
//     console.log(address);
//     console.log(ava)
    
//     const formData = new FormData();
//     formData.append('filea', ima);

//     userService.updateUserInfo(JSON.parse(localStorage.getItem("userInfo")).id, fullName, phone, address, "ava");
//     ima !== null && imageService.postImageUserAvatar(formData, JSON.parse(localStorage.getItem("user")).id);
//     success();
//     userService.getUserInfo(JSON.parse(localStorage.getItem("user")).id).then(response => {
//       localStorage.setItem("userInfo", JSON.stringify(response.data.data));
//       console.log(response.data.data);
//     });
//   }

//   return (
          
//     <Form name="nest-messages" validateMessages={validateMessages} style={{marginTop : 100}}>
//     <div className="row">

//     <div className="col-xl-6">
//       <Form.Item>
//       {canUpdate === true ? <CloseSquareFilled onClick={() => {setCanUpdate(false)}} style={{fontSize : 30}}/> : <EditOutlined onClick={() => {setCanUpdate(true)}}  style={{fontSize : 30}}/>}
//       </Form.Item>

//     <UserInfoContext.Consumer>
//       {({ fullNameContext }) => (
//             <Form.Item
//             name={['user', 'name']}
//             label="Tên đầy đủ"
//             >
//             <Input initialValue={fullNameContext} onChange={(event) => {
//               setFullName(event.target.value);
//             }} disabled={!canUpdate}/> {fullNameContext}
      
//           </Form.Item>
//       )}
//       </UserInfoContext.Consumer>
//     <Form.Item
//       name={['user', 'email']}
//       label={(<span>Email &emsp;&emsp;&emsp;</span>)}
//       >
//       <Input defaultValue={email} disabled="true" onChange={(event) => {
//         setEmail(event.target.value);
//       }} />&emsp;
//     </Form.Item>
//     <Form.Item name={['user', 'phone']} label="Số điện thoại:">
//       <Input defaultValue={phone} onChange={(event) => {
//         setPhone(event.target.value);
//       }} disabled={!canUpdate}/>&emsp;
//     </Form.Item>
//     <Form.Item name={['user', 'address']} label={(<span>Địa chỉ &emsp;&emsp;&ensp;</span>)}>
//       <Input.TextArea defaultValue ={address} onChange={(event) => {
//         setAddress(event.target.value);
//       }} disabled={!canUpdate}/>&emsp;
//     </Form.Item>
//     <Form.Item name={['user', 'avatar']} label={(<span>Ảnh đại diện</span>)}>
//           <Input type="file" accept="image/*" onChange={fileSeletedHandler} disabled={!canUpdate}/>
//     </Form.Item>
//     <Form.Item >
//       {/* <Button type="primary" htmlType="submit"> */}
//       <Button type="primary" onClick={fileUploadHandler} disabled={!canUpdate} htmlType="submit">
//         Submit  
//       </Button>
//     </Form.Item>

//       </div>
//       <div className="col-xl-5">
//         <img src={ava} style = {{height : 300}}></img>
//       </div>
//     </div>
//   </Form>
//         )
// };





//============================================================================================



// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { Form, Input, InputNumber, Button, message } from 'antd';
// import imageService from '../../services/image-service';
// import userService from '../../services/user.service';
// import { EditOutlined, CloseSquareFilled } from '@ant-design/icons';


// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not a valid email!',
//     number: '${label} is not a valid number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };

// export default function UserInfo () {
//   const [form] = Form.useForm();
//   const [fullName, setFullName] = useState(JSON.parse(localStorage.getItem("userInfo")).full_name);
//   const [email, setEmail] = useState(JSON.parse(localStorage.getItem("userInfo")).email);
//   const [phone, setPhone] = useState(JSON.parse(localStorage.getItem("userInfo")).phone);
//   const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userInfo")).address);
//   const [ima, setIma] = useState(JSON.parse(localStorage.getItem("userInfo")).avatar);
//   const [ava, setAva] = useState(JSON.parse(localStorage.getItem("userInfo")).avatar != null ? JSON.parse(localStorage.getItem("userInfo")).avatar : "https://abcgcabogados.com/wp-content/uploads/2019/11/sin-perfil.jpg");
//   const [canUpdate, setCanUpdate] = useState(false);

//   const success = () => {
//     message.success('Cập nhật thông tin cá nhân thành công !');
//   };


//   const fileSeletedHandler = event => {
//     var reader = new FileReader();
//     var url = reader.readAsDataURL(event.target.files[0]);
//     reader.onloadend = function (e) {
//       setAva([reader.result])
//     };
//     setIma(event.target.files[0]);
//   }

//   const fileUploadHandler = () => {

//     console.log(fullName);
//     console.log(phone);
//     console.log(address);
//     console.log(ava)
    
//     const formData = new FormData();
//     formData.append('filea', ima);

//     userService.updateUserInfo(JSON.parse(localStorage.getItem("userInfo")).id, fullName, phone, address, "ava");
//     ima !== null && imageService.postImageUserAvatar(formData, JSON.parse(localStorage.getItem("user")).id);
//     success();
//     userService.getUserInfo(JSON.parse(localStorage.getItem("user")).id).then(response => {
//       localStorage.setItem("userInfo", JSON.stringify(response.data.data));
//       console.log(response.data.data);
//     });
//   }

//   useEffect(() => {
//     if (data) {
//       form.setFieldsValue({
//         user: {
//           name: 'a'
//         }
//       })
//     }
//   }, [data])

//   return (
//     <Form form={form} name="nest-messages" validateMessages={validateMessages} style={{marginTop : 100}}>
//       <div>
//         {
//           localStorage.getItem("userInfo")
//         }
//       </div>
//       <div className="row">

//       <div className="col-xl-6">
//         <Form.Item>
//         {canUpdate === true ? <CloseSquareFilled onClick={() => {setCanUpdate(false)}} style={{fontSize : 30}}/> : <EditOutlined onClick={() => {setCanUpdate(true)}}  style={{fontSize : 30}}/>}
//         </Form.Item>

//       <Form.Item
//         name={['user', 'name']}
//         label="Tên đầy đủ"
//         >
//         <Input defaultValue={fullName} onChange={(event) => {
//           setFullName(event.target.value);
//         }} disabled={!canUpdate}/>

//       </Form.Item>
//       <Form.Item
//         name={['user', 'email']}
//         label={(<span>Email &emsp;&emsp;&emsp;</span>)}
//         >
//         <Input defaultValue={email} disabled="true" onChange={(event) => {
//           setEmail(event.target.value);
//         }} />&emsp;
//       </Form.Item>
//       {/* <Form.Item
//         name={['user', 'age']}
//         label="Age"
//         rules={[
//           {
//             type: 'number',
//             min: 0,
//             max: 99,
//           },
//         ]}
//         >
//         <InputNumber />
//       </Form.Item> */}
//       <Form.Item name={['user', 'phone']} label="Số điện thoại:">
//         <Input defaultValue={phone} onChange={(event) => {
//           setPhone(event.target.value);
//         }} disabled={!canUpdate}/>&emsp;
//       </Form.Item>
//       <Form.Item name={['user', 'address']} label={(<span>Địa chỉ &emsp;&emsp;&ensp;</span>)}>
//         <Input.TextArea defaultValue ={address} onChange={(event) => {
//           setAddress(event.target.value);
//         }} disabled={!canUpdate}/>&emsp;
//       </Form.Item>
//       <Form.Item name={['user', 'avatar']} label={(<span>Ảnh đại diện</span>)}>
//             <Input type="file" accept="image/*" onChange={fileSeletedHandler} disabled={!canUpdate}/>
//       </Form.Item>
//       <Form.Item >
//         {/* <Button type="primary" htmlType="submit"> */}
//         <Button type="primary" onClick={fileUploadHandler} disabled={!canUpdate} htmlType="submit">
//           Submit  
//         </Button>
//       </Form.Item>

//         </div>
//         <div className="col-xl-5">
//           <img src={ava} style = {{height : 300}}></img>
//         </div>
//       </div>
//     </Form>
//   );
// };

// =========================================================================



import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, message } from 'antd';
import imageService from '../../services/image-service';
import userService from '../../services/user.service';
import { EditOutlined, CloseSquareFilled } from '@ant-design/icons';
import UploadForm from './upload-file'


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
  const [form] = Form.useForm();
  // const [fullName, setFullName] = useState(JSON.parse(localStorage.getItem("userInfo")).full_name);
  // const [email, setEmail] = useState(JSON.parse(localStorage.getItem("userInfo")).email);
  // const [phone, setPhone] = useState(JSON.parse(localStorage.getItem("userInfo")).phone);
  // const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userInfo")).address);
  // const [ima, setIma] = useState(JSON.parse(localStorage.getItem("userInfo")).avatar);
  // const [ava, setAva] = useState(JSON.parse(localStorage.getItem("userInfo")).avatar != null ? JSON.parse(localStorage.getItem("userInfo")).avatar : "https://abcgcabogados.com/wp-content/uploads/2019/11/sin-perfil.jpg");
  const [ima, setIma] = useState(null);
  const [ava, setAva] = useState(null);
  const [data, setData] = useState(null);
  const [canUpdate, setCanUpdate] = useState(false);

  useEffect(() => {
    userService.getUserInfo(JSON.parse(localStorage.getItem("user")).id).then(response => {
      setData(response.data.data);
      console.log("address",response.data.data.address);
      form.setFieldsValue({
        user: {
          name : response.data.data.full_name,
          email : response.data.data.email,
          phone : response.data.data.phone,
          address : response.data.data.address,
          avatar : response.data.data.avatar
        }
      })
    });
  }, []);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        user: {
          name : data.full_name,
          email : data.email,
          phone : data.phone,
          address : data.address,
          avatar : data.avatar
        }
      })
    }
  }, [data])

  const success = () => {
    message.success('Cập nhật thông tin cá nhân thành công !');
  };


  // const fileSeletedHandler = event => {
  //   var reader = new FileReader();
  //   var url = reader.readAsDataURL(event.target.files[0]);
  //   reader.onloadend = function (e) {
  //     setAva([reader.result])
  //   };
  //   setIma(event.target.files[0]);
  //   // const formData = new FormData();
  //   // formData.append('filea', event.target.files[0]);
  //   // imageService.postImageUserAvatar(formData, JSON.parse(localStorage.getItem("user")).id);
  // }

  const fileUploadHandler = () => {
    const values = form.getFieldsValue();

    console.log(values.user.full_name);
    console.log(values.user.phone);

    const formData = new FormData();
    formData.append('filea', ima);

    userService.updateUserInfo(JSON.parse(localStorage.getItem("userInfo")).id, values.user.name, values.user.phone, values.user.address, "ava");
    // ima !== null && imageService.postImageUserAvatar(formData, JSON.parse(localStorage.getItem("user")).id);
    success();
    // userService.getUserInfo(JSON.parse(localStorage.getItem("user")).id).then(response => {
    //   localStorage.setItem("userInfo", JSON.stringify(response.data.data));
    //   console.log(response.data.data);
    // });
  }



  return (
    <Form form={form} name="nest-messages" onFinish={fileUploadHandler} validateMessages={validateMessages} style={{marginTop : 100}}>
      <div className="row">
      <div className="col-xl-6">
        <Form.Item>
        {canUpdate === true ? <CloseSquareFilled onClick={() => {setCanUpdate(false)}} style={{fontSize : 30}}/> : <EditOutlined onClick={() => {setCanUpdate(true)}}  style={{fontSize : 30}}/>}
        </Form.Item>

      <Form.Item
        name={['user', 'name']}
        label={(<span>Tên đầy đủ&emsp;</span>)}
        >
        <Input disabled={!canUpdate}/>

      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label={(<span>Email &emsp;&emsp;&emsp;</span>)}
        >
        <Input disabled={!canUpdate}/>
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
        <Input disabled={!canUpdate}/>
      </Form.Item>
      <Form.Item name={['user', 'address']} label={(<span>Địa chỉ &emsp;&emsp;&ensp;</span>)}>
        <Input.TextArea disabled={!canUpdate}/>
      </Form.Item>
      {/* <Form.Item label={(<span>Ảnh đại diện</span>)}>
            <Input type="file" accept="image/*" onChange={fileSeletedHandler} />
      </Form.Item> */}

      <Form.Item >
        {/* <Button type="primary" htmlType="submit"> */}
        <Button type="primary" disabled={!canUpdate} htmlType="submit">
          Submit  
        </Button>
      </Form.Item>

        </div>
        <div className="col-xl-5">
        <UploadForm data={data} name={['user', 'avatar']} form={form} />
        </div>
      </div>
    </Form>
  );
};


