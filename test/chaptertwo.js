/**
 * @author paulryan
 */
var expect = require("chai").expect;
describe("chapter two", function() {
    var chapterTwoLibs = require("../libs/chaptertwo");
    describe("all functions exported", function() {
        it("should find all functions have been exported correctly", function() {
            expect(chapterTwoLibs).to.have.a.property("rename");
            expect(chapterTwoLibs).to.have.a.property("construct");
            expect(chapterTwoLibs).to.have.a.property("cat");
        });
    });
    describe("rename function", function() {
        var rename = chapterTwoLibs.rename;
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
        var construct = chapterTwoLibs.construct;
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
        var cat = chapterTwoLibs.cat;
        var result1 = cat([1, 2, 3], [4, 5], [6, 7, 8]);
        var result2 = cat([1]);
        var result3 = cat();
        it("cat should work correctly", function() {
            expect(result1).to.eql([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(result2).to.eql([1]);
            expect(result3).to.eql([]);
        });
    });
});
