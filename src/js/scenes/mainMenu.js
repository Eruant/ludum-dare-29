/*globals module, require*/

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
    this.startGame();
    this.input.onDown.addOnce(this.startGame, this);
  },

  startGame: function () {
    game.state.start('level1', true, false);
  }

};
