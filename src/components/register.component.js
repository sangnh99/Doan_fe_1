import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { Container } from "@mui/material";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vfullname = value => {
  if (value.length < 1 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The full name must be between 1 and 20 characters.
      </div>
    );
  }
};

const vconfirmpassword = value => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Confirm password incorrect .
      </div>
    );
  }
};

const vpassword = value => {
  console.log("password");
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vphone = value => {
  if (value.length < 8 || value.length > 20 ) {
    return (
      <div className="alert alert-danger" role="alert">
        Phone number is incorrect .
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeFullname = this.onChangeFullname.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullname: "",
      phone:"",        
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeFullname(e) {
    this.setState({
      fullname: e.target.value
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.confirmPassword,
        this.state.phone,
        this.state.fullname
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          localStorage.setItem("email", this.state.email);
          this.props.history.push("/validate-register");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="background">
      <div className="container">
          <div style={{paddingTop:"100px"}}>
            {/* <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            /> */}
            <div className="row" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
              <h1 style={{fontFamily: "Shadows Into Light, cursive"}}>Register</h1>
            </div>

            <Form
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                
                <div className="row">
                  <div className="col-xl-6">
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password">Confirm password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="confirm-password"
                        value={this.state.confirmPassword}
                        onChange={this.onChangeConfirmPassword}
                        validations={[required, vconfirmpassword]}
                      />
                    </div>


                  </div>

                  <div className="col-xl-6">
                  <div className="form-group">
                      <label htmlFor="fullname">Full Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={this.state.fullname}
                        onChange={this.onChangeFullname}
                        validations={[required, vfullname]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone number</label>
                      <Input
                        type="number"
                        className="form-control"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.onChangePhone}
                        validations={[required, vphone]}
                      />
                    </div>
                  </div>

                  <div className="form-group col-xl-12" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                    <button className="btn btn-primary btn-block"style={{width:"200px"}} >Sign Up</button>
                  </div>
                </div>
              )}

              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
      </div>
      
      </div>
    );
  }
}
