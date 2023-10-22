import { observer } from "mobx-react"
import { FC, PropsWithChildren, useMemo } from "react"
import { useStore } from "../../store"
import { PermissionsType } from "@types"
import { Forbidden } from "@src/components/forbidden"

export const withAccess = (
  Component: FC<PropsWithChildren>,
  permissions: PermissionsType.PermissionCodeType[]
) => {
  return observer((props: PropsWithChildren) => {
    const { authStore } = useStore()
    const hasPermission = useMemo(() => {
      return authStore.currentUser?.role.permissions.find((permission) =>
        permissions.includes(permission)
      )
    }, [authStore.currentUser?.role.permissions])

    if (hasPermission) return <Component {...props} />
    return <Forbidden />
  })
}
