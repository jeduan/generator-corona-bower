/*global describe, beforeEach, it*/
'use strict';

var path    = require('path'),
    helpers = require('yeoman-generator').test,
    assert = require('yeoman-generator').assert;


describe('corona bower generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('corona-bower:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'bower.json',
      '.bowerrc',
      '.gitignore',
      'foo.lua'
    ];

    helpers.mockPrompt(this.app, {
      'bowerComponentName': 'foo',
      'description': 'bar'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      assert.file(expected);
      done();
    });
  });
});
