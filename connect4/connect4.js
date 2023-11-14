(function () {
	var ConnectFour = function () {
		var gameBoard = {};
		var currentPlayer = 'red';
		var numRows = 6;
		var numCols = 7;
		var numTurns = 0;
		var gameInProgress = false; // Add a flag to track whether a game is in progress

		var _init = function () {
			var columns;
			columns = document.querySelectorAll('.column');

			Array.prototype.forEach.call(columns, function (col) {
				col.addEventListener('click', function () {
					if (gameInProgress) return;
					markNextFree(col.getAttribute('data-x'));
				});
			});

			for (var x = 0; x <= numRows; x++) {
				gameBoard[x] = {};
				for (var y = 0; y <= numCols; y++) {
					gameBoard[x][y] = 'free';
				}
			}

			// Start the game with the red player's turn.
			playRedTurn();
		};

		var playRedTurn = function () {
			// Red player's turn
			currentPlayer = 'red';
			gameInProgress = false;
		};

		var playYellowTurn = function () {
			// Yellow player's turn
			currentPlayer = 'yellow';
			gameInProgress = true;

			setTimeout(function () {
				var validColumns = [];
				for (var x = 0; x < numCols; x++) {
					for (var y = numRows - 1; y >= 0; y--) {
						if (gameBoard[x][y] === 'free') {
							validColumns.push(x);
							break;
						}
					}
				}

				if (validColumns.length > 0) {
					var randomIndex = Math.floor(Math.random() * validColumns.length);
					var randomColumn = validColumns[randomIndex];
					markNextFree(randomColumn);
				}
			}, 450);
		};


		function displayWinMessage(player) {
			var winMessage = document.getElementById("winMessage");
			// Gets winMessage text block, capitalizes 1st letter
			var capitalizedPlayer = player.charAt(0).toUpperCase() + player.slice(1);
			winMessage.textContent = capitalizedPlayer + " wins!";
			winMessage.style.fontSize = "2rem";
			// uses "block" to show after being hidden with display = "none"
			winMessage.style.display = "block";
			// Prevents game from being played after someone wins until clearBoard() is called
			gameInProgress = true;
		}

		function displayTieMessage() {
			// Same format as displayWinMessage
			var winMessage = document.getElementById("winMessage");
			winMessage.textContent = "Tie!";
			winMessage.style.fontSize = "2rem";
			winMessage.style.display = "block";
			gameInProgress = true;
		}


		var markNextFree = function (x) {
			var nextY = false;
			for (var y = 0; y < numRows; y++) {
				if (gameBoard[x][y] === 'free') {
					nextY = y;
					break;
				}
			}

			if (nextY === false) {
				gameInProgress = false;
				return false;
			}

			gameBoard[x][nextY] = currentPlayer;
			document.querySelector('#column-' + x + ' .row-' + nextY + ' circle').setAttribute(
				'class', currentPlayer
			);

			if (isWinner(parseInt(x), nextY)) {
				displayWinMessage(currentPlayer);
				return true;
			}

			numTurns = numTurns + 1;

			if (numTurns >= numRows * numCols) {
				displayTieMessage(currentPlayer);
				return true;
			}

			// Switch turns between red and yellow
			if (currentPlayer === 'red') {
				playYellowTurn();
			} else {
				playRedTurn();
			}
		};

		var clearBoard = function () {
			Array.prototype.forEach.call(document.querySelectorAll('circle'), function (piece) {
				piece.setAttribute('class', 'free');
			});

			gameBoard = {};

			for (var x = 0; x <= numRows; x++) {
				gameBoard[x] = {};

				for (var y = 0; y <= numCols; y++) {
					gameBoard[x][y] = 'free';
				}
			}

			numTurns = 0;
			gameInProgress = false;
		};

		this.clearBoard = clearBoard;

		var isWinner = function (currentX, currentY) {
			return checkDirection(currentX, currentY, 'vertical') ||
				checkDirection(currentX, currentY, 'diagonal') ||
				checkDirection(currentX, currentY, 'horizontal');
		};

		var isBounds = function (x, y) {
			return (gameBoard.hasOwnProperty(x) && typeof gameBoard[x][y] !== 'undefined');
		};

		var checkDirection = function (currentX, currentY, direction) {
			var chainLength, directions;

			directions = {
				horizontal: [
					[0, -1], [0, 1]
				],
				vertical: [
					[-1, 0], [1, 0]
				],
				diagonal: [
					[-1, -1], [1, 1]
				]
			};

			chainLength = 1;

			directions[direction].forEach(function (coords) {
				var i = 1;
				while (isBounds(currentX + (coords[0] * i), currentY + (coords[1] * i)) &&
					gameBoard[currentX + (coords[0] * i)][currentY + (coords[1] * i)] === currentPlayer) {
					chainLength = chainLength + 1;
					i = i + 1;
				}
			});

			return (chainLength >= 4);
		};

		_init();
	};

	ConnectFour();
})();
