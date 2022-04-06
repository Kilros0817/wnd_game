const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')
const util = require('util')

module.exports = async callback => {
  const dnd = await DungeonsAndDragons.deployed()
  console.log('Creating requests on contract:', dnd.address)
  const tx = await dnd.requestNewRandomCharacter("The Chainlink Knight")
  // const tx2 = await dnd.requestNewRandomCharacter("The Chainlink Elf")
  // const tx3 = await dnd.requestNewRandomCharacter("The Chainlink Wizard")
  // const tx4 = await dnd.requestNewRandomCharacter("The Chainlink Orc")
  DungeonsAndDragons.CHARACTER_CREATED().watch(function(error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  })
  callback(tx.tx)
}
