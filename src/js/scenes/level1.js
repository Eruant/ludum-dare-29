/* globals module, require*/

var Phaser = require('phaser'),
  game = require('../game'),
  Player = require('../classes/Player'),
  Ground = require('../classes/Ground'),
  Input = require('../classes/Input');

module.exports = {

  create: function () {

    this.TILE_SIZE = 64;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.background = this.add.tileSprite(0, 0, game.width, game.height, 'background');
    this.background.fixedToCamera = true;
    this.bubbles = this.add.tileSprite(0, 0, game.width, game.height, 'bubbles');
    this.bubbles.fixedToCamera = true;

    this.ground = new Ground();
    this.player = new Player(3 * this.TILE_SIZE, 6 * this.TILE_SIZE);
    this.input = new Input();

    game.camera.follow(this.player.sprite);
  },

  update: function () {

    this.background.tilePosition.setTo(-(game.camera.x * 0.5), -(game.camera.y * 0.5));
    this.bubbles.tilePosition.setTo(-(game.camera.x * 0.75), -(game.camera.y * 0.75));

    if (this.player.inWorld === false) {
      this.restartGame();
    }
    game.physics.arcade.collide(this.player.sprite, this.ground.layer);
    
    if (this.input.left()) {
      this.player.walkLeft();
    } else if (this.input.right()) {
      this.player.walkRight();
    } else {
      this.player.walkStop();
    }

    if (this.player.isOnGround()) {
      this.player.canVariableJump = true;
    }

    if (this.input.justPressedUp()) {
      if (this.player.isOnGround() || this.player.canVariableJump) {
        this.player.jump();
      }
    }

    if (!this.input.left() && !this.input.right() && !this.player.isOnGround() && !this.input.up()) {
      this.player.midAir();
    }

    if (!this.input.up()) {
      this.player.canVariableJump = false;
    }
  },

  restartGame: function () {
    game.state.start('mainMenu');
  }

};
