Twilio SMS Web
==============
A minimalist web application to send and receive SMS with Twilio.

Hosted Application
==================
A version of this application is available on GitHub Pages:

https://rafasantos.github.io/twilio-sms-web

Twilio Account
==============
You will need a Twilio account to read and send SMS messages.

Twilio Free Account
-------------------
If you don't have an account, Twilio offers a [free trial account][TwilioFreeTrial].
Once your account is created you will need to [verify your personal phone number][TwilioVerifyPersonalPhoneNumber].
Finally, you also need to [get a Twilio phone number with SMS capability][TwilioGetPhoneNumber].

Sign-in to Twilio SMS Web
-------------------------
1. Sign-in to Twilio and get your `ACCOUNT SID` and `AUTH TOKEN` on the [Twilio's Console Page][TwilioConsole].
2. Use your `ACCOUNT SID` and `AUTH TOKEN` to sign-in to [Twilio SMS Web][HostedDemo].

Screenshots
===========
Sign-in

<img src='info/screenshot-sign-in.png' width='75%'>

Read messages:

<img src='info/screenshot-messages.png' width='75%'>

Compose messages:

<img src='info/screenshot-composer.png' width='75%'>

Development
===========
## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `npm run deploy`
Builds and deploy the application to: https://rafasantos.github.io/twilio-sms-web/


### Environment Variables
This project uses [dotenv](https://github.com/motdotla/dotenv) to manage environment variables. When using `npm start` the environment variables are loaded from `.env.local`. When using `npm run build` the environment variables are loaded from `env.production`.


[HostedDemo]: https://rafasantos.github.io/twilio-sms-web
[TwilioConsole]: https://www.twilio.com/console?
[TwilioFreeTrial]: https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account 
[TwilioVerifyPersonalPhoneNumber]: https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account
[TwilioGetPhoneNumber]: https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-first-twilio-phone-number