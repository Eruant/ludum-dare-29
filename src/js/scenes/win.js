var Phaser = require('phaser'),
  game = require('../game');

module.exports = {

  create: function () {

    var tween,
      style = {
        font: '30px ss',
        fill: '#fff',
        align: 'center'
      };

    this.background = this.add.tileSprite(0, 0, game.width, game.height, 'background');
    this.background.alpha = 0;

    this.winMsg = game.add.text(game.width / 2, game.height / 2, "You found it!\nwell done", style);
    this.winMsg.anchor.set(0.5, 0.5);

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
      this.goToMenu();
    }
  },

  goToMenu: function () {
    game.state.start('mainMenu', true, false);
  }
};
