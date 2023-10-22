import { PlusOutlined } from "@ant-design/icons"
import { useStore } from "@src/app/store"
import { RolesType } from "@types"
import { Button, Form, Modal, notification } from "antd"
import { useState } from "react"
import { RoleForm } from "./role-form"

export const CreateRoleModal = () => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  const { rolesStore } = useStore()

  const onFinish = async (data: RolesType.CreateRoleRequestDto) => {
    await rolesStore
      .createRole(data)
      .then((res) => {
        notification.success({ message: `Created role ${res.name}` })
      })
      .catch((error) => {
        notification.error({ message: error.response.data.message })
      })
    form.resetFields()
    setOpen(false)
  }
  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        Create role
      </Button>
      <Modal
        title="Create role"
        open={open}
        onOk={() => {
          form?.submit()
        }}
        confirmLoading={rolesStore.isFetchingRoles}
        onCancel={() => {
          setOpen(false)
          form?.resetFields()
        }}
        okText="Create"
      >
        <RoleForm onFinish={onFinish} form={form} />
      </Modal>
    </>
  )
}
