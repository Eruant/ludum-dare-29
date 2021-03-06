var Phaser = require('phaser'),
  game = require('../game'),
  Player = function (x, y) {

    this.MAX_SPEED = 250;
    this.ACCELERATION = 600;
    this.DRAG = 400;
    this.GRAVITY = 600;
    this.JUMP_SPEED = -600;

    this.canVariableJump = false;

    this.sprite = game.add.sprite(x, y, 'player');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = this.GRAVITY;
    this.sprite.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);
    this.sprite.body.drag.setTo(this.DRAG, 0);

    this.sprite.body.setSize(46, 48);
    this.sprite.anchor.setTo(0.5, 0);
    this.sprite.body.offset.setTo(2, 7);

    this.sprite.animations.add('stand', [0, 1], 2.5, true);
    this.sprite.animations.add('walk', [2, 3, 4, 5], 10, true);
    this.sprite.animations.add('jump', [6, 7], 5, true);

    return this;
  };

Player.prototype.walkLeft = function () {
  this.sprite.animations.play('walk');
  this.sprite.scale.setTo(-1, 1);
  this.sprite.body.acceleration.x = -this.ACCELERATION;
};

Player.prototype.walkRight = function () {
  this.sprite.animations.play('walk');
  this.sprite.scale.setTo(1, 1);
  this.sprite.body.acceleration.x = this.ACCELERATION;
};

Player.prototype.walkStop = function () {
  if (this.isOnGround()) {
    this.sprite.animations.play('stand');
  }
  this.sprite.body.acceleration.x = 0;
};

Player.prototype.isOnGround = function () {
  return this.sprite.body.onFloor();
};

Player.prototype.jump = function () {
  this.sprite.animations.play('jump');
  this.sprite.body.velocity.y = this.JUMP_SPEED;
};

Player.prototype.midAir = function () {
  this.sprite.animations.play('stand');
};

module.exports = Player;
