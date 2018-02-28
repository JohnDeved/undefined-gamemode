const crypto = require('crypto')
const base64url = require('base64url')

class Database {
  constructor (db) {
    this.db = db
    this.players = this.db.getCollection('players') || this.db.addCollection('players')
    this.shopCars = this.db.getCollection('shopCars') || this.db.addCollection('shopCars')
    this.generateId = num => base64url(crypto.randomBytes(num))
  }
}

module.exports = db => new Database(db)
