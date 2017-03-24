$(document).ready(function () {
    var player_pos;
    var prevType = [];
    for (var i = 0; i < tileMap.height; i++) {
        for (var j = 0; j < tileMap.width; j++) {
            switch (tileMap.mapGrid[i][j][0]) {
                case 'W':
                    $("#sokoban").append('<div class = "wall" style = "top:' + i * 32 + 'px;left:' + j * 32 + 'px"></div>');
                    break;
                case 'G':
                    $("#sokoban").append('<div class = "goal" style = "top:' + i * 32 + 'px;left:' + j * 32 + 'px"></div>');
                    break;
                case 'B':

                    $("#sokoban").append('<div id = "c' + i + '_' + j + '" class = "crate" style = "z-index:1000;top:' + i * 32 + 'px;left:' + j * 32 + 'px"></div>');
                    break;
                case 'P':
                    tileMap.mapGrid[i][j][0] = 0;
                    player_pos = new Array(i, j);
                    $("#sokoban").append('<div id ="player" style = "z-index:1000;top:' + i * 32 + 'px;left:' + j * 32 + 'px"></div>');
                    break;
                case 5:
                    $("#sokoban").append('<div class = "goal" style = "top:' + i * 32 + 'px;left:' + j * 32 + 'px"></div>');
                    $("#sokoban").append('<div id = "c' + i + '_' + j + '" class = "crate" style = "z-index:1000;top:' + i * 32 + 'px;left:' + j * 32 + 'px"></div>');
                    break;
                case 6:
                    tileMap.mapGridmap[i][j][0] = 'G';
                    player_pos = new Array(i, j);
                    $("#sokoban").append('<div class = "goal" style = "top:' + i * 32 + 'px;left:' + j * 32 + 'px"></div>');
                    $("#sokoban").append('<div id ="player" style = "z-index:1000;top:' + i * 32 + 'px;left:' + j * 32 + 'px"></div>');
                    break;
            }
        }
    }
    function possible_move(x, y) {
        
        var tile = tileMap.mapGrid[player_pos[0] + y][player_pos[1] + x][0];
        var far_tile = tileMap.mapGrid[player_pos[0] + 2 * y][player_pos[1] + 2 * x][0];

        console.log(far_tile);
        var can_move = false;
        var solved = true;
        if (tile == 0 || tile == 'G') {
            can_move = true;
            console.log("Moved");
            solved = false;
        }
        else {
            if ((tile == 'B' || tile == 5) && (far_tile == 0 || far_tile == 'G')) {
                tileMap.mapGrid[player_pos[0] + y][player_pos[1] + x][0] -= 'B';
                tileMap.mapGrid[player_pos[0] + 2 * y][player_pos[1] + 2 * x][0] += 'B';
                $("#c" + (player_pos[0] + y) + "_" + (player_pos[1] + x)).animate({
                        left: "+=" + (x * 32),
                        top: "+=" + (y * 32)
                    },
                    100,
                    function() {
                        for (i = 0; i < tileMap.height; i++) {
                            for (j = 0; j < tileMap.width; j++) {
                                if (tileMap.mapGrid[i][j][0] == 'G') {
                                    solved = false;
                                    break;
                                }
                            }
                        }
                        if (solved) {
                            alert("SOLVED");
                        }
                    }).attr("id", "c" + (player_pos[0] + 2 * y) + "_" + (player_pos[1] + 2 * x));
                can_move = true;
            }
        }
        if (can_move) {
            player_pos[0] += y;
            player_pos[1] += x;
            $("#player").animate({
                left: "+=" + (x * 32),
                top: "+=" + (y * 32)
            }, 100);
        }
    }
    $(document).keydown(function (event) {
        switch (event.keyCode) {
            case 65:
                possible_move(-1, 0);
                break;
            case 87:
                possible_move(0, -1);
                break;
            case 68:
                possible_move(1, 0);
                break;
            case 83:
                possible_move(0, 1);
                break;
        }
    });
});