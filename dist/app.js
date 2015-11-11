var chapterone = require("../src/chapterone");
var chaptertwo = require("../src/chaptertwo");
var _ = require("underscore");
var exports = _.extendOwn({}, chapterone);
_.extendOwn(exports, chaptertwo);
module.exports = exports;