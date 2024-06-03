import "./MessagesPage.css"
import MessageList from "../MessageList/MessageList"
import MessageComposer from "../MessageComposer/MessageComposer"
import { useState } from "react"

export const Tabs = ({ phoneNumber = "" }) => {
  const [activeTab, setActiveTab] = useState("messages")
  const handleActivateMessages = () => setActiveTab("messages")
  const handleActivateComposer = () => setActiveTab("composer")
  const isMessagesActive = activeTab === "messages"
  const isComposerActive = activeTab === "composer"
  const messagesTabClass = `tab-item messages-page-tabs-area ${isMessagesActive ? "active" : ""}`
  const composerTabClass = `tab-item messages-page-tabs-area ${isComposerActive ? "active" : ""}`

  return (
    <>
      <div className="messages-page-tabs-container">
        <div className="messages-page-tabs-content">
          <ul className="tab tab-block">
            <li className={messagesTabClass} onClick={handleActivateMessages}>
              Messages
            </li>
            <li className={composerTabClass} onClick={handleActivateComposer}>
              Composer
            </li>
          </ul>
        </div>
      </div>
      {isMessagesActive && <MessageList phoneNumber={phoneNumber} onActionClick={handleActivateComposer} />}
      {isComposerActive && <MessageComposer phoneNumber={phoneNumber} />}
    </>
  )
}
