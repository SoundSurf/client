import styled from "styled-components";
import {
  useCompletePlaylist,
  useUnCompletePlaylist,
} from "@/apis/queries/driveQueries.ts";

type SinglePlayListTapProps = {
  isInProgress: boolean;
  musicId: string;
};
const SinglePlayListTab = ({
  isInProgress,
  musicId,
}: SinglePlayListTapProps) => {
  const { completePlaylist } = useCompletePlaylist(musicId);
  const { unCompletePlaylist } = useUnCompletePlaylist(musicId);

  return (
    <EntireWrapper>
      <TabButtonWrapper>
        <TabButtons>
          <TabButton isActive={isInProgress} onClick={completePlaylist}>
            완료
          </TabButton>
          <TabButton isActive={!isInProgress} onClick={unCompletePlaylist}>
            진행중
          </TabButton>
        </TabButtons>
      </TabButtonWrapper>
    </EntireWrapper>
  );
};

export default SinglePlayListTab;

const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  width: 40rem;
  background: #2b2d36;
  border-radius: 1rem;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  width: 50%;
  background: ${({ isActive }) => (isActive ? "#A40BCB" : "#2B2D36")};
  color: white;
  border: none;
  border-radius: ${({ isActive, children }) =>
    isActive
      ? children === "노래"
        ? "10px 10px 10px 10px"
        : "10px 10px 10px 10px"
      : "10px 10px 10px 10px"};
  padding: 0.8rem 2rem;
  margin: 0;
  cursor: pointer;
  &:hover {
    background: ${({ isActive }) => (isActive ? "#4A4A4A" : "#3A3A3A")};
  }
  transition: background 0.3s;
`;

const SectionTitle = styled.h3`
  margin: 1rem 0;
  font-size: 1.8rem;
  font-weight: bold;
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const PlaylistContent = styled.div`
  padding: 1rem;
`;

const PlaylistList = styled.div`
  display: flex;
  gap: 1rem;
`;

const PlaylistCard = styled.div`
  border-radius: 10px;
  padding: 1rem;
  width: 10rem;
  text-align: center;
`;

const TabButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const EntireWrapper = styled.div`
  padding: 0 2.8rem;
`;
