import { createBrowserRouter } from "react-router-dom"
import { AuthPage } from "./auth"
import { MainPage } from "./main"
import { RolesPage } from "./main/roles"
import { withAuth } from "./auth/components/auth-guard"
import { MockPage } from "@src/components/mock-page"
import { withAccess } from "./auth/components/access-guard"

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />
  },
  {
    path: "/",
    Component: withAuth(MainPage),
    children: [
      {
        path: "roles",
        Component: withAccess(RolesPage, ["GET_ROLES"])
      },
      {
        path: "organizations",
        element: <MockPage description="Organizations Page" />
      },
      {
        path: "permissions",
        element: <MockPage description="Permissions Page" />
      }
    ]
  }
])
