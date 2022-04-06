import { memo } from 'react';
import styles from './styles.module.css';

import { Button, message, Modal } from 'antd';
import { Typography, Text } from '../../../../components/Typography';
import styled from 'styled-components';

const SacrificeWizardModal = ({
  open,
  toggleOpen,
  tokenWizards,
  handleSelectWizard,
  selectedWizard,
  handleSacrifice,
  mintCost,
  wizardsLeftToSacrifice,
  resetSelectWizard
}: any) => {
  const decode = (tokenURI: string) => JSON.parse(atob(tokenURI))?.image;

  return (
    <Modal
      className={styles.root}
      visible={open}
      title={
        <Typography className="" $size="14px">
          SACRIFICE WIZARD
        </Typography>
      }
      footer={null}
      centered
      width={500}
      onCancel={() => {
        resetSelectWizard();
        toggleOpen();
      }}
    >
      <TokenContainer>
        {tokenWizards.map((item: any) => (
          <TokenWrapper
            key={item.id}
            onClick={() => handleSelectWizard(item.id)}
            className={selectedWizard.includes(item.id) ? 'selected' : ''}
          >
            <TokenImage src={decode(item.tokenURI)} alt="image" />
          </TokenWrapper>
        ))}
      </TokenContainer>
      <StyledButton
        type="primary"
        onClick={() => {
          if (wizardsLeftToSacrifice === 0) message.error('Nothing left');
          else if (selectedWizard.length === 0) message.error('Please select your NFTs to Sacrifice');
          else handleSacrifice();
        }}
      >
        SACRIFICE
      </StyledButton>
      <Typography className="shadow primary center" m="20px 0" $size="12px">
        SACRIFICE COST :{' '}
        <Text className="shadow" m="20px 0" $size="12px">
          {mintCost * 3} GP{' '}
        </Text>
      </Typography>
      <Typography className="shadow primary center" m="20px 0" $size="12px">
        ITEMS LEFT :{' '}
        <Text className="shadow" m="20px 0" $size="12px">
          {wizardsLeftToSacrifice}
        </Text>
      </Typography>
    </Modal>
  );
};

const TokenContainer = styled.div`
  max-height: 300px;
  overflow: auto;
  flex-wrap: wrap;
  width: 80%;
  margin: 10px auto 0;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #3f3f3f;
    height: 50px;
  }

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #6f1d1b;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fcfbb7;
    border-radius: 10px;
    height: 50px;
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
  &.selected {
    border: 2px solid #cc302d;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
`;

const TokenImage = styled.img`
  width: 35px;
  height: 35px;
`;

const StyledButton = styled(Button)`
  width: 200px;
  display: block;
  margin: 30px auto 0;
`;

export default memo(SacrificeWizardModal);
