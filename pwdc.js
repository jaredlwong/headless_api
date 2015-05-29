var websites = {
	'8tracks.com'           : 'formulas/8tracks.js',
	'airbnb.com'            : 'formulas/airbnb.js',
	'amazon.com'            : 'formulas/amazon.js',
	'box.com'               : 'formulas/box.js',
	'comcast.net'           : 'formulas/comcast.js',
	'evernote.com'          : 'formulas/evernote.js',
	'eventbrite.com'        : 'formulas/eventbrite.js',
	'facebook.com'          : 'formulas/facebook.js',
	'github.com'            : 'formulas/github.js',
	'news.ycombinator.com'  : 'formulas/hackernews.js',
	'reddit.com'            : 'formulas/reddit.js',
	'twitter.com'           : 'formulas/twitter.js',
	'yelp.com'              : 'formulas/yelp.js',
};

////////////////////////////////////////////////////////////////////////////////

var fs = require('fs');
var cwd = fs.absolute('.');
var BLANK_HTML = "file://" + cwd + "/blank.html";

////////////////////////////////////////////////////////////////////////////////

var casper_module = require('casper');
var casper_extensions = require('casper_extensions');

////////////////////////////////////////////////////////////////////////////////

var casper = casper_module.create({
	verbose: true,
	logLevel: 'debug',
	waitTimeout: 10000,
});

var func = casper.cli.get(0);
var website = casper.cli.get(1);

var website_module = require(websites[website]);

casper.start(BLANK_HTML);

casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36');
casper.viewport(1024, 768);

if (func === 'ensure') {
	var username = casper.cli.get(2);
	var password = casper.cli.get(3);
	var success = {};
	website_module.login(username, password, success);
	casper.run(function() {
		this.echo(success.value);
		this.exit();
	});
} else if (func === 'reset') {
	var username = casper.cli.get(2);
	var old_password = casper.cli.get(3);
	var new_password = casper.cli.get(4);
	var success = {};
	website_module.reset(username, old_password, new_password, success);
	casper.run(function() {
		this.echo(success.value);
		this.exit();
	});
}
