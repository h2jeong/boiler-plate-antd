import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";

import { Form, Input, Tooltip, Row, Col, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};
function RegisterPage(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = values => {
    //console.log("Received values of form: ", values);
    dispatch(registerUser(values)).then(res => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  // const [User, setUser] = useState({ email: "", password: "", name: "" });
  // const [ConfirmPassword, setConfirmPassword] = useState("");

  // const onSubmitHandler = e => {
  //   e.preventDefault();
  //   // console.log(User, ConfirmPassword);
  //   const { password } = User;
  //   if (password !== ConfirmPassword)
  //     return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");

  //   // Axios.post("/api/users/register", User).then(res => {
  //   //   if (res.data.success) {
  //   //     props.history.push("/login");
  //   //   } else {
  //   //     alert("Failed to sign up");
  //   //   }
  //   // });
  //   dispatch(registerUser(User)).then(res => {
  //     if (res.payload.success) {
  //       props.history.push("/login");
  //     } else {
  //       alert("Failed to sign up");
  //     }
  //   });
  // };
  // const onInputChange = e => {
  //   const { name, value } = e.currentTarget;
  //   setUser({ ...User, [name]: value });
  // };
  // const onInputChange2 = e => {
  //   setConfirmPassword(e.currentTarget.value);
  // };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{ minWidth: "400px" }}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label={
            <span>
              Name&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!"
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>

      {/* <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Email</label>
        <input type="email" name="email" onChange={onInputChange} />
        <label>Name</label>
        <input type="name" name="name" onChange={onInputChange} />
        <label>Password</label>
        <input type="password" name="password" onChange={onInputChange} />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={onInputChange2}
        />
        <br />
        <button type="submit">Join Us</button>
      </form> */}
    </div>
  );
}

export default withRouter(RegisterPage);
