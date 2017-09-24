import Orb from './Orb';
class Board {

  /**
   * 
   * @param {{tileWidth: number, tileHeight: number}} config 
   * @param {[Orb]} orbs 
   */
  constructor(config, orbs) {
    this.tileWidth = config['tileWidth'];
    this.tileHeight = config['tileHeight'];
    this.columns = 10;
    this.rows = 10;
    this.orbs = [...orbs];
    this.stageCodes = [];
    this.stageOrbs = [];
    this.initBoard();
  }

  /**
   * Initialise canvas dimensions and context
   */
  initBoard() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = this.tileWidth * this.columns;
    this.height = this.canvas.height = this.tileHeight * this.rows;
    this.canvas.style.border = "none";
    this.initStage();
  }

  /**
   * Append canvas to the DOM
   * @param {HTMLDivElement} node 
   */
  renderBoard(node) {
    node.appendChild(this.canvas);
  }

  /**
   * Draw a grid 
   */
  renderGrid() {
    for(let i = 0; i <= this.width; i+= this.tileWidth ) {
      this.ctx.save();
        this.ctx.beginPath();
          this.ctx.lineWidth = 0.2;
          this.ctx.strokeStyle = 'black';
          this.ctx.moveTo(i, 0);
          this.ctx.lineTo(i, this.height);
          this.ctx.stroke();
        this.ctx.closePath();
      this.ctx.restore();
    }

    for(let i = 0; i <= this.height; i+= this.tileHeight ) {
      this.ctx.save();
        this.ctx.beginPath();
          this.ctx.lineWidth = 0.2;
          this.ctx.strokeStyle = 'black';
          this.ctx.moveTo(0, i);
          this.ctx.lineTo(this.width, i);
          this.ctx.stroke();
        this.ctx.closePath();
      this.ctx.restore();
    }
  }

  /**
   * Initialize stageCodes
   * A 2d array filled with orb codes
   * Each rendered orb in the canvas can be idenified by its code
   * 
   */
  initStage() {
    for(let x = 0; x < this.columns; x++) {
      this.stageCodes[x] = [];
      this.stageOrbs[x] = [];
      for(let y = 0; y < this.rows; y++) {
        this.stageCodes[x][y] = ~~(Math.random() * this.orbs.length);
        let code = this.stageCodes[x][y];
        this.stageOrbs[x][y] = Object.assign({}, this.orbs.filter(orb => orb.code === code)[0]);
        let orb = this.stageOrbs[x][y];
        orb.boardX = x;
        orb.boardY = y;
        orb.x = x * orb.width;
        orb.y = y * orb.height;
      }
    }
  }

 
  renderStage(image) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for(let x = 0; x < this.columns; x++) {
      for(let y = 0; y < this.rows; y++) {
        let orb = this.stageOrbs[x][y];
        this.ctx.drawImage(
          image,
          orb.srcX,
          orb.srcY,
          orb.srcWidth,
          orb.srcHeight,
          orb.x,
          orb.y,
          orb.width,
          orb.height
        )
      }
    }
    requestAnimationFrame(() => {
      this.renderStage(image)
    })
  }
}

export default Board;



