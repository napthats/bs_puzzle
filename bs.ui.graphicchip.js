var com;
if (!com) com = {};
if (!com.napthats) com.napthats = {};
if (!com.napthats.bs) com.napthats.bs = {};

(function() {
    var ns = com.napthats.bs;
    var TILE_SIZE = 32;
    var CHIP_NUM = 3;
    var CHIP_FILE_NAMES = [
        'chips/tile.bmp',
        'chips/tile_b.bmp',
        'chips/tile_r.bmp',
        'chips/0.bmp',
        'chips/1.bmp',
        'chips/2.bmp',
        'chips/3.bmp',
        'chips/4.bmp',
        'chips/5.bmp',
        'chips/6.bmp',
        'chips/7.bmp',
        'chips/8.bmp',
        'chips/9.bmp'
    ];

    ns.makeChipDrawer = function(_ctx) {
        var chipDrawer = {};
        var ctx = _ctx;
        var chipCanvasList = [];
        var onloadFunc = function(){};

        chipDrawer.loadTileSheet = function(ord) {
            var tileSheet = new Image();
            tileSheet.src = CHIP_FILE_NAMES[ord];

            tileSheet.addEventListener('load', function() {
                var chipCanvas = document.createElement('canvas').getContext('2d');
                chipCanvas.width = TILE_SIZE;
                chipCanvas.height = TILE_SIZE;

                chipCanvas.drawImage(tileSheet, 0, 0);//, TILE_SIZE, TILE_SIZE, 0, 0, TILE_SIZE, TILE_SIZE);

                var chipImageData = chipCanvas.getImageData(0, 0, TILE_SIZE, TILE_SIZE);

                chipCanvas.putImageData(chipImageData, 0, 0);
                chipCanvasList[ord] = chipCanvas.canvas;
            }, false);

            return tileSheet;
        };

        chipDrawer.drawTile = function(tileType, x, y) {
            ctx.drawImage(chipCanvasList[tileType], x, y);
        };

        chipDrawer.drawNum = function(num, x, y) {
            if (num >= 1 && num < 10) {
                ctx.drawImage(chipCanvasList[num + 3], x + 16, y + 6);
            }
            else if (num >=10 && num < 100) {
                ctx.drawImage(chipCanvasList[Math.floor(num / 10) + 3], x + 2, y + 6);
                ctx.drawImage(chipCanvasList[(num % 10) + 3], x + 16, y + 6);
            }
        };

        chipDrawer.onload = function(func) {onloadFunc = func};

        chipDrawer.loadTileSheet(0).addEventListener('load', function() {
        chipDrawer.loadTileSheet(1).addEventListener('load', function() {
        chipDrawer.loadTileSheet(2).addEventListener('load', function() {
        chipDrawer.loadTileSheet(3).addEventListener('load', function() {
        chipDrawer.loadTileSheet(4).addEventListener('load', function() {
        chipDrawer.loadTileSheet(5).addEventListener('load', function() {
        chipDrawer.loadTileSheet(6).addEventListener('load', function() {
        chipDrawer.loadTileSheet(7).addEventListener('load', function() {
        chipDrawer.loadTileSheet(8).addEventListener('load', function() {
        chipDrawer.loadTileSheet(9).addEventListener('load', function() {
        chipDrawer.loadTileSheet(10).addEventListener('load', function() {
        chipDrawer.loadTileSheet(11).addEventListener('load', function() {
        chipDrawer.loadTileSheet(12).addEventListener('load', function() {
        onloadFunc();
        }, false);
        }, false);
        }, false);
        }, false);
        }, false);
        }, false);
        }, false);
        }, false);
        }, false);
        }, false);
        }, false);
        }, false);
        }, false);

        return chipDrawer;
    };
})();
