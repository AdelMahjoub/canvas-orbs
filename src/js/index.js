import path from 'path';
import Board from './class/Board';
import tilesConfig from './shared/tiles.config';
import Orb from './class/Orb'; 
import Info from './class/Info';

import '../css/styles.css';
import * as orbsAsset from '../assets/orbs.png';

window.addEventListener('DOMContentLoaded', function() {

  // Image of all orbs, spritesTileSheet
  const orbsTiles = new Image();
  orbsTiles.src = orbsAsset.default;  

  // Get orbs positions and dimensions relative to the spritesTileSheet
  // And generate all different orbs
  // Return an array of Orb instances
  const generateOrbs = function() {
    let orbs = [];
    for(let i = 0; i < tilesConfig.tiles.length; i++) {
      const orb = new Orb({
        srcX: (~~(i % tilesConfig.columns) * tilesConfig.tileWidth) + tilesConfig.marginX,
        srcY: (~~(i / tilesConfig.columns) * tilesConfig.tileHeight) + tilesConfig.marginY,
        srcWidth: tilesConfig.tileWidth,
        srcHeight: tilesConfig.tileHeight,
        width: tilesConfig.tileDisplayWidth,
        height: tilesConfig.tileDisplayHeight,
        code: i,
        name: tilesConfig.tiles[i]
      });
      orbs.push(orb);
    }
    return orbs;
  }

  const board = new Board({
    tileWidth: tilesConfig.tileDisplayWidth,
    tileHeight: tilesConfig.tileDisplayHeight
  }, generateOrbs());

  board.renderBoard(document.querySelector('#root'));

  orbsTiles.addEventListener('load', function() {
    board.renderStage(orbsTiles);
  });

  // Get the clicked orb infos
  board.canvas.addEventListener('click', function(e) {
    let x = ~~(e.offsetX / board.tileWidth);
    let y = ~~(e.offsetY / board.tileHeight);
    let code = board.stageCodes[x][y];
    let orb = board.stageOrbs[x][y];
    Info.render(document.querySelector('#info'), JSON.stringify(orb, null, 2));
  }, false);

});