import { useStore } from "@src/app/store"
import { RolesType } from "@types"
import { Form, Modal, notification } from "antd"
import { useState } from "react"
import { RoleForm } from "./role-form"

export const useEditRoleModal = ({
  roleData
}: {
  roleData: RolesType.RoleDto
}) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  const { rolesStore } = useStore()

  const onFinish = async (data: RolesType.UpdateRoleRequestDto) => {
    await rolesStore
      .updateRole({ ...data, id: roleData.id })
      .then((res) => {
        notification.success({ message: `Updated role ${res.name}` })
      })
      .catch((error) => {
        notification.error({ message: error.response.data.message })
      })
    form.resetFields()
    setOpen(false)
  }
  return [
    () => (
      <>
        <Modal
          title="Edit role"
          open={open}
          onOk={() => {
            form?.submit()
          }}
          confirmLoading={rolesStore.isFetchingRoles}
          onCancel={() => {
            setOpen(false)
            form?.resetFields()
          }}
          okText="Update"
        >
          <RoleForm onFinish={onFinish} form={form} roleData={roleData} />
        </Modal>
      </>
    ),
    (value: boolean) => setOpen(value)
  ] as const
}
