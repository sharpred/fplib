/**
 * @author paulryan
 */
var _ = require("underscore"),
    repeatedly,
    repeatUntil,
    always,
    invoker,
    fnull,
    runWithDefaults,
    checker,
    validator,
    aMap,
    hasKeys;
repeatedly = function(times, func) {
    if (_.isNumber(times) && _.isFunction(func)) {
        return _.map(_.range(times), func);
    }
    return;
};
repeatUntil = function(fun, check, init) {
    var ret = [],
        result;
    try {
        if (_.isFunction(fun) && _.isFunction(check)) {
            result = fun(init);
            while (check(result)) {
                ret.push(result);
                result = fun(result);
            }
        }
    } catch(ex) {
        console.error(ex);
    } finally {
        return ret;
    }
};
always = function(value) {
    return function() {
        return value;
    };
};
invoker = function(NAME, METHOD) {
    var targetMethod,
        args;
    return function(target /* arguments ..... */) {
        var existy = require("./chapterone").existy,
            doWhen = require("./chapterone").doWhen;
        if (existy(target)) {
            //console.log(target);
            targetMethod = target[NAME];
            //console.log("method:"+ targetMethod);
            var args = _.rest(arguments);
            //console.log("args "+args);

            return doWhen((METHOD === targetMethod), function() {
                return targetMethod.apply(target, args);
            });
        }
    };
};
fnull = function(fun /*, defaults */) {
    var defaults = _.rest(arguments);
    return function(/* arguments */) {
        var existy = require("./chapterone").existy,
            args = _.map(arguments, function(e, i) {
            var val;
            if (existy(e)) {
                val = e;
            } else {
                val = defaults[i];
            }
            return val;
        });
        return fun.apply(null, args);
    };
};
runWithDefaults = function(fun /*, defaults */) {
    var defaults = _.rest(arguments)[0],
        results;
    return function(/* arguments */) {
        //we are not mutating the original object - FP best practice
        var args = _.clone(arguments[0]);
        if (_.isObject(args) && _.isObject(defaults)) {
            args = _.defaults(args, defaults);
        }
        results = fun(args);
        return results;
    };
};
checker = function(/* validators */) {
    var validators = _.toArray(arguments);
    return function(obj) {
        return _.reduce(validators, function(errs, check) {
            if (check(obj)) {
                return errs;
            } else {
                return _.chain(errs).push(check.message).value();
            }
        }, []);
    };
};
validator = function(message, fun) {
    var f = function(/* args */) {
        return fun.apply(fun, arguments);
    };
    f["message"] = message;
    return f;
};
aMap = function(obj) {
    return _.isObject(obj);
};
hasKeys = function() {
    var cat = require("./chaptertwo").cat;
    var KEYS = _.toArray(arguments);
    var fun = function(obj) {
        return _.every(KEYS, function(k) {
            return _.has(obj, k);
        });
    };
    fun.message = cat(["Must have values for keys:"], KEYS).join(" ");
    return fun;

};
function deep(obj, str) {
    "use strict";
    if ( typeof str !== "string") {
        return;
    }
    if ( typeof obj !== "object") {
        return;
    }
    function index(obj, i) {
        try {
            if (obj.hasOwnProperty(i)) {
                return obj[i];
            }
            return;
        } catch(ex) {
            return;
        }
    }

    return str.split('.').reduce(index, obj);
}

function hasDeepKeys(target, path) {
    var test = deep(target, path);
    if ( typeof test !== "undefined") {
        return true;
    }
    return false;
}

function getDeepKeys(target, path) {
    return deep(target, path);
}

exports.hasDeepKeys = hasDeepKeys;
exports.getDeepKeys = getDeepKeys;
exports.repeatedly = repeatedly;
exports.repeatUntil = repeatUntil;
exports.always = always;
exports.invoker = invoker;
exports.fnull = fnull;
exports.runWithDefaults = runWithDefaults;
exports.checker = checker;
exports.validator = validator;
exports.aMap = aMap;
exports.hasKeys = hasKeys;