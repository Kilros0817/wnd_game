import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import TributeModal from './TributeModal/TributeModal'
import SacrificeWizardModal from './SacrificeWizardModal/SacrificeWizardModal';
import SacrificeDragonModal from './SacrificeDragonModal/SacrificeDragonModal';
import blood from '../../../assets/images/blood-sword.svg';
import background from '../../../assets/images/staking-bg.d1d2a566.png';

import { Row, Col, Button, message } from 'antd';
import { useState } from 'react';

const SacrificeSection = ({
  tokenWizards,
  tokenDragons,
  mintCost,
  balanceOfTokenUser,
  handleSacrifice,
  numDragonsBurned,
  numWizardsBurned,
  handleTribute,
  buttonDisabled,
  isGamePaused,
  dragonsLeftToSacrifice,
  wizardsLeftToSacrifice,
}: any) => {
  const [open, setOpen] = useState(false);
  const [openWizard, setOpenWizard] = useState(false);
  const [openDragon, setOpenDragon] = useState(false);

  const toggleOpen: any = () => setOpen(!open);
  const toggleOpenWizard: any = () => setOpenWizard(!openWizard);
  const toggleOpenDragon: any = () => setOpenDragon(!openDragon);

  const [selectedDragon, setSelectedDragon] = useState<string[]>([]);
  const handleSelectDragon = (tokenId: string) => {
    if (selectedDragon[0] === tokenId) setSelectedDragon([]);
    else setSelectedDragon([tokenId]);
  };

  const resetSelectDragon = () => setSelectedDragon([]);

  const [selectedWizard, setSelectedWizard] = useState<string[]>([]);
  const handleSelectWizard = (tokenId: string) => {
    if (selectedWizard[0] === tokenId) setSelectedWizard([]);
    else setSelectedWizard([tokenId]);
  };

  const resetSelectWizard = () => setSelectedWizard([]);

  return (
    <Wrapper>
      <Container>
        <Title>
          <DragonImg src={blood} alt="dragon" />
          <div>
            <Typography className="underline center shadow" m="0 0 0" $size="24px">
              SACRIFICE
            </Typography>
            <Typography className="primary shadow center" m="10px 0 0" $size="18px">
              Mysterious items spawned from the Sacrificial Alter of the Wizards & Dragons Tower
            </Typography>
          </div>
          <DragonImg src={blood} alt="dragon" />
        </Title>

        <Row>
          <TributeContainer xs={24} md={24}>
            <ActionContainer>
              <Col xs={24} md={12}>
                <SacrificeButton
                  type="primary"
                  // disabled={balanceOfTokenUser < mintCost || mintCost === 0 || buttonDisabled || isGamePaused}
                  onClick={() => {
                    // if (true) {
                    //   message.error('Coming soon');
                    //   return;
                    // }
                    if (balanceOfTokenUser < mintCost) message.error('Not enough $GP');
                    else if (mintCost === 0) message.error('Not started yet');
                    else if (buttonDisabled) message.error('Fetching data');
                    else if (isGamePaused) message.error('Game is paused');
                    else toggleOpen();
                  }}
                >
                  TRIBUTE $GP
                </SacrificeButton>
              </Col>
              <Col xs={24} md={12}>
                <Typography className="primary shadow center" $size="14px">
                  TRIBUTE PRICE : {mintCost.toFixed(2)}
                </Typography>
              </Col>
            </ActionContainer>
          </TributeContainer>
          <BalanceContainer xs={24} md={24}>
            <ActionContainer>
              <Col xs={24} md={12}>
                {' '}
                <SacrificeButton
                  type="primary"
                  // disabled={isDisabledWizard() || buttonDisabled || isGamePaused}
                  onClick={() => {
                    // if (true) {
                    //   message.error('Coming soon');
                    //   return;
                    // }

                    if (mintCost === 0) message.error('Not started yet');
                    else if (buttonDisabled) message.error('Fetching data');
                    else if (isGamePaused) message.error('Game is paused');
                    else toggleOpenWizard();
                  }}
                >
                  {' '}
                  SACRIFICE WIZARD
                </SacrificeButton>
              </Col>
              <Col xs={24} md={12}>
                {' '}
                <Typography className="primary shadow center" $size="14px">
                  WIZARDS SACRIFICED: {numWizardsBurned}
                </Typography>
              </Col>
            </ActionContainer>
          </BalanceContainer>
          <UnStakedContainer xs={24} md={24}>
            <ActionContainer>
              <Col xs={24} md={12}>
                <SacrificeButton
                  type="primary"
                  // disabled={isDisabledDragon() || buttonDisabled || isGamePaused}
                  onClick={() => {
                    // if (true) {
                    //   message.error('Coming soon');
                    //   return;
                    // }

                    if (mintCost === 0) message.error('Not started yet');
                    else if (buttonDisabled) message.error('Fetching data');
                    else if (isGamePaused) message.error('Game is paused');
                    else toggleOpenDragon();
                  }}
                >
                  SACRIFICE DRAGON
                </SacrificeButton>
              </Col>

              <Col xs={24} md={12}>
                <Typography className="primary shadow center" $size="14px">
                  DRAGONS SACRIFICED: {numDragonsBurned}
                </Typography>
              </Col>
            </ActionContainer>
          </UnStakedContainer>
        </Row>
      </Container>
      {open && (
        <TributeModal
          toggleOpen={toggleOpen}
          open={open}
          condition={balanceOfTokenUser < mintCost * 2}
          handleTribute={handleTribute}
          mintCost={mintCost}
        />
      )}
      {openWizard && (
        <SacrificeWizardModal
          toggleOpen={toggleOpenWizard}
          open={openWizard}
          tokenWizards={tokenWizards}
          handleSelectWizard={handleSelectWizard}
          selectedWizard={selectedWizard}
          handleSacrifice={() => handleSacrifice(selectedWizard[0], mintCost * 3)}
          mintCost={mintCost}
          wizardsLeftToSacrifice={wizardsLeftToSacrifice}
          resetSelectWizard={resetSelectWizard}
        />
      )}
      {openDragon && (
        <SacrificeDragonModal
          toggleOpen={toggleOpenDragon}
          open={openDragon}
          tokenDragons={tokenDragons}
          handleSelectDragon={handleSelectDragon}
          selectedDragon={selectedDragon}
          handleSacrifice={() => handleSacrifice(selectedDragon[0], mintCost * 4)}
          mintCost={mintCost}
          dragonsLeftToSacrifice={dragonsLeftToSacrifice}
          resetSelectDragon={resetSelectDragon}
        />
      )}
    </Wrapper>
  );
};

const Title = styled.div`
  display: flex;
  @media (max-width: 600px) {
    display: block;
    text-align: center;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-col {
    &:first-child {
      text-align: right;
    }
    &:last-child {
      text-align: left;
      .ant-typography {
        text-align: left;
        margin-left: 30px;
      }
    }
  }
  @media (max-width: 600px) {
    display: block;
    text-align: center;
    .ant-btn {
      margin-bottom: 10px;
    }
    .ant-col {
      text-align: center !important;
      .ant-typography {
        text-align: center !important;
        margin-left: 0 !important;
      }
    }
  }
`;

const DragonImg = styled.img`
  margin-top: 15px;
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
  margin-bottom: 20px;
`;

const BalanceContainer = styled(Col)`
  /* padding-left: 30px; */
  margin-bottom: 10px;
  @media (max-width: 768px) {
    text-align: center !important;
    margin-bottom: 20px;
    padding-left: 0;
  }
`;

const TributeContainer = styled(Col)`
  /* padding-left: 30px; */
  margin-bottom: 10px;
  @media (max-width: 768px) {
    text-align: center !important;
    margin-bottom: 20px;
    padding-left: 0;
  }
`;

const UnStakedContainer = styled(Col)`
  margin-bottom: 20px;
  @media (max-width: 768px) {
    text-align: center !important;
    margin-bottom: 20px;
    padding-left: 0;
    padding-right: 0;
  }
`;

const SacrificeButton = styled(Button)`
  width: 280px;
  color: white;
  margin-top: 10px;
  @media (max-width: 1280px) {
    font-size: 10px;
  }
  @media (max-width: 450px) {
    width: auto;
    font-size: 10px;
  }
`;

export default SacrificeSection;
