import { Provider } from "mobx-react"
import { PropsWithChildren } from "react"
import { stores } from "."

export const StoresProvider = ({ children }: PropsWithChildren) => (
  <Provider {...stores}>{children}</Provider>
)
