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
            case 82:
                restart();
                break;
         }
        UI.drawBoard(game.boardData);
        UI.showMessage(UI.state2message(game.getState()));
    });

    $('#restart').click(function() {
        restart();
    });
});



