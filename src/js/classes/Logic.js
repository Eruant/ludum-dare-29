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
