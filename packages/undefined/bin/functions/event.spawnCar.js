module.exports = (player, car = 'Dominator') => {
  if (player.vehicle) {
    mp.fnc.destroyCar(player, player.vehicle)
  } else {
    let veh = mp.vehicles.new(mp.joaat(car), player.position)
    veh.owner = player.uid
    player.call('alert', [{text: `Vehicle ${car} has been spawned!`, icon: 'fa-car', type: 'success'}])
    player.putIntoVehicle(veh, -1)
  }
}
