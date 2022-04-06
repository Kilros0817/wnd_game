import { memo } from 'react';
import styles from './styles.module.css';

import { Modal } from 'antd';
import {Typography} from "../Typography";

const WhatHappenModal = ({ open, whatHappen, toggleOpen }: any) => {
  return (
    <Modal
      className={styles.root}
      visible={open}
      title={
        <Typography className="" $size="16px">
          AND HERE'S WHAT HAPPENED...
        </Typography>
      }
      footer={null}
      centered
      width={500}
      onCancel={toggleOpen}
    >
      {whatHappen.map((item: any) => (
        <Typography className="shadow" m="20px 0 10px 0" $size="11px" key={item.message}>
          {item.message}
        </Typography>
      ))}
    </Modal>
  );
};

export default memo(WhatHappenModal);