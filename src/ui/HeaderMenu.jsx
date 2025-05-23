import styled from "styled-components"
import ButtonIcon from "./ButtonIcon"
import Logout from "../features/authentication/Logout"
import { useNavigate } from "react-router-dom"
import { HiOutlineUser } from "react-icons/hi2"
import DarkToggleMode from './DarkToggleMode';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkToggleMode />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu
