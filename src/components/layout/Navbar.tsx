import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined';
import {FC} from 'react';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {Text, Typography} from '../Typography';

const Navbar: FC = () => {
  const location = useLocation();

  return (
    <Header>
      <Typography $size="23px" className="primary shadow">
        ACT I
        <Text $size="23px" className="shadow">
          /II/III
        </Text>
      </Typography>
      {location.pathname === '/minting' && <Link to='/game'>
        <Typography m='30px 0' $size='16px' className='shadow primary'> <StyledIcon/> Back to Game
        </Typography>
      </Link>}

    </Header>
  );
};

export default Navbar;

const StyledIcon = styled(ArrowLeftOutlined)`
  font-size:24px;
`

const Header = styled.header`
  min-height: 64px;
  padding: 24px 50px;
  font-size: 14px;
  background: transparent;
  max-width: 1440px;
  margin: 0 auto;
  text-align: left;
  width: 100%;
  @media (max-width: 480px) {
    .ant-typography {
      margin-top: 50px;
      font-size:18px;
    }
  }
`;
