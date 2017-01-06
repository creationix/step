# step changelog

step follows [Semantic Versioning][semver].

## 1.0.0 - Future

### Improved

* Added a change log

## 0.0.6 - 2015-06-06

### Improved

* `package.json` and `license.txt` now properly reference/contain the MIT license

## 0.0.5 - 2011-10-27

### Fixed

* Fixed parallel() bug when the callback was syncronously (immediately) invoked (5c56c26dbb844878ebaf4b3610fc46b301e95c4d)

## 0.0.4 - 2011-02-21

### Improved

* Add unit tests

### Fixed

* Groups with zero tasks are now terminated

### Breaking

* `[]` is no longer passed as arguments to the first step
* Node 0.2.0 or greater is required

## 0.0.3

* Initial release

 [semver]: http://semver.org/
