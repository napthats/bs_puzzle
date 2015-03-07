var com;
if (!com) com = {};
if (!com.napthats) com.napthats = {};
if (!com.napthats.bs) com.napthats.bs = {};

(function() {
    var game = {};
    var ns = com.napthats.bs;
    //Data must be rectangle.
    var BOARD_DATA = {
        'board1': [[0, 0], [[1,0,-1,0,-1],[0,0,0,0,0],[0,0,-1,0,0]]],
        'board2': [[3, 0], [[-1,-1,-1,0,0,-1,-1],[-1,-1,-1,0,0,-1,-1],[0,0,-1,0,0,-1,-1],[1,0,0,0,0,-1,-1],[-1,0,-1,0,-1,-1,-1],[0,0,0,0,0,0,0],[0,0,-1,0,0,0,0],[0,0,-1,-1,-1,-1,-1],[0,0,-1,-1,-1,-1,-1]]],
        'board3': [[2, 0], [[-1,-1,-1,0,0,-1,-1],[-1,-1,-1,0,0,-1,-1],[1,0,-1,0,0,-1,-1],[0,0,0,0,0,-1,-1],[-1,0,-1,0,-1,-1,-1],[0,0,0,0,0,0,0],[0,0,-1,0,0,0,0],[0,0,-1,-1,-1,-1,-1],[0,0,-1,-1,-1,-1,-1]]],
    };
    var TILE_NONE = -1;
    var TILE_EMPTY = 0;
    var TILE_PLAYER = 1;
    var TILE_MOVED = 2;
    var DIR_SIZE = 4;

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

    ns.gameState = {};
    ns.gameState.NORMAL = 0;
    ns.gameState.CLEAR = 1;
    ns.gameState.GAME_OVER = 2;

    ns.makeGame = function(boardName) {
        game.playerPos = BOARD_DATA[boardName][0].clone();
        game.boardData = BOARD_DATA[boardName][1].clone();

        game.move = function(dir) {
            var old_pos = game.playerPos;
            var pos = game.playerPos;
            var moved = false;
             while (true) {
                var res = getNextPos(pos[0], pos[1], dir);
                if (res[0]) {moved = true;}
                else {break;}
                pos = res[1];
            }
            if (!moved) {return;}
            game.boardData[old_pos[0]][old_pos[1]] = TILE_MOVED;
            game.boardData[pos[0]][pos[1]] = TILE_PLAYER;
            game.playerPos = pos;
        };

        game.getState = function() {
            var canMove = false;
            for (var dir = 0; dir < DIR_SIZE; dir++) {
                if (getNextPos(game.playerPos[0], game.playerPos[1], dir)[0]) {
                    canMove = true;
                }
            }
            if (canMove) {
                return ns.gameState.NORMAL;
            }
            
            var clear = true;
            for (var x = 0; x < game.boardData.length; x++) {
                for (var y = 0; y < game.boardData[0].length; y++) {
                    if (game.boardData[x][y] === 0) {
                        clear = false;
                    }
                }
            }
            if (clear) {
                return ns.gameState.CLEAR;
            }
            return ns.gameState.GAME_OVER;
        };

        return game;
    };
})();


