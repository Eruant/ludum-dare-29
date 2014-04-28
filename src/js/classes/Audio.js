/*globals localStorage*/

var game = require('../game'),
  Audio = function () {

    this.sfx = game.add.audio('sfx');
    this.sfx.addMarker('pickUpKey', 0, 1);
    this.sfx.addMarker('unlockGate', 1, 8);
    this.sfx.addMarker('endGame', 9, 14);

    this.music = game.add.audio('music');
    this.music.loop = true;
    this.music.play();

    this.muteSounds = false;
    var mute = localStorage.getItem("mute");

    if (mute) {
      if (mute === 'on') {
        this.muteSounds = true;
        this.setMute();
      } else {
        localStorage.setItem("mute", 'off');
        this.muteSounds = false;
      }
    } else {
      localStorage.setItem("mute", 'off');
      this.muteSounds = false;
    }

  };

Audio.prototype.setMute = function () {
  this.sfx.mute = this.muteSounds;
  this.music.mute = this.muteSounds;
};

Audio.prototype.toggleMute = function () {
  this.muteSounds = !this.muteSounds;
  localStorage.setItem("mute", (this.muteSounds ? 'on' : 'off'));
  this.setMute();
};

module.exports = Audio;
