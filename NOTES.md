# Notes

- https://docs.netlify.com/visitor-access/oauth-provider-tokens/#setup-and-settings
- https://www.youtube.com/watch?v=LN8cL2yPR3c
- https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html

## Requirements
 - Node 12 is required

## Steps

- Create an Oauth app at: https://app.netlify.com/user/applications/new
- Specify environment variables from created OAuth app:
  - `NETLIFY_OAUTH_CLIENT_ID`
  - `NETLIFY_OAUTH_CLIENT_SECRET`
  - `MONGODB_URI`

**List of OAuth Providers**

https://en.wikipedia.org/wiki/List_of_OAuth_providers

## Required: Environment variables:

- `REACT_APP_LWA_CLIENT_ID`
- `REACT_APP_WEBSITE_URL`

## Providers


### Authorization Errors

**Omitted**

### Access Token Request

https://developer.amazon.com/docs/login-with-amazon/authorization-code-grant.html#access-token-request

- Make secure HTTP POST to `https://api.amazon.com/auth/o2/token`
- POST should have required parameter for server apps: `grant_type`, `code`, `redirect_uri`, `client_id`, `client_secret`

```
POST /auth/o2/token HTTP/1.1
Host: api.amazon.com
Content-Type: application/x-www-form-urlencoded;charset=UTF-8

grant_type=authorization_code
&code=SplxlOBezQQYbYS6WxSbIA
&client_id=foodev
&client_secret=Y76SDl2F
```

```js
axios.post('https://api.amaxon.com/auth/o2/token', {
  grant_type: 'authorization_code',
  code: query.code,
  // redirect_uri: '?',
  client_id: process.env.AMAZON_O2_CLIENT_ID,
  client_secret: process.env.AMAZON_O2_CLIENT_SECRET
})
```

### Using Refresh Tokens

```
POST /auth/o2/token HTTP/1.1
Host: api.amazon.com
Content-Type: application/x-www-form-urlencoded;charset=UTF-8

grant_type=refresh_token
&refresh_token=Atzr|IQEBLzAtAhRPpMJxdwVz2Nn6f2y-tpJX2DeX...
&client_id=foodev
&client_secret=Y76SDl2F
```


## LocalTunnel Sidetrack

https://github.com/localtunnel/nginx
https://github.com/localtunnel/localtunnel

```shell
lt -h https://serverless.social -p 8888 -s subdomain
```

## Links

https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2ee