const { exec } = require('child_process');
const path = require('path')
const webpack = path.resolve(__dirname, '../node_modules/webpack/bin/webpack.js');
const webpackConf = path.resolve(__dirname, '../build/webpack.build.prod.config.js');

console.log(webpack, webpackConf)

exec(`${webpack} --config ${webpackConf}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(stdout);
  console.log(stderr);
});