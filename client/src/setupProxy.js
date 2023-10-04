const { createProxyMiddleware } = require('http-proxy-middleware')
console.log("Print setupProxy.js")
module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'http://185.159.129.204:8080',
      changeOrigin: true,
      pathRewrite:{'/api':''}
    })
  );
};
