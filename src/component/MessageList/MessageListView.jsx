import { LoadingOutlined } from "@ant-design/icons"

export const Loading = ({ className }) => (
  <>
    <div className={`${className} text-center message-list-loading-container`}>
      <LoadingOutlined className="message-list-loading text-primary" />
    </div>
  </>
)
