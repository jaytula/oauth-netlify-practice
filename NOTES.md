# Notes

- https://docs.netlify.com/visitor-access/oauth-provider-tokens/#setup-and-settings
- https://www.youtube.com/watch?v=LN8cL2yPR3c

## Steps

- Create an Oauth app at: https://app.netlify.com/user/applications/new
- Specify environment variables from created OAuth app:
  - `NETLIFY_OAUTH_CLIENT_ID`
  - `NETLIFY_OAUTH_CLIENT_SECRET`

**List of OAuth Providers**

https://en.wikipedia.org/wiki/List_of_OAuth_providers


## Providers

### Amazon

https://developer.amazon.com/apps-and-games/login-with-amazon 

1. Register your Website
  - Create a New Security Profile
  - Enable Security Profile for LWA
  - Add your Website to your Security Profile

2. Add a Login with Amazon Button to your website

```html
<a href id="LoginWithAmazon">
    <img border="0" alt="Login with Amazon"
        src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
        width="156" height="32" />
 </a>
 ```