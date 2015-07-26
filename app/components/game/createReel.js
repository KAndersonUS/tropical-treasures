// TODO: game module
angular.module('tropicalTreasures.game')
    .value('createReel', createReel);

function createReel (freq) {
    var reel = [];
    for (var i=0; i<freq.length; i++) {
        for(var j = freq[i]; j>0; j--) {
            reel.push(i);
        }
    }

    return randomizeReel(reel);

    function randomizeReel (reel) {
        var reelLength = reel.length,
            passes = Math.ceil(Math.random() * 300 + 100) * reelLength;
        while (passes >= 0) {
            var index1 = Math.floor(Math.random()*reelLength),
                index2 = Math.floor(Math.random()*reelLength),
                value1 = reel[index1],
                value2 = reel[index2];
            reel[index1] = value2;
            reel[index2] = value1;
            passes--;
        }
        return reel;
    }
}