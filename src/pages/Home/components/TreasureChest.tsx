import { Typography } from '../../../components/Typography';
import { Button, message } from 'antd';
import styled from 'styled-components';
import treasure from '../../../assets/images/treasure.png';

const TreasureChest = ({ balanceOfTokenUser, handleMakeTreasure, buttonDisabled, isGamePaused }: any) => {
  return (
    <Container>
      <Typography $size="24px" className="shadow center">
        TREASURE CHEST
      </Typography>
      <Typography $size="14px" className="primary center shadow" m="10px 0 0">
        BRIBE DRAGONS WITH YOUR CHEST TO STOP THEM STEALING YOUR MINTS!
      </Typography>
      <img src={treasure} alt="treasure" />
      <StyledButton
        type="primary"
        // disabled={balanceOfTokenUser < 25000 || buttonDisabled || isGamePaused}
        onClick={() => {
          // if (true) {
          //   message.error('Coming soon');
          //   return;
          // }
          if (balanceOfTokenUser < 25000) message.error('Not enough $GP');
          else if (buttonDisabled) message.error('Fetching data');
          else if (isGamePaused) message.error('Game is paused');
          else handleMakeTreasure();
        }}
      >
        DEPOSIT 25K $GP
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  margin-top:36px;
  img {
    margin-top: 20px;
  }
`;

const StyledButton = styled(Button)`
  background-color: #fed012;
  &:hover,
  &:active,
  &:focus {
    background-color: #bb9603;
  }
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  min-width:210px;
`;

export default TreasureChest;
