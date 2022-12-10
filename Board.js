import Square from './Square.js'
export default class Board {
    constructor(target, display) {
        this.target = target
        this.display = display
        this.turn = 'X'

        this.boards = []
        this.squares = []
        for (let i = 0; i < 3; i++) {
            const element = document.createElement('div')
            element.classList.add('board')
            this.boards.push(element)
            this.target.appendChild(element)
            this.squares[i] = []
            for (let j = 0; j < 3; j++) {
                this.squares[i][j] = []
                for (let k = 0; k < 3; k++) {
                    const square = new Square(i, j, k, this)
                    this.squares[i][j].push(square)
                    element.appendChild(square.element)
                }
            }
        }
    }

    makeMove(square) {
        if (square.letter === '') {
            square.letter = this.turn
            square.element.textContent = this.turn
            if(this.checkWin(square.x, square.y, square.z)) return
            this.turn = this.turn === 'X' ? 'O' : 'X'
            this.display.textContent = `${this.turn}'s turn`
        }
    }
    checkWin(x, y, z) {
        //generate possible winning combinations
        const winningCombinations = [
            //horizontal
            [{ x: x, y: 0, z: z }, { x: x, y: 1, z: z }, { x: x, y: 2, z: z }],
            //vertical
            [{ x: 0, y: y, z: z }, { x: 1, y: y, z: z }, { x: 2, y: y, z: z }],
            //diagonal
            [{ x: 0, y: 0, z: z }, { x: 1, y: 1, z: z }, { x: 2, y: 2, z: z }],
            [{ x: 0, y: 2, z: z }, { x: 1, y: 1, z: z }, { x: 2, y: 0, z: z }],
            //depth
            [{ x: x, y: y, z: 0 }, { x: x, y: y, z: 1 }, { x: x, y: y, z: 2 }],
            //diagonal
            [{ x: 0, y: y, z: 0 }, { x: 1, y: y, z: 1 }, { x: 2, y: y, z: 2 }],
            [{ x: 2, y: y, z: 0 }, { x: 1, y: y, z: 1 }, { x: 0, y: y, z: 2 }],
            //diagonal
            [{ x: x, y: 0, z: 0 }, { x: x, y: 1, z: 1 }, { x: x, y: 2, z: 2 }],
            [{ x: x, y: 2, z: 0 }, { x: x, y: 1, z: 1 }, { x: x, y: 0, z: 2 }],
            //diagonal
            [{ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }, { x: 2, y: 2, z: 2 }],
            [{ x: 2, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }, { x: 0, y: 2, z: 2 }],
            //diagonal
            [{ x: 0, y: 2, z: 0 }, { x: 1, y: 1, z: 1 }, { x: 2, y: 0, z: 2 }],
            [{ x: 2, y: 2, z: 0 }, { x: 1, y: 1, z: 1 }, { x: 0, y: 0, z: 2 }],
        ]
        //check if any of the winning combinations are true
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i]
            if (this.checkIfEqual(a, b, c)) {
                this.display.textContent = `${this.turn} wins!`
                return true
            }
        }
        return false
    }
    checkIfEqual(a, b, c) {
        return this.squares[a.x][a.y][a.z].letter === this.squares[b.x][b.y][b.z].letter && this.squares[a.x][a.y][a.z].letter === this.squares[c.x][c.y][c.z].letter && this.squares[a.x][a.y][a.z].letter !== ''
    }

}