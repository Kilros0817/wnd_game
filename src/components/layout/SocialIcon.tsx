import React from 'react';

import { Button } from 'antd';
import styled from 'styled-components';
import twitter from '../../assets/images/twitter.svg';
import Etherscan from '../../assets/images/etherscan.svg';
import Discord from '../../assets/images/discord.svg';
import Opensea from '../../assets/images/opensea.svg';

const SocialIcon = () => {
  return (
    <IconContainer>
      <a href="https://twitter.com/wndgame" target="_blank" rel="noreferrer">
        <IconButton shape="circle" icon={<img src={twitter} alt="twitter" />} />
      </a>
      <a href="https://etherscan.io/address/0x999e88075692bCeE3dBC07e7E64cD32f39A1D3ab" target="_blank" rel="noreferrer">
        <IconButton shape="circle" icon={<img src={Etherscan} alt="Etherscan" />} />
      </a>
      <a href="https://discord.com/invite/wnd" target="_blank" rel="noreferrer">
        <IconButton shape="circle" icon={<img src={Discord} alt="Discord" />} />
      </a>

      <a href="https://opensea.io/collection/wizards-dragons-game-v2" target="_blank" rel="noreferrer">
        <IconButton shape="circle" icon={<img src={Opensea} alt="Opensea" />} />
      </a>
    </IconContainer>
  );
};

export default SocialIcon;

const IconButton = styled(Button)`
  color: #fff;
  border: 1px solid #6f1c1b;
  min-width: 32px;
  background: #6f1c1b;
  margin: 0 3px;
`;

const IconContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 50px;
  @media (max-width: 768px) {
    padding: 0;
    text-align: center;
  }
`;
