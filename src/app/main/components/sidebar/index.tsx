import { Avatar, Button, Flex, Menu, Typography, notification } from "antd"
import {
  KeyOutlined,
  LogoutOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons"
import type { MenuItemType } from "antd/es/menu/hooks/useItems"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.scss"
import { presetDarkPalettes } from "@ant-design/colors"
import { useStore } from "@src/app/store"
import { observer } from "mobx-react"

export const Sidebar = observer(() => {
  const navigate = useNavigate()
  const { authStore } = useStore()
  const items: MenuItemType[] = [
    {
      key: 1,
      icon: <TeamOutlined />,
      label: "Roles",
      onClick: () => navigate("/roles")
    },
    {
      key: 2,
      icon: <ShopOutlined />,
      label: "Organizations",
      onClick: () => navigate("/organizations")
    },
    {
      key: 3,
      icon: <KeyOutlined />,
      label: "Permissions",
      onClick: () => navigate("/permissions")
    }
  ]
  return (
    <div className={styles.sidebarContainer}>
      <Menu
        defaultSelectedKeys={["1"]}
        theme="dark"
        mode="inline"
        items={items}
      />
      <Flex
        align="center"
        gap={8}
        style={{ padding: 10, background: presetDarkPalettes.blue.primary }}
      >
        <Flex flex="1 0">
          <Avatar icon={<UserOutlined />} />
        </Flex>
        <Flex flex="3 0" style={{ minWidth: 0 }} vertical>
          <Typography.Text
            style={{ fontSize: 16, color: "white" }}
            ellipsis
            title={authStore.currentUser?.name}
          >
            {authStore.currentUser?.name}
          </Typography.Text>
          <Typography.Text
            style={{ fontSize: 12, color: "white" }}
            type="secondary"
            ellipsis
            title={authStore.currentUser?.role.name}
          >
            {authStore.currentUser?.role.name}
          </Typography.Text>
        </Flex>

        <Flex flex="1 0" title="Logout">
          <Button
            icon={<LogoutOutlined />}
            onClick={() => {
              authStore.logout()
              notification.success({ message: "Logged out" })
            }}
          />
        </Flex>
      </Flex>
    </div>
  )
})
