var fs = require('fs');
var system = require('system');

////////////////////////////////////////////////////////////////////////////////

// https://gist.github.com/creationix/7435851
// Joins path segments.  Preserves initial "/" and resolves ".." and "."
// Does not support using ".." to go above/outside the root.
// This means that join("foo", "../../bar") will not resolve to "../bar"
function path_join(/* path segments */) {
  // Split the inputs into a list of path commands.
  var parts = [];
  for (var i = 0, l = arguments.length; i < l; i++) {
    parts = parts.concat(arguments[i].split("/"));
  }
  // Interpret the path commands to get the new resolved path.
  var newParts = [];
  for (i = 0, l = parts.length; i < l; i++) {
    var part = parts[i];
    // Remove leading and trailing slashes
    // Also remove "." segments
    if (!part || part === ".") continue;
    // Interpret ".." to pop the last segment
    if (part === "..") newParts.pop();
    // Push new path segments.
    else newParts.push(part);
  }
  // Preserve the initial slash if there was one.
  if (parts[0] === "") newParts.unshift("");
  // Turn back into a single string path.
  return newParts.join("/") || (newParts.length ? "/" : ".");
}


// given 8tracks.com look through formulas to find module, return module
function find_module(formulas_dir, website) {
  var files = fs.list(formulas_dir);
  for (var i = 0; i < files.length; i++) {
    if (files[i] === '.' || files[i] === '..') {
      continue;
    }
    var formula = require(path_join(formulas_dir, files[i]));
    if (typeof formula.name === 'string') {
      if (website.indexOf(formula.name) > -1) {
        return formula;
      }
    } else if (typeof formula.name === 'regex') {
      if (formula.name.test(website)) {
        return formula;
      }
    }
  }
  return null;
}

// http://stackoverflow.com/a/9924463
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

function list_apis(casper, formulas_dir) {
  var files = fs.list(formulas_dir);
  for (var i = 0; i < files.length; i++) {
    if (files[i] === '.' || files[i] === '..') {
      continue;
    }
    var formula = require(path_join(formulas_dir, files[i]));
    casper.echo(formula.name + ':');
    for (var exp in formula) {
      if (typeof formula[exp] == 'function') {
        // cut off casper and callback args
        var api_args = getParamNames(formula[exp]).slice(1, -1);
        casper.echo('\t' + exp + ' ' + api_args.join(' '));
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////

var casper_module = require('casper');
var casper_extensions = require('casper_extensions');

var _casper = casper_module.create({
  waitTimeout: 10000,
});

if (_casper.cli.has("xxx")) {
  _casper.options.verbose = true;
  _casper.options.logLevel = 'debug';
}

var formulas_dir;
if (_casper.cli.has("formulas-dir")) {
  formulas_dir = fs.absolute(_casper.cli.get("formulas-dir"));
} else {
  formulas_dir = fs.absolute('./formulas');
}

if (_casper.cli.get(0) === 'list') {
  list_apis(_casper, formulas_dir);
  _casper.exit(0);
}

// Display dots after the completion of each step
// _casper.on('step.complete', function(resource) {
//   system.stderr.write('.');
// });

_casper.start();

// enable cookies...
// _casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36');
_casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36");
_casper.viewport(1024, 768);

var website = _casper.cli.get(0);
var website_module = find_module(formulas_dir, website);
if (website_module === null) {
  _casper.die("no website found");
}

var func = _casper.cli.get(1);
var args = [_casper];
args = args.concat(_casper.cli.args.slice(2));
args = args.concat(function success_callback(success) {
  _casper.echo(success);
});

website_module[func].apply(null, args);

_casper.run();
//  _casper.run(function() { this.exit() }, 100);
