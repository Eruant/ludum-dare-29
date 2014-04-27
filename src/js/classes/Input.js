/*globals module, require*/

var Phaser = require('phaser'),
  game = require('../game');

var Input = function () {
  game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.W,
    Phaser.Keyboard.A,
    Phaser.Keyboard.D,
    Phaser.Keyboard.M
  ]);

};

Input.prototype.mute = function () {
  return !!(game.input.keyboard.justPressed(Phaser.Keyboard.M, 1));
};

Input.prototype.left = function () {
  return !!(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A));
};

Input.prototype.right = function () {
  return !!(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D));
};

Input.prototype.up = function () {
  return !!(game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W));
};

Input.prototype.justPressedUp = function () {
  return !!(game.input.keyboard.justPressed(Phaser.Keyboard.UP, 400) || game.input.keyboard.justPressed(Phaser.Keyboard.W, 400));
};

module.exports = Input;
