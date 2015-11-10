var expect = require("chai").expect;
describe("chapter one", function() {
    var chapterOneLibs = require("../libs/chapterone");
    describe("all files present and correct", function() {
        it("should find all functions have been exported correctly", function() {
            expect(chapterOneLibs).to.have.a.property("truthy");
            expect(chapterOneLibs).to.have.a.property("existy");
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
});
