var com;
if (!com) com = {};
if (!com.napthats) com.napthats = {};
if (!com.napthats.bs) com.napthats.bs = {};

(function() {
    var ns = com.napthats.bs;
    var CANVAS_WIDTH_DEFAULT = 640;
    var CANVAS_HEIGHT_DEFAULT = 640;
    var BOARD_WIDTH = 10;
    var BOARD_HEIGHT = 10;
    var TILE_SIZE = 32;
    var FONT_DEFAULT = 'normal bold 8px monospace';

    ns.makeUI = function(initBoardData) {
        var UI = {};
        var ctx = document.createElement('canvas').getContext('2d');
        var chipDrawer = ns.makeChipDrawer(ctx);

        UI.drawBoard = function(boardData) {
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            for (var y = 0; y < boardData[0].length; y++) {
                for (var x = 0; x < boardData.length; x++) {
                    if (boardData[x][y] >= 0) {
                        chipDrawer.drawTile(boardData[x][y], x * TILE_SIZE, y * TILE_SIZE);
                    }
               }
            }
        };

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


