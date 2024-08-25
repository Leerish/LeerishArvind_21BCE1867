const GRID_SIZE = 5;

const CHARACTER_TYPES = {
    PAWN: 'P',
    HERO1: 'H1',
    HERO2: 'H2',
    HERO3: 'H3'
};

function isValidPosition(row, col) {
    return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
}

function getCharacterAt(game, row, col) {
    return game.grid[row][col];
}

function moveCharacter(game, fromRow, fromCol, toRow, toCol) {
    const character = game.grid[fromRow][fromCol];
    if (!character) return false;

    game.grid[toRow][toCol] = character;
    game.grid[fromRow][fromCol] = null;
    return true;
}

function handlePawnMove(game, player, character, move, row, col) {
    const moves = {
        L: [0, -1],
        R: [0, 1],
        F: [-1, 0],
        B: [1, 0]
    };
    if (!moves[move]) return false;

    const [dRow, dCol] = moves[move];
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (isValidPosition(newRow, newCol)) {
        const target = getCharacterAt(game, newRow, newCol);
        if (!target || target.startsWith(player)) {
            return moveCharacter(game, row, col, newRow, newCol);
        }
    }
    return false;
}

function handleHero1Move(game, player, character, move, row, col) {
    const moves = {
        L: [0, -2],
        R: [0, 2],
        F: [-2, 0],
        B: [2, 0]
    };
    if (!moves[move]) return false;

    const [dRow, dCol] = moves[move];
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (isValidPosition(newRow, newCol)) {
        for (let i = 1; i <= Math.abs(dRow); i++) {
            for (let j = 1; j <= Math.abs(dCol); j++) {
                const intermediateRow = row + i * Math.sign(dRow);
                const intermediateCol = col + j * Math.sign(dCol);
                const target = getCharacterAt(game, intermediateRow, intermediateCol);
                if (target && !target.startsWith(player)) {
                    game.grid[intermediateRow][intermediateCol] = null;
                }
            }
        }
        return moveCharacter(game, row, col, newRow, newCol);
    }
    return false;
}

function handleHero2Move(game, player, character, move, row, col) {
    const moves = {
        FL: [-2, -2],
        FR: [-2, 2],
        BL: [2, -2],
        BR: [2, 2]
    };
    if (!moves[move]) return false;

    const [dRow, dCol] = moves[move];
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (isValidPosition(newRow, newCol)) {
        const target = getCharacterAt(game, newRow, newCol);
        if (!target || target.startsWith(player)) {
            return moveCharacter(game, row, col, newRow, newCol);
        }
    }
    return false;
}

function handleHero3Move(game, player, character, move, row, col) {
    const moves = {
        FL: [-2, -1],
        FR: [-2, 1],
        BL: [2, -1],
        BR: [2, 1],
        RF: [1, 2],
        RB: [1, -2],
        LF: [-1, 2],
        LB: [-1, -2]
    };
    if (!moves[move]) return false;

    const [dRow, dCol] = moves[move];
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (isValidPosition(newRow, newCol)) {
        const target = getCharacterAt(game, newRow, newCol);
        if (!target || target.startsWith(player)) {
            return moveCharacter(game, row, col, newRow, newCol);
        }
    }
    return false;
}

function processMove(game, player, character, move) {
    const [charType, moveCommand] = character.split(':');
    let [row, col] = findCharacter(game, player, charType);

    if (row === undefined || col === undefined) return game;

    let moveSuccess = false;

    switch (charType) {
        case CHARACTER_TYPES.PAWN:
            moveSuccess = handlePawnMove(game, player, character, moveCommand, row, col);
            break;
        case CHARACTER_TYPES.HERO1:
            moveSuccess = handleHero1Move(game, player, character, moveCommand, row, col);
            break;
        case CHARACTER_TYPES.HERO2:
            moveSuccess = handleHero2Move(game, player, character, moveCommand, row, col);
            break;
        case CHARACTER_TYPES.HERO3:
            moveSuccess = handleHero3Move(game, player, character, moveCommand, row, col);
            break;
    }

    if (!moveSuccess) {
        
        return game;
    }

    console.log('Processing move:', { game, player, character, move });

    game.currentPlayer = game.currentPlayer === 'A' ? 'B' : 'A';

    
    if (isGameOver(game)) {
        game.gameOver = true;
    }

    return game;
}


function findCharacter(game, player, charType) {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const cell = game.grid[row][col];
            if (cell && cell.startsWith(player) && cell.includes(charType)) {
                return [row, col];
            }
        }
    }
    return [undefined, undefined];
}

function isGameOver(game) {
    const playerAChars = game.grid.flat().filter(cell => cell && cell.startsWith('A'));
    const playerBChars = game.grid.flat().filter(cell => cell && cell.startsWith('B'));
    return playerAChars.length === 0 || playerBChars.length === 0;
}

module.exports = { processMove };
