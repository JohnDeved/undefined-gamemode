class Functions {
  constructor () {
    this.spawnCar = require('./functions/spawnCar.js')
    this.spawnGun = require('./functions/spawnGun.js')
    this.setSpawn = require('./functions/setSpawn.js')
    this.setCarShop = require('./functions/setCarShop.js')
    this.refreshCarShop = require('./functions/refreshCarShop.js')
    this.playerDeath = require('./functions/playerDeath.js')
    this.playerReady = require('./functions/playerReady.js')
    this.playerChat = require('./functions/playerChat.js')
    this.playerEnterVehicle = require('./functions/playerEnterVehicle.js')
    this.playerExitVehicle = require('./functions/playerExitVehicle.js')
  }
}

module.exports = new Functions()
