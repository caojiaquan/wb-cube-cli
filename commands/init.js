const { prompt } = require('inquirer');
const program = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');
const fs = require('fs');

const option =  program.parse(process.argv).args[0];
const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: typeof option === 'string' ? option : 'wb-block',
    filter (val) {
      return val.trim()
    },
    validate (val) {
      const validate = (val.trim().split(" ")).length === 1;
      return validate || 'Project name is not allowed to have spaces ';
    },
    transformer (val) {
      return val;
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Project description',
    default: 'Vue project',
    validate () {
      return true;
    },
    transformer(val) {
      return val;
    }
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author',
    default: '',
    validate () {
      return true;
    },
    transformer(val) {
      return val;
    }
  }
];

module.exports = prompt(question).then(({name, description, author}) => {
  const gitPlace = require('../templates').init.path;
  const projectName = name;
  const spinner = ora('Downloading please wait...');

  spinner.start();
  download(`${gitPlace}`, `./${projectName}`, (err) => {
    if (err) {
      console.log(chalk.red(err));
      process.exit()
    }

    fs.readFile(`./${projectName}/package.json`, 'utf8', function (err, data) {
      if(err) {
        spinner.stop();
        console.error(err);
        return;
      }

      const packageJson = JSON.parse(data);
      packageJson.name = name;
      packageJson.description = description;
      packageJson.author = author;

      fs.writeFile(`./${projectName}/package.json`, JSON.stringify(packageJson, null, 2), 'utf8', function (err) {
        if(err) {
          spinner.stop();
          console.error(err);
        } else {
          spinner.stop();
          console.log(chalk.green('project init successfully!'))
          console.log(`
            ${chalk.yellow(`cd ${name}`)}
            ${chalk.yellow('npm install')}
            ${chalk.yellow('npm run dev')}
          `);
        }
      });
    });

    fs.readFile(`./${projectName}/src/blocks/schema.json`, 'utf8', function (err, data) {
      if(err) {
        spinner.stop();
        console.error(err);
        return;
      }

      const schemaJson = JSON.parse(data);
      schemaJson.type = name;

      fs.writeFile(`./${projectName}/src/blocks/schema.json`, JSON.stringify(schemaJson, null, 2), 'utf8', function (err) {
        if(err) {
          spinner.stop();
          console.error(err);
        } else {
          spinner.stop();
        }
      });
    });
  })
});
