import { MoreOutlined } from "@ant-design/icons"
import { Button, Dropdown, MenuProps, Typography, notification } from "antd"
import { useEditRoleModal } from "../../roles-modal/edit-role-modal"
import { RolesType } from "@types"
import { useStore } from "@src/app/store"

export const ActionDropdown = ({
  roleData
}: {
  roleData: RolesType.RoleDto
}) => {
  const { rolesStore, authStore } = useStore()
  const [renderEditModal, toggleEditModal] = useEditRoleModal({ roleData })
  const items: MenuProps["items"] = [
    {
      label: <Typography.Text>Edit</Typography.Text>,
      key: "0",
      onClick: () => toggleEditModal(true),
      disabled: !authStore.currentUser?.role.permissions.includes("UPDATE_ROLE")
    },
    {
      label: <Typography.Text type="danger">Delete</Typography.Text>,
      key: "1",
      onClick: () =>
        rolesStore
          .deleteRole(roleData.id)
          .then(() =>
            notification.success({
              message: `Deleted ${roleData.name} role`
            })
          )
          .catch((error) =>
            notification.error({
              message: error.response?.data?.message || "Something went wrong"
            })
          ),
      disabled: !authStore.currentUser?.role.permissions.includes("DELETE_ROLE")
    }
  ]
  return (
    <>
      {renderEditModal()}
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <Button size="middle" icon={<MoreOutlined color="primary" />} />
      </Dropdown>
    </>
  )
}
