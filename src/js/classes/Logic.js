var game = require('../game'),
  Logic = function () {

  this.currentLevel = 0;

  this.keys = [
    { x: 14, y:  4, collected: false, opens: 0, sound: true },
    { x: 25, y:  8, collected: false, opens: 1, sound: true },
    { x: 22, y:  2, collected: false, opens: 1, sound: true },
    { x: 39, y:  2, collected: false, opens: 2, sound: true },
    { x: 31, y: 20, collected: false, opens: 3, sound: true },
    { x: 33, y:  7, collected: false, opens: 4, sound: true },
    { x: 42, y: 20, collected: false, opens: 5, sound: true },
    { x: 33, y:  0, collected: false, opens: 6, sound: true },
    { x: 52, y: 15, collected: false, opens: 7, sound: true },
    { x: 62, y: 19, collected: false, opens: 7, sound: true },
    { x: 72, y: 15, collected: false, opens: 7, sound: true },
    { x: 80, y: 19, collected: false, opens: 7, sound: true },
    { x: 98, y: 38, collected: false, opens: 8, sound: true },
    { x: 88, y: 33, collected: false, opens: 8, sound: true },
    { x: 90, y: 48, collected: false, opens: 9, sound: true },
    { x: 90, y: 48, collected: false, opens: 10, sound: false },
    { x: 90, y: 48, collected: false, opens: 11, sound: false },
    { x: 90, y: 48, collected: false, opens: 12, sound: false },
    { x: 88, y: 63, collected: false, opens: 13, sound: true },
    { x: 98, y: 58, collected: false, opens: 14, sound: true },
    { x: 90, y: 82, collected: false, opens: 14, sound: true },
    { x: 83, y: 82, collected: false, opens: 15, sound: true },
    { x: 80, y: 88, collected: false, opens: 15, sound: true }
  ];
  
  this.gates = [
    { x: 14, y:  8, open: 1 },  // 0
    { x: 26, y:  2, open: 2 },  // 1
    { x: 31, y: 18, open: 1 },  // 2
    { x: 37, y:  7, open: 1 },  // 3
    { x: 33, y: 18, open: 1 },  // 4
    { x: 37, y:  4, open: 1 },  // 5
    { x: 37, y: 23, open: 1 },  // 6
    { x: 87, y: 10, open: 4 },  // 7
    { x: 95, y: 40, open: 2 },  // 8
    { x: 86, y: 50, open: 1 },  // 9
    { x: 88, y: 50, open: 1 },  // 10
    { x: 92, y: 50, open: 1 },  // 11
    { x: 94, y: 50, open: 1 },  // 12
    { x: 87, y: 65, open: 1 },  // 13
    { x: 84, y: 98, open: 1 },  // 14
    { x: 75, y: 85, open: 2 }  // 15
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
        if (key.sound) {
          game.level.audio.sfx.play('pickUpKey');
        }
        if (gate.open === 0) {
          game.level.ground.tilemap.removeTile(gate.x, gate.y, 0);
          if (key.sound) {
            game.level.audio.sfx.play('unlockGate');
          }
        }
      }
    }
  }

};

module.exports = Logic;
