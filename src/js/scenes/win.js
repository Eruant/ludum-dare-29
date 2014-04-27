var Phaser = require('phaser'),
  game = require('../game');

module.exports = {

  create: function () {

    var tween;

    this.background = this.add.tileSprite(0, 0, game.width, game.height, 'background');
    this.background.alpha = 0;

    tween = this.add.tween(this.background)
      .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

    tween.onComplete.add(this.addPointerEvents, this);
  },

  addPointerEvents: function () {
    this.input.onDown.addOnce(this.goToMenu, this);
  },

  goToMenu: function () {
    game.state.start('mainMenu', true, false);
  }
};
