import { GithubOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import './DefaultLayout.css'

const DefaultLayout = ({children}) => {
  const history = useHistory()

  const navigateToAuthenticationPage = () => {
    history.push('/authentication')
  }
  const navigateToPhoneNumbersPage = () => {
    history.push('/phone-numbers')
  }
  const navigateToNotificationsPage = () => {
    history.push('/notifications')
  }

  return (
    <>
      <div className="default-layout-container container grid-lg">
        <header className="navbar bg-primary" style={{padding: '.5em'}}>
          <section className="navbar-section">
            <span className="btn btn-link text-light" onClick={navigateToAuthenticationPage}>Authentication</span>
            <span className="btn btn-link text-light" onClick={navigateToPhoneNumbersPage}>Messages</span>
          </section>
          <section className="navbar-center hide-xs">
            <span className="h5">Twilio SMS Web</span>
          </section>
          <section className="navbar-section">
            <span className="btn btn-link text-light" onClick={navigateToNotificationsPage}>Notifications</span>
            <a className="btn btn-link text-light" href="https://github.com/rafasantos/twilio-sms-web" target="_blank" rel="noreferrer">
              GitHub <GithubOutlined/>
            </a>
          </section>
        </header>
      </div>
      <div className="default-layout-container container grid-lg text-left" style={{marginTop: '1em'}}>
        {children}
      </div>
    </>
  )
}

export default DefaultLayout