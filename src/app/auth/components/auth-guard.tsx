import { observer } from "mobx-react"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useStore } from "../../store"
import { Spin, notification } from "antd"

export const withAuth = (Component: FC<PropsWithChildren>) => {
  return observer((props: PropsWithChildren) => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { authStore } = useStore()

    useEffect(() => {
      setLoading(true)
      authStore.verifyToken().then((res) => {
        setLoading(false)
        if (!res) {
          notification.error({ message: "You are unauthorized" })
          navigate("/auth")
        }
      })
    }, [authStore, navigate])

    if (loading) return <Spin size="large" className="screen-spinner" />

    if (authStore.isAuthenticated) return <Component {...props} />
    return <Navigate to="/auth" />
  })
}
