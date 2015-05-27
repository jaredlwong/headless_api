var casper = require('casper').create();

var github = require('./formulas/github');
var facebook = require('./formulas/facebook');

var website_password_funcs = {
	'github.com': {
		'ensure': github.ensure,
		'reset': github.reset
	},
	'facebook.com': {
		'ensure': facebook.ensure,
		'reset': facebook.reset
	}
};

////////////////////////////////////////////////////////////////////////////////

var website = casper.cli.get(0);
var func = casper.cli.get(1);
var website_funcs = website_password_funcs[website];

if (func === 'ensure') {
	var username = casper.cli.get("username");
	var pwd = casper.cli.get("pwd");
	website_funcs['ensure'](username, pwd);
} else if (func === 'reset') {
	var username = casper.cli.get("username");
	var old_pwd = casper.cli.get("old_pwd");
	var new_pwd = casper.cli.get("new_pwd");
	website_funcs['reset'](username, old_pwd, new_pwd);
}

casper.run();
