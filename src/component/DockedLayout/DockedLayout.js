import { GithubOutlined, InboxOutlined, SendOutlined, PhoneOutlined } from "@ant-design/icons"

const iconStyle = { fontSize: ".9rem", lineHeight: "1.5rem" }

const NavItem = ({ children }) => (
  <div className="h-12 flex flex-col px-3 mx-2 hover:bg-violet-700 hover:cursor-pointer">{children}</div>
)

const NavBar = () => (
  <nav className="text-white px-2 flex">
    <NavItem>
      <InboxOutlined style={iconStyle} />
      Inbox
    </NavItem>
    <NavItem>
      <SendOutlined style={iconStyle} />
      Sent
    </NavItem>

    <NavItem>
      <PhoneOutlined style={iconStyle} />
      Phones
    </NavItem>

    <div className="grow flex justify-center items-center text-lg">Twilio SMS Web</div>

    <NavItem>
      <GithubOutlined style={iconStyle} />
      GitHub
    </NavItem>
  </nav>
)

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
