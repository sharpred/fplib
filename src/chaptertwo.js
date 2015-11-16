/**
 * @author paulryan
 * car and cdr have been added as they are similar to construct (which has been renamed cons) all of these function names
 * come from the Little Schemer
 */

var _ = require("underscore"),
    cat,
    cons,
    car,
    cdr,
    rename,
    existy = require("./chapterone").existy;

cat = function() {
    var head = _.first(arguments),
        rest = _.rest(arguments);
    if (existy(head) && existy(rest)) {
        return head.concat.apply(head, rest);
    }
    return [];

};
cons = function(head /* tail */) {
    var tail = _.chain(arguments).rest().flatten().value();
    return cat([head], _.toArray(tail));
};

cdr = function(/* arguments */) {
    var tail = _.rest(arguments);
    return tail;
};

car = function(/* arguments */) {
    return _.first(arguments);
};
rename = function(obj, newNames) {
    var memo = cons(obj, _.keys(newNames));
    return _.reduce(newNames, function(o, nu, old) {
        if (_.has(obj, old)) {
            o[old] = nu;
        }
        return o;
    }, _.omit.apply(null, memo));
};

exports.cat = cat;
exports.cons = cons;
exports.car = car;
exports.cdr = cdr;
exports.rename = rename;
