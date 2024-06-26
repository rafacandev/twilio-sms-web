import { GithubOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"
import "./DefaultLayout.css"

const NavBar = () => {
  const history = useHistory()

  const navigateToAuthenticationPage = () => {
    history.push("/authentication")
  }
  const navigateToPhoneNumbersPage = () => {
    history.push("/phone-numbers")
  }
  const navigateToNotificationsPage = () => {
    history.push("/notifications")
  }

  return (
    <div className="default-layout-nav-bar-container bg-primary">
      <div className="default-layout-nav-bar">
        <div className="default-layout-nav-bar-btn-spacer"></div>
        <div className="default-layout-nav-bar-btn text-light" onClick={navigateToAuthenticationPage}>
          Authentication
        </div>
        <div className="default-layout-nav-bar-btn-spacer"></div>
        <div className="default-layout-nav-bar-btn text-light" onClick={navigateToPhoneNumbersPage}>
          Messages
        </div>

        <div className="default-layout-item default-layout-nav-bar-center hide-sm">
          <span className="h5">Twilio SMS Web</span>
        </div>
        <div className="default-layout-nav-bar-btn text-light" onClick={navigateToNotificationsPage}>
          Notifications
        </div>
        <div className="default-layout-nav-bar-btn-spacer"></div>
        <div className="default-layout-nav-bar-btn text-light hide-md">
          <a
            className="btn btn-link text-light"
            href="https://github.com/rafasantos/twilio-sms-web"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <GithubOutlined />
          </a>
        </div>
      </div>
    </div>
  )
}

export const DefaultLayout = ({ children }) => {
  return (
    <div className="default-layout-container">
      <NavBar />
      <div className="default-layout-item text-left" style={{ marginTop: "1em" }}>
        {children}
      </div>
    </div>
  )
}
