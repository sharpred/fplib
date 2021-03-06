var _ = require("underscore");
var existy,
    truthy,
    doWhen,
    splat,
    unsplat;

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

doWhen = function(condition, action) {
    if (_.isFunction(action)) {
        if (truthy(condition)) {
            return action();
        }
        return undefined;
    }
    return undefined;
};

splat = function(fun) {
    return function(array) {
        return fun.apply(null, array);
    };
};

unsplat = function(fun) {
    return function(/* arguments */) {
        return fun.call(null, _.toArray(arguments));
    };

};

exports.existy = existy;
exports.truthy = truthy;
exports.doWhen = doWhen;
exports.splat = splat;
exports.unsplat = unsplat;
