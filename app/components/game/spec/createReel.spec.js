// functions for slot game mechanisms

// Symbol IDs:
// [Blue, Mammoth, Squirt, Greenberg, Mimosa, Dottie, Tang, Thlump, Hamburger, Five, One, Choe]
describe("createReel", function () {
    var reel1Freq = [1, 3, 2, 3, 5, 7, 7, 8, 9, 3, 13, 3],
        reel2Freq = [1, 1, 1, 2, 2, 3, 3, 8, 9, 14, 16, 4],
        reel3Freq = [1, 1, 1, 2, 2, 3, 3, 5, 6, 12, 26, 2],
        reel1 = createReel(reel1Freq),
        reel2 = createReel(reel2Freq),
        reel3 = createReel(reel3Freq);

    it("should return an array with length 64", function () {
        expect(reel1.length).toBe(64);
        expect(reel2.length).toBe(64);
        expect(reel3.length).toBe(64);
    });
    it("symbol counts should match those passed in", function () {
        expect(check(reel1Freq, reel1)).toBe(true);
        expect(check(reel2Freq, reel2)).toBe(true);
        expect(check(reel3Freq, reel3)).toBe(true);

        function check (freq, reel) {
            var pass = true;
            for (var i=0; i<freq.length; i++) {
                pass = (function (i) {
                    var filtered = reel.filter(function (val) {
                        return val === i;
                    });
                    return (freq[i] === filtered.length)
                })(i)
            }
            return pass;
        }
    });
    it("should produce a random reel each time", function () {
        var reel1Test = createReel(reel1Freq);
        expect(reel1).not.toEqual(reel1Test);
    });
});