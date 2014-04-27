var game = require('../game'),
  Logic = function () {

  this.currentLevel = 0;

  this.keys = [
    { x: 14, y: 4, collected: false, opens: 0 },
    { x: 25, y: 8, collected: false, opens: 1 },
    { x: 22, y: 2, collected: false, opens: 1}
  ];
  
  this.gates = [
    { x: 14, y: 8, open: 1 }, // 0
    { x: 26, y: 2, open: 2 }  // 1
  ];
};

Logic.prototype.update = function (x, y) {

  for (var i = 0, iL = this.keys.length, key, gate; i < iL; i++) {
    key = this.keys[i];
    gate = this.gates[key.opens];
    if (!key.collected) {
      if (x === key.x && y === key.y) {
        gate.open -= 1;
        key.collected = true;
        game.level.collectables.tilemap.removeTile(x, y, 1);
        if (gate.open === 0) {
          game.level.ground.tilemap.removeTile(gate.x, gate.y, 0);
        }
      }
    }
  }

};

module.exports = Logic;
