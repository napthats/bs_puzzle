var com;
if (!com) com = {};
if (!com.napthats) com.napthats = {};
if (!com.napthats.bs) com.napthats.bs = {};

$(document).ready(function() {
    var ns = com.napthats.bs;
    var boardName = 'board1'; //tmp
    var game = ns.makeGame(boardName);
    var UI = ns.makeUI(game.boardData);

    $(document).keydown(function(event) {
        switch (event.which) {
            case 38:
                game.move(0);
                break;
            case 39:
                game.move(1);
                break;
            case 40:
                game.move(2);
                break;
            case 37:
                game.move(3);
                break;
        }
        UI.drawBoard(game.boardData);
    });
});



