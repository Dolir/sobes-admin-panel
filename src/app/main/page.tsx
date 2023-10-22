import { Outlet, useNavigate } from "react-router-dom"
import { Sidebar } from "./components/sidebar"
import styles from "./styles.module.scss"
import { useEffect } from "react"

export const MainPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/roles")
  }, [navigate])

  return (
    <div className={styles.mainContainer}>
      <Sidebar />

      <div>
        <Outlet />
      </div>
    </div>
  )
}
