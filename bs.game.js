var com;
if (!com) com = {};
if (!com.napthats) com.napthats = {};
if (!com.napthats.bs) com.napthats.bs = {};

(function() {
    var game = {};
    var ns = com.napthats.bs;
    //Data must be rectangle.
    var BOARD_DATA = {
        'board1': [[0, 0], [[1,0,-1,0,0],[0,0,0,0,0],[-1,0,-1,0,0]]],
    };

    var dir2deltapos = function(dir) {
        switch (dir) {
            case 0: return [0, -1];
            case 1: return [1, 0];
            case 2: return [0, 1];
            case 3: return [-1, 0];
            default: console.log("Assertion error: dir must be between 0 to 3.");
        }
    };

    var getNextPos = function(x, y, dir) {
        var nextPos = [x + dir2deltapos(dir)[0], y + dir2deltapos(dir)[1]];
        if (nextPos[0] < 0 || nextPos[0] >= game.boardData.length ||
            nextPos[1] < 0 || nextPos[1] >= game.boardData[0].length) {
            return [false, [x, y]];
        }
        if (game.boardData[nextPos[0]][nextPos[1]] !== 0) {
            return [false, [x, y]];
        }
        return [true, [nextPos[0], nextPos[1]]];
    };

    ns.makeGame = function(boardName) {
        game.playerPos = BOARD_DATA[boardName][0];
        game.boardData = BOARD_DATA[boardName][1];

        game.move = function(dir) {
           var old_pos = game.playerPos;
            var pos = game.playerPos;
            var moved = false;
            console.log(dir);
            console.log(pos[0]);
            console.log(pos[1]);
             while (true) {
                var res = getNextPos(pos[0], pos[1], dir);
                if (res[0]) {moved = true;}
                else {break;}
                pos = res[1];
            }
            if (!moved) {return;}
            game.boardData[old_pos[0]][old_pos[1]] = 2;
            game.boardData[pos[0]][pos[1]] = 1;
            game.playerPos = pos;
        };

        return game;
    };
})();


