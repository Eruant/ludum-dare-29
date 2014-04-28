var game = require('../game'),
    Collectables = function () {
      this.setup();

      return this;
    };

Collectables.prototype.setup = function () {
  this.tilemap = game.add.tilemap('ground_map');
  this.tilemap.addTilesetImage('collectables', 'collectables');

  this.layer = this.tilemap.createLayer(1);
};

module.exports = Collectables;
