var casper = require('casper').create({
	clientScripts: [
		'formulas/reddit.js',
		'formulas/airbnb.js',
		'formulas/hackernews.js',
	],
});

////////////////////////////////////////////////////////////////////////////////

var fs = require('fs');
var cwd = fs.absolute('.');
var BLANK_HTML = "file://" + cwd + "/blank.html";

////////////////////////////////////////////////////////////////////////////////

var generators = require('./generators');

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

website_password_funcs['airbnb.com'] = {
	ensure: generators.ensure_generator('PWDRESET_airbnb'),
	reset:  generators.reset_generator('PWDRESET_airbnb')
};

website_password_funcs['reddit.com'] = {
	ensure: generators.ensure_generator('PWDRESET_reddit'),
	reset:  generators.reset_generator('PWDRESET_reddit')
};

website_password_funcs['news.ycombinator.com'] = {
	ensure: generators.ensure_generator('PWDRESET_hackernews'),
	reset:  generators.reset_generator('PWDRESET_hackernews')
};

////////////////////////////////////////////////////////////////////////////////

var func = casper.cli.get(0);
var website = casper.cli.get(1);
var website_funcs = website_password_funcs[website];

casper.start(BLANK_HTML);

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
