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
    //console.log(rest);
    if (existy(head) && existy(rest)) {
        return head.concat.apply(head, rest);
    }
    return [];

};
cons = function(head) {
    var tail = _.rest(arguments);
    //console.log("*** cons");
    if (!tail.length) {
        tail = [tail];
    } else {
        //if tail is just a single array, shallowly flatten it temporarily
        //this will make cons(42, [1,2,3]) into [42,1,2,3]
        if (_.isArray(tail)) {
            tail = _.flatten(tail, true);
        }
    }
    return cat([head], _.toArray(tail));
};

cdr = function(/* arguments */) {
    var head = _.first(arguments);
    var tail = _.rest(arguments) || [];
    if (_.isEmpty(head) && _.isEmpty(tail)) {
        tail = [];
    } else if (head && _.isEmpty(tail)) {
        if (!_.isString(head)) {
            if (_.isArray(head)) {
                head = _.flatten(head, true);
                tail = _.rest(head);
            }
        } else {
            tail = [];
        }
    }
    return tail;
};

car = function(/* arguments */) {
    var head = _.first(arguments);
    var tail = _.rest(arguments);
    if (!_.isEmpty(tail)) {
        return head;
    } else {
        if (!_.isString(head) && _.first(head)) {
            return _.first(head);
        } else {
            return null;
        }
    }
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
