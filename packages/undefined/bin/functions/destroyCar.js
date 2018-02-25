module.exports = (player, vehicle) => {
  if (!vehicle) {
    if (player.vehicle) {
      vehicle = player.vehicle
    } else {
      player.call('alert', [{text: `You have no idea what you are doing, do you?`, type: 'error'}])
    }
  }
  if (vehicle.shopId) {
    player.call('alert', [{text: `Im sorry Dave. Im afraid I cant do that.`, type: 'error'}])
  } else {
    vehicle.destroy()
  }
}
