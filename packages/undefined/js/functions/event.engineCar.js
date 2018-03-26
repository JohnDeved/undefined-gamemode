module.exports = player => {
  if (player.vehicle) {
    player.vehicle.engine = !player.vehicle.engine
  }
}
