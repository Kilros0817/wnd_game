import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import { injected, walletconnect, walletlink } from '../utils/connector';
import Web3 from 'web3';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { useEffect } from 'react';
import { message } from 'antd';

const handleError = (error: Error) => {
  if (error instanceof NoEthereumProviderError) {
    message.error(
      'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
    );
  } else if (error instanceof UnsupportedChainIdError) {
    message.error("You're connected to an unsupported network.");
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    message.error('Please authorize this website to access your Ethereum account.');
  } else if ((error as any).code === -32002) {
    message.error('Already processing ethereum request Accounts. Please accept the request.');
  } else {
    console.error(error.toString());
    message.error('An unknown error occurred. Check the console for more details.');
  }
};

export const useWallet = () => {
  const { activate, connector, ...props } = useWeb3React<Web3>();
  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum) {
      (async () => {
        try {
          const web3 = new Web3(ethereum.currentProvider || (window as any).web3.currentProvider);
          const accounts: Array<String> = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            await activate(injected, (error) => handleError(error));
          }
        } catch (err) {
          // Handle Error
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const connect = async (type: 'injected' | 'walletconnect' | 'walletlink') => {
    try {
      if (type === 'injected') {
        const { ethereum } = window as any;
        if (!ethereum) {
          return message.error(
            'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
          );
        }
        return await activate(injected, (error) => handleError(error));
      }

      if (type === 'walletconnect') {
        return await activate(walletconnect, (error) => handleError(error));
      }

      if (type === 'walletlink') {
        return await activate(walletlink, (error) => handleError(error));
      }
    } catch (err) {
      console.log('Connect wallet err', err);
    }
  };

  return { ...props, connector, connect };
};
