import { useStore } from "@src/app/store"
import { PermissionsType, RolesType } from "@types"
import { Form, FormProps, Input, Select } from "antd"

export const RoleForm = ({
  form,
  onFinish,
  roleData
}: FormProps & { roleData?: RolesType.RoleDto }) => {
  const { permissionsStore } = useStore()

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<RolesType.CreateRoleRequestDto>
        label="Role name"
        name="name"
        initialValue={roleData?.name}
        rules={[{ required: true, message: "Please input role name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<RolesType.CreateRoleRequestDto>
        label="Description"
        name="description"
        initialValue={roleData?.description}
        rules={[{ required: true, message: "Please input role description!" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item<RolesType.CreateRoleRequestDto>
        label="Permissions"
        name="permissions"
        initialValue={roleData?.permissions}
        rules={[
          {
            required: true,
            message: "Please select at least one permission"
          }
        ]}
      >
        <Select<PermissionsType.PermissionCodeType>
          mode="multiple"
          placeholder="Please select"
          style={{ width: "100%" }}
          loading={permissionsStore.isFetchingPermissions}
          options={permissionsStore.permissions.map((permission) => ({
            label: permission.name,
            value: permission.code
          }))}
        />
      </Form.Item>
    </Form>
  )
}
