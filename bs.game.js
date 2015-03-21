var com;
if (!com) com = {};
if (!com.napthats) com.napthats = {};
if (!com.napthats.bs) com.napthats.bs = {};

(function() {
    var game = {};
    var ns = com.napthats.bs;
    //Data must be rectangle.
    var BOARD_DATA = {
        'board1' : '211:111:010:111:011',
        'board2' : '001101111:001111111:000101000:111111100:111101100:000001100:000001100',
    };
    var BOARD_X = 'boardX';
    ns.tileType = {};
    ns.tileType.NONE = 0;
    ns.tileType.EMPTY = 1;
    ns.tileType.PLAYER = 2;
    //ns.tileType.MOVED = 3;
    var DIR_SIZE = 4;

    var isValidInputTileType = function(type) {
        if (type >= ns.tileType.NONE && type <= ns.tileType.PLAYER) {
            return true;
        }
        else {
            return false;
        }
    };

    var string2boarddata = function(str) {
        if (str === "") {
            return -1;
        }
        var lines = str.split(':');
        var elem_num = -1;
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].split('');
            if (elem_num !== -1 && lines[i].length !== elem_num) {
                return -1;
            }
            elem_num = lines[i].length;
        }
        var mat = [];
        var player_x = -1;
        var player_y = -1;
        for (var i = 0; i < elem_num; i++) {
            mat[i] = new Array();
            for (var j = 0; j < lines.length; j++) {
                mat[i][j] = Number(lines[j][i]);
                if (!isValidInputTileType(mat[i][j])) {
                    return -1;
                }
                if (mat[i][j] === ns.tileType.PLAYER) {
                    if (player_x !== -1) {
                        //There are more than one player tile.
                        return -1;
                    }
                    player_x = i;
                    player_y = j;
                }
            }
        }
//        if (player_x === -1) {
//            return -1;
//        }
        return [[player_x, player_y], mat];
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
        var boarddata;
        if (boardName === BOARD_X) {
            boarddata = string2boarddata($('#board_data').val());
        }
        else {
            boarddata = string2boarddata(BOARD_DATA[boardName]);
        }
        if (boarddata === -1) {
            console.log("Bad boarddata.");
            game.playerPos = [0,0];
            game.boardData = [[ns.tileType.NONE]];
        }
        else {
            game.playerPos = boarddata[0];
            game.boardData = boarddata[1];
        }

        var move_log = [];
        var undo_log = [];
        game.move = function(dir) {
            if(game.playerPos[0] === -1) {return;}
            undo_log = [];
            var old_pos = game.playerPos;
            move_log.push(old_pos);
            var pos = game.playerPos;
            var moved = false;
            while (true) {
                var res = getNextPos(pos[0], pos[1], dir);
                if (res[0]) {moved = true;}
                else {break;}
                pos = res[1];
            }
            if (!moved) {return;}
            game.boardData[old_pos[0]][old_pos[1]] = - move_log.length;
            game.boardData[pos[0]][pos[1]] = ns.tileType.PLAYER;
            game.playerPos = pos;
        };

        game.undo = function() {
            if(game.playerPos[0] === -1) {return;}
            if (move_log.length === 0) {return;}
            var old_pos = game.playerPos;
            var pos = move_log.pop();
            undo_log.push(old_pos);
            game.boardData[old_pos[0]][old_pos[1]] = ns.tileType.EMPTY;
            game.boardData[pos[0]][pos[1]] = ns.tileType.PLAYER;
            game.playerPos = pos;
        };

        game.redo = function() {
            if(game.playerPos[0] === -1) {return;}
            if (undo_log.length === 0) {return;}
            var old_pos = game.playerPos;
            var pos = undo_log.pop();
            move_log.push(old_pos);
            game.boardData[old_pos[0]][old_pos[1]] = - move_log.length;
            game.boardData[pos[0]][pos[1]] = ns.tileType.PLAYER;
            game.playerPos = pos;
         };

        game.getState = function() {
            if(game.playerPos[0] === -1) {return ns.gameState.NORMAL;} //sould return INIT state?
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

        game.setPlayerPos = function(x,y) {
            if(game.playerPos[0] !== -1) {return;}
            game.playerPos[0] = x;
            game.playerPos[1] = y;
            game.boardData[x][y] = ns.tileType.PLAYER;
            return game.boardData;
        };

        return game;
    };
})();


