import { AuthType } from "@types"
import { Input, Button, Form, Typography, notification } from "antd"
import styles from "./styles.module.scss"
import { useStore } from "@src/app/store"

import { useNavigate } from "react-router-dom"
import { LockOutlined, UserOutlined } from "@ant-design/icons"

export const LoginForm = () => {
  const { authStore } = useStore()
  const navigate = useNavigate()

  const onFinish = (data: AuthType.LoginRequestDto) => {
    return authStore
      .login(data)
      .then(() => {
        notification.success({ message: "Logged in" })
        navigate("/")
      })
      .catch((error) => {
        notification.error({ message: error.response.data.message })
      })
  }
  return (
    <div className={styles.formContainer}>
      <div>
        <Typography.Title level={2} className={styles.formTitle}>
          Login form
        </Typography.Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
