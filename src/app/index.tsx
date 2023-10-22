import { RouterProvider } from "react-router-dom"
import { StoresProvider } from "./store"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { router } from "./router"

export const App = () => {
  return (
    <StoresProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </StoresProvider>
  )
}
