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

describe("odds simulator", function () {
    it("should score", function () {
        var scores = [],
            scoreCounts = {},
            totalScore = 0,
            averageScore;
        for (var numSpins = 500; numSpins > 0; numSpins--) {
            var score = scoreLine(getLine(generateReels(), 0));
            var propName = "_" + score;
            if (scoreCounts.hasOwnProperty(propName)) {
                scoreCounts[propName]++;
            } else {
                scoreCounts[propName] = 1;
            }
            scores.push(score);
        }
        totalScore = scores.reduce(function (a, b) {
            return a + b ;
        });
        averageScore = totalScore / scores.length;
        console.log("Average score: " + averageScore);
        for (var s in scoreCounts) {
            if (scoreCounts.hasOwnProperty(s)) {
                console.log(s.substring(1, s.length) + " : " + scoreCounts[s])
            }
        }
        expect(averageScore).toBeTruthy();
    });
    function generateReels(){
        /* old frequencies
        var reel1Freq = [1, 3, 2, 3, 5, 7, 7, 8, 9, 3, 13, 3],
            reel2Freq = [1, 1, 1, 2, 2, 3, 3, 8, 9, 14, 16, 4],
            reel3Freq = [1, 1, 1, 2, 2, 3, 3, 5, 6, 12, 26, 2];
            */
        var reel1Freq = [1, 2, 2, 2, 3, 4, 5, 6, 7, 10, 16, 6],
            reel2Freq = [1, 1, 1, 2, 2, 3, 3, 8, 9, 14, 16, 4],
            reel3Freq = [1, 1, 2, 2, 3, 3, 4, 7, 8, 14, 16, 3];
        var newReels = [];
        newReels.push(createReel(reel1Freq));
        newReels.push(createReel(reel2Freq));
        newReels.push(createReel(reel3Freq));
        return newReels;
    }
});