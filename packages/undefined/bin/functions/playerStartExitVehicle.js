module.exports = player => {
  if (player.vehicle.shopId) {
    player.vehicle.locked = false
  }
}
