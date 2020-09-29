import simpleOauth from 'simple-oauth2'

// https://www.npmjs.com/package/simple-oauth2
// https://github.com/lelylan/simple-oauth2/blob/HEAD/API.md#options

const SITE_URL = process.env.URL || 'http://localhost:3000'

/* Auth values */
const USER_PROFILE_URL = 'https://api.netlify.com/api/v1/user'
const AUTHORIZATION_URL = 'https://app.netlify.com/authorize'
const REDIRECT_URL = `${SITE_URL}/.netlify/functions/auth-callback`

// const config = {
//   profilePath: USER_PROFILE_URL,
//   /* redirect_uri is the callback url after successful signin */
//   redirect_uri: REDIRECT_URL,
// }

const config = {
  client: {
    id: process.env.NETLIFY_OAUTH_CLIENT_ID,
    secret: process.env.NETLIFY_OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://api.netlify.com',
    tokenPath: 'https://api.netlify.com/oauth/token',
    authorizePath: 'https://app.netlify.com/authorize',
  }
}

module.exports = {
  /* Export config for functions */
  config: config,
  /* Create oauth2 instance to use in our functions */
  oauth: simpleOauth.create({
    client: {
      id: config.client.id,
      secret: config.client.secret
    },
    auth: {
      tokenHost: config.auth.tokenHost,
      tokenPath: config.auth.tokenPath,
      authorizePath: config.auth.authorizePath
    }
  })
}
