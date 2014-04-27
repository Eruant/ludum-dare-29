/* globals module, require*/

var Phaser = require('phaser'),
  game = require('../game'),
  Player = require('../classes/Player'),
  Ground = require('../classes/Ground'),
  Collectables = require('../classes/Collectables'),
  Decorations = require('../classes/Decorations'),
  Logic = require('../classes/Logic'),
  Input = require('../classes/Input'),
  Audio = require('../classes/Audio');

module.exports = {

  create: function () {

    this.TILE_SIZE = 64;

    var playerX = 8 * this.TILE_SIZE,
      playerY = 8 * this.TILE_SIZE;

    playerX = 39 * this.TILE_SIZE;
    playerY = 23 * this.TILE_SIZE;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.background = this.add.tileSprite(0, 0, game.width, game.height, 'background');
    this.background.fixedToCamera = true;
    this.bubbles = this.add.tileSprite(0, 0, game.width, game.height, 'bubbles');
    this.bubbles.fixedToCamera = true;

    this.ground = new Ground();
    this.collectables = new Collectables();
    this.decorations = new Decorations();
    this.player = new Player(playerX, playerY);
    this.input = new Input();
    this.logic = new Logic();
    this.audio = new Audio();

    game.camera.follow(this.player.sprite);
    game.level = this;
  },

  update: function () {

    var playerPosition = this.player.sprite.position,
      xTile = Math.floor(playerPosition.x / 64),
      yTile = Math.floor(playerPosition.y / 64);

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

    this.logic.update(xTile, yTile);
  },

  render: function () {
    //game.debug.body(this.player.sprite);
  },

  restartGame: function () {
    game.state.start('mainMenu');
  }

};
