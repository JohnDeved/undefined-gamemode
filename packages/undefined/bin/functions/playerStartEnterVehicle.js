module.exports = (player, vehicle, seat) => {
  console.log(vehicle.getOccupant(seat))

  if (vehicle.locked) {
    if (vehicle.owner === player.uid) {
      player.call('alert', [{text: `You can unlock you Car by pressing 'U'`}])
    }
  }
}
