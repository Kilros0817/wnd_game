/* eslint-disable no-underscore-dangle */
export const __prod__ = process.env.NODE_ENV === 'production';

export const CONTRACT_ADDRESS = process.env.REACT_APP_SC_ADDRESS || '0xf7933fb707e79256aB449D53F8bF86561cCc4dFD';

export const NETWORK_CHAIN_IDS = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  localhost: 1337,
};

export const INFURA_ID = '0dfacdfb826644cda2ee5d402d8cfef8';

// TEST NET
  // export const INFURA_ENDPOINT = 'https://rinkeby.infura.io/v3/0dfacdfb826644cda2ee5d402d8cfef8';
  // export const WND_CONTRACT = '0x0866085387B4bF299C6A7D8ed60b8c9ECFD96d03';
  // export const WND_GAME_CONTRACT = '0x0370f21A69E3924fe8Ff13aF4bFbD0C9f9d0374D';
  // export const TOWER_CONTRACT = '0x64061548da943851C5105F43BB125D9eF9d98929';
  // export const GP_TOKEN_CONTRACt = '0x55da4cD56d878F0Bf3fDE51fe6Ec5ea7740e0526';

//TESTNET OLD
// export const INFURA_ENDPOINT = 'https://rinkeby.infura.io/v3/0dfacdfb826644cda2ee5d402d8cfef8';
// export const WND_CONTRACT = '0xe484B4b733Aa3BFB001831A39e401ed496C9EDAa';
// export const WND_GAME_CONTRACT = '0xBd870aEa1e934A00098E4D1ab92FB05300dbc890';
// export const TOWER_CONTRACT = '0x7763b02ef41ef79a013b2d6ce35741821f737d35';
// export const GP_TOKEN_CONTRACt = '0xb30a957a90D5B5E2C4dDb8fF8783F0e751e5c72a';
// MAIN NET

export const INFURA_ENDPOINT = 'https://mainnet.infura.io/v3/0dfacdfb826644cda2ee5d402d8cfef8';
export const WND_CONTRACT = '0x999e88075692bCeE3dBC07e7E64cD32f39A1D3ab';
export const WND_GAME_CONTRACT = '0x1C5194668FaAb6a895b1febBF3dc219077cDd732';

export const TOWER_CONTRACT = '0xF042A49FB03cb9D98CbA9DEf8711CEE85dC72281';
export const GP_TOKEN_CONTRACt = '0x38Ec27c6F05a169e7eD03132bcA7d0cfeE93C2C5';
export const ALTER_CONTRACT = '0xFa1A07056C48DCbA4B5E9e71aACC6aa791A93929';

export const APPROVE_AMOUNT = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )
export const MIN_PRICE = 0.088;
export const MAX_PRICE = 0.42069;
export const PRICE_DECEREMENT_AMOUNT = 0.01;
