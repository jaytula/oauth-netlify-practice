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


### Redirects with Authorization Response

```
HTTP/1.1 302 Found
Location: https://client.example.com/cb?code=SplxlOBezQQYbYS6WxSbIA
&state=208257577ll0975l93l2l59l895857093449424
&scope=profile
```