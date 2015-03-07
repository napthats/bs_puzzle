var com;
if (!com) com = {};
if (!com.napthats) com.napthats = {};
if (!com.napthats.bs) com.napthats.bs = {};

(function() {
    var game = {};
    var ns = com.napthats.bs;
    //Data must be rectangle.
    var BOARD_DATA = {
        'board1' : [[0,0], '211:111:010:111:011'],
        'board2' : [[3,0], '001201111:001111111:000101000:111111100:111101100:000001100:000001100'],
        'board3' : [[2,0], '002101111:001111111:000101000:111111100:111101100:000001100:000001100']
    };
    ns.tileType = {};
    ns.tileType.NONE = 0;
    ns.tileType.EMPTY = 1;
    ns.tileType.PLAYER = 2;
    ns.tileType.MOVED = -1;
    var DIR_SIZE = 4;

    var string2boarddata = function(str) {
        var lines = str.split(':');
        var elem_num = -1;
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].split('');
            if (elem_num !== -1 && lines[i].length !== elem_num) {
                return [];
            }
            elem_num = lines[i].length;
        }
        var mat = [];
        for (var i = 0; i < elem_num; i++) {
            mat[i] = new Array();
            for (var j = 0; j < lines.length; j++) {
                mat[i][j] = Number(lines[j][i]);
            }
        }
        return mat;
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
        if (game.boardData[nextPos[0]][nextPos[1]] !== ns.tileType.EMPTY) {
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
        game.boardData = string2boarddata(BOARD_DATA[boardName][1]);

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
            game.boardData[old_pos[0]][old_pos[1]] = ns.tileType.MOVED;
            game.boardData[pos[0]][pos[1]] = ns.tileType.PLAYER;
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
                    if (game.boardData[x][y] === ns.tileType.EMPTY) {
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


