/**
 * @author paulryan
 */

var _ = require("underscore"),
    construct,
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

construct = function(head, tail) {
    return cat([head], _.toArray(tail));
};
rename = function(obj, newNames) {
    var memo = construct(obj, _.keys(newNames));
    console.log("memo " + JSON.stringify(memo));
    return _.reduce(newNames, function(o, nu, old) {
        if (_.has(obj, old)) {
            o[old] = nu;
        }
        return o;
    }, _.omit.apply(null, memo));
};

module.exports = {
    rename : rename,
    construct : construct,
    cat : cat
};
