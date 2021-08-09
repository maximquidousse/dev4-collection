import { useState } from "react"

const Layout = ({ children, global, pageContext }) => {
  const { navbar, footer, notificationBanner } = global

  const [bannerIsShown, setBannerIsShown] = useState(true)
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex-1">
        <div>{children}</div>
      </div>  
    </div>
  )
}

export default Layout
