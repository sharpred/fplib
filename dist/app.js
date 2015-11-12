var _ = require("underscore"),
    chapterone = require("../src/chapterone"),
    chaptertwo = require("../src/chaptertwo"),
    chapterthree = require("../src/chapterthree"),
    exports = {};

[chapterone, chaptertwo, chapterthree].forEach(function(chapter) {
    _.extendOwn(exports, chapter);
});
module.exports = exports;