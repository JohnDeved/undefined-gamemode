const crypto = require('crypto')
const base64url = require('base64url')

class Database {
  constructor (db) {
    this.db = db
    this.defaults = this.db.defaults({ players: [], shopCars: [] }).write()

    this.pushShopCarData = (value, callback) => this.db.get('shopCars').push(value).write().then(callback)
    this.getShopCarData = search => this.db.get('shopCars').find(search).value()
    this.setShopCarData = (search, value, callback) => db.get('shopCars').find(search).set(value).write().then(callback)
    this.getAllShopCars = () => this.db.get('shopCars').value()

    this.pushPlayerData = (value, callback) => this.db.get('players').push(value).write().then(callback)
    this.getPlayerData = search => this.db.get('players').find(search).value()
    this.setPlayerData = (search, value, callback) => db.get('players').find(search).set(value).write().then(callback)

    this.generateId = num => base64url(crypto.randomBytes(num))
  }
}

module.exports = db => new Database(db)
