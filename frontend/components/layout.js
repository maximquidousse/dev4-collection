import { useState } from "react"

const Layout = ({ children, global, pageContext }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen container mx-auto">
      <div className="flex-1">
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
