(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @class base
 * Base class to add all other scenes
 *
 * @author Matt Gale <matt@littleball.co.uk>
 **/

/*globals require*/


var game = require('./game'),
    boot = require('./scenes/boot.js'),
    preloader = require('./scenes/preloader'),
    mainMenu = require('./scenes/mainMenu'),
    level1 = require('./scenes/level1');

game.state.add('boot', boot, false);
game.state.add('preloader', preloader, false);
game.state.add('mainMenu', mainMenu, false);
game.state.add('level1', level1, false);

game.state.start('boot');

},{"./game":5,"./scenes/boot.js":6,"./scenes/level1":7,"./scenes/mainMenu":8,"./scenes/preloader":9}],2:[function(require,module,exports){
var /*Phaser = require('phaser'),*/
  game = require('../game'),
  Ground = function () {
    this.setup();
    this.addBlocks();

    return this;
  };

Ground.prototype.setup = function () {
  this.tilemap = game.add.tilemap('ground_map');
  this.tilemap.addTilesetImage('ground', 'ground_tiles');

  this.tilemap.setCollisionBetween(1, 15);
};

Ground.prototype.addBlocks = function () {
  this.layer = this.tilemap.createLayer(0);
  this.layer.resizeWorld();
};

module.exports = Ground;

},{"../game":5}],3:[function(require,module,exports){
/*globals module, require*/

var Phaser = (window.Phaser),
  game = require('../game');

var Input = function () {
  game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.W,
    Phaser.Keyboard.A,
    Phaser.Keyboard.D
  ]);

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

},{"../game":5}],4:[function(require,module,exports){
var Phaser = (window.Phaser),
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

    this.sprite.anchor.setTo(0.5, -0.2);
    this.sprite.body.offset.setTo(32, 0);

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

},{"../game":5}],5:[function(require,module,exports){
var Phaser = (window.Phaser),
  scale = 1.5;

var game = new Phaser.Game(480 * scale, 300 * scale, Phaser.AUTO, 'content', null);

module.exports = game;

},{}],6:[function(require,module,exports){
/*globals module*/

var game = require('../game');

module.exports = {

  preload: function () {

    // the preloader images
    this.load.image('loadingBar', 'assets/preloader_loading.png');

  },

  create: function () {

    // max number of fingers to detect
    this.input.maxPointers = 1;

    // auto pause if window looses focus
    this.stage.disableVisibilityChange = true;

    if (game.device.desktop) {
      this.stage.scale.pageAlignHorizontally = true;
    }

    game.state.start('preloader', true, false);
  }

};

},{"../game":5}],7:[function(require,module,exports){
/* globals module, require*/

var Phaser = (window.Phaser),
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

},{"../classes/Ground":2,"../classes/Input":3,"../classes/Player":4,"../game":5}],8:[function(require,module,exports){
/*globals module, require*/

var Phaser = (window.Phaser),
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

},{"../game":5}],9:[function(require,module,exports){
/*globals module, require*/

var Phaser = (window.Phaser),
  game = require('../game');

module.exports = {

  preload: function () {

    this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
    this.loadingBar.anchor.x = 0.5;
    this.loadingBar.anchor.y = 0.5;
    this.load.setPreloadSprite(this.loadingBar);

    game.load.image('background', 'assets/menu_background.png');
    game.load.image('bubbles', 'assets/bubbles.png');

    game.load.spritesheet('ground_tiles', 'assets/ground_sprite.png', 64, 64);
    game.load.tilemap('ground_map', 'assets/ground_tiles.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.spritesheet('player', 'assets/player_sprite.png', 64, 64);

  },

  create: function () {
    var tween = this.add.tween(this.loadingBar)
      .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.startMainMenu, this);
  },

  startMainMenu: function () {
    game.state.start('mainMenu', true, false);
  }

};

},{"../game":5}]},{},[1])