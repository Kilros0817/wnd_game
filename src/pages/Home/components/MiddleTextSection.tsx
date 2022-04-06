import { Button, Collapse } from 'antd';
import styled from 'styled-components';
import { Typography, Text } from '../../../components/Typography';
import { Link } from 'react-router-dom';
import { useWalletModal } from '../../../hooks/useWalletModal';
import { useWallet } from '../../../hooks/useWallet';
import sword from '../../../assets/images/sword.png';
import background from '../../../assets/images/modal-bg.png';

const { Panel } = Collapse;

const MiddleTextSection = ({ minted, paidTokens, isStaking }: any) => {
  const { toggleOpen } = useWalletModal();
  const { active } = useWallet();
  return (
    <Container>
      <img src={sword} alt="sword" />
      <Typography className="primary shadow title">A GAME OF</Typography>
      <Typography className="shadow underline title">WIZARDS AND DRAGONS</Typography>
      {active ? (
        <>
          <StyledLink to={'/minting'}>

          </StyledLink>
          {isStaking && <Guarding className='shadow'>* You are guarding the Tower *</Guarding>}
          <KeyPointContainer>
            <Collapse
              bordered={false}
              className="site-collapse-custom-collapse"
            >
              <Panel header={<Typography className="shadow underline"  >
                KEY POINTS
              </Typography>} key="1" className="site-collapse-custom-panel">
                <Typography className="shadow left" $size="10px" m="10px 0 ">
                  Guard the tower by staking your NFTs to earn $GP
                </Typography>
                <Typography className="shadow left" $size="10px" m="10px 0 ">
                  20% Tax on all claimed $GP is paid to dragons
                </Typography>
                <Typography className="shadow left" $size="10px" m="10px 0 ">
                  $GP can be used to mint more wizards and dragons
                </Typography>
                <Typography className="shadow left" $size="10px" m="10px 0 0 ">
                  Dragons can steal mints
                </Typography>
              </Panel>
            </Collapse>

          </KeyPointContainer>
        </>
      ) : (
        <ConnectButton type="primary" onClick={toggleOpen}>
          Connect Wallet
        </ConnectButton>
      )}
    </Container>
  );
};

const Guarding = styled(Typography)`
  margin :20px 0;
  font-size:22px;
  color :red;
  text-transform:uppercase;
  @media (max-width: 1368px) {
      font-size: 20px;
    }
    @media (max-width: 1100px) {
      font-size: 16px;
    }
`

const StyledLink = styled(Link)`
  color: #fcfbb7 !important;
`;

const ConnectButton = styled(Button)`
  width: 250px;
  display: block;
  margin: 20px auto;
  background-color: #6f1d1b;
`;

const KeyPointContainer = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  width: 240px;
  position: absolute;
  right: 0;
  top: -80px;
  overflow:hidden;
  border: 4px solid #e5e5e5;
  .ant-collapse-arrow {
    display:none!important;
  }
  @media (max-width: 1280px) {
    width: 200px;
    .left {
      font-size: 9px;
    }
  }
  @media (max-width: 1024px) {
    position: static;
    margin: 20px auto;
    width: 280px;
    height: auto;
    .left {
      font-size: 12px;
    }
  }
`;

const Container = styled.div`
  text-align: center;
  position: relative;
  margin: 100px 0 80px;
  min-height: 200px;
  @media (max-width: 640px) {
    margin-top: 130px;
  }
  .title {
    font-size: 40px;
    position: relative;
    z-index: 2;
    text-shadow: -4px 4px 4px rgba(0, 0, 0, 0.75);
    @media (max-width: 1368px) {
      font-size: 36px;
    }
    @media (max-width: 1280px) {
      font-size: 30px;
    }
    @media (max-width: 1100px) {
      font-size: 26px;
    }

    @media (max-width: 768px) {
      text-align: center !important;
      font-size: 36px;
    }
  }
  img {
    position: absolute;
    top: -88px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
  }
`;


export default MiddleTextSection;
