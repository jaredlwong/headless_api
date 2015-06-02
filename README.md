Headless API
===============================================================================
This project is intended to supply APIs for websites that aren't normally
available. For example, being able to reset your password on a website isn't
normally available as an API call.

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
================================================================================
To test the passwords, I created a directory in this folder named `passwords`.
Each password to a site is stored as a separate file in a json blob named
`<website>_current` (for example, `amazon.com_current`). Each json blob looks
like `{"username":"<username>","password","<password>"}`.

Tests are run using mocha.
