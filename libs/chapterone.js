var _ = require("underscore");
var existy,
    truthy,
    falsy;

existy = function(x) {
    /*
     * just test for presence of null or undefined
     */
    if (!_.isNull(x) && !_.isUndefined(x)) {
        return true;
    }
    return false;
};

truthy = function(x) {
    if (x !== false && existy(x)) {
        return true;
    }
    return false;
};

falsy = function() {
};

module.exports = {
    truthy : truthy,
    falsy : falsy,
    existy : existy
};
