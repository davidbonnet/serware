# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.13.0](https://github.com/davidbonnet/serware/compare/v0.12.1...v0.13.0) (2021-03-17)


### ⚠ BREAKING CHANGES

* **reload:** To avoid an unnecessary dependency on a development
dependency, the watcher must now be passed onto `reload`.
This also gives more flexibility on what and how to watch files.

### Bug Fixes

* **header:** write content-encoding when unset ([f1a4099](https://github.com/davidbonnet/serware/commit/f1a40995c9e75af6ee626ab28aec2c7c263cc6b4))
* **reload:** externalize watcher ([dceb7bf](https://github.com/davidbonnet/serware/commit/dceb7bf80efede5aea37cf9859fd7c875685d8ad))

### [0.12.1](https://github.com/davidbonnet/serware/compare/v0.12.0...v0.12.1) (2021-03-16)


### Bug Fixes

* **exposeFolder:** add missing content-encoding ([0dfdb9e](https://github.com/davidbonnet/serware/commit/0dfdb9ef930bfe23f218d64bd10422bb75c988c9))

## [0.12.0](https://github.com/davidbonnet/serware/compare/v0.11.5...v0.12.0) (2021-03-03)


### ⚠ BREAKING CHANGES

* Respond is now just a handler that returns the default
response object.

### Features

* **exposeFolder:** support if-modified-since ([14d24f5](https://github.com/davidbonnet/serware/commit/14d24f539752b960c1e9efe0f7a6fb38ceb70a4a))
* **onUse:** add connect adapter ([14438ad](https://github.com/davidbonnet/serware/commit/14438adaf03d5ce4cc9b51700e40c70df0577139))
* **reload:** support async default function ([a683cdb](https://github.com/davidbonnet/serware/commit/a683cdb6f157c9d8277228d3bc8fb3117b2cbd3b))
* **setHref:** add new tool ([06283c7](https://github.com/davidbonnet/serware/commit/06283c72d7f2fc5b78e73518d05108493a07087f))
* **use:** new handler for connect-like listeners ([f335b1e](https://github.com/davidbonnet/serware/commit/f335b1e54cb2b028d6fcc1f1a7824d31216eae81))


* move respond to tools ([2cc7cd8](https://github.com/davidbonnet/serware/commit/2cc7cd8e065d2777f0d7e29268d3915952b0f07e))

### [0.11.5](https://github.com/davidbonnet/serware/compare/v0.11.4...v0.11.5) (2020-12-21)


### Features

* add exposeFolder parameters ([035aa5d](https://github.com/davidbonnet/serware/commit/035aa5dca44332258029795d0c3e0f069dfff0be))

### [0.11.4](https://github.com/davidbonnet/serware/compare/v0.11.3...v0.11.4) (2020-12-04)


### Bug Fixes

* **exposeFolder:** handle URI encoding ([e1cc0e3](https://github.com/davidbonnet/serware/commit/e1cc0e330273d2b66eb78c82b5767f42b3cf6078))

### [0.11.3](https://github.com/davidbonnet/serware/compare/v0.11.2...v0.11.3) (2020-12-04)


### Bug Fixes

* **isChildPath:** include self ([b3682ef](https://github.com/davidbonnet/serware/commit/b3682eff4af623ddc42423aba68d963bd856805a))

### [0.11.2](https://github.com/davidbonnet/serware/compare/v0.11.1...v0.11.2) (2020-12-04)


### Features

* add index support ([dc3625c](https://github.com/davidbonnet/serware/commit/dc3625ce647f777fbfce2c32349b51939f1b2ff0))

### [0.11.1](https://github.com/davidbonnet/serware/compare/v0.11.0...v0.11.1) (2020-12-04)


### Features

* expose isChildPath ([9245739](https://github.com/davidbonnet/serware/commit/924573971691a236edb38952c51a6cdd7958e288))

## [0.11.0](https://github.com/davidbonnet/serware/compare/v0.10.0...v0.11.0) (2020-10-29)


### Features

* export COMPRESSIBLE_CONTENT_TYEPS ([f69b1b9](https://github.com/davidbonnet/serware/commit/f69b1b9797aba1b7928df5cc342e0b8b2e60803d))

## [0.10.0](https://github.com/davidbonnet/serware/compare/v0.9.0...v0.10.0) (2020-09-30)


### Bug Fixes

* **session:** omit from session if undefined value ([a5d6269](https://github.com/davidbonnet/serware/commit/a5d62692e8b06f5efe8888399dd5fb8f2610f2cb))
* **withJson:** handle iterable headers in options ([3fd91a0](https://github.com/davidbonnet/serware/commit/3fd91a04ec85776154e4345999b588bb03beee58))

## [0.9.0](https://github.com/davidbonnet/serware/compare/v0.8.1...v0.9.0) (2020-09-25)


### Features

* **handleError:** also pass `request` to callback ([10ff600](https://github.com/davidbonnet/serware/commit/10ff600362bfacdb56ec2d7e0546060185d128f5))

### [0.8.1](https://github.com/davidbonnet/serware/compare/v0.8.0...v0.8.1) (2020-09-25)


### Bug Fixes

* **exposeFolder:** correctly normalize pathname ([f7ec9f3](https://github.com/davidbonnet/serware/commit/f7ec9f36a0c0f2f3ce561894171f4732b88259be))

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
