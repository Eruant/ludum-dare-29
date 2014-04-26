/*globals module, require*/

var Phaser = require('phaser'),
  game = require('../game');

module.exports = {

  preload: function () {

    this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
    this.loadingBar.anchor.x = 0.5;
    this.loadingBar.anchor.y = 0.5;
    this.load.setPreloadSprite(this.loadingBar);

    game.load.image('background', 'assets/menu_background.png');

    game.load.spritesheet('ground_tiles', 'assets/ground_sprite.png', 64, 64);
    game.load.tilemap('ground_map', 'assets/ground_tiles.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.spritesheet('player', 'assets/player_sprite.png', 64, 64);

  },

  create: function () {
    var tween = this.add.tween(this.loadingBar)
      .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.startMainMenu, this);
  },

  startMainMenu: function () {
    game.state.start('mainMenu', true, false);
  }

};
