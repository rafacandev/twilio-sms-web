import { GithubOutlined, InboxOutlined, SendOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"

const NavItem = ({ children, onClick = () => {} }) => (
  <div onClick={onClick} className="h-12 flex flex-col px-3 mx-2 hover:bg-violet-700 hover:cursor-pointer">
    {children}
  </div>
)

const NavBar = () => {
  const history = useHistory()

  const navigateToInbox = () => {
    history.push("/mailbox")
  }

  return (
    <>
      <nav className="text-white text-[.75rem] px-2 flex">
        <NavItem onClick={navigateToInbox}>
          <InboxOutlined className="text-lg" />
          Mailbox
        </NavItem>
        <NavItem>
          <SendOutlined className="text-lg" />
          Send
        </NavItem>
        <div className="grow flex justify-center items-center text-lg">Twilio SMS Web</div>
        <NavItem>
          <GithubOutlined className="text-lg" />
          GitHub
        </NavItem>
      </nav>
    </>
  )
}

export const DockedLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-12">
        <div className="bg-violet-900 grow"></div>
        <div className="bg-violet-900 w-full max-w-4xl">
          <NavBar />
        </div>
        <div className="bg-violet-900 grow"></div>
      </div>
      <div className="flex grow">
        <div className="bg-gray-200 grow"></div>
        <div className="bg-gray-100 w-full max-w-4xl p-2 pb-4">{children}</div>
        <div className="bg-gray-200 grow"></div>
      </div>
    </div>
  )
}
