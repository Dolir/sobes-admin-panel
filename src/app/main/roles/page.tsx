import { Flex, Typography } from "antd"
import { RolesTable } from "./components/roles-table"
import { useEffect } from "react"
import { useStore } from "@src/app/store"

export const RolesPage = () => {
  const { permissionsStore } = useStore()

  useEffect(() => {
    permissionsStore.getPermissions()
  }, [permissionsStore])

  return (
    <Flex vertical gap={10} style={{ padding: 20 }}>
      <Typography.Title level={2}>Roles management</Typography.Title>
      <RolesTable />
    </Flex>
  )
}
