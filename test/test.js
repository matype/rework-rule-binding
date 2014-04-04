var fs = require('fs'),
    rework = require('rework'),
    expect = require('chai').expect,
    bind = require('../');

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name + '.css', 'utf8').trim();
}

function compareFixtures(name) {
  return expect(
    rework(fixture(name))
    .use(bind)
    .toString().trim()
  ).to.equal(fixture(name + '.out'));
}

describe('rework-rule-binding', function() {
  it('parse row css', function() {
    compareFixtures('parse-row-css');
  });

  it('compile binded selectors', function() {
    compareFixtures('compile-bind-selector');
  });

  it('throw error when cascade binding-selector', function() {
    var output = function() {
      return rework(fixture('error-cascading')).use(bind).toString();
    };
    expect(output).to.Throw(Error, 'rework-rule-binding: binding-selector must not cascade');
  });

  it('throw error when cascade placeholder selector', function() {
    var output = function() {
      return rework(fixture('placeholder')).use(bind).toString();
    };
    expect(output).to.Throw(Error, 'rework-rule-binding: placeholder selector must not cascade');
  })
});
