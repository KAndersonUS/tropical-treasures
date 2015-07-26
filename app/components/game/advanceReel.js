angular.module('tropicalTreasures.game')
    .value('advanceReel', advanceReel);

function advanceReel (reel) {
    reel.unshift(reel.pop());
    return reel;
}