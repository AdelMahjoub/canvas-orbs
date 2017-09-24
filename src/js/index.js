import path from 'path';
import Board from './class/Board';
import tilesConfig from './shared/tiles.config';
import Orb from './class/Orb'; 
import Info from './class/Info';
import events from 'events';

import '../css/styles.css';
import * as orbsAsset from '../assets/orbs.png';

const move = new events.EventEmitter();

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
  let orb, startX, startY, targetX, targetY;
  board.canvas.addEventListener('mousedown', function(e) {
    let x = ~~(e.offsetX / board.tileWidth);
    let y = ~~(e.offsetY / board.tileHeight);
    orb = board.stageOrbs[x][y];
    startX = orb.x;
    startY = orb.y;
    Info.render(document.querySelector('#info'), JSON.stringify(orb, null, 2));
    move.emit('mousedown');
  }, false);

  window.addEventListener('mouseup', function(e) {
    move.emit('mouseup');
  }, false);


  const moveOrb = function(e) {
    orb.x = Math.max(startX - ~~(board.tileWidth / 2), Math.min(startX + ~~(board.tileWidth / 2), orb.x + e.movementX));
    orb.y = Math.max(startY - ~~(board.tileHeight / 2), Math.min(startY + ~~(board.tileHeight / 2), orb.y + e.movementY));
  }

  move.addListener('mousedown', () => {
    board.canvas.style.cursor = 'none';
    board.canvas.addEventListener('mousemove', moveOrb, false);
  })

  move.addListener('mouseup', () => {

    if(orb.x > (startX + ~~(board.tileWidth / 3))) {
      targetX = orb.boardX + 1
    } else if(orb.x < (startX - ~~(board.tileWidth / 3))) {
      targetX = orb.boardX - 1
    } else {
      targetX = orb.boardX;
    }

    if(orb.y > (startY + ~~(board.tileHeight / 3))) {
      targetY = orb.boardY + 1;
    } else if(orb.y < (startY - ~~(board.tileHeight / 3))) {
      targetY = orb.boardY - 1;
    } else {
      targetY = orb.boardY;
    }
    
    let to = Object.assign({},
       board.stageOrbs[targetX][targetY], 
       {
         boardX: orb.boardX, 
         boardY: orb.boardY, 
         x: startX, 
         y: startY
    });

    let from = Object.assign(
      {}, 
      board.stageOrbs[orb.boardX][orb.boardY], 
      { 
        boardX: targetX, 
        boardY: targetY, 
        x: board.stageOrbs[targetX][targetY].x, 
        y: board.stageOrbs[targetX][targetY].y
    });

    board.stageOrbs[targetX][targetY] = Object.assign({}, from);
    board.stageCodes[targetX][targetY] = from.code;
    board.stageOrbs[orb.boardX][orb.boardY] = Object.assign({}, to);
    board.stageCodes[orb.boardX][orb.boardY] = to.code;

    board.canvas.style.cursor = 'default';
    board.canvas.removeEventListener('mousemove', moveOrb);
  });

});