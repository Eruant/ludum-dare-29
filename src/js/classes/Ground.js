var /*Phaser = require('phaser'),*/
  game = require('../game'),
  Ground = function () {
    this.setup();
    this.addBlocks();

    return this;
  };

Ground.prototype.setup = function () {
  this.tilemap = game.add.tilemap('ground_map');
  this.tilemap.addTilesetImage('ground', 'ground_tiles');

  this.tilemap.setCollisionBetween(1, 15);
};

Ground.prototype.addBlocks = function () {
  this.layer = this.tilemap.createLayer(0);
  this.layer.resizeWorld();
};

module.exports = Ground;
