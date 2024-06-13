import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ROUTES from "@/constants/routes.ts";
import WhitePlus from "@/assets/icons/white_plus.svg?react";

const PlayListPlayListSection = () => {
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate(ROUTES.createPlayList);
  };

  return (
    <div>
      <Header>
        <Title>나의 플레이리스트</Title>
        <AddPlayListButton onClick={handleAddButton} />
      </Header>
    </div>
  );
};

export default PlayListPlayListSection;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.9rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
`;

export const AddPlayListButton = styled(WhitePlus)`
  cursor: pointer;
`;
