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
					if (gameInProgress) return; // Don't allow clicks while a move is being processed
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
			gameInProgress = false; // Enable input for the current player
		};

		var playYellowTurn = function () {
			// Yellow player's turn
			currentPlayer = 'yellow';
			gameInProgress = true; // Disable input while AI move is being processed

			setTimeout(function () {
				var randomColumn = Math.floor(Math.random() * numCols);
				markNextFree(randomColumn);
			}, 450);
		};

		function displayWinMessage(player) {
			var winMessage = document.getElementById("winMessage");
			var capitalizedPlayer = player.charAt(0).toUpperCase() + player.slice(1);
			winMessage.textContent = capitalizedPlayer + " wins!";
			winMessage.style.fontSize = "2rem";
		}

		function displayTieMessage() {
			var winMessage = document.getElementById("winMessage");
			winMessage.textContent = "Tie!";
			winMessage.style.fontSize = "2rem"; // Adjust the font size as desired
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
				// alert('No free spaces in this column. Try another.');
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
			gameInProgress = false; // Reset the game in progress flag
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
					[-1, -1], [1, 1], [-1, 1], [1, -1]
				]
			};

			chainLength = 1;

			directions[direction].forEach(function (coords) {
				var i = 1;
				while (isBounds(currentX + (coords[0] * i), currentY + (coords[1] * i)) &&
					(gameBoard[currentX + (coords[0] * i)][currentY + (coords[1] * i)] === currentPlayer)
				) {
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
