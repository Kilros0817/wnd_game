import { FC } from 'react';
import { Layout } from 'antd';
import Footer from './Footer';
import Navbar from './Navbar';
import WalletModal from '../WalletModal/WalletModal';
import { AccountInfo } from '../AccountInfo';
import styled from 'styled-components';
import background from '../../assets/images/background.png';

const MainLayout: FC = ({ children }) => {
  return (
    <>
      <StyledLayout>
        <Navbar />
        {/* Some component need a fullscreen mode */}
        <main>{children}</main>
        <Footer />
      </StyledLayout>
      <WalletModal />
      <AccountInfo />
    </>
  );
};

const StyledLayout = styled(Layout)`
  background-image: url(${background});
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  main {
    min-height:80vh;
  }
`;

export default MainLayout;
