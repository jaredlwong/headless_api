"use strict";

var random = require("random-js")();

exports.generate_password = generate_password;

/*
 * length          - [0, infinity]  [0, 20]
 * numbers         - [0, infinity]  [0, 20]
 * letters         - [0, infinity]  [0, 20]
 * capital-letters - [0, infinity]  [0, 20]
 * case-sensitive  - true|false     [true]
 */
function generate_password(options) {
  var numbers = '0123456789';
  var lower   = 'abcdefghijklmnopqrstuvwxyz';
  var upper   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var special = '%&_?#=-';
  var all     = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

  var chars = numbers + lower + upper;

  options = options || {};
  options.length = options.length || 16;

  var string = '';

  for (var i = 0; i < options.length; i++) {
    var random_number = random.integer(0, chars.length-1);
    string += chars.substring(random_number, random_number + 1);
  }

  return string;
}
