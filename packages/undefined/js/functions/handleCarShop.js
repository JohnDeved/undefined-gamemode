module.exports = (player, vehicle, seat) => {
  if (seat === -1) {
    const name = mp.vehicleInfo[vehicle.model].displayName
    const dialog = {
      title: 'Example Car Shop',
      text: `Do you wanna Buy this ${name}?`,
      yes: `yes (${30000})`,
      no: 'cancel',
      yesCallback: 'buyCarShop',
      noCallback: 'cancelCarShop'
    }
    player.call('showDialog', [dialog])
    vehicle.locked = true
  } else {
    player.call(player.call('alert', [{text: `Please enter as the Driver!`, icon: 'fa-key', type: 'error'}]))
    player.removeFromVehicle()
  }
}
