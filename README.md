# grunt-userscript-meta

> Generate the userscript metadata-block with package.json

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-userscript-meta --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-userscript-meta');
```

## The "userscript-meta" task

### Overview
In your project's Gruntfile, add a section named `userscript-meta` to the data object passed into `grunt.initConfig()`.
This plugins reads the information from the `package.json` where more can be added in a `userscript` object. The pkg object and a destination is required.
```js
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'), //global pkg
  'userscript-meta': {
    your_target: {
      options:{
        pkg:  grunt.file.readJSON('other_package.json') //overwrites the global pkg
      }
      dest: 'src/userscript.meta.js'
    },
  },
});
```

### Options

#### options.pkg
Type: `Object`
Default value: The global pkg object.

The global pkg object can be overwritten for each task.

### Package.json examples

#### Basic example

```javascript
{
  "name": "Test Userscript",
  "description": "Testing the grunt-userscript-meta module",
  "version": "0.1.0",
  "homepage": "https://github.com/Zod-/grunt-userscript-meta",
  "author": {
    "name": "Julian Hangstörfer",
    "email": "jhangstoerfer@gmail.com"
  },
  "license": "MIT",
  "userscript":{
    "namespace": "https://github.com/Zod-"
  }
}

//Produces

// ==UserScript==
// @name         Test Userscript
// @namespace    https://github.com/Zod-
// @description  Testing the grunt-userscript-meta module
// @version      0.1.0
// @author       Julian Hangstörfer
// @source       https://github.com/Zod-/grunt-userscript-meta
// @license      MIT
// ==/UserScript==

```

#### pkg.userscript.name
The name for the userscript will be taken from `pkg.name` but localization can be added via
`pkg.userscript.name`.

```javascript
{
  "name": 'userscript name',
  //...
  "userscript": {
    "name": {
      "fr": "french userscript name",
      "de": "german userscript name"
    }
  }
}

//Produces

// ==UserScript==
// ...
// @name     userscript name
// @name:fr  french userscript name
// @name:de  german userscript name
// ...
// ==/UserScript==
```

#### pkg.userscript.description
The same can be done for the description.

```javascript
{
  "description": 'description',
  //...
  "userscript": {
    "description": {
      "fr": "french description",
      "de": "german description"
    }
  }
}

//Produces

// ==UserScript==
// ...
// @description     description
// @description:fr  french description
// @description:de  german description
// ...
// ==/UserScript==
```

#### pkg.userscript.resource
Resources can be added via `pkg.userscript.resource`

```javascript
{
  //...
  "userscript": {
    "resource": [{
      "name": "resName1",
      "url": "resUrl1"
    }, {
      "name": "resName2",
      "url": "resUrl2"
    }]
  }
}

//Produces

// ==UserScript==
// ...
// @resource     resName1 resUrl1
// @resource     resName2 resUrl2
// ...
// ==/UserScript==
```

#### pkg.userscript.require
This plugin can generate require urls for the specific userscript hosts (only greasyfork for now).

```javascript
{
  //...
  "userscript": {
    "require": {
      "greasyfork": [{
        "id": "1-greasemonkey-test-style"
      }, {
        "id": "42-disable-modal-dialogs-for-automation",
        "version": "12584"
      }]
    }
  }
}

//Produces

// ==UserScript==
// ...
// @require      https://greasyfork.org/scripts/1-greasemonkey-test-style/code/code.js
// @require      https://greasyfork.org/scripts/42-disable-modal-dialogs-for-automation/code/code.js?version=12584
// ...
// ==/UserScript==

```

#### pkg.userscript.other
Every other metakey can be added via the `other` object which can be either a
single value or an array.

```javascript
"userscript": {
  "other": {
    "include": ["url1", "url2"],
    "grant": ["GM_setValue", "GM_getValue"],
    "run-at": "document-start",
    "require": ["url3", "url4"]
  }
}

//Produces

// ==UserScript==
// ...
// @include      url1
// @include      url2
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-start
// @require      url3
// @require      url4
// ...
// ==/UserScript==
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
### 0.1.0
Added functionality
