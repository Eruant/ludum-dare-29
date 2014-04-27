var game = require('../game'),
  Audio = function () {

    this.sfx = game.add.audio('sfx');
    this.sfx.addMarker('pickUpKey', 0, 1);
    this.sfx.addMarker('unlockGate', 1, 8);
    this.sfx.addMarker('endGame', 9, 14);
  };

module.exports = Audio;
