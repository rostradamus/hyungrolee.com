const proxy = require('http-proxy-middleware');

module.exports = app => {
  console.log("hello");
  app.use(proxy('/api', { target: 'http://localhost:5000/' }));
};
