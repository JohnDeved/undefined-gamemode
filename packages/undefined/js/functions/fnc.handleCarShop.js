module.exports = (player, vehicle, seat) => {
  if (seat === -1) {
    const carInfo = mp.vehicleInfo[vehicle.model]
    const dialog = {
      title: 'Example Car Shop',
      text: `Do you wanna Buy this ${carInfo.displayName}?`,
      yes: `yes ($${carInfo.price.toLocaleString('en-EN')})`,
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
