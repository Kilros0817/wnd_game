import styled from 'styled-components';
import { Typography } from '../../../components/Typography';

import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import dragon from '../../../assets/images/big-wizard.887bff21.svg';
import background from '../../../assets/images/minting-bg.b1a947af.png';

const StakingSection = () => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <BalanceContainer xs={24} md={8}>
            <Typography className="shadow responsiveTitle" m="30px 0 20px">
              The danger of attack is imminent.
            </Typography>
            <Typography className="shadow responsiveTitle" m="30px 0 20px">
            The Tower needs to be defended. 
            </Typography>
          </BalanceContainer>
          <Col xs={24} md={8}>
            <LargeText className="shadow primary center" m="0 0 5px" $size="36px">
              Welcome!
            </LargeText>
            <DragonImg src={dragon} alt="dragon" />
            <Typography className="mediumText" m="10px 0 0"></Typography>
          </Col>
          <UnStakedContainer xs={24} md={8}>
            <Typography className="shadow responsiveTitle" m="30px 0 20px">
              Recruit unique Wizards and Dragons to the fight.
            </Typography>
            <Typography className="shadow responsiveTitle" m="30px 0 20px">
            Earn $GP as your champions battle!
            </Typography>
          </UnStakedContainer>
        </Row>
        <Typography className="primary shadow center responsiveTitle" m="20px auto">
          Use $GP EXCLUSIVELY to add to your force.
        </Typography>
        <Link to="/game">
          <BeginButton type="primary">LETS BEGIN!</BeginButton>
        </Link>
      </Container>
    </Wrapper>
  );
};

const BeginButton = styled(Button)`
  width: 250px;
  display: block;
  margin: 20px auto;
  @media (max-width: 400px) {
    width: auto;
    font-size: 11px;
  }
`;

const DragonImg = styled.img`
  margin-top: 25px;
`;

const Container = styled.div`
  background-image: url(${background});
  min-height: 230px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  border: 4px solid #e5e5e5;
  padding: 25px 0 5px;
  .ant-col {
    text-align: center;
  }
  @media (max-width: 768px) {
    .responsiveTitle {
      font-size: 12px;
    }
  }
`;

const Wrapper = styled.div`
  border: 4px solid #e5e5e5;
  padding: 12px;
  width: 90%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LargeText = styled(Typography)`
  font-size: 36px;
  line-height: 24px;
  @media (max-width: 1420px) {
    font-size: 28px;
  }
  @media (max-width: 900px) {
    font-size: 24px;
  }
  @media (max-width: 768px) {
    text-align: center !important;
    font-size: 20px;
  }
`;

const BalanceContainer = styled(Col)`
  text-align: left !important;
  padding-left: 30px;
  @media (max-width: 768px) {
    text-align: center !important;
    margin-bottom: 20px;
  }
`;

const UnStakedContainer = styled(Col)`
  text-align: left !important;
  padding-left: 30px;
  @media (max-width: 768px) {
    text-align: center !important;
    margin-bottom: 20px;
  }
`;

export default StakingSection;
