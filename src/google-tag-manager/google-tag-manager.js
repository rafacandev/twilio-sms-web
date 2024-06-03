import TagManager from "react-gtm-module"

const initializeGoogleTagManager = () => {
  const googleTagManagerId = process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID

  if (googleTagManagerId === undefined || googleTagManagerId === null || googleTagManagerId === "") return

  const tagManagerArgs = {
    gtmId: googleTagManagerId,
  }

  console.log("Initializing Google Tag Manager:", tagManagerArgs)
  TagManager.initialize(tagManagerArgs)
}

export default initializeGoogleTagManager
