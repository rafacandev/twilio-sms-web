import { GithubOutlined, InboxOutlined, SendOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"

const NavItem = ({ children, onClick = () => {} }) => (
  <div
    onClick={onClick}
    className="h-14 flex flex-col justify-center items-center px-3 mx-2 hover:bg-violet-700 hover:cursor-pointer"
  >
    {children}
  </div>
)

const NavBar = () => {
  const history = useHistory()

  const navigateToInbox = () => {
    history.push("/inbox")
  }

  const navigateToSend = () => {
    history.push("/send")
  }

  return (
    <>
      <nav className="text-white px-2 flex">
        <NavItem onClick={navigateToInbox}>
          <InboxOutlined className="text-lg mt-1" />
          <span className="mt-1">Inbox</span>
        </NavItem>
        <NavItem onClick={navigateToSend}>
          <SendOutlined className="text-lg mt-1" />
          <span className="mt-1">Send</span>
        </NavItem>
        <div className="grow flex justify-center items-center text-lg mt-1">Twilio SMS Web</div>
        <NavItem>
          <GithubOutlined className="text-lg mt-1" />
          <span className="mt-1">GitHub</span>
        </NavItem>
      </nav>
    </>
  )
}

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14">
        <div className="bg-violet-900 grow"></div>
        <div className="bg-violet-900 w-full max-w-4xl">
          <NavBar />
        </div>
        <div className="bg-violet-900 grow"></div>
      </div>
      <div className="flex grow">
        <div className="bg-gray-200 grow"></div>
        <div className="bg-gray-100 w-full max-w-4xl pt-2 pb-4 md:px-2 lg:px-4">{children}</div>
        <div className="bg-gray-200 grow"></div>
      </div>
    </div>
  )
}

export const LayoutWithoutNavBar = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14">
        <div className="bg-violet-900 grow flex justify-center items-center text-lg text-white">Twilio SMS Web</div>
      </div>
      <div className="flex grow">
        <div className="bg-gray-200 grow"></div>
        <div className="bg-gray-100 w-full max-w-4xl pt-2 pb-4 md:px-2 lg:px-4">{children}</div>
        <div className="bg-gray-200 grow"></div>
      </div>
    </div>
  )
}
