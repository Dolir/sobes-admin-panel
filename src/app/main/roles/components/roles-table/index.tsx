import type { SorterResult } from "antd/es/table/interface"
import { Flex, Table } from "antd"
import { useStore } from "@src/app/store"
import { RolesType } from "@types"
import { observer } from "mobx-react"
import { useColumns } from "./useColumns"
import { useRolesTableParams } from "./useRolesTableParams"
import { SearchBar } from "./searchbar"
import { CreateRoleModal } from "../roles-modal/create-role-modal"
import "./styles.scss"

export const RolesTable = observer(() => {
  const { rolesStore, authStore } = useStore()
  const { tableParams, handleTableChange } = useRolesTableParams()
  const columns = useColumns()
  return (
    <Flex vertical gap={10}>
      <Flex gap={10}>
        <SearchBar />
        {authStore.currentUser?.role.permissions.includes("CREATE_ROLE") && (
          <CreateRoleModal />
        )}
      </Flex>
      <Table
        showSorterTooltip={false}
        className="roles-table"
        bordered
        scroll={{ y: "calc(100vh - 300px)" }}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={rolesStore.roles}
        pagination={tableParams.pagination}
        loading={rolesStore.isFetchingRoles}
        onChange={(pagination, _filters, sorter) =>
          handleTableChange(
            pagination,
            sorter as SorterResult<RolesType.RoleDto>
          )
        }
      />
    </Flex>
  )
})
