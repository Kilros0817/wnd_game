import { memo } from 'react';
import styles from './styles.module.css';

import { Button, Modal } from 'antd';
import { Typography, Text } from '../../../../components/Typography';
import styled from 'styled-components';

const TributeModal = ({ open, condition, toggleOpen, handleTribute, mintCost }: any) => {
  return (
    <Modal
      className={styles.root}
      visible={open}
      title={
        <Typography className="" $size="14px">
          TRIBUTE $GP
        </Typography>
      }
      footer={null}
      centered
      width={500}
      onCancel={toggleOpen}
    >
      <ButtonContainer>
        <Button type="primary" onClick={() => handleTribute(mintCost)}>
          TRIBUTE 1X
        </Button>
        <Button type="primary" disabled={condition} onClick={() => handleTribute(mintCost * 2)}>
          TRIBUTE 2X
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 10px;
  .ant-btn {
    margin: 0 10px;
  }
`;

export default memo(TributeModal);