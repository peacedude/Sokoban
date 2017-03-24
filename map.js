/*  Legend
	0 = Empty
	1 = Wall
	2 = Goal area for the blocks
	3 = Movable block
	4 = Player starting position
	
*/



$(document).ready(function () {
	var player_pos;

	// Rita upp alla tiles och entities
	for (var i = 0; i < tileMap.height; i++) {
		for (var j = 0; j < tileMap.width; j++) {
			switch (tileMap.mapGrid[i][j][0]) {
				case ' ':
					// Lägg till DIV för tom rut och ge den tilen värdet 0 i tileMap
					$('#sokoban').append('<div class="' + Tiles.Space + '"></div>');
					tileMap.mapGrid[i][j][0] = 0;
					break;
					
				case 'W':
					// Lägg till DIV för tom tile och ge den tilen värdet 1 i tileMap
					$('#sokoban').append('<div class="' + Tiles.Wall + '"></div>');
					tileMap.mapGrid[i][j][0] = 1;
					break;
				case 'G':
					// Lägg till DIV för goal tile och ge den tilen värdet 2 i tileMap
					$('#sokoban').append('<div class="' + Tiles.Goal + '"></div>');
					tileMap.mapGrid[i][j][0] = 2;
					break;
				case 'B':
					// Lägg till DIV för en box och ge den tilen  värdet 3 i tileMap
					$('#sokoban').append('<div class="' + Tiles.Space + '"></div>');
					$('#sokoban').append('<div class="' + Entities.Block + '" id="c' + i + '_' + j + '" style = "top:' +
						i * 32 +
						'px;left:' +
						j * 32 +
						'px"></div>');
					tileMap.mapGrid[i][j][0] = 3;
					break;
				case 'P':
					// Lägg till DIV för spelaren och ge den tilen värdet 4 i tileMap
					$('#sokoban').append('<div class="' + Tiles.Space + '"></div>');
					$('#sokoban').append('<div class="' + Entities.Character + '" style = "top:' +
						i * 32 +
						'px;left:' +
						j * 32 +
						'px"></div>');
					player_pos = new Array(i, j);
					tileMap.mapGrid[i][j][0] = 4;
					break;
			}
		}
	}

	// Input för knapparna W,A,S,D
	$(document).keydown(function (event) {
		switch (event.keyCode) {
			case 65:
				possibleMove(-1, 0);
				break;
			case 87:
				possibleMove(0, -1);
				break;
			case 68:
				possibleMove(1, 0);
				break;
			case 83:
				possibleMove(0, 1);
				break;
		}
	});

	function possibleMove(x, y) {
		// Hämta värdet från tileMap på rutan för nästa tile
		var tile = tileMap.mapGrid[player_pos[0] + y][player_pos[1] + x][0];

		// Se till så rutan 2 steg iväg inte är undefined
		if (tileMap.mapGrid[player_pos[0] + 2 * y][player_pos[1] + 2 * x] != undefined) {
			// Hämta värdet från tileMap på rutan 2 steg fram
			var farTile = tileMap.mapGrid[player_pos[0] + 2 * y][player_pos[1] + 2 * x][0];
		}
		

		var solved = true;
		var canMove = false;

		//Om nästa tile är tom eller goal så kan spelaren gå fritt över den
		if (tile === 0 || tile === 2) {

			canMove = true;

		} else {
			// Om nästa tile är en box och rutan bakom är tom eller goal så puttas boxen
			if ((tile === 3 || tile === 5) && (farTile === 0 || farTile === 2)) {

				// Minska värdet på rutan du ska gå till
				tileMap.mapGrid[player_pos[0] + y][player_pos[1] + x][0] -= 3;
				// Höj värdet på rutan som boxen flyttas till
				tileMap.mapGrid[player_pos[0] + 2 * y][player_pos[1] + 2 * x][0] += 3;

				// Hämta ID på boxen och använd ID för att bestämma var boxen ska flyttas
				$("#c" + (player_pos[0] + y) + "_" + (player_pos[1] + x)).animate({
					left: "+=" + x * 32,
					top: "+=" + y * 32
				},1,
					function () {
						// Gå igenom hela tileMap och kolla om någon ruta fortfarande har värdet 2 (tom goal tile)
						for (i = 0; i < tileMap.height; i++) {
							for (j = 0; j < tileMap.width; j++) {
								if (tileMap.mapGrid[i][j][0] === 2) {
									solved = false;
									break;
								}
							}
						}
						if (solved) {
							alert("SOLVED");
						}
						// Ändra ID på boxen till de nya koordinaterna
					}).attr("id", "c" + (player_pos[0] + 2 * y) + "_" + (player_pos[1] + 2 * x));
				canMove = true;
			}
		}
		// Flytta spelaren om rörelsen är tillåten
		if (canMove) {
			player_pos[0] += y;
			player_pos[1] += x;
			$(".entity-player").animate({
				left: "+=" + x * 32,
				top: "+=" + y * 32
			},
				1);
		}
	}
});
