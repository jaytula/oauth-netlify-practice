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

## LocalTunnel Sidetrack

https://github.com/localtunnel/nginx
https://github.com/localtunnel/localtunnel

```shell
lt -h https://serverless.social -p 8888 -s subdomain
```

## Links

https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2ee

## CertBot Cloudflare DNS01 Renewal

```shell
sudo certbot renew --dns-cloudflare --dns-cloudflare-credentials ./.secrets/certbot/cloudflare.ini
```