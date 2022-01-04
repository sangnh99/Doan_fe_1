import React, { useState, useEffect } from "react";

import { Form, Input, Button, Checkbox, Modal } from "antd";
import userService from "../../services/user.service";

export default function UserPassword(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    if (pass != confirmPass) {
      setMessage("Xác nhận mật khẩu không chính xác !");
      setIsModalVisible(true);
    } else {
      userService.updatePassword(JSON.parse(localStorage.getItem("userInfo")).id, pass);
      setMessage("Bạn đã đổi mật khẩu thành công !");
      setIsModalVisible(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{message}</p>
      </Modal>

      <Form style={{ marginTop: 200, marginRight: 200 }}
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >


        <Form.Item
          label="Mật khẩu mới"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!"
            }
          ]}
        >
          <Input.Password onChange={(event => {
            setPass(event.target.value);
          })} />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu mới !"
            }
          ]}
        >
          <Input.Password onChange={(event => {
            setConfirmPass(event.target.value);
          })} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};