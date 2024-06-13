import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { useGetPlayList } from "@/apis/queries/driveQueries.ts";
import BackgroundUrl from "@/assets/car.svg";
import DriveNav from "@/components/_common/driveNav/DriveNav.tsx";
import SinglePlayListTab from "@/components/singlePlayListTab/SinglePlayListTab.tsx";
import { NOIMAGE } from "@/constants/etc.ts";
import ROUTES from "@/constants/routes.ts";
import formatDateString from "@/utils/formatDateString.ts";
import Car from "@/assets/car.svg?react";

const PlayListDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: playList } = useGetPlayList(id);

  const addMusicBtnHandler = () => {
    if (id) {
      navigate(`${ROUTES.playListSongSearch}/${id}`);
    }
  };

  return (
    <Wrapper>
      <BackgroundOverlay imageUrl={BackgroundUrl} />
      <DriveNav />
      {playList && (
        <>
          <ContentWrapper>
            <div>
              <CarPic />
              <PlayListName>{playList.name}</PlayListName>
              <PlayListInfo>
                <Segment>{formatDateString(playList.createdAt)}</Segment> |
                <Segment>총 {playList.musicCount}곡</Segment>
              </PlayListInfo>
            </div>
          </ContentWrapper>
          <ProgressWrapper>
            <SinglePlayListTab musicId={id} isInProgress={playList.complete} />
            <PlayListWrapper>
              <PlayLisText>{playList.name}</PlayLisText>

              {playList.playlistMusics.map((song) => {
                return (
                  <PlayListMusicLi key={song.music.id}>
                    <ImageWrapper>
                      <img src={song.music.imageUrl || NOIMAGE} />
                    </ImageWrapper>
                    <SongInfo>
                      <SongName>{song.music.title}</SongName>
                      <SongArtists>{song.music.artist}</SongArtists>
                    </SongInfo>
                  </PlayListMusicLi>
                );
              })}

              <AddMusicBtn onClick={addMusicBtnHandler}>노래 추가</AddMusicBtn>
            </PlayListWrapper>
          </ProgressWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default PlayListDetailPage;

export const ImageWrapper = styled.div`
  position: relative;
`;

const SongName = styled.p`
  font-weight: 600;
  font-size: 1.4rem;
`;

const SongArtists = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.grayScale4};
`;

const SongInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 28rem;
  height: 6rem;
  border-radius: 1.2rem;
`;

const PlayListMusicLi = styled.ul`
  margin-top: 2.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;

  img {
    width: 4rem;
    height: 4rem;
    margin-right: 2rem;
  }
`;

const AddMusicBtn = styled.button`
  font-size: 2rem;

  width: 100%;
  height: 5rem;
  background: #a40bcb;
`;

const PlayLisText = styled.p`
  color: #f0f0f5;
  font-size: 1.4rem;
  font-weight: 600;
`;

const PlayListWrapper = styled.div`
  width: 100%;
  padding: 0 2.8rem;
  margin-top: 1.5rem;
`;

const ProgressWrapper = styled.div`
  width: 100%;
`;

const PlayListName = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const PlayListInfo = styled.p`
  font-size: 1.4rem;
  color: #e8e8ee;
`;

const Segment = styled.span`
  margin: 0 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: black;
  color: white;
  position: relative;
  overflow: hidden;
`;

const BackgroundOverlay = styled.div<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-image: url(${({ imageUrl }) => imageUrl});
  z-index: 1;
  background-size: cover;
  background-position: center;
  filter: blur(50px);
  -webkit-filter: blur(50px);
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), black);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 5;
  text-align: center;
  margin-top: -5rem;
`;

const CarPic = styled(Car)`
  width: 24.6rem;
  height: 24.6rem;
`;
