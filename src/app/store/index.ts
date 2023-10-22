import { useContext } from "react"
import { MobXProviderContext } from "mobx-react"
import { AuthStore } from "../auth/auth-store"
import { RoleStore } from "../main/roles/roles-store"
import { PermissionsStore } from "../main/permissions/permissions-store"
export { StoresProvider } from "./stores-provider"

export const useStore = () => useContext(MobXProviderContext) as typeof stores
export const stores = {
  authStore: new AuthStore(),
  rolesStore: new RoleStore(),
  permissionsStore: new PermissionsStore()
}
