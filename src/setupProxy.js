const { createProxyMiddleware } = require('http-proxy-middleware');
console.log("setupProxy");

module.exports = function(app) {
  app.use(
    '/.netlify/functions/',
    createProxyMiddleware({
      target: 'http://localhost:9000/',
      changeOrigin: true,
      pathRewrite: {
        "^/\\.netlify/functions": "",
      }
    })
  );
};