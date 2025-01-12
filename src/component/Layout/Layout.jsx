import { GithubOutlined, InboxOutlined, SendOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const NavItem = ({ className, children, onClick = () => {} }) => (
  <div
    onClick={onClick}
    className={`h-14 flex flex-col justify-center items-center px-4 hover:bg-violet-700 hover:cursor-pointer ${className}`}
  >
    {children}
  </div>
)

const NavBar = () => {
  const navigate = useNavigate()

  const navigateToInbox = () => {
    navigate("/inbox")
  }

  const navigateToSend = () => {
    navigate("/send")
  }

  return (
    <>
      <nav className="flex text-white px-1 sm:px-4">
        <NavItem onClick={navigateToInbox}>
          <InboxOutlined className="text-lg" />
          <span className="mt-1">Inbox</span>
        </NavItem>
        <NavItem onClick={navigateToSend}>
          <SendOutlined className="text-lg" />
          <span className="mt-1">Send</span>
        </NavItem>
        <div className="grow flex justify-center items-center text-lg">Twilio SMS Web</div>
        <NavItem className="hidden sm:flex">
          <GithubOutlined className="text-lg" />
          <span className="mt-1">GitHub</span>
        </NavItem>
      </nav>
    </>
  )
}

export const Layout = ({ children }) => (
  <div className="flex flex-col min-h-full bg-gray-200">
    <div className="bg-violet-900 flex justify-center">
      <span className="block h-14 w-full max-w-screen-lg">
        <NavBar />
      </span>
    </div>
    <div className="grow flex justify-center">
      <span className="block bg-gray-50 w-full max-w-screen-lg p-1 sm:p-4">{children}</span>
    </div>
    <div className="bg-violet-900 flex justify-center">
      <span className="block w-full max-w-screen-lg h-14">Footer</span>
    </div>
  </div>
)

export const LayoutWithoutNavBar = ({ children }) => (
  <div className="flex flex-col h-full">
    <div className="flex h-14">
      <div className="bg-violet-900 grow flex justify-center items-center text-lg text-white">Twilio SMS Web</div>
    </div>
    <div className="flex grow">
      <div className="bg-gray-200 grow"></div>
      <div className="bg-gray-100 w-full max-w-screen-md pt-2 pb-4 px-4">{children}</div>
      <div className="bg-gray-200 grow"></div>
    </div>
  </div>
)
