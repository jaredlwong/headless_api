Headless API
===============================================================================
This project is intended to supply APIs for websites that aren't normally
available.

These include:
- Login to a website via desktop (some sites require periodic login)
- Reset your password
- Get a new OAuth Token (hasn't yet been tried)
- Change profile pictures (hasn't yet been tried)


Quick-N-Dirty Use
--------------------------------------------------------------------------------
### Requirements

brew install homebrew/versions/phantomjs198
brew install casperjs --devel

### Usage
```
$ casperjs casper_driver/casper_script.js list
8tracks.com:
	login username password
	reset_password username old_password new_password
airbnb.com:
	login username password
	reset_password username old_password new_password
amazon.com:
	login username password
	reset_password username old_password new_password
angel.co:
	login username password
	reset_password username old_password new_password
box.com:
	login username password
	reset_password username old_password new_password
...

$ casperjs casper_driver/casper_script.js 8tracks.com reset_password <username> <old_password> <new_password>
true|false
```


Library Use
--------------------------------------------------------------------------------
There are minimal wrappers around this command in libs.


Development
--------------------------------------------------------------------------------
This project is built primarily on the phantomjs platform. The `formulas` are
the written for the phantomjs platform. This project relies heavily on the
casperjs runtime system on top of phantomjs.

If you want to write your own library for the phantomjs platform, this
project provides a nice library of APIs for controlling websites.

If you want to use these APIs from another platform, for example node.js, there
are libararies that will spawn phantomjs processes and run the specified API.

Notably, these APIs are incredibly slow (5-60 seconds). This is mainly due to
the cost of setting up a phantomjs process for each API call.


Testing
--------------------------------------------------------------------------------
To test the passwords, I created a directory in this folder named `passwords`.
Each password to a site is stored as a separate file in a json blob named
`<website>_current` (for example, `amazon.com_current`). Each json blob looks
like `{"username":"<username>","password","<password>"}`.

Tests are run using mocha.
