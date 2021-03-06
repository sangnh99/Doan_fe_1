import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import authService from '../services/auth.service';
import { Alert } from 'antd';

export default class ValidateRegister extends Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
        this.onChangeToken = this.onChangeToken.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);

        this.state = {
            token: "",
            isSuccess: undefined,
            message: ""
        }
    }

    onSubmitForm() {
        authService.verifyemail(localStorage.getItem('email'), this.state.token).then(
            response => {
                this.setState({
                    message: response.data.message,
                    isSuccess: true
                });
                setTimeout(() => {                this.props.history.push("/login");
                window.location.reload();}, 1500);

            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    isSuccess: false,
                    message: resMessage
                });
            }
        );
    }


    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onChangeToken(e) {
        this.setState({
            token: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    {this.state.message && (
                        <Alert
                            message={this.state.message}
                            type="Error"
                            closable
                            style={{ backgroundColor: "red", textAlign: "center" }}
                        />
                    )}
                    {this.state.isSuccess && (
                        <Alert
                            message={'B???n ???? ????ng k?? th??nh c??ng'}
                            type="success"
                            closable
                            style={{textAlign: "center" }}
                        />
                    )}
                    <Form
                        style={{ marginTop: "220px" }}
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}

                        initialValues={{
                            remember: true,
                        }}

                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    //   style={{textAlign: "center"}}
                    >
                        <div style={{ textAlign: "center" }}>

                            <h4>Ch??ng t??i ???? g???i m?? x??c th???c qua ?????a ch??? email c???a b???n</h4>
                            <h4>Vui l??ng nh???p m?? x??c th???c v??o ?? b??n d?????i :</h4>
                        </div>
                        <Form.Item style={{ marginLeft: "100px" }}
                            label="M?? x??c th???c:"
                            name="token"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p m?? x??c th???c',
                                },
                            ]}
                            onChange={this.onChangeToken}

                        >
                            <Input onChange={this.oncChangeToken} style={{ width: "400px" }} />
                        </Form.Item>



                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{ marginLeft: "200px" }} onClick={this.onSubmitForm}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

