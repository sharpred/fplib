/**
 * @author paulryan
 */
var _ = require("underscore"),
    repeatedly,
    repeatUntil,
    always,
    invoker,
    fnull,
    fnullObject;
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
fnullObject = function(fun /*, defaults */) {
    var defaults = _.rest(arguments)[0], results;
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
exports.repeatedly = repeatedly;
exports.repeatUntil = repeatUntil;
exports.always = always;
exports.invoker = invoker;
exports.fnull = fnull;
exports.fnullObject = fnullObject;
