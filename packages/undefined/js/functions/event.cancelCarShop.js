module.exports = player => {
  player.vehicle.locked = false
  player.vehicle.engine = false
  player.removeFromVehicle()
}
