var path = require('path');

exports.casper_js_executable = 'casperjs';
exports.casper_script = path.join(__dirname, 'casper_driver', 'casper_script.js');
exports.formulas_dir = path.join(__dirname, 'formulas');
exports.passwords_dir = path.join(__dirname, 'passwords');
exports.debug = false;
