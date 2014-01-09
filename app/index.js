'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var BowerGenerator = module.exports = function BowerGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      bower: true,
      npm: false,
      skipInstall: options['skip-install']
    });
  });

  // esto se usa?
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BowerGenerator, yeoman.generators.NamedBase);

BowerGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'bowerComponentName',
    message: 'What\'s the name of your bower component?'
  },
  {
    name: 'description',
    message: 'Provide a short description for your component'
  }];

  this.prompt(prompts, function (props) {
    this.bowerComponentName = props.bowerComponentName;
    this.slug = this._.slugify(this.bowerComponentName);
    this.description = props.description;
    this.validVariableName = this._.classify(this.bowerComponentName);

    cb();
  }.bind(this));
};

BowerGenerator.prototype.app = function app() {
  this.template('_bower-component.lua', this.slug + '.lua');
  this.template('_bower.json', 'bower.json');
  this.template('bowerrc', '.bowerrc');
};

BowerGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('gitignore', '.gitignore');
};
