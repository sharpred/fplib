var _ = require("underscore"),
    exports = {};

[require("../src/chapterone"), require("../src/chaptertwo"), require("../src/chapterthree"), require("../src/chapterfour")].forEach(function(chapter) {
    _.extendOwn(exports, chapter);
});
module.exports = exports;