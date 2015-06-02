var passwords = require('../libs/node/passwords');

var config = require('../config');
var password_db = require('./password_db');
var password_generator = require('./password_generator');

var async = require('async');

var assert = require('assert');
var child_process = require('child_process');
var fs = require('fs');


exports.login_test = login_test;
exports.reset_password_test = reset_password_test;


function lookup_current_website_user_info(db, website, callback) {
  var db = Object.create(password_db.PasswordDB);
  db.init(config.password_dir, function () {
    this.get_current_password(website, function (data) {
      callback(data);
    });
  });
}


function login_test(website) {
  return function it_func(done) {
    this.timeout(0);  // this refers to mocha
    var db = Object.create(password_db.PasswordDB);

    async.waterfall([
      db.init.bind(db, config.passwords_dir),
      db.get_current_password.bind(db, website),
      function (user_info, callback) {
        var username = user_info.username;
        var password = user_info.password;
        passwords.login(website, username, password, function (err, success) {
            callback(err, success);
        });
      },
    ], function (err, success) {
      if (err) {
        throw err;
      }
      assert(success, 'simply not successful');
      done();
    });
  };
}


function reset_password_test(website) {
  return function it_func(done) {
    this.timeout(0);  // this refers to mocha
    var db = Object.create(password_db.PasswordDB);
    var new_password = password_generator.generate_password();
    var user_info = {};

    async.waterfall([
      db.init.bind(db, config.passwords_dir),
      db.get_current_password.bind(db, website),
      function (user_info, main_waterfall_callback) {
        var username = user_info.username;
        var old_password = user_info.password;
        async.waterfall([
          db.set_pending_password.bind(db, website, username, new_password),
          passwords.reset_password.bind(null, website, username, old_password, new_password),
          function (success, sub_waterfall_callback) {
            db.resolve_update_password(website, success, function resolve_callback(err) {
              if (err) {
                sub_waterfall_callback(err, false);
              }
              sub_waterfall_callback(null, success);
            });
          },
        ], function (err, success) {
          main_waterfall_callback(err, success);
        });
      },
    ], function (err, success) {
      if (err) {
        throw err;
      }
      assert(success, 'simply not successful');
      done();
    });
  };
}
