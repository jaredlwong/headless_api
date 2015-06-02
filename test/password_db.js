"use strict";

var fs = require('fs');
var path = require('path');

var async = require('async');
var _ = require('underscore');


exports.PasswordDB = {};


exports.PasswordDB.init =
function init(directory, init_callback) {
  init_callback = init_callback || function() {};
  this.directory = directory;
  var self = this;
  async.waterfall([
      function (callback) {
        fs.exists(directory, function (exists) {
          callback(null, exists);
        });
      },
      function (exists, callback) {
        if (!exists) {
          callback("database directory doesn't exists");
        }
        callback(null);
      },
      fs.stat.bind(null, directory),
      function (stats, callback) {
        if (!stats.isDirectory) {
          callback("database directory isn't a directory");
        }
        callback(null);
      },
      fs.readdir.bind(null, directory),
  ], function callback (err, files) {
    if (err) {
      throw err;
    }
    self.files = files;
    init_callback.call(self);
  });
};


exports.PasswordDB.list_current =
function list_current() {
  return _.filter(_.map(this.files, function (file) {
    var match = /([^_]+)_current/.exec(file);
    if (match !== null) {
      return match[1];
    }
    return null;
  }), function (match) { return match !== null });
};



exports.PasswordDB.get_current_password =
function get_current_password(website, callback) {
  var self = this;
  var current_file_path = path.join(this.directory, website + '_current');
  async.waterfall([
      function (callback) {
        fs.exists(current_file_path, function (exists) {
          callback(null);
        });
      },
      fs.readFile.bind(null, current_file_path, "utf-8")
  ],
  function (err, current_file_text) {
    if (err) throw err;
    var current_file = JSON.parse(current_file_text);
    fs.appendFile(path.join(self.directory, website + '_log'),
        'GET CURRENT: ' + current_file_text + '\n',
        function (err) {
          callback.call(self, null, current_file);
        });
  });
};


exports.PasswordDB.set_pending_password =
function set_pending_password(website, username, password, callback) {
  callback = callback || function() {};
  var self = this;
  var pending_file_path = path.join(this.directory, website + '_pending');
  var pending_user_info = {
    username: username,
    password: password
  };

  if (this.files.indexOf(website) > -1) {
    throw website + ' not in current files';
  }

  async.waterfall([
      function (callback) {
        fs.exists(pending_file_path,
            function (exists) {
              if (exists) {
                callback(website + "_pending  already exists");
              }
              callback(null);
            });
      },
      fs.appendFile.bind(null,
        path.join(self.directory, website + '_log'),
        'SET PENDING: ' + JSON.stringify(pending_user_info) + '\n'),
      fs.writeFile.bind(null,
        pending_file_path,
        JSON.stringify(pending_user_info)),
  ], function (err) {
    callback.call(self, err);
  });
};


exports.PasswordDB.resolve_update_password =
function resolve_update_password(website, successful, callback) {
  callback = callback || function() {};
  var self = this;

  var current_file_path = path.join(this.directory, website + '_current');
  var pending_file_path = path.join(this.directory, website + '_pending');

  if (successful) {
    fs.appendFile(path.join(self.directory, website + '_log'),
        'MOVE PENDING TO CURRENT\n', function (err) {
      fs.rename(pending_file_path, current_file_path, function (err) {
        callback.call(self, err);
      });
    });
  } else {
    fs.appendFile(path.join(self.directory, website + '_log'),
        'REMOVE PENDING\n', function (err) {
      fs.unlink(pending_file_path, function (err) {
        callback.call(self, err);
      });
    });
  }
};
