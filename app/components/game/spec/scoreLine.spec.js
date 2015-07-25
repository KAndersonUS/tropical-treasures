describe("getLine", function () {
    var reels = [[0,7, 10], [0, 7, 10], [0, 11, 9]];
    it("should return all 0 for first line", function () {
        expect(getLine(reels,0)).toEqual([0,0,0]);
    });
    it("should return 7, 7, 11 for second line", function () {
        expect(getLine(reels,1)).toEqual([7, 7, 11]);
    });
    it("should return 10, 10, 9 for third line", function () {
        expect(getLine(reels,2)).toEqual([10,10,9]);
    });
});

describe("scoreLine", function () {
    // passed reels for scoring, plus line to score
    var reels = [[0,7, 10], [0, 7, 10], [0, 11, 9]];
    it("should score line 0 at 60 (no wilds)", function () {
        expect(scoreLine(getLine(reels, 0))).toEqual(60);
    });
    it("should score line 1 at 25 (1 wild)", function () {
        expect(scoreLine(getLine(reels, 1))).toEqual(25);
    });
    it("should score line 2 at 2 (2-of-a-kind)", function () {
        expect(scoreLine(getLine(reels, 2))).toEqual(2);
    });
});

describe("replaceWilds", function () {
    // wild is 11
    it("should replace all wild values (11) with the previous value", function () {
        expect(replaceWilds([0, 11, 2])).toEqual([0, 0, 2]);
    });
    it("should replace wild values (11) with 2", function () {
        expect(replaceWilds([11, 11, 2])).toEqual([2, 2, 2]);
    });
    it("should return all wilds if input is all wilds", function () {
        expect(replaceWilds([11, 11, 11])).toEqual([11, 11, 11]);
    });
    it("should replace all wilds if preceeded by more than one non-wild", function () {
        expect(replaceWilds([7, 7, 11])).toEqual([7, 7, 7]);
    });
});