# Notes

- https://docs.netlify.com/visitor-access/oauth-provider-tokens/#setup-and-settings
- https://www.youtube.com/watch?v=LN8cL2yPR3c
- https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html

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

 Try https://github.com/jaredhanson/passport-amazon

 - `npm install passport-amazon`
 - Configure strategy 

 ```js
 passport.use(new AmazonStrategy({
    clientID: AMAZON_CLIENT_ID,
    clientSecret: AMAZON_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/amazon/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ amazonId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
```

- Authenticate Requests

```js
app.get('/auth/amazon',
  passport.authenticate('amazon'));

app.get('/auth/amazon/callback', 
  passport.authenticate('amazon', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

- Investigate tutorial: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

Auth Flow:

- Click LWA Button
- Get redirected to https://na.account.amazon.com/ap/oa?arb=[uuid] to Allow or Cancel
- Clicking allow sets the cookie with name: `amazon_Login_state_cache`


## LocalTunnel Sidetrack

https://github.com/localtunnel/nginx
https://github.com/localtunnel/localtunnel

```shell
lt -h https://serverless.social -p 8888 -s crackly-banal
```