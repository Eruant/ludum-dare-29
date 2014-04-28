var Phaser = require('phaser'),
  scale = 1.5;

var game = new Phaser.Game(480 * scale, 300 * scale, Phaser.AUTO, 'content', null);

module.exports = game;
