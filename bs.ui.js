var com;
if (!com) com = {};
if (!com.napthats) com.napthats = {};
if (!com.napthats.bs) com.napthats.bs = {};

(function() {
    var ns = com.napthats.bs;
    var CANVAS_WIDTH_DEFAULT = 640;
    var CANVAS_HEIGHT_DEFAULT = 640;
    var TILE_SIZE = 32;
    var FONT_DEFAULT = 'normal bold 8px monospace';

    var tiletype2graphicid = function(type, num_mode) {
        switch(type) {
            case ns.tileType.EMPTY : return 0;
            case ns.tileType.PLAYER : return 1;
            default :
                if (type < 0) {
                    if (num_mode) {return 0;}
                    else {return 2;}
                }
        }
    };

    ns.makeUI = function(initBoardData) {
        var UI = {};
        var ctx = document.createElement('canvas').getContext('2d');
        var chipDrawer = ns.makeChipDrawer(ctx);
        var num_mode = false;

        UI.drawBoard = function(boardData) {
            //Set mergine.
            ctx.canvas.width = (boardData.length + 2) * TILE_SIZE;
            ctx.canvas.height = (boardData[0].length + 2) * TILE_SIZE;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            for (var y = 0; y < boardData[0].length; y++) {
                for (var x = 0; x < boardData.length; x++) {
                    if (boardData[x][y] !== ns.tileType.NONE) {
                        chipDrawer.drawTile(
                            tiletype2graphicid(boardData[x][y], num_mode),
                            (x + 1) * TILE_SIZE,
                            (y + 1) * TILE_SIZE
                        );
                        if (num_mode && boardData[x][y] < 0) {
                            chipDrawer.drawNum(- boardData[x][y], (x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE);
                        }
                    }
               }
            }
        };

        UI.setNumMode = function(f) {num_mode = f;}

        UI.changeMapScale = function(scale) {
            ctx.canvas.width = CANVAS_WIDTH_DEFAULT * scale;
            ctx.canvas.height = CANVAS_HEIGHT_DEFAULT * scale;
            ctx.scale(scale, scale);
            ctx.font = FONT_DEFAULT;
        };

        UI.state2message = function(state) {
            switch (state) {
                case ns.gameState.NORMAL: return '';
                case ns.gameState.CLEAR: return 'CLEAR!';
                case ns.gameState.GAME_OVER: return 'GAME OVER';
            }
        };

        UI.showMessage = function(msg) {
            msg = msg.split('<').join('&lt;');
            msg = msg.split('&').join('&amp;');
            $('#message').text(msg);
        };

        chipDrawer.onload(function() {
            UI.drawBoard(initBoardData);
        });

        ctx.canvas.width = CANVAS_WIDTH_DEFAULT;
        ctx.canvas.height = CANVAS_HEIGHT_DEFAULT;
        $('#board').append(ctx.canvas);
        ctx.font = FONT_DEFAULT;

        return UI;
    };
})();


