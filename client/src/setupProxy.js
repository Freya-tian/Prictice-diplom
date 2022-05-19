const { createProxyMiddleware } = require('http-proxy-middleware');y
console.log("Print setupProxy.js")
module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'http://119.45.178.227:8080',
      changeOrigin: true,
    })
  );
};
