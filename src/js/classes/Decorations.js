var game = require('../game'),
  Decorations = function () {
    this.setup();

    return this;
  };

Decorations.prototype.setup = function () {
  this.tilemap = game.add.tilemap('ground_map');
  this.tilemap.addTilesetImage('decorations', 'decorations');

  this.layer = this.tilemap.createLayer(2);
};

module.exports = Decorations;
