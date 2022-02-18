// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

// import { Alert } from 'antd';

// import AuthService from "../services/auth.service";
// import userService from "../services/user.service";

// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const onClose = (e) => {
//   console.log(e, 'I was closed.');
// };

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.handleLogin = this.handleLogin.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);

//     this.state = {
//       username: "",
//       password: "",
//       loading: false,
//       message: ""
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   handleLogin(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       loading: true
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.login(this.state.username, this.state.password).then(
//         () => {

//           this.props.history.push("/home");
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
//             loading: false,
//             message: resMessage
//           });
//         }
//       );
//     } else {
//       this.setState({
//         loading: false
//       });
//     }
//   }

//   render() {
//     return (
//       <div className="background">

//       <div className="container">
//         {this.state.message && (
//           <Alert
//           message={this.state.message}
//           type="Error"
//           closable
//           onClose={onClose}
//           style= {{backgroundColor: "red", textAlign: "center"}}
//           />
//           )}
//       <div className="row">
//       <div className="col-xl-4">

//         <div className="card card-container">
//           <img
//             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//             alt="profile-img"
//             className="profile-img-card"
//             />

//           <Form
//             onSubmit={this.handleLogin}
//             ref={c => {
//               this.form = c;
//             }}
//             >
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <Input
//                 type="text"
//                 className="form-control"
//                 name="username"
//                 value={this.state.username}
//                 onChange={this.onChangeUsername}
//                 validations={[required]}
//                 />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.onChangePassword}
//                 validations={[required]}
//                 />
//             </div>

//             <div className="form-group">
//               <button
//                 className="btn btn-primary btn-block"
//                 disabled={this.state.loading}
//                 >
//                 {this.state.loading && (
//                   <span className="spinner-border spinner-border-sm"></span>
//                   )}
//                 <span>Login</span>
//               </button>
//             </div>

//             <CheckButton
//               style={{ display: "none" }}
//               ref={c => {
//                 this.checkBtn = c;
//               }}
//               />
//           </Form>
//         </div>
//       </div>
//       <div className="col-xl-6 picture-right"></div>
// </div>
//               </div>
//               </div>
//     );
//   }
// }


import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import "../cssConfig/login-component.css";

export default function Login(props) {
    const [form] = Form.useForm();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const onFinish = (values) => {
        AuthService.login(values.username, values.password).then(
            (response) => {
              message.success("Bạn đã đăng nhập thành công !");
              setTimeout(() => {
                history.push("/home");
                window.location.reload();
              }, 1500);
            },
            error => {
                message.error("Bạn đã nhập sai tên hoặc mật khẩu, vui lòng nhập lại !");
            }
          );
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <section className='section-login'>
            <div class="form-container">
                <h1>Đăng nhập</h1>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                    form={form}
                >
                    <Form.Item
                        label={<span style={{color : "white"}}>Tên đăng nhập</span>}
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên đăng nhập !",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{color : "white"}}>Mật khẩu</span>}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu !',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" style={{width : 110}}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                <p style={{textAlign : "center"}}><Link to={"/forgot-password"} style={{color: "#096dd9" }}>Quên mật khẩu ?</Link></p>
            </div>
        </section>
    );
}