import TagManager from 'react-gtm-module'

const initializeGoogleTagManager = () => {
    const googleTagManagerId = process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID
 
    const tagManagerArgs = {
        gtmId: googleTagManagerId
    }
    
    console.log('Initializing Google Tag Manager:', tagManagerArgs)
    TagManager.initialize(tagManagerArgs)    
}

export default initializeGoogleTagManager