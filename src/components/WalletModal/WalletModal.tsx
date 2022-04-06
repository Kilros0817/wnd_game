import { FC, memo } from 'react';
import styles from './styles.module.css';

import { Modal } from 'antd';

import { useWallet } from '../../hooks/useWallet';
import { useWalletModal } from '../../hooks/useWalletModal';
import metamask from '../../assets/images/metamask.02e3ec27.png';
import walletconnect from '../../assets/images/walletConnectIcon.304e3277.svg';
import coinbase from '../../assets/images/coinbaseWalletIcon.a3a7d7fd.svg';

const WalletModal: FC = () => {
  const { connect } = useWallet();
  const { toggleOpen, open } = useWalletModal();

  const handleConnect = async (key: 'injected' | 'walletconnect' | 'walletlink') => {
    try {
      await connect(key);
      toggleOpen()
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <Modal
      className={styles.root}
      visible={open}
      title={<b>Connect a wallet</b>}
      footer={null}
      centered
      width={418}
      onCancel={toggleOpen}
    >
      <ul className={styles.menu}>
        <li onClick={() => handleConnect('injected')}>
          <p>MetaMask</p> <img src={metamask} alt="metamask" />
        </li>
        <li onClick={() => handleConnect('walletconnect')}>
          <p>WalletConnect</p> <img src={walletconnect} alt="walletconnect" />
        </li>
        <li onClick={() => handleConnect('walletlink')}>
          <p>Coinbase Wallet</p> <img src={coinbase} alt="coinbase" />
        </li>
      </ul>
    </Modal>
  );
};

export default memo(WalletModal);
