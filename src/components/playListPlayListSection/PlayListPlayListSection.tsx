import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetEntirePlayList } from "@/apis/queries/driveQueries.ts";
import ROUTES from "@/constants/routes.ts";
import formatDateString from "@/utils/formatDateString.ts";
import WhitePlus from "@/assets/icons/white_plus.svg?react";

const playlists = [
  {
    id: 1,
    imageUrl: "/path/to/playlist/image1.jpg",
    title: "플레이리스트 이름 1",
    date: "2024.06.12",
    trackCount: 125,
  },
  {
    id: 2,
    imageUrl: "/path/to/playlist/image2.jpg",
    title: "플레이리스트 이름 2",
    date: "2024.06.12",
    trackCount: 125,
  },
  {
    id: 1,
    imageUrl: "/path/to/playlist/image1.jpg",
    title: "플레이리스트 이름 1",
    date: "2024.06.12",
    trackCount: 125,
  },
  {
    id: 2,
    imageUrl: "/path/to/playlist/image2.jpg",
    title: "플레이리스트 이름 2",
    date: "2024.06.12",
    trackCount: 125,
  },
];

const PlayListPlayListSection = () => {
  const navigate = useNavigate();

  const { data: entirePlaylist } = useGetEntirePlayList();

  const handleAddButton = () => {
    navigate(ROUTES.createPlayList);
  };

  const handlePlaylistClick = (id: number) => {
    navigate(`${ROUTES.playList}/${id}`);
  };

  return (
    <Container>
      <Header>
        <Title>나의 플레이리스트</Title>
        <AddPlayListButton onClick={handleAddButton} />
      </Header>
      <PlayListContainer>
        {entirePlaylist?.completed.map((playlist) => (
          <PlayListItem
            key={playlist.id}
            onClick={() => handlePlaylistClick(playlist.id)}
          >
            <PlayListTitle>{playlist.name}</PlayListTitle>
            <PlayListDate>총 {playlist.musicCount}곡</PlayListDate>
          </PlayListItem>
        ))}
      </PlayListContainer>
    </Container>
  );
};

export default PlayListPlayListSection;

const Container = styled.div`
  margin: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.9rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
`;

const AddPlayListButton = styled(WhitePlus)`
  cursor: pointer;
`;

const PlayListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const PlayListItem = styled.div`
  background: #1c1c1e;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const PlayListTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
  color: #fff;
`;

const PlayListDate = styled.div`
  font-size: 0.875rem;
  color: #aaa;
  margin-top: 5px;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
  margin-top: 10px;
`;
