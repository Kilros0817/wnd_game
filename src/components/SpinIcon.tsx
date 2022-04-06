import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const SpinIcon = () => {
  const loadingIcon = <SyncOutlined style={{ fontSize: 30 }} spin />;

  return <Spin indicator={loadingIcon} />;
};

export default SpinIcon;
