// (function(){
  var events = [];

  class GameEvent {
    constructor(character, position) {
      this.character = character;
      this.position = position;
    }
    get character() {
      return this.character;
    }
    get position() {
      return this.position;
    }
  }

  class GameBoard {
    constructor(gameEvents) {
      this.squares = gameEvents.reduce((event, result) => {
        result[event.position] = event.character;
        return result;
      }, []);
    }
    draw() {
      var context = canvas.getContext('2d');
      document.getElementById('board')
    }
  }

  class Point {
    constructor(canvas, divisor, padding){
        this.canvas = canvas;
        this.divisor = divisor;
        this.padding = padding
    }
    calc(dimension, multiplier, paddingMultiplier){
      return this.canvas[dimension] * (this.divisor/6) * multiplier + (this.padding * paddingMultiplier);
    }
  }

  class Canvas {
    constructor(canvasSelector){
      this.canvas = document.getElementById(canvasSelector);
      this.ctx = this.canvas.getContext('2d');
      this.w = this.canvas.width;
      this.h = this.canvas.height;
    }

    drawLine(points){
      this.ctx.moveTo(points.x1, points.y1);
      this.ctx.lineTo(points.x2, points.y2);
      this.ctx.stroke();
    }


    /*
      0,0      1,0     2,0
      1,0      1,1     2,1
      2,0      2,1     2,2

      or

      1        2        3
      4        5        6
      7        8        9


      0 & 2, 2 & 4, 4 & 6

      for 1 ->
      (  (0, 0), ((height/6)*2, (width/6)*2)  )
      (  (0, (height/6)*2), ((width/6)*2), 0))

      for 5 ->
      ( ((height/6)*4, (height/6)*4)), ((height/6)*6), (height/6)*6)), ((height/6)*4), (height/6)*6), () )
      ( (), (), (), () )


      for 9 ->

    */

    drawX(){
      var point = new Point(this.canvas, 1, 30);
      var vals = [[0,2],[2,4],[4,6]]; // what about the others?

      vals.forEach((multipliers) => {
        this.drawLine({ x1: point.calc('width', multipliers[0], 1), // small
                        y1: point.calc('height', multipliers[0], 1), // small
                        x2: point.calc('width', multipliers[1], -1), // big
                        y2: point.calc('height', multipliers[1], -1) // big
                      });
        this.drawLine({ x1: point.calc('width', multipliers[0], 1), // small
                        y1: point.calc('height', multipliers[1], -1), // big
                        x2: point.calc('width', multipliers[1], -1), // big
                        y2: point.calc('height', multipliers[0], 1) // small
                      });
      });

      // this.drawLine({ x1: point.calc('width', 0, 1), // small
      //     y1: point.calc('height', 0, 1), // small
      //     x2: point.calc('width', 2, -1), // big
      //     y2: point.calc('height', 2, -1) // big
      //   });
      // this.drawLine({ x1: point.calc('width', 0, 1), // small
      //   y1: point.calc('height', 2, -1), // big
      //   x2: point.calc('width', 2, -1), // big
      //   y2: point.calc('height', 0, 1) // small
      // });

      // this.drawLine({ x1: point.calc('width', 0, 1), // small
      //                 y1: point.calc('height', 0, 1), // small
      //                 x2: point.calc('width', 2, -1), // big
      //                 y2: point.calc('height', 2, -1) // big
      //               });
      // this.drawLine({ x1: point.calc('width', 0, 1), // small
      //                 y1: point.calc('height', 2, -1), // big
      //                 x2: point.calc('width', 2, -1), // big
      //                 y2: point.calc('height', 0, 1) // small
      //               });
    }

    drawY(){

    }

    drawBoardLine(dimension, multiplier){
      const points = {}
      if (dimension === 'vertical') {
        points.x1 = this.canvas.width * (2/6) * multiplier;
        points.y1 = 0;
        points.x2 = points.x1;
        points.y2 = this.canvas.height;
      } else {
        points.x1 = 0;
        points.y1 = this.canvas.height * (2/6) * multiplier;
        points.x2 = this.canvas.width;
        points.y2 = points.y1;
      }

      this.drawLine(points)
    }

    drawBoardLines(){
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'black';
      this.drawBoardLine('vertical', 1);
      this.drawBoardLine('vertical', 2);
      this.drawBoardLine('horizontal', 1);
      this.drawBoardLine('horizontal', 2);

      this.drawX()
    }
  }

  function generateBoard(gameEvents) {
    return gameEvents.reduce((event, result) => {
      result[event.position] = event.character;
      return result;
    }, []);
  }

  var c = new Canvas('board');
  c.drawBoardLines();
  // this.ctx.fillRect(this.canvas.width*(1/6)*4,this.canvas.height*(1/6)*4,5,5);
// })();
