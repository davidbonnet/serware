# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.8.0](https://github.com/davidbonnet/serware/compare/v0.7.1...v0.8.0) (2020-09-24)


### Bug Fixes

* stringify JSON in withJson ([856d508](https://github.com/davidbonnet/serware/commit/856d50841ddd9ecd238db8e8b07eb040264d63ea))

### [0.7.1](https://github.com/davidbonnet/serware/compare/v0.7.0...v0.7.1) (2020-09-04)


### Bug Fixes

* respond did not get iterable headers values ([ef65499](https://github.com/davidbonnet/serware/commit/ef65499e86d2007b4d7be7e565d0bc51c2c7a847))

## [0.7.0](https://github.com/davidbonnet/serware/compare/v0.6.0...v0.7.0) (2020-09-03)


### Features

* support WebAPI headers in response ([8fc0cb2](https://github.com/davidbonnet/serware/commit/8fc0cb2f1e73ec0ee04aab0acae6d88646ab4c1e))

## [0.6.0](https://github.com/davidbonnet/serware/compare/v0.5.0...v0.6.0) (2020-09-03)


### Features

* add keyTransform decorator ([3865eeb](https://github.com/davidbonnet/serware/commit/3865eebe9359f0dafb023c2f542250e8b376a3f2))

## [0.5.0](https://github.com/davidbonnet/serware/compare/v0.4.0...v0.5.0) (2020-08-30)


### Features

* add withJson ([06f4027](https://github.com/davidbonnet/serware/commit/06f40275411b0670b5929b66dac8deb8574b04e4))

## [0.4.0](https://github.com/davidbonnet/serware/compare/v0.3.0...v0.4.0) (2020-08-24)


### Features

* session cookies default to root path ([7a438f7](https://github.com/davidbonnet/serware/commit/7a438f749dfd307aed9f56e35e9177f377b2e0b8))
* support status prop in response objects ([3909649](https://github.com/davidbonnet/serware/commit/390964973d0e5616e5bc346bda9609ec4d649089))


### Bug Fixes

* status codes are now integers ([db5efc2](https://github.com/davidbonnet/serware/commit/db5efc2a67dff34793cf8e354a8748e6dc6d0d07))

## [0.3.0](https://github.com/davidbonnet/serware/compare/v0.2.0...v0.3.0) (2020-08-23)


### ⚠ BREAKING CHANGES

* Remove captureUrl in favor of matchUrl.

### Features

* add matchUrl ([d334d6b](https://github.com/davidbonnet/serware/commit/d334d6baf40a3c743b7056b503fbdcf37279895d))

## [0.2.0](https://github.com/davidbonnet/serware/compare/v0.1.8...v0.2.0) (2020-08-21)


### ⚠ BREAKING CHANGES

* `request.breadcrumbs` are removed.

The routeUrl handler now sets the original request `pathname` before
passing it to the next handler.

### Features

* add captureUrl ([b3b7e28](https://github.com/davidbonnet/serware/commit/b3b7e283d6a7d2831a8fdd87225c28079b8392dd))


### Bug Fixes

* fix routeUrl and remove breadcrumbs ([ae6099c](https://github.com/davidbonnet/serware/commit/ae6099cc40d875bba51839c48ba45dae70d5abf4))

### [0.1.8](https://github.com/davidbonnet/serware/compare/v0.1.7...v0.1.8) (2020-08-20)


### Bug Fixes

* add missing exports ([3fc9725](https://github.com/davidbonnet/serware/commit/3fc972548f7af982c9cbf0470682e3526d8b9b86))

### [0.1.7](https://github.com/davidbonnet/serware/compare/v0.1.6...v0.1.7) (2020-08-20)


### Features

* add maxAge support to exposeFolder ([045b2ee](https://github.com/davidbonnet/serware/commit/045b2ee07c0990d120e1b89970a7ba2ff5544107))
* add status code constants ([88cc2aa](https://github.com/davidbonnet/serware/commit/88cc2aaf4b30d4112071c0935c56c14115915831))
* return compressed version if any found ([e497428](https://github.com/davidbonnet/serware/commit/e497428502a93b7386c74a3799f80103035b8e0d))


### Bug Fixes

* add binary response support ([8c4116f](https://github.com/davidbonnet/serware/commit/8c4116fdffffebff32d5b6a3118e0e9f4e541f7a))
* optional update date in exposeFolder ([20b511a](https://github.com/davidbonnet/serware/commit/20b511ac65bc7c47459d9753a8c74ed20c9a311d))
* skipping gzip test ([7787d77](https://github.com/davidbonnet/serware/commit/7787d77cb8302b651602b30a14d40934b583a43c))
* stabilize decompress tool ([c447072](https://github.com/davidbonnet/serware/commit/c447072af01e23e1bfbcf423e6c5b4c6dcd819da))

### [0.1.6](https://github.com/davidbonnet/serware/compare/v0.1.5...v0.1.6) (2020-08-19)


### Bug Fixes

* lint ([a7c6d9e](https://github.com/davidbonnet/serware/commit/a7c6d9efa291839779949df971209ee9b75c1410))

### [0.1.5](https://github.com/davidbonnet/serware/compare/v0.1.4...v0.1.5) (2020-08-19)


### Features

* error handling, websocket, and body parser ([cc31bfb](https://github.com/davidbonnet/serware/commit/cc31bfb68d3aa279dd8da4fe38cee405455f64e9))

### [0.1.4](https://github.com/davidbonnet/serware/compare/v0.1.3...v0.1.4) (2020-07-24)


### Bug Fixes

* reload did not reload all modules ([c385fdb](https://github.com/davidbonnet/serware/commit/c385fdb96bf4fda43d029807917eeb504be44333))

### [0.1.3](https://github.com/davidbonnet/serware/compare/v0.1.2...v0.1.3) (2020-07-23)


### Features

* add reload ([8bcda93](https://github.com/davidbonnet/serware/commit/8bcda93a55a0d7b5ece2be3677f133568ef3fcf4))

### [0.1.2](https://github.com/davidbonnet/serware/compare/v0.1.1...v0.1.2) (2020-07-23)

### [0.1.1](https://github.com/davidbonnet/serware/compare/v0.1.0...v0.1.1) (2020-07-23)


### Bug Fixes

* remove dist folder and add roadmap item ([ba52402](https://github.com/davidbonnet/serware/commit/ba52402c17c29f27a59a25aae6df9a84f0fa8ce8))

## 0.1.0 (2020-07-23)


### Features

* initial version ([b70853d](https://github.com/davidbonnet/serware/commit/b70853d703e48552a1ef8c788382c6b9570478bf))


### Bug Fixes

* **performance:** shift to (request,next) pattern ([b8e67cb](https://github.com/davidbonnet/serware/commit/b8e67cb1361b6b8f4a93fe795f1dad68b8385465))
