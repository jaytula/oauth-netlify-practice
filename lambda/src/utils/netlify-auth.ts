import {AuthorizationCode, ModuleOptions} from 'simple-oauth2'

// https://www.npmjs.com/package/simple-oauth2
// https://github.com/lelylan/simple-oauth2/blob/HEAD/API.md#options

const SITE_URL = process.env.URL || 'http://localhost:3000' as string

/* Auth values */
const USER_PROFILE_URL = 'https://api.netlify.com/api/v1/user'
const AUTHORIZATION_URL = 'https://app.netlify.com/authorize'
export const REDIRECT_URL = `${SITE_URL}/.netlify/functions/netlify-auth-callback`

// const config = {
//   profilePath: USER_PROFILE_URL,
//   /* redirect_uri is the callback url after successful signin */
//   redirect_uri: REDIRECT_URL,
// }

export const config: ModuleOptions = {
  client: {
    id: process.env.NETLIFY_OAUTH_CLIENT_ID as string,
    secret: process.env.NETLIFY_OAUTH_CLIENT_SECRET as string,
  },
  auth: {
    tokenHost: 'https://api.netlify.com',
    tokenPath: 'https://api.netlify.com/oauth/token',
    authorizePath: 'https://app.netlify.com/authorize',
  },
}

export const authorizationCodeClient = new AuthorizationCode(config);