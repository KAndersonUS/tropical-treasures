function advanceReel (reel) {
    reel.unshift(reel.pop());
    return reel;
}