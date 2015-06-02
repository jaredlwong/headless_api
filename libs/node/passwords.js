var config = require('../../config');
var async = require('async');

var assert = require('assert');
var child_process = require('child_process');
var fs = require('fs');


exports.login = login;
exports.reset_password = reset_password;


function login(website, username, password, success_callback) {
  var casperjs_args;
  if (config.debug) {
    casperjs_args = [config.casper_script, website, 'login', username, password,
                     '--formulas-dir=' + config.formulas_dir, '--xxx'];
    console.log(['casperjs'].concat(casperjs_args).join(' '));
  } else {
    casperjs_args = [config.casper_script, website, 'login', username, password, 
                     '--formulas-dir=' + config.formulas_dir];
  }

  var casperjs = child_process.spawn(config.casper_js_executable, casperjs_args);

  var success = false;

  casperjs.stdout.on('data', function(data) {
    if (config.debug) {
      process.stdout.write('stdout: ' + data);
    }
    if (/^true/.test(data)) {
      success = true;
    } else if (/^false/.test(data)) {
      success = false;
    }
  });

  casperjs.on('close', function (code) {
    if (code == 0 && success) {
      success_callback(null, true);
    } else {
      success_callback(null, false);
    }
  });
}


function reset_password(website, username, old_password, new_password,
    callback) {

  var casperjs_args;
  if (config.debug) {
    casperjs_args = [config.casper_script, website, 'reset_password',
                     username, old_password, new_password,
                     '--formulas-dir=' + config.formulas_dir, '--xxx'];
    console.log(['casperjs'].concat(casperjs_args).join(' '));
  } else {
    casperjs_args = [config.casper_script, website, 'reset_password',
                     username, old_password, new_password,
                     '--formulas-dir=' + config.formulas_dir];
  }

  var casperjs = child_process.spawn(config.casper_js_executable, casperjs_args);

  var success = false;

  casperjs.stdout.on('data', function(data) {
    if (config.debug) {
      process.stdout.write('stdout: ' + data);
    }
    if (/^true/.test(data)) {
      success = true;
    } else if (/^false/.test(data)) {
      success = false;
    }
  });

  casperjs.on('close', function (code) {
    if (success) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
}
