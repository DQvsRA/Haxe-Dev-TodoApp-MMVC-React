module.exports = {
  apps : [{
    name    : "json-server",
    script  : "./server/server.js",
    watch   : false,
    env: {
      "PORT": 3001,
      "NODE_ENV": "development"
    }
  }]
};
