import styled from 'styled-components';
import { Typography, Text } from '../../../components/Typography';

import { Row, Col, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import SpinIcon from '../../../components/SpinIcon';
import dragon from '../../../assets/images/dragon1.69a2a5fd.svg';
import background from '../../../assets/images/minting-bg.b1a947af.png';

const StakingSection = ({
  balanceOfTokenUser,
  tokenDragons,
  tokenWizards,
  depositDragons,
  depositWizards,
  handleUnStake,
  handleStake,
  unclaimedGP,
  buttonDisabled,
}: any) => {
  useEffect(() => {
    document.addEventListener('click', () => setOpenContextMenu(0));
  }, []);
  const decode = (tokenURI: string) => JSON.parse(atob(tokenURI))?.image;

  const [selectedStake, setSelectedStake] = useState<string[]>([]);
  const [selectedUnStake, setSelectedUnStake] = useState<string[]>([]);
  const [openContextMenu, setOpenContextMenu] = useState(0);
  const guardingToken = [...depositDragons, ...depositWizards].filter((item) => item.isGuarding).map((item) => item.id);
  const handleSelectStake = (tokenId: string) => {
    if (selectedStake.includes(tokenId)) setSelectedStake(selectedStake.filter((item) => item !== tokenId));
    else setSelectedStake([...selectedStake, tokenId]);
  };

  const handleSelectUnStake = (tokenId: string) => {
    if (selectedUnStake.includes(tokenId)) setSelectedUnStake(selectedUnStake.filter((item) => item !== tokenId));
    else setSelectedUnStake([...selectedUnStake, tokenId]);
  };

  const isSelectingGuardToken = guardingToken.some((item) => selectedUnStake.includes(item));
  return (
    <Wrapper>
      <Container>
        <Row>
          <BalanceContainer xs={24} lg={8}>
            <LargeText className="shadow underline center" m="25px 0 20px 0">
              UNSTAKED
            </LargeText>
            {buttonDisabled ? (
              <div>
                <SpinIcon />
              </div>
            ) : (
              <>
                <Typography className="primary  shadow">WIZARDS GUILD :</Typography>

                <TokenContainer>
                  {tokenWizards.map((item: any) => (
                    <TokenWrapper
                      key={item.id}
                      onClick={() => handleSelectStake(item.id)}
                      className={selectedStake.includes(item.id) ? 'selected' : ''}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        setOpenContextMenu(item.id);
                      }}
                    >
                      {openContextMenu === item.id && (
                        <ContextContainer>
                          <a
                            href={`https://opensea.io/assets/0x999e88075692bcee3dbc07e7e64cd32f39a1d3ab/${item.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View on OpenSea
                          </a>
                        </ContextContainer>
                      )}
                      <TokenImage src={decode(item.tokenURI)} alt="image" />
                    </TokenWrapper>
                  ))}
                </TokenContainer>
                <Typography className="primary  shadow" m="20px 0 0 0">
                  DRAGONS LAIR :
                </Typography>
                <TokenContainer>
                  {tokenDragons.map((item: any) => (
                    <TokenWrapper
                      key={item.id}
                      onClick={() => handleSelectStake(item.id)}
                      className={selectedStake.includes(item.id) ? 'selected' : ''}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        setOpenContextMenu(item.id);
                      }}
                    >
                      {openContextMenu === item.id && (
                        <ContextContainer>
                          <a
                            href={`https://opensea.io/assets/0x999e88075692bcee3dbc07e7e64cd32f39a1d3ab/${item.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View on OpenSea
                          </a>
                        </ContextContainer>
                      )}
                      <TokenImage src={decode(item.tokenURI)} alt="image" />
                    </TokenWrapper>
                  ))}
                </TokenContainer>
              </>
            )}

            <StakeButton
              type="primary"
              // disabled={!selectedStake.length || buttonDisabled}

              onClick={() => {
                if (!selectedStake.length) message.error('Please select your NFTs to Stake');
                else if (buttonDisabled) message.error('Fetching data');
                else handleStake(selectedStake, () => setSelectedStake([]));
              }}
            >
              STAKE AND GUARD!
            </StakeButton>

            {/* <Typography className="primary shadow" m="20px 0 10px 0" $size="11px">
              Click NFT to Stake, UnStake */}
            {/* </Typography> */}
          </BalanceContainer>
          <Col xs={24} lg={8}>
            <LargeText className="shadow primary" m="0 0 5px">
              GUARD THE TOWER
            </LargeText>
            <Typography className="primary shadow">(STAKE) TO EARN $GP</Typography>
            <DragonImg src={dragon} alt="dragon" />
            <Typography className="mediumText" m="10px 0 0">
              Balance : <Text className="primary mediumText"> {balanceOfTokenUser.toFixed(2)}$GP</Text>
            </Typography>
          </Col>
          <UnStakedContainer xs={24} lg={8}>
            <LargeText className="shadow underline" m="20px 0 20px">
              STAKED
            </LargeText>
            {buttonDisabled ? (
              <SpinIcon />
            ) : (
              <>
                <Typography className="primary shadow center" m="20px 0 20px 0">
                  GUARDING THE TOWER :
                </Typography>
                <TokenContainer>
                  {[...depositDragons, ...depositWizards].map((item: any) => (
                    <TokenWrapper
                      key={item.id}
                      onClick={() => handleSelectUnStake(item.id)}
                      className={selectedUnStake.includes(item.id) ? 'selected' : ''}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        setOpenContextMenu(item.id);
                      }}
                    >
                      {openContextMenu === item.id && (
                        <ContextContainer>
                          <a
                            href={`https://opensea.io/assets/0x999e88075692bcee3dbc07e7e64cd32f39a1d3ab/${item.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View on OpenSea
                          </a>
                        </ContextContainer>
                      )}
                      <TokenImage src={decode(item.tokenURI)} alt="image" />
                      <TokenValue>{item?.owed?.toFixed(2)}</TokenValue>
                    </TokenWrapper>
                  ))}
                </TokenContainer>
              </>
            )}

            <Error style={{ visibility: isSelectingGuardToken ? 'visible' : 'hidden' }}>
              You can only unstake a Wizard if it has at least 2 days worth of $GP.
            </Error>
            <ClaimContainer>
              <>
                <ClaimButton
                  type="primary"
                  // disabled={!selectedUnStake.length || buttonDisabled}

                  onClick={() => {
                    if (!selectedUnStake.length) message.error('Please select your NFTs to claim rewards');
                    else if (buttonDisabled) message.error('Fetching data');
                    else handleUnStake(selectedUnStake, false, () => setSelectedUnStake([]));
                  }}
                >
                  CLAIM $GP!
                </ClaimButton>
                <ClaimButton
                  type="primary"
                  // disabled={!selectedUnStake.length || isSelectingGuardToken || buttonDisabled}

                  onClick={() => {
                    if (!selectedUnStake.length) message.error('Please select your NFTs to claim rewards');
                    // else if (isSelectingGuardToken) message.error('You are selecting guarding token');
                    else if (buttonDisabled) message.error('Fetching data');
                    else handleUnStake(selectedUnStake, true, () => setSelectedUnStake([]));
                  }}
                >
                  <div> CLAIM $GP </div>
                  <div style={{ marginTop: 10 }}> AND UNSTAKE!</div>
                </ClaimButton>
              </>

              <Typography className="center shadow" m="10px 0" $size="14px">
                UNCLAIMED :
                <Text className="primary block shadow" m="10px 0" $size="14px">
                  {unclaimedGP.toFixed(2)} $GP
                </Text>
              </Typography>
            </ClaimContainer>
          </UnStakedContainer>
        </Row>
        <Remind>
          <Col xs={24} lg={8}>
            <Typography className="center primary shadow" m="10px 0" $size="10px">
              Select your NFTs to Stake
            </Typography>
          </Col>
          <Col xs={24} lg={8}></Col>
          <Col xs={24} lg={8}>
            <Typography className="center primary shadow" m="10px 0" $size="10px">
              Select your NFTs to claim rewards
            </Typography>
          </Col>
        </Remind>
      </Container>
    </Wrapper>
  );
};

const Remind = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 600px) {
    display: block;
  }
`;

const Error = styled(Typography)`
  color: #cecc52;
  font-size: 10px;
  margin-top: 30px;
`;

const TokenContainer = styled.div`
  max-height: 300px;
  overflow: auto;
  flex-wrap: wrap;
  margin-top: 10px;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #3f3f3f;
    height: 50px;
  }

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #6f1d1b;
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fcfbb7;
    border-radius: 10px;
    height: 50px;
  }
`;

const ClaimContainer = styled.div`
  margin-top: 0;
  @media (max-width: 480px) {
    .block {
      display: block;
    }
  }
`;

const ClaimButton = styled(Button)`
  width: 340px;
  margin: 0 auto 20px;
  height: auto;
  display: block;
  @media (max-width: 1280px) {
    width: auto;
    font-size: 10px;
  }
  @media (max-width: 450px) {
    width: 180px;
    font-size: 10px;
    padding-left: 5px;
    padding-right: 5px;
    margin: 10px auto;
  }
`;
const StakeButton = styled(Button)`
  width: 340px;
  margin: 20px 0;
  @media (max-width: 1280px) {
    width: auto;
    font-size: 10px;
  }
  @media (max-width: 450px) {
    width: auto;
    font-size: 10px;
  }
`;

const TokenWrapper = styled.div`
  border: 2px solid #e6e6e686;
  border-radius: 5px;
  display: inline-block;
  padding: 2px 4px;
  text-align: center;
  margin: 5px;
  cursor: pointer;
  width: 100px;
  position: relative;
  &.selected {
    border: 2px solid #cc302d;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
`;

const TokenImage = styled.img`
  width: 35px;
  height: 35px;
`;

const TokenValue = styled(Typography)`
  /* color: #ce2624e6; */
  font-size: 9px;
`;
const DragonImg = styled.img`
  margin-top: 35px;
  margin-bottom: 15px;
`;

const Container = styled.div`
  background-image: url(${background});
  min-height: 230px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  border: 4px solid #e5e5e5;
  padding: 15px 0 5px;
  .ant-col {
    text-align: center;
  }
`;

const Wrapper = styled.div`
  border: 4px solid #e5e5e5;
  padding: 12px;
  margin-bottom: 50px;
`;

const LargeText = styled(Typography)`
  font-size: 24px;
  line-height: 24px;
  @media (max-width: 768px) {
    text-align: center !important;
    font-size: 20px;
  }
`;

const BalanceContainer = styled(Col)`
  /* text-align: left !important; */
  /* padding-left: 30px; */
  @media (max-width: 768px) {
    text-align: center !important;
    margin-bottom: 20px;
    padding-left: 0 !important;
  }
`;

const UnStakedContainer = styled(Col)`
  /* text-align: left !important; */
  /* padding-left: 30px; */
  @media (max-width: 768px) {
    text-align: center !important;
    margin-bottom: 20px;
    padding-left: 0 !important;
  }
`;

const ContextContainer = styled.div`
  background: #cfcfcf;
  position: absolute;
  font-size: 8px;
  font-weight: bold;
  left: 0;
  // height: 100%;
  width: 130px;
  padding: 5px 0;
  border-radius: 5px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border: 2px solid #cfcfcf;
  box-shadow: rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px;
  img {
    width: 15px;
    margin-left: 7px;
  }
  a {
    display: flex;
    align-items: center;
  }
`;

export default StakingSection;
