# Foundation

[![Build Status](https://travis-ci.org/davidbonnet/foundation.svg?branch=master)](https://travis-ci.org/davidbonnet/foundation)
[![Coverage](https://codecov.io/gh/davidbonnet/foundation/branch/master/graph/badge.svg)](https://codecov.io/gh/davidbonnet/foundation)
[![Dependency Status](https://david-dm.org/davidbonnet/foundation/status.svg)](https://david-dm.org/davidbonnet/foundation)
[![DevDependency Status](https://david-dm.org/davidbonnet/foundation/dev-status.svg)](https://david-dm.org/davidbonnet/foundation?type=dev)
[![Greenkeeper](https://badges.greenkeeper.io/davidbonnet/foundation.svg)](https://greenkeeper.io/)

🏛 Base repository for building JavaScript apps or libraries.

### Features

* Supports both app and library development.
* Uses only pure, modern JavaScript that [Node 8+](https://nodejs.org/) can understand (no unsupported ES proposals, CSS modules, JSX, TypeScript, etc…).
* Code checks with [Eslint](https://eslint.org) and code styling with [Prettier](https://prettier.io).
* Super fast builds in development and production modes with [Parcel](https://parceljs.org).
* Fast incremental tests and coverage with [AVA](https://github.com/avajs/ava) and [Istanbul](https://istanbul.js.org).
* [Travis](https://travis-ci.org) and [Codecov](https://codecov.io/) integrations.
* Preloaded with a [JSS](http://cssinjs.org)-styled [React](https://reactjs.org) app example, and a [Sublime Text](https://www.sublimetext.com) project setup.

## Usage

1. Clone this repository and rename it.
2. `nvm install 8`
3. `npm install`
4. Make changes to files in `/src` and use scripts described below.

### Scripts

#### Development

* `npm start [--port]`: Bundles the project app, starts the development server, and watches for changes.
* `npm start --test`: Runs tests and watches for changes.

#### Tests

* `npm test`: Runs Eslint and Prettier checks, and tests with code coverage.
* `npm run eslint`: Runs Eslint checks.
* `npm run prettier [-- --write]`: Runs Prettier checks.

#### Production

* `npm run build`: Builds the app for production.
* `npm run server [--host] [--port]`: Runs a simple web server exposing the app.

#### Publication

* `npm run prepare`: Transpiles down to JavaScript 5 script files in `/src` to `/lib`.
* `npm publish`: Publishes the library.

## IDE

### Sublime Text

* [SublimeLinter](http://www.sublimelinter.com) with [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint)
* [JsPrettier](https://github.com/jonlabelle/SublimeJsPrettier)
