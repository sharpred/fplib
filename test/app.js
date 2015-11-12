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
});
