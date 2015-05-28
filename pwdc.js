var casper = require('casper').create();

var website_password_funcs = {};

var add_website = function(name, module) {
	var website = require('./formulas/' + module);
	website_password_funcs[name] = {
		'ensure': website.ensure,
		'reset': website.reset
	};
};

add_website('github.com', 'github');
add_website('facebook.com', 'facebook');
add_website('airbnb.com', 'airbnb');
add_website('reddit.com', 'reddit');

////////////////////////////////////////////////////////////////////////////////

var func = casper.cli.get(0);
var website = casper.cli.get(1);
var website_funcs = website_password_funcs[website];

if (func === 'ensure') {
	var username = casper.cli.get(2);
	var pwd = casper.cli.get(3);
	website_funcs['ensure'](username, pwd);
} else if (func === 'reset') {
	var username = casper.cli.get(2);
	var old_pwd = casper.cli.get(3);
	var new_pwd = casper.cli.get(4);
	website_funcs['reset'](username, old_pwd, new_pwd);
}

casper.run();
