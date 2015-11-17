/*global describe, it, xit */
var expect = require("chai").expect,
    _ = require("underscore");
describe("app.js", function() {
    var fplib = require("../dist/app");
    describe("all functions in app.js are exported", function() {
        it("should find all functions have been exported correctly", function() {
            expect(fplib).to.have.a.property("truthy");
            expect(fplib).to.have.a.property("existy");
            expect(fplib).to.have.a.property("doWhen");
            expect(fplib).to.have.a.property("splat");
            expect(fplib).to.have.a.property("unsplat");
            expect(fplib).to.have.a.property("cat");
            expect(fplib).to.have.a.property("car");
            expect(fplib).to.have.a.property("cdr");
            expect(fplib).to.have.a.property("cons");
            expect(fplib).to.have.a.property("rename");
            expect(fplib).to.have.a.property("best");
            expect(fplib).to.have.a.property("finder");
            expect(fplib).to.have.a.property("repeatedly");
            expect(fplib).to.have.a.property("repeatUntil");
            expect(fplib).to.have.a.property("always");
            expect(fplib).to.have.a.property("invoker");
            expect(fplib).to.have.a.property("fnull");
            expect(fplib).to.have.a.property("runWithDefaults");
            expect(fplib).to.have.a.property("checker");
            expect(fplib).to.have.a.property("validator");
            expect(fplib).to.have.a.property("aMap");
            expect(fplib).to.have.a.property("hasKeys");
            expect(fplib).to.have.a.property("hasDeepKeys");
            expect(fplib).to.have.a.property("getDeepKeys");
        });
    });
    describe("existy function provides a loose equality exists function", function() {
        var existy = fplib.existy;
        it("existy should returns false for null and undefined", function() {
            expect(existy(null)).to.equal(false);
            expect(existy(undefined)).to.equal(false);
            expect(existy( {}.notHere)).to.equal(false);
        });
        it("existy returns true for zero and false", function() {
            expect(existy(0)).to.equal(true);
            expect(existy(false)).to.equal(true);
        });
        it("existy returns true for present values", function() {
            expect(existy([[1, 2, 3]])).to.equal(true);
            expect(existy([1, 2, 3])).to.equal(true);
        });
    });

    describe("truthy function", function() {
        var truthy = fplib.truthy;
        it("truthy should evaluate correctly", function() {
            expect(truthy(null)).to.equal(false);
            expect(truthy(undefined)).to.equal(false);
            expect(truthy( {}.notHere)).to.equal(false);
            expect(truthy(0)).to.equal(true);
            expect(truthy({})).to.equal(true);
            expect(truthy(false)).to.equal(false);
        });
    });
    describe("rename function", function() {
        var rename = fplib.rename;
        var obj = {
            "a" : 1,
            "b" : 2,
            "c" : 42
        };
        var changes = {
            "a" : "AAA",
            "c" : "ccc"
        };
        var obj2 = rename(obj, changes);
        it("rename should work correctly", function() {
            expect(obj2["a"]).to.equal("AAA");
            expect(obj2["c"]).to.equal("ccc");
        });
    });

    describe("splat takes a function and returns another function that takes an array and calls the original function with apply", function() {
        var splat = fplib.splat,
            addArrayElements,
            func;
        func = function(x, y) {
            return x + y;
        };
        addArrayElements = splat(func);
        it("func should work correctly", function() {
            expect(func(1,2)).to.eql(3);
        });
        it("splat should work correctly", function() {
            expect(addArrayElements([1, 2])).to.eql(3);
        });
    });

    describe("unsplat takes a function and returns another function that takes any number of arguments, converts them to an array and calls the original function with an array of the values given", function() {
        var unsplat = fplib.unsplat,
            func,
            joinElements;
        func = function(array) {
            return array.join(' ');
        };
        joinElements = unsplat(func);
        it("func should work correctly", function() {
            expect(func([1, 2])).to.eql("1 2");
            expect(func(["-", "$", "/", "!", ":"])).to.eql("- $ / ! :");
        });
        it("unsplat should work correctly", function() {
            expect(joinElements(1,2)).to.eql("1 2");
            expect(joinElements("-", "$", "/", "!", ":")).to.eql("- $ / ! :");
        });
    });

    describe("cons function takes an element (head) and an array (tail) and places the element in the front of the array using cat", function() {
        var cons = fplib.cons;
        it("cons adds the head to the front of the tail", function() {
            expect(cons(42, [1, 2, 3])).to.eql([42, 1, 2, 3]);
            expect(cons({}, [1, 2, 3])).to.eql([{}, 1, 2, 3]);
        });
        it("cons converts the tail to an array if it is not one", function() {
            expect(cons(42, 7)).to.eql([42, 7]);
            expect(cons([42], 7)).to.eql([[42], 7]);
            expect(cons(42, 7, 8, 9, 10)).to.eql([42, 7, 8, 9, 10]);
            expect(cons(42, {
                first : 1
            }, 3)).to.eql([42, {
                first : 1
            }, 3]);
        });
        it("cons does not flattens the tail", function() {
            expect(cons(42, [7, [8, [9, 10]]])).to.eql([42, 7, [8, [9, 10]]]);
        });
        it("cons does not flatten the head", function() {
            expect(cons([42], 7)).to.eql([[42], 7]);
        });
    });

    describe("car function returns the first element of a list of arguments", function() {
        var car = fplib.car;
        it("car should return the first item in a list is returned", function() {
            expect(car(1, 2, 3, 4, 5)).to.eql(1);
            expect(car(["string"])).to.eql("string");
            expect(car([9])).to.eql(9);
            expect(car([{}])).to.eql({});
            expect(car("string", 8, {}, null)).to.equal("string");
            expect(car(["string", 8, {}, null])).to.equal("string");
        });
        it("car should incrementally return first item in a list", function() {
            var test1 = car([[1, 2], 3], 4, [5]),
                test2 = car(test1),
                test3 = car(test2),
                test4 = car(test3);
            expect(test1).to.eql([[1, 2], 3]);
            expect(test2).to.eql([1, 2]);
            expect(test3).to.eql(1);
            expect(test4).to.eql(null);
        });
        it("car should return null if list is not an array", function() {
            expect(car([undefined], 3, [4, 5])).to.eql([undefined]);
            expect(car(undefined)).to.eql(null);
            expect(car("string")).to.eql(null);
            expect(car(9)).to.eql(null);
            expect(car({})).to.eql(null);
        });
    });

    describe("cdr function returns a list of arguments minus the first element (car)", function() {
        var cdr = fplib.cdr,
            test1,
            test2,
            test3,
            test4;
        test1 = cdr([undefined], 3, [4, 5]);
        test2 = cdr(test1);
        test3 = cdr(test2);
        test4 = cdr(test3);
        it("cdr should return the list of items", function() {
            expect(cdr(1, 2, 3, 4, 5)).to.eql([2, 3, 4, 5]);
            expect(cdr([1, 2, 3], 4, [5])).to.eql([4, [5]]);
            expect(cdr([undefined], 3, [4, 5])).to.eql([3, [4, 5]]);
        });
        it("cdr should return an empty array when the list is undefined", function() {
            expect(cdr(undefined)).to.eql([]);
            expect(cdr(null)).to.eql([]);
            expect(cdr([])).to.eql([]);
        });
        it("cdr should return an empty array when the list is empty", function() {
            expect(cdr("string")).to.eql([]);
            expect(cdr(["string"])).to.eql([]);
            expect(cdr(9)).to.eql([]);
            expect(cdr({})).to.eql([]);
            expect(cdr([9])).to.eql([]);
            expect(cdr([{}])).to.eql([]);
        });
        it("cdr should cope with nested calls", function() {
            expect(test1).to.eql([3, [4, 5]]);
            expect(test2).to.eql([4, 5]);
            expect(test3).to.eql([5]);
            expect(test4).to.eql([]);
        });
    });

    describe("cat function", function() {
        var cat = fplib.cat;
        var result1 = cat([1, 2, 3], [4, 5], [6, 7, 8]);
        var result2 = cat([1]);
        var result3 = cat();
        it("cat should work correctly", function() {
            expect(result1).to.eql([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(result2).to.eql([1]);
            expect(result3).to.eql([]);
        });
    });

    describe("best function", function() {
        var best = fplib.best,
            testData = [1, 2, 3, 4, 5],
            result1,
            func;

        func = function(x, y) {
            return x > y;
        };
        result1 = best(func, testData);
        it("best should work correctly", function() {
            expect(result1).to.eql(5);
        });
    });

    describe("finder function", function() {
        var finder = fplib.finder,
            testData = [1, 2, 3, 4, 5],
            result1,
            func;

        func = function(x, y) {
            return x > y;
        };
        result1 = finder(_.identity, func, testData);
        it("best should work correctly", function() {
            expect(result1).to.eql(5);
        });
    });

    describe("repeatedly function", function() {
        var repeatedly = fplib.repeatedly,
            func = function() {
            return "Hello World";
        },
            addFunc = function(n) {
            return 'id' + n;
        },
            test1 = repeatedly(3, func),
            test2 = repeatedly(3, addFunc);
        it("repeatedly should work n number of times", function() {
            expect(test1).to.eql(["Hello World", "Hello World", "Hello World"]);
            expect(test2).to.eql(['id0', 'id1', 'id2']);
        });
    });

    describe("repeatUntil function", function() {
        var repeatUntil = fplib.repeatUntil,
            func = function(n) {
            return n + n;
        },
            check = function(n) {
            return n <= 1024;
        },
            test1 = repeatUntil(func, check, 1),
            test2 = repeatUntil(func, check, "A");

        it("repeatUntil should carry on until check function returns true", function() {
            expect(test1).to.eql([2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]);
            expect(test2).to.eql([]);
        });
    });

    describe("always function.  Always is analagous to lambda k function", function() {
        var always = fplib.always;
        var a = always(function() {
        });
        var b = always(function() {
        });
        var c = always(false);
        var d = always(true);
        var e = always("fred");
        it("always should return a closure.", function() {
            expect(a() === a()).to.equal(true);
            expect(a() === b()).to.equal(false);
            expect(c()).to.equal(false);
            expect(d()).to.equal(true);
            expect(e()).to.equal('fred');
        });
    });

    describe("invoker function", function() {
        var invoker = fplib.invoker,
            rev,
            test1,
            test2,
            test3,
            Obj,
            objTest,
            updater;

        Obj = function() {
            this.test = 'default';
            this.setText = function(text) {
                this.test = text;
            };
            this.getText = function() {
                return this.test;
            };
        };
        Obj.prototype.update = function() {
            this.setText("wobble");
        };

        objTest = new Obj();
        rev = invoker('reverse', Array.prototype.reverse);
        updater = invoker('update', Obj.prototype.update);
        test1 = _.map([[1, 2, 3]], rev);
        test2 = _.map([["a", "b", "c"]], rev);
        updater(objTest);
        it("invoker takes a method and returns a function that will invoke the method on any given object", function() {
            expect(test1).to.eql([[3, 2, 1]]);
            expect(test2).to.eql([["c", "b", "a"]]);
            expect(objTest.getText()).to.eql("wobble");
        });
    });

    describe("fnull function", function() {
        var nums = [1, 2, 3, null, 5],
            fnull = fplib.fnull;
        var totaliser = function(x, y) {
            return x * y;
        };
        var badtest = _.reduce(nums, totaliser);
        var goodtotaliser = fnull(totaliser, 1, 1);
        var goodtest = _.reduce(nums, goodtotaliser);

        it("fnull replaces null or undefined arguments with supplied defaults", function() {
            expect(badtest).to.eql(0);
            expect(goodtest).to.eql(30);
        });
    });

    describe("runWithDefaults function", function() {
        var runWithDefaults = fplib.runWithDefaults,
            defaults,
            testObject,
            func,
            result,
            newFunc;
        defaults = {
            "left" : 10,
            "right" : 20,
            "top" : 0,
            "bottom" : 5,
            "layout" : "vertical"
        };
        testObject = {
            "left" : 20,
            "right" : 10,
            "top" : 5
        };

        func = function(obj) {
            return JSON.stringify(obj);
        };

        newFunc = runWithDefaults(func, defaults);
        result = newFunc(testObject);
        it("runWithDefaults replaces null or undefined arguments with supplied defaults", function() {
            expect(func(defaults)).to.eql("{\"left\":10,\"right\":20,\"top\":0,\"bottom\":5,\"layout\":\"vertical\"}");
            expect(func(testObject)).to.eql("{\"left\":20,\"right\":10,\"top\":5}");
            expect(result).to.eql("{\"left\":20,\"right\":10,\"top\":5,\"bottom\":5,\"layout\":\"vertical\"}");
        });
    });

    describe("checker function.  Checker takes a number of predicates and returns a validation function.", function() {
        var checker = fplib.checker,
            always = fplib.always,
            fails,
            alsoFails,
            alwaysPasses,
            alwaysFails,
            test1,
            test2;

        alwaysPasses = checker(always(true), always(true));
        test1 = alwaysPasses({});

        fails = always(false);
        fails.message = "this is a failure";
        alsoFails = always(false);
        alsoFails.message = "this fails too";
        alwaysFails = checker(fails, always(true), alsoFails);
        test2 = alwaysFails({});

        it("if checker returns true, an empty array is returned", function() {
            expect(test1).to.eql([]);
        });

        it("if checker returns false, a populated array of error messages is returned", function() {
            expect(test2).to.eql(["this is a failure", "this fails too"]);
        });
    });

    describe("validator function provides a simple wrapper for adding a message to a validation function", function() {
        var checker = fplib.checker,
            always = fplib.always,
            validator = fplib.validator,
            gonnaFail;

        gonnaFail = checker(validator("DOH!", always(false)));

        it("checker displays the first parameter passed to validator upon error in an array of error messages", function() {
            expect(gonnaFail(100)).to.eql(["DOH!"]);
        });

    });

    describe("aMap is a simple wrapper on _.isObject.  Useful for checker functions", function() {
        var aMap = fplib.aMap;
        it("aMap returns true if an object", function() {
            expect(aMap({})).to.eql(true);
            expect(aMap({
                "one" : "two",
                "three" : undefined
            })).to.eql(true);
        });
        it("aMap also returns true on an array.", function() {
            expect(aMap([])).to.eql(true);
            expect(aMap(['fred', 'bert', 'harry'])).to.eql(true);
        });
        it("aMap returns false if not an object or an array", function() {
            expect(aMap()).to.eql(false);
            expect(aMap(42)).to.eql(false);
            expect(aMap(null)).to.eql(false);
            expect(aMap(undefined)).to.eql(false);
        });
    });

    describe("hasKeys determines if mandatory keys are present in an object.  Best used in conjunction with checker function", function() {
        var aMap = fplib.aMap,
            hasKeys = fplib.hasKeys,
            validator = fplib.validator,
            checker = fplib.checker,
            checkCommand = checker(hasKeys('msg', 'type')),
            errorMsg = ["Must have values for keys: msg type"];
        it("hasKeys will report an error on non objects", function() {
            expect(checkCommand(42)).to.eql(errorMsg);
            expect(checkCommand(null)).to.eql(errorMsg);
            expect(checkCommand([])).to.eql(errorMsg);
            expect(checkCommand({})).to.eql(errorMsg);
            expect(checkCommand("string")).to.eql(errorMsg);
            expect(checkCommand(['msg', 'type'])).to.eql(errorMsg);
            expect(checkCommand({
                msg : "this is a message"
            })).to.eql(errorMsg);

        });
        it("hasKeys will pass on valid objects", function() {
            expect(checkCommand({
                "msg" : "another",
                "type" : "test"
            })).to.eql([]);
            expect(checkCommand({
                msg : "this is a message",
                "type" : "test",
                value : "wibble"
            })).to.eql([]);
        });

    });
});
