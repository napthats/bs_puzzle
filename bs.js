var com;
if (!com) com = {};
if (!com.napthats) com.napthats = {};
if (!com.napthats.bs) com.napthats.bs = {};

$(document).ready(function() {
    var ns = com.napthats.bs;
    var game = ns.makeGame($('#board_id').val());
    var UI = ns.makeUI(game.boardData);
    var restart = function() {
        game = ns.makeGame($('#board_id').val());
        UI.drawBoard(game.boardData);
        UI.showMessage(UI.state2message(game.getState()));
    };
    var undo = function() {
        game.undo();
        UI.drawBoard(game.boardData);
        UI.showMessage(UI.state2message(game.getState()));
    };
    var redo = function() {
        game.redo();
        UI.drawBoard(game.boardData);
        UI.showMessage(UI.state2message(game.getState()));
    };


    $(document).keydown(function(event) {
        switch (event.which) {
            case 38:
            case 75:
            case 87:
                game.move(0);
                break;
            case 39:
            case 76:
            case 68:
                game.move(1);
                break;
            case 40:
            case 74:
            case 83:
                game.move(2);
                break;
            case 37:
            case 72:
            case 65:
                game.move(3);
                break;
            case 48:
                $('#board_id').val('boardX');
                restart();
                break;
            case 49:
                $('#board_id').val('board1');
                restart();
                break;
            case 50:
                $('#board_id').val('board2');
                restart();
                break;
            case 51:
                $('#board_id').val('board3');
                restart();
                break;
            case 82:
                restart();
                break;
            case 85:
                undo();
                break;
            case 73:
                redo();
                break;
          }
        UI.drawBoard(game.boardData);
        UI.showMessage(UI.state2message(game.getState()));
    });

    $('#restart').click(function() {
        restart();
    });
});



