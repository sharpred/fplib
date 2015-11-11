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
            expect(existy(null)).to.be.false;
            expect(existy(undefined)).to.be.false;
            expect(existy( {}.notHere)).to.be.false;
            expect(existy(0)).to.be.true;
            expect(existy(false)).to.be.true;
        });
    });

    describe("truthy function", function() {
        var truthy = chapterOneLibs.truthy;
        it("truthy should evaluate correctly", function() {
            expect(truthy(null)).to.be.false;
            expect(truthy(undefined)).to.be.false;
            expect(truthy( {}.notHere)).to.be.false;
            expect(truthy(0)).to.be.true;
            expect(truthy({})).to.be.true;
            expect(truthy(false)).to.be.false;
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
            expect(result1).to.be.true;
            expect(result2).to.be.undefined;
            expect(result3).to.be.undefined;
        });
    });
});
