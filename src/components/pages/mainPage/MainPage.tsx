import { useState, useEffect } from "react";
import {
  motion,
  useAnimation,
  useDragControls,
  AnimatePresence,
} from "framer-motion";
import styled from "styled-components";
import { useRecommendations } from "@/apis/queries/driveQueries.ts";
import DriveNav from "@/components/_common/driveNav/DriveNav.tsx";
import MusicPlayer from "@/components/drive/musicPlayer/MusicPlayer.tsx";
import SongDetail from "@/components/songDetail/SongDetail.tsx";
import UpperArrow from "@/assets/icons/upperarrow.svg?react";

const MainPage = () => {
  const { recommendations, getPrevTracks, getNextTracks } =
    useRecommendations("all");

  const [direction, setDirection] = useState(0);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const controls = useAnimation();
  const dragControls = useDragControls();

  const mainAlbumImage =
    recommendations?.nowSong?.album?.images[0] ||
    "https://via.placeholder.com/500x500?text=No+Image";

  useEffect(() => {
    controls.start("center");
  }, [recommendations, controls]);

  const handleSwipe = (dir) => {
    setDirection(dir);
    if (dir > 0) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  const handlePrev = () => {
    setDirection(1);
    getPrevTracks();
  };

  const handleNext = () => {
    setDirection(-1);
    getNextTracks();
  };

  const handleDetailToggle = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      y: -200,
      opacity: 0,
      scale: 0.75,
      rotate: direction > 0 ? 15 : -15,
    }),
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      y: -200,
      opacity: 0,
      scale: 0.75,
      rotate: direction < 0 ? 15 : -15,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    }),
  };

  return (
    <MainWrapper>
      <BackgroundBlur style={{ backgroundImage: `url(${mainAlbumImage})` }} />
      {recommendations && (
        <Content>
          <DriveNav />
          <TopBar>
            <GenreButton>장르 선택</GenreButton>
          </TopBar>
          <AlbumWrapper>
            <BlurredAlbumCover
              src={
                recommendations.prevSong?.album?.images[0] ||
                "https://via.placeholder.com/500x500?text=No+Image"
              }
              alt="Previous Album Cover"
              style={{ transform: "rotate(-15deg)", left: "-90px" }}
            />
            <motion.div
              key={recommendations.nowSong?.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragControls={dragControls}
              onPointerDown={(event) => dragControls.start(event)} // Start dragging on pointer down
              onDragStart={(event) => event.preventDefault()} // Prevent default behavior
              onDragEnd={(event, info) => {
                if (info.offset.x < -5) {
                  handleSwipe(-1);
                } else if (info.offset.x > 5) {
                  handleSwipe(1);
                }
              }}
            >
              <AlbumCover
                src={
                  recommendations.nowSong?.album?.images[0] ||
                  "https://via.placeholder.com/500x500?text=No+Image"
                }
                alt="Album Cover"
                style={{ userSelect: "none" }}
              />
              <TrackInfo>
                <TrackTitle>{recommendations.nowSong.name}</TrackTitle>
                <TrackArtist>
                  {recommendations.nowSong.artists
                    .map((artist) => artist.artistName)
                    .join(", ")}
                </TrackArtist>
              </TrackInfo>
            </motion.div>
            <BlurredAlbumCover
              src={
                recommendations.nextSong?.album?.images[0] ||
                "https://via.placeholder.com/500x500?text=No+Image"
              }
              alt="Next Album Cover"
              style={{ transform: "rotate(15deg)", right: "-90px" }}
            />
          </AlbumWrapper>
          <ButtonWrapper>
            <NavButton onClick={handlePrev}>◀</NavButton>
            <NavButton onClick={handleNext}>▶</NavButton>
          </ButtonWrapper>
          <MusicPlayer
            songInfo={recommendations.nowSong}
            onNext={getNextTracks}
          />
          <NowPlaying>
            <NowPlayingHeader>
              <DetailLeft>
                <UpperArrow />
                <NowPlayingTitle>NOW PLAYING</NowPlayingTitle>
              </DetailLeft>
              <MoreInfoLink onClick={handleDetailToggle}>
                앨범 정보 자세히 보기
              </MoreInfoLink>
            </NowPlayingHeader>
            <NowPlayingTrack>
              <TrackImage
                src={
                  recommendations.nowSong?.album?.images[0] ||
                  "https://via.placeholder.com/500x500?text=No+Image"
                }
                alt="Album Cover"
              />
              <TrackDetails>
                <DetailTitle>{recommendations.nowSong.name}</DetailTitle>
                <DetailArtist>
                  {recommendations.nowSong.artists
                    .map((artist) => artist.artistName)
                    .join(", ")}
                </DetailArtist>
              </TrackDetails>
            </NowPlayingTrack>
          </NowPlaying>
          <AnimatePresence>
            {isDetailVisible && (
              <SongDetailWrapper
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <SongDetail onClose={handleDetailToggle} />
              </SongDetailWrapper>
            )}
          </AnimatePresence>
        </Content>
      )}
    </MainWrapper>
  );
};

export default MainPage;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: transparent;
  color: white;
  position: relative;
  overflow: hidden;
`;

const BackgroundBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(50px);
  -webkit-filter: blur(50px);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #0d0d0f;
  color: white;
  padding: 1rem 1rem 0 1rem;

  @media (max-width: 768px) {
    padding: 1rem 1rem 0 1rem;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;
  margin: 1rem 0 1rem 0;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    margin: 0.5rem 0;
  }
`;

export const GenreButton = styled.button`
  background-color: #a40bcb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.9rem;
  }
`;

export const AlbumWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const AlbumCover = styled.img`
  width: 25rem;
  height: 25rem;
  object-fit: cover;
  margin-bottom: 20px;
  background-color: #d3d3d3;
  z-index: 2;

  @media (max-width: 768px) {
    width: 18rem;
    height: 18rem;
  }
`;

export const BlurredAlbumCover = styled.img`
  width: 20rem;
  height: 20rem;
  object-fit: cover;
  position: absolute;

  opacity: 0.5;
  z-index: 0;
  background-color: #d3d3d3;

  @media (max-width: 768px) {
    width: 15rem;
    height: 15rem;
  }
`;

export const TrackInfo = styled.div`
  text-align: center;
  z-index: 2;
`;

export const TrackTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 18px;
    max-width: 200px;
  }
`;

export const TrackArtist = styled.p`
  font-size: 18px;
  margin: 0;
  color: #a9abb8;
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 200px;
  }
`;

export const TrackAlbum = styled.p`
  font-size: 16px;
  margin: 0;
  color: #a9abb8;
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 200px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 1rem 0;
  z-index: 2;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const NowPlaying = styled.div`
  width: 100%;
  height: 59.6rem;
  background-color: #1d1e24;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 2rem;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0.5rem;
    margin-top: 1rem;
  }
`;

export const NowPlayingHeader = styled.div`
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  z-index: 2;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grayScale8};

  @media (max-width: 768px) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale8};
  }
`;

export const NowPlayingTitle = styled.h2`
  color: #a40bcb;
  font-size: 2rem;
  font-weight: normal;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

export const MoreInfoLink = styled.a`
  color: #a9abb8;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.3rem;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const NowPlayingTrack = styled.div`
  display: flex;
  margin-top: 1rem;
  z-index: 2;
  padding: 1rem;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

export const TrackImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 1rem;
  background-color: #d3d3d3;
  z-index: 2;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

export const TrackDetails = styled.div``;

export const SongDetailWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: #0d0d0f;
  z-index: 2;
`;

export const DetailLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;

export const DetailTitle = styled(TrackTitle)`
  font-size: 1.8rem;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  margin-bottom: 1rem;
`;

export const DetailArtist = styled(TrackArtist)`
  font-size: 1.4rem;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
