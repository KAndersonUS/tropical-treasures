function scoreLine (symbols) {
    // line number is 0-based
    /* 3-of-a-kind
        Blue = 60
        Mammoth = 55
        Squirt = 50
        Greenburg = 45
        Mimosa = 40
        Dottie = 35
        Tang = 30
        Thlump = 25
        Hamburger = 20

        5-5-5 = 15
        5-5-Any = 10
        5-Any-Any = 5
        1-1-1 = 3
        1-1-Any = 2
        1-Any-Any = 1
    */
    // validate symbols
    if (!symbols) {
        throw new Error("no symbols passed to scoreLine");
    }
    for (var i=0; i<symbols.length; i++) {
        if (typeof symbols[i] !== "number" || symbols[i] < 0) {
            throw new Error ("bad symbols passed to scoreLine");
        }
    }

    // pays for 3-of-a-kind. index matches symbol
    var pays3 = [60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 3, 60],
    // pays for 2-of-a-kind
        pays2 = new Array(pays3.length),
    // pays for 1-of-a-kind
        pays1 = new Array(pays3.length);
    // two fives
        pays2[9] = 10;
    // two ones
        pays2[10] = 2;
    // one five
        pays1[9] = 5;
    // one one
        pays1[10] = 1;

    // combine all pays into lookup array
    var pays = [pays1, pays2, pays3];

    // replace wilds (11) with previous symbol, left to right
    symbols = replaceWilds(symbols);

    // count number of same symbols, left to right
    var count = 1,
        symbol = symbols[0];
    while (count < symbols.length) {
        if (symbols[count] == symbol) {
            count++;
        } else {
            break;
        }
    }
    return pays[count-1][symbol] || 0;
}

function getLine (reels, line) {
    // Check that the line is valid for the reels provided
    var shortestReelLength = Infinity;
    for (var i=0; i<reels.length; i++) {
        if (reels[i].length < shortestReelLength) {
            shortestReelLength = reels[i].length;
        }
    }
    if (line === undefined || line < 0 || line >= shortestReelLength) {
        throw new Error("scoreLine received invalid line number");
    }
    // get symbols from line
    var symbols = [];
    for (i=0; i<reels.length; i++) {
        symbols.push(reels[i][line]);
    }
    return symbols;
}

function replaceWilds (symbols) {
    // if first symbol is wild, scan forward to find it
    var wildReplaces = 11,// start with the wild value, in case it's all wilds
        i = 0;
    while (symbols[i] === 11 && i < symbols.length-1) {
        i++;
    }
    wildReplaces = symbols[i];
    return symbols.map(function (val) {
        if (val === 11) {
            return wildReplaces;
        } else {
            return val;
        }
    });
}