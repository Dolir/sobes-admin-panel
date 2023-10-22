import { Card, Flex } from "antd"
import type { ColumnsType } from "antd/es/table"
import { RolesType } from "@types"
import { useSearchParams } from "react-router-dom"
import { ActionDropdown } from "./action-dropdown"
import { useStore } from "@src/app/store"

export const useColumns = () => {
  const { permissionsStore } = useStore()

  const [params] = useSearchParams()
  const sort = params.get("sort")

  const getDefaultSort = (key: string) => {
    if (!sort) return
    if (sort.includes(key)) {
      if (sort.startsWith("-")) return "descend"
      return "ascend"
    }
  }
  const columns: ColumnsType<RolesType.RoleDto> = [
    {
      defaultSortOrder: getDefaultSort("name"),
      key: "name",
      title: "Name",
      sorter: true,
      ellipsis: true,
      render: (row: RolesType.RoleDto) => row.name,
      width: 150
    },
    {
      defaultSortOrder: getDefaultSort("description"),
      key: "description",
      title: "Description",
      ellipsis: true,
      sorter: true,
      render: (row: RolesType.RoleDto) => row.description,
      width: 150
    },

    {
      key: "permissions",
      render: (row: RolesType.RoleDto) => (
        <Flex wrap="wrap" gap={8}>
          {row.permissions.map((permission, index) => {
            const permissionData = permissionsStore.permissions.find(
              (statePerm) => statePerm.code === permission
            )
            return (
              <Card
                key={permission + index}
                style={{ maxWidth: "100%" }}
                bodyStyle={{ padding: 5 }}
              >
                {permissionData?.name}
              </Card>
            )
          })}
        </Flex>
      ),
      title: "Permissions",
      width: 200
    },
    {
      defaultSortOrder: getDefaultSort("createdAt"),
      key: "createdAt",
      sorter: true,
      render: (row: RolesType.RoleDto) =>
        new Date(row.createdAt).toLocaleString(),
      width: 110,
      title: "Created At"
    },
    {
      defaultSortOrder: getDefaultSort("updatedAt"),
      key: "updatedAt",
      sorter: true,
      render: (row: RolesType.RoleDto) =>
        new Date(row.updatedAt).toLocaleString(),
      width: 110,
      title: "Updated At"
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 75,
      render: (row) => <ActionDropdown roleData={row} />
    }
  ]
  return columns
}
