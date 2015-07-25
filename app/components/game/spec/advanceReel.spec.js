describe("advanceReel", function () {
    var reelFreq = [1, 3, 2, 3, 5, 7, 7, 8, 9, 3, 13, 3],
        reel = createReel(reelFreq);
        var originalLastValue = reel[reel.length-1];
        advancedReel = advanceReel(reel);
    it("first element is placed at the end", function () {
        expect(originalLastValue).toEqual(advancedReel[0]);
    });
});