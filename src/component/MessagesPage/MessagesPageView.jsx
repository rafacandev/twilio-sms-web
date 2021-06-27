import "./MessagesPage.css"

export const Tabs = () => (
  <div className="middle-tabs">
    <div className="middle-tabs-content">
      <ul className="tab tab-block">
        <li className="tab-item">
          <a href="#/phone-numbers" className="active">Messages</a>
        </li>
        <li className="tab-item">
          <a href="#/phone-numbers" className="">Compose</a>
        </li>
      </ul>
    </div>
  </div>
)