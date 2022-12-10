export default class Square{
    constructor(x, y, z, board){
        this.x = x
        this.y = y
        this.z = z
        this.letter = ""
        this.element = document.createElement("div")
        this.element.classList.add("square")
        this.element.addEventListener("click", () => {
            board.makeMove(this)
        })
    }



}