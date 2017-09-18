import Tile from './Tile';

class Orb extends Tile {
  /**
   * 
   * @param {{srcX: number, srcY: number, srcWidth: number, srcHeight: number, x: number, y: number, width: number, height: number, name: string, code: number}} props 
   */
  constructor(props) {
    super(props);
    this.name = props['name']; // Generic name to display
    this.code = props['code']; // Code to be identified with
    this.boardX = 0;           // X position relative to a grid
    this.boardY = 0;           // Y position relative to a grid
  }
}

export default Orb;