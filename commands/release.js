// const fs = require('fs');
const cwd = process.cwd();
const { exec } = require('child_process');
const path = require('path')
console.log(path.resolve(__dirname, './webpack.build.prod.config.js'));

exec(`webpack --config ${path.resolve(__dirname, './webpack.build.prod.config.js')}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

// fs.readFile(`./package.json`, 'utf8', function (err, data) {
//   console.log(data)
// });
