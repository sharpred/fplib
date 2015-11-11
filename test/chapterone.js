var expect = require("chai").expect;
describe("chapter one", function() {
    var chapterOneLibs = require("../libs/chapterone");
    describe("all functions exported", function() {
        it("should find all functions have been exported correctly", function() {
            expect(chapterOneLibs).to.have.a.property("truthy");
            expect(chapterOneLibs).to.have.a.property("existy");
            expect(chapterOneLibs).to.have.a.property("doWhen");
        });
    });
    describe("existy function", function() {
        var existy = chapterOneLibs.existy;
        it("existy should evaluate correctly", function() {
            expect(existy(null)).to.equal(false);
            expect(existy(undefined)).to.equal(false);
            expect(existy( {}.notHere)).to.equal(false);
            expect(existy(0)).to.equal(true);
            expect(existy(false)).to.equal(true);
        });
    });

    describe("truthy function", function() {
        var truthy = chapterOneLibs.truthy;
        it("truthy should evaluate correctly", function() {
            expect(truthy(null)).to.equal(false);
            expect(truthy(undefined)).to.equal(false);
            expect(truthy( {}.notHere)).to.equal(false);
            expect(truthy(0)).to.equal(true);
            expect(truthy(false)).to.equal(false);
        });
    });

    describe("doWhen function", function() {
        var doWhen = chapterOneLibs.doWhen;
        it("doWhen should evaluate correctly", function() {
            var test1 = true,
                test2 = false,
                result1,
                result2,
                result3,
                func = function() {
                return true;
            };
            result1 = doWhen(test1 === true, func);
            result2 = doWhen(test2 === true, func);
            result3 = doWhen(test1 === true, test2);
            expect(result1).to.equal(true);
            expect(result2).to.equal(undefined);
            expect(result3).to.equal(undefined);
        });
    });
});
