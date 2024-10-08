import { ReactNode } from "react"

interface Props {
  children: ReactNode
}
const CommonLayout = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default CommonLayout