var expect = require("chai").expect,
    _ = require("underscore");
describe("distro", function() {
    var fplib = require("../dist/app");
    describe("all functions exported", function() {
        it("should find all functions have been exported correctly", function() {
            expect(fplib).to.have.a.property("truthy");
            expect(fplib).to.have.a.property("existy");
            expect(fplib).to.have.a.property("doWhen");
            expect(fplib).to.have.a.property("cat");
            expect(fplib).to.have.a.property("construct");
            expect(fplib).to.have.a.property("rename");
            expect(fplib).to.have.a.property("best");
            expect(fplib).to.have.a.property("finder");
            expect(fplib).to.have.a.property("repeatedly");
            expect(fplib).to.have.a.property("repeatUntil");
            expect(fplib).to.have.a.property("always");
            expect(fplib).to.have.a.property("invoker");
            expect(fplib).to.have.a.property("fnull");
            expect(fplib).to.have.a.property("fnullObject");
        });
    });
    describe("existy function", function() {
        var existy = fplib.existy;
        it("existy should evaluate correctly", function() {
            expect(existy(null)).to.be.false
            expect(existy(undefined)).to.be.false
            expect(existy( {}.notHere)).to.be.false
            expect(existy(0)).to.be.true
            expect(existy(false)).to.be.true
            expect(existy([[1, 2, 3]])).to.be.true
            expect(existy([1, 2, 3])).to.be.true
        });
    });

    describe("truthy function", function() {
        var truthy = fplib.truthy;
        it("truthy should evaluate correctly", function() {
            expect(truthy(null)).to.be.false
            expect(truthy(undefined)).to.be.false
            expect(truthy( {}.notHere)).to.be.false
            expect(truthy(0)).to.be.true
            expect(truthy({})).to.be.true
            expect(truthy(false)).to.be.false
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

    describe("construct function", function() {
        var construct = fplib.construct;
        var arr = [1, 2, 3];
        var newarr = construct(42, arr);
        it("construct should work correctly", function() {
            expect(newarr).to.include(1);
            expect(newarr).to.include(2);
            expect(newarr).to.include(3);
            expect(newarr).to.include(42);
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

    describe("always function", function() {
        var always = fplib.always;
        var a = always(function() {
        });
        var b = always(function() {
        });
        it("always should return a closure, ALWAYS", function() {
            expect(a() === a()).to.be.true
            expect(a() === b()).to.be.false
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

        var objTest = new Obj();
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
});
