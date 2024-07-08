import { GithubOutlined, InboxOutlined, SendOutlined, PhoneOutlined } from "@ant-design/icons"

const NavItem = ({ children }) => (
  <div className="flex flex-col items-center justify-center h-12 px-3 hover:bg-violet-700 border-2 border-violet-900 hover:border-violet-600">
    {children}
  </div>
)

export const DockedLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-300 h-screen justify-center">
      <div className="grow h-12 bg-violet-900"></div>

      <div className="grow max-w-4xl w-full">
        <nav className="flex grow items-center bg-violet-900 text-white h-12 space-x-3">
          <NavItem>
            <div>
              <InboxOutlined style={{fontSize: "1rem", lineHeight: "1.5rem"}} />
            </div>
            <div className="text-xs">Inbox</div>
          </NavItem>

          <NavItem>
            <div>
              <SendOutlined style={{fontSize: ".9rem", lineHeight: "1.5rem"}} />
            </div>
            <div className="text-xs">Sent</div>
          </NavItem>

          <NavItem>
            <div>
              <PhoneOutlined style={{fontSize: ".9rem", lineHeight: "1.5rem"}} />
            </div>
            <div className="text-xs">Phone Numbers</div>
          </NavItem>

          <NavItem>
            <div>
              <GithubOutlined style={{fontSize: ".9rem", lineHeight: "1.5rem"}} />
            </div>
            <div className="text-xs">GitHub</div>
          </NavItem>
        </nav>

        <div className="h-full p-2 bg-gray-200">{children}</div>
      </div>

      <div className="grow h-12 bg-violet-900"></div>
    </div>
  )
}
