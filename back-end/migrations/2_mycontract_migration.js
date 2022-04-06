const BlootElvesNFT = artifacts.require('BlootElvesNFT')

module.exports = async (deployer, network, [defaultAccount]) => {
  BlootElvesNFT.setProvider(deployer.provider)
  if (network.startsWith('rinkeby')) {
    await deployer.deploy(BlootElvesNFT)
    let dnd = await BlootElvesNFT.deployed()
  } else if (network.startsWith('mainnet')) {
    console.log("If you're interested in early access to Chainlink VRF on mainnet, please email vrf@chain.link")
  } else if (network.startsWith('localhost')) {
    await deployer.deploy(BlootElvesNFT)
    let dnd = await BlootElvesNFT.deployed()
  } else {
    console.log("Right now only rinkeby works! Please change your network to Rinkeby")
  }
}
