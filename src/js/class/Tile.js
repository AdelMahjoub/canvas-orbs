
class Tile {
  /**
   * Any Object/Entity displayed in the canvas should be an instance of a child of this class
   * @param {{srcX: number, srcY: number, srcWidth: number, srcHeight: number, x: number, y: number, width: number, height: number}} props 
   */
  constructor(props) {
    this.srcX = props['srcX'];           // Original X position in the TilesSpritesSheet
    this.srcY = props['srcY'];           // Original Y position in the TilesSpritesSheet
    this.srcWidth = props['srcWidth']    // Original width in the TilesSpritesSheet
    this.srcHeight = props['srcHeight']; // Original height in the TilesSpritesSheet
    this.x = props['x'] || 0;            // X position in the canvas (Display position)
    this.y = props['y'] || 0;            // Y position in the canvas (Display position)
    this.width = props['width'];         // width in the canvas (Display width)
    this.height = props['height'];       // height in the canvas (Display height)
  }
}

export default Tile;
