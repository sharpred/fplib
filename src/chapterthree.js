/**
 * @author paulryan
 */
var _ = require("underscore"),
    best,
    finder;
best = function(fun, coll) {
    return _.reduce(coll, function(x, y) {
        return fun(x, y) ? x : y;
    });
};
finder = function(valueFun, bestFun, coll) {
    if (_.isFunction(valueFun) && _.isFunction(bestFun) && !_.isEmpty(coll)) {
        return _.reduce(coll, function(best, current) {
            var bestValue = valueFun(best);
            var currentValue = valueFun(current);
            return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
        });
    } else {
        return;
    }
};
exports.best = best;
exports.finder = finder;
