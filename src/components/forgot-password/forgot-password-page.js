import React, { useState, useEffect } from "react";
import { Steps, Form, Input, Button, message } from 'antd';
import { useHistory } from "react-router-dom";
import authService from "../../services/auth.service";
import './forgot-password-page.css';

const { Step } = Steps;

export default function ForgotPasswordPage(props) {
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [tempEmail, setTempEmail] = useState("");
    const [token, setToken] = useState("");
    const [userAppId, setUserAppId] = useState(null);
    const [disable1, setDisable1] = useState(false);
    const [disable2, setDisable2] = useState(true);
    const [disable3, setDisable3] = useState(true);

    const history = useHistory();

    const onFinish1 = (values) => {
        setTempEmail(values.email);
        authService.confirmEmailForgotPassword(values.email).then(
            response => {
                setToken(response.data.data.token);
                setUserAppId(response.data.data.user_app_id);
                console.log(response.data.data);
                message.info("Vui lòng kiểm tra email mà chúng tôi đã gởi tới cho bạn !");
                setDisable1(true);
                setDisable2(false);
                setCurrent(current + 1);
            }
        ).catch (error => {
            message.error(error.response.data.message);
         })

    }

    const onFinish2 = (values) => {
        if (token != values.confirmtoken){
            message.error("Mã xác thực mà bạn nhập không đúng, vui lòng thử lại !");
        } else {
            setDisable2(true);
            setDisable3(false);
            setCurrent(current + 1);
            message.success("Bạn đã nhập thành công mã xác thực !")
        }

    }


    const onFinish3 = (values) => {
        if (values.confirmpassword != values.password){
            message.error("Xác nhận mật khẩu chưa chính xác, vui lòng nhập lại !") ;
        }else {
            authService.setNewPasswordForgotPassword(values.password, userAppId, tempEmail).then(
                response => {
                    message.success("Bạn đã đổi mật khẩu thành công !");
                    setTimeout(() => {history.push("/login");}, 1500);

                }
            ).catch(error => {
                message.error("Đã có lỗi xảy ra, vui lòng thử lại sau !");
            }) 
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="container-fluid">
            <div >
                <h2 style={{ textAlign: "center", fontFamily: "Nunito", marginTop: 100 }}>Đổi mật khẩu</h2>
            </div>
            <Steps current={current} style={{ width: 1350, marginTop: 80, marginBottom: 225, marginLeft: 50 }}>
                <Step title="Nhập email" disabled={disable1} description={<div>
                    <p>Hãy nhập email của bạn </p>
                    <Form
                        form={form1}
                        onFinish={onFinish1}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email của bạn !",
                                },
                                {
                                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Vui lòng nhập đúng định dạng email"
                                }
                            ]}
                        >

                            <Input style={{ width: 220 }} disabled={disable1}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" disabled={disable1}>
                            Tiếp tục
                        </Button>
                    </Form>
                </div>} />



                <Step title="Nhập mã xác thực" disabled={disable2} description={
                    <div>
                        <p>Hãy nhập mã xác thực mà chúng tôi đã gởi vào email của bạn</p>
                        <Form
                            form={form2}
                            onFinish={onFinish2}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Mã xác thực"
                                name="confirmtoken"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mã xác thực!"
                                    }
                                ]}
                            >

                                <Input style={{ width: 220 }} disabled={disable2}/>
                            </Form.Item>
                            <Button type="primary" htmlType="submit" disabled={disable2}>
                                Tiếp tục
                            </Button>
                        </Form>
                    </div>
                } />



                < Step title="Nhập mật khẩu mới" disabled={disable3} description={
                    < div >
                    <p>Hãy nhập mật khẩu mới mà bạn mong muốn</p>
                        <Form
                            form={form3}
                            onFinish={onFinish3}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item name='password' label="Mật khẩu"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                            >
                                <Input.Password disabled={disable3}/>
                            </Form.Item>
                            <Form.Item name="confirmpassword" label="Xác nhận"
                                rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu' }]}
                            >
                                <Input.Password  disabled={disable3}/>
                            </Form.Item>

                            <Button type="primary" htmlType="submit" disabled={disable3}>
                                Hoàn thành
                            </Button>
                        </Form>
                    </div >
                } />
            </Steps >

        </div >
    );
}