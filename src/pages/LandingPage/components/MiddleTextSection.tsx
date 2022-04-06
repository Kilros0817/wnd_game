import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import sword from '../../../assets/images/sword.png';
import purple from '../../../assets/images/purple-dragon.e27b926b.png';
import blue from '../../../assets/images/blue-dragon.f0475544.png';

const MiddleTextSection = () => {
  return (
    <Container>
      <img src={sword} alt="sword" className="sword" />
      <PurpleDragon src={purple} alt="purple" />
      <BlueDragon src={blue} alt="blue" />

      <Typography className="primary shadow title">A GAME OF</Typography>
      <Typography className="shadow underline title">WIZARDS AND DRAGONS</Typography>
    </Container>
  );
};

const PurpleDragon = styled.img`
  position: absolute;
  left: 0;
  @media (max-width: 1024px) {
    width: 120px;
  }
  @media (max-width: 768px) {
    width: 80px;
    top: -50px;
  }
`;

const BlueDragon = styled.img`
  position: absolute;
  right: 0;
  @media (max-width: 1024px) {
    width: 120px;
  }
  @media (max-width: 768px) {
    width: 80px;
    top: -50px;
  }
`;


const Container = styled.div`
  text-align: center;
  position: relative;
  margin: 100px 0 50px;
  @media (max-width: 640px) {
    margin-top: 130px;
  }
  .title {
    font-size: 43px;
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
      font-size: 22px;
    }
  }
  .sword {
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
