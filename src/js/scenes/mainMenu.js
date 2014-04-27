/*globals module, require*/

var Phaser = require('phaser'),
  game = require('../game');

module.exports = {

  create: function () {

    var tween,
      style = {
        font: '20px ss',
        fill: '#fff',
        align: 'center'
      },
      largeStyle = {
        font: '40px ss',
        fill: '#fff',
        align: 'center'
      };

    this.background = this.add.tileSprite(0, 0, game.width, game.height, 'background');
    this.background.alpha = 0;

    this.welcomeMsg = game.add.text(game.width / 2, game.height / 2, "Search out the treasure\n\n\n\n\n\nPress 'M' to mute sounds", style);
    this.welcomeMsg.anchor.set(0.5, 0.5);

    this.instructionMsg = game.add.text(game.width / 2, game.height / 2, "Press Enter to begin", largeStyle);
    this.instructionMsg.anchor.set(0.5, 0.5);

    tween = this.add.tween(this.background)
      .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

    tween.onComplete.add(this.addPointerEvents, this);
  },

  addPointerEvents: function () {
    game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.ENTER
    ]);
  },

  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      this.startGame();
    }
  },

  startGame: function () {
    game.state.start('level1', true, false);
  }

};
