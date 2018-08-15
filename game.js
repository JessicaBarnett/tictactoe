// (function(){
  class GameEvent {
    constructor(character, position) {
      this._character = character;
      this._position = position;
    }
    get character() {
      return this._character;
    }
    get position() {
      return this._position;
    }
    set character(character) {
      this._character = character;
    }
    set position(position) {
      this._position = position;
    }
  }

  class GameEvents {
    constructor(){
      this.characters = ['x', 'o'];
      this.events = [];
    }
    addEvent(position){
      var char = characters[this.events.length % 2];
      this.events.push(new GameEvent(char, position))
    }
  }

  class GameBoard {
    constructor(gameEvents, board) {
      gameEvents.forEach((event) => {
        drawEvent(event);
      });
    }

    drawEvent(evt){
      var board = document.getElementById('tictactoe'),
          newBoard = board.cloneNode(true),
          squares = newBoard.children;

      squares[evt.position].classList.add(`square--${evt.character}`);
      board.innerHTML = newBoard.innerHTML;
    }
  }

  function initGame(){
    document.getElementById('tictactoe').children.forEach((element) => {
      element.addEventListener('click', ($event) => {
        // access game events and add 
      }
    });
  }


// })();
