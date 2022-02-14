// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";

// import AuthService from "../services/auth.service";
// import { Container } from "@mui/material";

// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const email = value => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vusername = value => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const vfullname = value => {
//   if (value.length < 1 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The full name must be between 1 and 20 characters.
//       </div>
//     );
//   }
// };

// const vconfirmpassword = value => {
//   if (value.length < 6 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Confirm password incorrect .
//       </div>
//     );
//   }
// };

// const vpassword = value => {
//   console.log("password");
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

// const vphone = value => {
//   if (value.length < 8 || value.length > 20 ) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Phone number is incorrect .
//       </div>
//     );
//   }
// };

// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
//     this.onChangePhone = this.onChangePhone.bind(this);
//     this.onChangeFullname = this.onChangeFullname.bind(this);

//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       fullname: "",
//       phone:"",        
//       successful: false,
//       message: ""
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   onChangePhone(e) {
//     this.setState({
//       phone: e.target.value
//     });
//   }

//   onChangeFullname(e) {
//     this.setState({
//       fullname: e.target.value
//     });
//   }

//   onChangeConfirmPassword(e) {
//     this.setState({
//       confirmPassword: e.target.value
//     });
//   }

//   handleRegister(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       successful: false
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.register(
//         this.state.username,
//         this.state.email,
//         this.state.password,
//         this.state.confirmPassword,
//         this.state.phone,
//         this.state.fullname
//       ).then(
//         response => {
//           this.setState({
//             message: response.data.message,
//             successful: true
//           });
//           localStorage.setItem("email", this.state.email);
//           this.props.history.push("/validate-register");
//           window.location.reload();
//         },
//         error => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           this.setState({
//             successful: false,
//             message: resMessage
//           });
//         }
//       );
//     }
//   }

//   render() {
//     return (
//       <div className="background">
//       <div className="container">
//           <div style={{paddingTop:"100px"}}>
//             {/* <img
//               src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//               alt="profile-img"
//               className="profile-img-card"
//             /> */}
//             <div className="row" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
//               <h1 style={{fontFamily: "Shadows Into Light, cursive"}}>Đăng kí</h1>
//             </div>

//             <Form
//               onSubmit={this.handleRegister}
//               ref={c => {
//                 this.form = c;
//               }}
//             >
//               {!this.state.successful && (

//                 <div className="row">
//                   <div className="col-xl-6">
//                     <div className="form-group">
//                       <label htmlFor="username">Tên đăng nhập</label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         name="username"
//                         value={this.state.username}
//                         onChange={this.onChangeUsername}
//                         validations={[required, vusername]}
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label htmlFor="password">Mật khẩu</label>
//                       <Input
//                         type="password"
//                         className="form-control"
//                         name="password"
//                         value={this.state.password}
//                         onChange={this.onChangePassword}
//                         validations={[required, vpassword]}
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
//                       <Input
//                         type="password"
//                         className="form-control"
//                         name="confirm-password"
//                         value={this.state.confirmPassword}
//                         onChange={this.onChangeConfirmPassword}
//                         validations={[required, vconfirmpassword]}
//                       />
//                     </div>


//                   </div>

//                   <div className="col-xl-6">
//                   <div className="form-group">
//                       <label htmlFor="fullname">Tên đầy đủ</label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         name="fullname"
//                         value={this.state.fullname}
//                         onChange={this.onChangeFullname}
//                         validations={[required, vfullname]}
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label htmlFor="email">Email</label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         name="email"
//                         value={this.state.email}
//                         onChange={this.onChangeEmail}
//                         validations={[required, email]}
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label htmlFor="phone">Số điện thoại</label>
//                       <Input
//                         type="number"
//                         className="form-control"
//                         name="phone"
//                         value={this.state.phone}
//                         onChange={this.onChangePhone}
//                         validations={[required, vphone]}
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group col-xl-12" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
//                     <button className="btn btn-primary btn-block"style={{width:"200px"}} >Đăng kí</button>
//                   </div>
//                 </div>
//               )}

//               {this.state.message && (
//                 <div className="form-group">
//                   <div
//                     className={
//                       this.state.successful
//                       ? "alert alert-success"
//                       : "alert alert-danger"
//                     }
//                     role="alert"
//                   >
//                     {this.state.message}
//                   </div>
//                 </div>
//               )}
//               <CheckButton
//                 style={{ display: "none" }}
//                 ref={c => {
//                   this.checkBtn = c;
//                 }}
//               />
//             </Form>
//           </div>
//       </div>

//       </div>
//     );
//   }
// }





// // import React, { Component } from "react";
// // import Form from "react-validation/build/form";
// // import Input from "react-validation/build/input";
// // import CheckButton from "react-validation/build/button";
// // import { isEmail } from "validator";

// // import AuthService from "../services/auth.service";
// // import { Container } from "@mui/material";

// // const required = value => {
// //   if (!value) {
// //     return (
// //       <div className="alert alert-danger" role="alert">
// //         This field is required!
// //       </div>
// //     );
// //   }
// // };

// // const email = value => {
// //   if (!isEmail(value)) {
// //     return (
// //       <div className="alert alert-danger" role="alert">
// //         This is not a valid email.
// //       </div>
// //     );
// //   }
// // };

// // const vusername = value => {
// //   if (value.length < 3 || value.length > 20) {
// //     return (
// //       <div className="alert alert-danger" role="alert">
// //         The username must be between 3 and 20 characters.
// //       </div>
// //     );
// //   }
// // };

// // const vfullname = value => {
// //   if (value.length < 1 || value.length > 20) {
// //     return (
// //       <div className="alert alert-danger" role="alert">
// //         The full name must be between 1 and 20 characters.
// //       </div>
// //     );
// //   }
// // };

// // const vconfirmpassword = value => {
// //   if (value.length < 6 || value.length > 20) {
// //     return (
// //       <div className="alert alert-danger" role="alert">
// //         Confirm password incorrect .
// //       </div>
// //     );
// //   }
// // };

// // const vpassword = value => {
// //   console.log("password");
// //   if (value.length < 6 || value.length > 40) {
// //     return (
// //       <div className="alert alert-danger" role="alert">
// //         The password must be between 6 and 40 characters.
// //       </div>
// //     );
// //   }
// // };

// // const vphone = value => {
// //   if (value.length < 8 || value.length > 20 ) {
// //     return (
// //       <div className="alert alert-danger" role="alert">
// //         Phone number is incorrect .
// //       </div>
// //     );
// //   }
// // };

// // export default class Register extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.handleRegister = this.handleRegister.bind(this);
// //     this.onChangeUsername = this.onChangeUsername.bind(this);
// //     this.onChangeEmail = this.onChangeEmail.bind(this);
// //     this.onChangePassword = this.onChangePassword.bind(this);
// //     this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
// //     this.onChangePhone = this.onChangePhone.bind(this);
// //     this.onChangeFullname = this.onChangeFullname.bind(this);

// //     this.state = {
// //       username: "",
// //       email: "",
// //       password: "",
// //       confirmPassword: "",
// //       fullname: "",
// //       phone:"",        
// //       successful: false,
// //       message: ""
// //     };
// //   }

// //   onChangeUsername(e) {
// //     this.setState({
// //       username: e.target.value
// //     });
// //   }

// //   onChangeEmail(e) {
// //     this.setState({
// //       email: e.target.value
// //     });
// //   }

// //   onChangePassword(e) {
// //     this.setState({
// //       password: e.target.value
// //     });
// //   }

// //   onChangePhone(e) {
// //     this.setState({
// //       phone: e.target.value
// //     });
// //   }

// //   onChangeFullname(e) {
// //     this.setState({
// //       fullname: e.target.value
// //     });
// //   }

// //   onChangeConfirmPassword(e) {
// //     this.setState({
// //       confirmPassword: e.target.value
// //     });
// //   }

// //   handleRegister(e) {
// //     e.preventDefault();

// //     this.setState({
// //       message: "",
// //       successful: false
// //     });

// //     this.form.validateAll();

// //     if (this.checkBtn.context._errors.length === 0) {
// //       AuthService.register(
// //         this.state.username,
// //         this.state.email,
// //         this.state.password,
// //         this.state.confirmPassword,
// //         this.state.phone,
// //         this.state.fullname
// //       ).then(
// //         response => {
// //           this.setState({
// //             message: response.data.message,
// //             successful: true
// //           });
// //           localStorage.setItem("email", this.state.email);
// //           this.props.history.push("/validate-register");
// //           window.location.reload();
// //         },
// //         error => {
// //           const resMessage =
// //             (error.response &&
// //               error.response.data &&
// //               error.response.data.message) ||
// //             error.message ||
// //             error.toString();

// //           this.setState({
// //             successful: false,
// //             message: resMessage
// //           });
// //         }
// //       );
// //     }
// //   }

// //   render() {
// //     return (
// //       <div className="background">
// //       <div className="container">
// //           <div style={{paddingTop:"100px"}}>
// //             {/* <img
// //               src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
// //               alt="profile-img"
// //               className="profile-img-card"
// //             /> */}
// //             <div className="row" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
// //               <h1 style={{fontFamily: "Shadows Into Light, cursive"}}>Đăng kí</h1>
// //             </div>

// //             <Form
// //               onSubmit={this.handleRegister}
// //               ref={c => {
// //                 this.form = c;
// //               }}
// //             >
// //               {!this.state.successful && (

// //                 <div className="row">
// //                   <div className="col-xl-6">
// //                     <div className="form-group">
// //                       <label htmlFor="username">Tên đăng nhập</label>
// //                       <Input
// //                         type="text"
// //                         className="form-control"
// //                         name="username"
// //                         value={this.state.username}
// //                         onChange={this.onChangeUsername}
// //                         validations={[required, vusername]}
// //                       />
// //                     </div>

// //                     <div className="form-group">
// //                       <label htmlFor="password">Mật khẩu</label>
// //                       <Input
// //                         type="password"
// //                         className="form-control"
// //                         name="password"
// //                         value={this.state.password}
// //                         onChange={this.onChangePassword}
// //                         validations={[required, vpassword]}
// //                       />
// //                     </div>
// //                     <div className="form-group">
// //                       <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
// //                       <Input
// //                         type="password"
// //                         className="form-control"
// //                         name="confirm-password"
// //                         value={this.state.confirmPassword}
// //                         onChange={this.onChangeConfirmPassword}
// //                         validations={[required, vconfirmpassword]}
// //                       />
// //                     </div>


// //                   </div>

// //                   <div className="col-xl-6">
// //                   <div className="form-group">
// //                       <label htmlFor="fullname">Tên đầy đủ</label>
// //                       <Input
// //                         type="text"
// //                         className="form-control"
// //                         name="fullname"
// //                         value={this.state.fullname}
// //                         onChange={this.onChangeFullname}
// //                         validations={[required, vfullname]}
// //                       />
// //                     </div>

// //                     <div className="form-group">
// //                       <label htmlFor="email">Email</label>
// //                       <Input
// //                         type="text"
// //                         className="form-control"
// //                         name="email"
// //                         value={this.state.email}
// //                         onChange={this.onChangeEmail}
// //                         validations={[required, email]}
// //                       />
// //                     </div>

// //                     <div className="form-group">
// //                       <label htmlFor="phone">Số điện thoại</label>
// //                       <Input
// //                         type="number"
// //                         className="form-control"
// //                         name="phone"
// //                         value={this.state.phone}
// //                         onChange={this.onChangePhone}
// //                         validations={[required, vphone]}
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group col-xl-12" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
// //                     <button className="btn btn-primary btn-block"style={{width:"200px"}} >Đăng kí</button>
// //                   </div>
// //                 </div>
// //               )}

// //               {this.state.message && (
// //                 <div className="form-group">
// //                   <div
// //                     className={
// //                       this.state.successful
// //                       ? "alert alert-success"
// //                       : "alert alert-danger"
// //                     }
// //                     role="alert"
// //                   >
// //                     {this.state.message}
// //                   </div>
// //                 </div>
// //               )}
// //               <CheckButton
// //                 style={{ display: "none" }}
// //                 ref={c => {
// //                   this.checkBtn = c;
// //                 }}
// //               />
// //             </Form>
// //           </div>
// //       </div>

// //       </div>
// //     );
// //   }
// // }


import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service';
import "../cssConfig/register-component.css";

export default function Register(props) {
  const [form] = Form.useForm();

  const history = useHistory();

  const uploadHandler = () => {
    const values = form.getFieldsValue();
    if (values.user.password != values.user.confirmpassword){
      message.error("Xác nhận mật khẩu bị sai, vui lòng nhập lại !")
    } else {
      AuthService.register(
        values.user.username, values.user.email, values.user.password,
         values.user.confirmpassword, values.user.phone, values.user.fullname).then(
           (response) => {
          localStorage.setItem("email", values.user.email);
          history.push("/validate-register");
          window.location.reload();           
           }
         ).catch (error => {
            message.error(error.response.data.message);
         })
    }
  }


  return (
    <div className='register'>
      <div className="container-register">
        <div className="cover">
          <div className="front">
            <img src="https://i.pinimg.com/736x/0b/f8/7c/0bf87c3470715a7d1d440ddd15c33f33.jpg" alt="" />
            <div className="text">
              <span className="text-1">Đặt đồ ăn nhanh chóng <br />và tiện lợi ! </span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
          {/* <div className="back">
            <img className="backImg" src="https://i.pinimg.com/736x/0b/f8/7c/0bf87c3470715a7d1d440ddd15c33f33.jpg" alt="" />
            <div className="text">
              <span className="text-1">Complete miles of journey <br /> with one step</span>
              <span className="text-2">Let's get started</span>
            </div>
          </div> */}
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="signup-form">
              <div className="title">Đăng kí</div>
              <Form form={form} name="nest-messages" onFinish={uploadHandler} style={{ marginTop: 20 }}>
                <div className="row">
                  <div className="col-xl-6">

                    <Form.Item
                      name={['user', 'username']}
                      label={(<span>Tên đăng nhập&emsp;&ensp;</span>)}
                      style={{ width: 390 }}
                      rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                    >
                      <Input />

                    </Form.Item>
                    <Form.Item
                      name={['user', 'fullname']}
                      label={(<span>Tên đầy đủ &emsp;&emsp;&emsp;</span>)}
                      style={{ width: 390 }}
                      rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'email']}
                      label={(<span>Email &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;</span>)}
                      style={{ width: 390 }}
                      rules={[
                        {
                          required: true, message: 'Vui lòng nhập email'
                        }, 
                        {
                          pattern : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message : "Vui lòng nhập đúng định dạng email"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'phone']} label={(<span>Số điện thoại &emsp;&emsp;&nbsp;</span>)}
                      style={{ width: 390 }}
                      rules={[
                        {
                          pattern: /^(?:\d*)$/,
                          message: "Vui lòng chỉ nhập số",
                        },
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'password']} label={(<span>Mật khẩu   &emsp;&emsp;&ensp;&ensp;&ensp;&nbsp;&nbsp;</span>)}
                      style={{ width: 390 }}
                      rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item name={['user', 'confirmpassword']} label={(<span>Xác nhận mật khẩu</span>)}
                      style={{ width: 390 }}
                      rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu' }]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item >
                      <Button type="primary" htmlType="submit">
                        Tiếp tục
                      </Button>
                    </Form.Item>

                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}