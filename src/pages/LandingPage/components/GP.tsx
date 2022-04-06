import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import background from '../../../assets/images/staking-bg.d1d2a566.png';

const GP = () => {
  return (
    <Wrapper>
      <Container>
        <LargeText className="shadow underline center primary" m="10px 0">
          $GP
        </LargeText>
        <Typography className="shadow center" m="20px 0" $size="15px">
          The currency of the world.
        </Typography>
        <Description className="center shadow" m="20px 0" $size="15px">
          GP is the ONLY way to mint new guards for your tower
        </Description>
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
  text-align: center;
  @media (max-width: 768px) {
    text-align: center;
  }
  .ant-col {
    text-align: center;
  }
`;

const Wrapper = styled.div`
  border: 4px solid #e5e5e5;
  padding: 12px;
  position: relative;
  width: 100%;
  height: 100%;
`;

const LargeText = styled(Typography)`
  font-size: 24px;
  line-height: 24px;
  margin: 0 0 20px;
`;

const Description = styled(Typography)`
  font-size: 11px;
`;

export default GP;
