var websites = {
	'8tracks.com' : {
		module:  'PWDRESET_8tracks',
		file:    'formulas/8tracks.js',
	},
	'airbnb.com' : {
		module:  'PWDRESET_airbnb',
		file:    'formulas/airbnb.js',
	},
	'box.com' : {
		module:  'PWDRESET_box',
		file:    'formulas/box.js',
	},
	'facebook.com' : {
		module:  'PWDRESET_facebook',
		file:    'formulas/facebook.js',
	},
	'github.com': {
		module:  'PWDRESET_github',
		file:    'formulas/github.js',
	},
	'news.ycombinator.com': {
		module:  'PWDRESET_hackernews',
		file:    'formulas/hackernews.js',
	},
	'reddit.com' : {
		module:  'PWDRESET_reddit',
		file:    'formulas/reddit.js',
	},
	'yelp.com' : {
		module:  'PWDRESET_yelp',
		file:    'formulas/yelp.js',
	},
};

////////////////////////////////////////////////////////////////////////////////

var fs = require('fs');
var cwd = fs.absolute('.');
var BLANK_HTML = "file://" + cwd + "/blank.html";

////////////////////////////////////////////////////////////////////////////////

var generators = require('./generators');

var casper = require('casper').create();

var func = casper.cli.get(0);
var website = casper.cli.get(1);

casper.options.clientScripts = [websites[website]['file']];

casper.start(BLANK_HTML);

if (func === 'ensure') {
	var username = casper.cli.get(2);
	var pwd = casper.cli.get(3);
	generators.ensure_generator(websites[website]['module'])(username, pwd);
} else if (func === 'reset') {
	var username = casper.cli.get(2);
	var old_pwd = casper.cli.get(3);
	var new_pwd = casper.cli.get(4);
	generators.reset_generator(websites[website]['module'])(username, old_pwd, new_pwd);
}

casper.run();
