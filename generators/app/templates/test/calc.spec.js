var calc = require('../src/calc.js');
var assert = require('power-assert');

describe('calc', function() {
  it ('add', function() {
      assert(calc.add(1, 2) === 3);
  });
});
