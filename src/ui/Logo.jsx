import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
  font-weight: bold;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkmode } = useDarkMode();
  const src = isDarkmode ? '/logo.png' : '/logo.png';
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
      <p>Dinas Sosial Kota Palembang</p>
    </StyledLogo>
  );
}

export default Logo;
