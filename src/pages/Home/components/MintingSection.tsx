import { useState } from 'react';
import styled from 'styled-components';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { Button, message } from 'antd';
import { Typography, Text } from '../../../components/Typography';
import chemy from '../../../assets/images/chemy.png';
import background from '../../../assets/images/staking-bg.d1d2a566.png';

const MintingSection = ({
  minted,
  mintCost,
  handleMint,
  maxToken,
  buttonDisabled,
  isGamePaused,
  hasMintPending,
  handleClaimMint,
  canMint,
}: any) => {
  const percentage = (minted / 60000) * 100;
  const [amount, setAmount] = useState(1);

  const decrease = () => {
    if (amount === 1) {
      return;
    }
    setAmount(amount - 1);
  };
  const increase = () => {
    if (amount === 10) {
      return;
    }
    if (!(minted + amount < maxToken)) {
      message.error('All tokens on-sale already sold');
      return;
    }
    setAmount(amount + 1);
  };

  return (
    <Wrapper>
      <Container>
        <LargeText className="shadow underline center">ALCHEMY</LargeText>
        <Typography className="primary center shadow" $size="10px" m="10px 0">
          {hasMintPending
            ? 'You will need to wait 5 minutes or more to claim mint'
            : 'Your valuable gold pieces may now be placed onto the transmutation table'}
        </Typography>
        <Typography className="secondary center shadow">{minted}/60000 Minted</Typography>
        <WizardImg src={chemy} alt="dragon" />
        <Percentage percentage={percentage}>
          <First>GEN-0</First>
          <Second>24K $GP </Second>
          <Third>36K $GP </Third>
          <Fourth>48K $GP </Fourth>
          <Fifth>60K $GP</Fifth>
          <Sixth>72K $GP</Sixth>
        </Percentage>
        <NumberInput>
          <MinusCircleOutlined onClick={decrease} />
          <Typography className="primary shadow">{amount}</Typography>
          <PlusCircleOutlined onClick={increase} />
        </NumberInput>
        <MintRow>
          <MintButtonContainer>
            {hasMintPending ? (
              <MintButton
                type="primary"
                onClick={() => {
                  // if (minted < paidTokens) message.error('Not enough minted');
                  // else

                  if (buttonDisabled) message.error('Fetching data');
                  else if (isGamePaused) message.error('Game is paused');
                  else if (!canMint) message.error('Your mint is not ready');
                  else handleClaimMint();
                }}
              >
                CLAIM MINT
              </MintButton>
            ) : (
              <>
                {' '}
                <MintButton
                  type="primary"
                  // disabled={minted < paidTokens || buttonDisabled || isGamePaused}
                  onClick={() => {
                    // if (minted < paidTokens) message.error('Not enough minted');
                    // else
                    if (buttonDisabled) message.error('Fetching data');
                    else if (isGamePaused) message.error('Game is paused');
                    else handleMint(amount, false);
                  }}
                >
                  MINT NOW!
                </MintButton>
                <MintButton
                  type="primary"
                  // disabled={minted < paidTokens || buttonDisabled || isGamePaused}
                  onClick={() => {
                    // if (minted < paidTokens) message.error('Not enough minted');
                    // else
                    if (buttonDisabled) message.error('Fetching data');
                    else if (isGamePaused) message.error('Game is paused');
                    else handleMint(amount, true);
                  }}
                >
                  MINT & STAKE!
                </MintButton>
              </>
            )}
          </MintButtonContainer>
        </MintRow>
        <div>
          <Typography className="primary shadow center" m="0 0 10px">
            Price : <Text>{mintCost} $GP</Text>
          </Typography>
        </div>
        <Description className="center shadow">Non-Gen 0 Characters can only be minted with $GP</Description>
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  border: 4px solid #e5e5e5;
  padding: 15px 30px;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    text-align: center;
  }
  .ant-col {
    text-align: center;
  }
`;

const MintRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 20px;
  @media (max-width: 480px) {
    display: block;
    text-align: center;
  }
`;

const Wrapper = styled.div`
  border: 4px solid #e5e5e5;
  padding: 12px;
  position: relative;
  &.ant-col-md-12 {
    flex: 0 0 49%;
  }
  @media (max-width: 800px) {
    &.ant-col-md-12 {
      flex: 0 0 100%;
    }
  }
`;

const LargeText = styled(Typography)`
  font-size: 24px;
  line-height: 24px;
  margin: 0 0 20px;
`;

const WizardImg = styled.img`
  position: absolute;
  top: -30px;
  left: -20px;
  @media (max-width: 800px) {
    position: static;
  }
`;


const Percentage = styled.div<{ percentage: number }>`
  border: 4px solid white;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  display: flex;
  position: relative;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    background: #6f1d1bc7;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${(p: any) => p.percentage}%;
  }
`;

const First = styled.div`
  width: 25%;
  border-right: 4px solid white;
  height: 32px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  &.active {
    background: #6f1d1bc7;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;
const Second = styled.div`
  width: 15%;
  border-right: 4px solid white;
  height: 32px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  &.active {
    background: #6f1d1bc7;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;
const Third = styled.div`
  width: 15%;
  border-right: 4px solid white;
  height: 32px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  &.active {
    background: #6f1d1bc7;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;
const Fourth = styled.div`
  width: 15%;
  border-right: 4px solid white;
  height: 32px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  &.active {
    background: #6f1d1bc7;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const Fifth = styled.div`
  width: 15%;
  border-right: 4px solid white;
  height: 32px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  &.active {
    background: #6f1d1bc7;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const Sixth = styled.div`
  width: 15%;
  border-right: 4px solid white;
  height: 32px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  text-align: center;
  &.active {
    background: #6f1d1bc7;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const NumberInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-typography {
    font-size: 28px;
    margin: 0 20px;
  }
  .anticon {
    font-size: 20px;
    user-select: none;
  }
`;

const MintButton = styled(Button)`
  width: 240px;
  display: block;
  margin-left: 20px;

  @media (max-width: 1280px) {
    width: auto;
    font-size: 10px;
  }
  @media (max-width: 1024px) {
    margin: 10px auto;
    width: auto;
    text-align: center;
  }

  @media (max-width: 450px) {
    width: auto;
    font-size: 10px;
  }
`;

const Description = styled(Typography)`
  color: #c4c4c4;
  font-size: 11px;
`;

const MintButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  @media (max-width: 1024px) {
    display: block;
    text-align: center;
    margin-left: 20px;
  }
`;
export default MintingSection;
