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
    level1 = require('./scenes/level1'),
    win = require('./scenes/win');

game.state.add('boot', boot, false);
game.state.add('preloader', preloader, false);
game.state.add('mainMenu', mainMenu, false);
game.state.add('level1', level1, false);
game.state.add('win', win, false);

game.state.start('boot');

},{"./game":9,"./scenes/boot.js":10,"./scenes/level1":11,"./scenes/mainMenu":12,"./scenes/preloader":13,"./scenes/win":14}],2:[function(require,module,exports){
var game = require('../game'),
  Audio = function () {

    this.sfx = game.add.audio('sfx');
    this.sfx.addMarker('pickUpKey', 0, 1);
    this.sfx.addMarker('unlockGate', 1, 8);
    this.sfx.addMarker('endGame', 9, 14);
  };

module.exports = Audio;

},{"../game":9}],3:[function(require,module,exports){
var game = require('../game'),
    Collectables = function () {
      this.setup();

      return this;
    };

Collectables.prototype.setup = function () {
  this.tilemap = game.add.tilemap('ground_map');
  this.tilemap.addTilesetImage('collectables', 'collectables');

  this.layer = this.tilemap.createLayer(1);
};

module.exports = Collectables;

},{"../game":9}],4:[function(require,module,exports){
var game = require('../game'),
  Decorations = function () {
    this.setup();

    return this;
  };

Decorations.prototype.setup = function () {
  this.tilemap = game.add.tilemap('ground_map');
  this.tilemap.addTilesetImage('decorations', 'decorations');

  this.layer = this.tilemap.createLayer(2);
};

module.exports = Decorations;

},{"../game":9}],5:[function(require,module,exports){
var game = require('../game'),
  Ground = function () {
    this.setup();

    return this;
  };

Ground.prototype.setup = function () {
  this.tilemap = game.add.tilemap('ground_map');
  this.tilemap.addTilesetImage('ground', 'ground_tiles');

  this.tilemap.setCollisionBetween(0, 16);

  this.layer = this.tilemap.createLayer(0);
  this.layer.resizeWorld();

  //this.layer.debug = true;
};

module.exports = Ground;

},{"../game":9}],6:[function(require,module,exports){
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

},{"../game":9}],7:[function(require,module,exports){
var game = require('../game'),
  Logic = function () {

  this.currentLevel = 0;

  this.keys = [
    { x: 14, y:  4, collected: false, opens: 0 },
    { x: 25, y:  8, collected: false, opens: 1 },
    { x: 22, y:  2, collected: false, opens: 1 },
    { x: 39, y:  2, collected: false, opens: 2 },
    { x: 31, y: 20, collected: false, opens: 3 },
    { x: 33, y:  7, collected: false, opens: 4 },
    { x: 42, y: 20, collected: false, opens: 5 },
    { x: 33, y:  0, collected: false, opens: 6 }
  ];
  
  this.gates = [
    { x: 14, y:  8, open: 1 },  // 0
    { x: 26, y:  2, open: 2 },  // 1
    { x: 31, y: 18, open: 1 },  // 2
    { x: 37, y:  7, open: 1 },  // 3
    { x: 33, y: 18, open: 1 },  // 4
    { x: 37, y:  4, open: 1 },  // 5
    { x: 37, y: 23, open: 1 }
  ];
};

Logic.prototype.update = function (x, y) {

  if (x === 47 && y === 96) {
    game.state.start('win', true, false);
    game.level.audio.sfx.play('endGame');
  }

  for (var i = 0, iL = this.keys.length, key, gate; i < iL; i++) {
    key = this.keys[i];
    gate = this.gates[key.opens];
    if (!key.collected) {
      if (x === key.x && y === key.y) {
        gate.open -= 1;
        key.collected = true;
        game.level.collectables.tilemap.removeTile(x, y, 1);
        game.level.audio.sfx.play('pickUpKey');
        if (gate.open === 0) {
          game.level.ground.tilemap.removeTile(gate.x, gate.y, 0);
          game.level.audio.sfx.play('unlockGate');
        }
      }
    }
  }

};

module.exports = Logic;

},{"../game":9}],8:[function(require,module,exports){
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

},{"../game":9}],9:[function(require,module,exports){
var Phaser = (window.Phaser),
  scale = 1.5;

var game = new Phaser.Game(480 * scale, 300 * scale, Phaser.AUTO, 'content', null);

module.exports = game;

},{}],10:[function(require,module,exports){
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

},{"../game":9}],11:[function(require,module,exports){
/* globals module, require*/

var Phaser = (window.Phaser),
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

},{"../classes/Audio":2,"../classes/Collectables":3,"../classes/Decorations":4,"../classes/Ground":5,"../classes/Input":6,"../classes/Logic":7,"../classes/Player":8,"../game":9}],12:[function(require,module,exports){
/*globals module, require*/

var Phaser = (window.Phaser),
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

    this.welcomeMsg = game.add.text(game.width / 2, game.height / 2, "Search out the treasure\n\nPress Enter\nto begin", style);
    this.welcomeMsg.anchor.set(0.5, 0.5);

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

},{"../game":9}],13:[function(require,module,exports){
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
    game.load.spritesheet('decorations', 'assets/decorations.png', 64, 64);
    game.load.spritesheet('collectables', 'assets/collectables.png', 64, 64);
    game.load.tilemap('ground_map', 'assets/ground_tiles.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.spritesheet('player', 'assets/player_sprite.png', 64, 64);

    game.load.audio('sfx', [
      'assets/sfx.m4a',
      'assets/sfx.ogg'
    ]);

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

},{"../game":9}],14:[function(require,module,exports){
var Phaser = (window.Phaser),
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

},{"../game":9}]},{},[1])