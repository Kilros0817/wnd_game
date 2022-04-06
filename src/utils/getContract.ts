import { ALTER_CONTRACT } from './constants';
/* eslint-disable import/prefer-default-export */
import Web3 from 'web3';

import contractWnD from '../contracts/WNDABI.json';
import contractWnDGame from '../contracts/WNDGameABI.json';
import contractTower from '../contracts/TowerABI.json';
import contractGPToken from '../contracts/GPABI.json';
import contractAlter from '../contracts/AlterABI.json';
import { WND_CONTRACT, WND_GAME_CONTRACT, TOWER_CONTRACT, GP_TOKEN_CONTRACt } from './constants';

export const getContractWnD = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractWnD.abi;

  const contractAddress = WND_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractWnDGame = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractWnDGame.abi;

  const contractAddress = WND_GAME_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractTower = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractTower.abi;

  const contractAddress = TOWER_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractGPToken = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractGPToken.abi;

  const contractAddress = GP_TOKEN_CONTRACt;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};

export const getContractAlter = async (connector: any) => {
  if (!connector) throw Error('No connector found');
  const walletProvider = await connector.getProvider();
  const web3 = new Web3(walletProvider);

  const contractAbi: any = contractAlter.abi;

  const contractAddress = ALTER_CONTRACT;

  return {
    contract: new web3.eth.Contract(contractAbi, contractAddress),
  };
};
