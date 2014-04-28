var game = require('../game'),
  Ground = function () {
    this.setup();

    return this;
  };

Ground.prototype.setup = function () {
  this.tilemap = game.add.tilemap('ground_map');
  this.tilemap.addTilesetImage('ground', 'ground_tiles');

  this.tilemap.setCollisionBetween(0, 16);

  this.layer = this.tilemap.createLayer(0);
  this.layer.resizeWorld();

  //this.layer.debug = true;
};

module.exports = Ground;
