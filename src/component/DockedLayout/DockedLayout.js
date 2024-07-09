import { GithubOutlined, InboxOutlined, SendOutlined, PhoneOutlined } from "@ant-design/icons"

const iconStyle = { fontSize: ".9rem", lineHeight: "1.5rem" }

const NavItem = ({ children }) => (
  <div
    className="flex flex-col items-center justify-center h-12 px-3 mx-2
  hover:bg-violet-700 border-2 border-violet-900 hover:border-violet-600 hover:cursor-pointer"
  >
    {children}
  </div>
)

export const DockedLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-12">
        <div className="bg-blue-100 grow">a</div>
        <div className="bg-blue-200 w-full max-w-xs">b</div>
        <div className="bg-blue-300 grow">c</div>
      </div>
      <div className="flex grow">
        <div className="bg-blue-100 grow">a</div>
        <div className="bg-blue-200 w-full max-w-xs">b</div>
        <div className="bg-blue-300 grow">c</div>
      </div>
    </div>
  )
}
