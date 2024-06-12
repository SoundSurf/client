import { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import styled from "styled-components";
import DownArrow from "@/assets/icons/downarrow.svg?react";
import Spotify from "@/assets/icons/spotify.svg?react";
import Check from "@/assets/icons/white_check_icon.svg?react";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { useAlbumInfo } from "@/apis/queries/driveQueries.ts";
import { NOIMAGE } from "@/constants/etc.ts";

type SongDetailProps = {
  songId: string;
  onClose: () => void;
};

const SongDetail = ({ songId, onClose }: SongDetailProps) => {
  const { data: albumInfo } = useAlbumInfo(songId);
  const albumUrl = "url";
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

  const handleTrackSelection = (track: string) => {
    if (selectedTracks.includes(track)) {
      setSelectedTracks(selectedTracks.filter((t) => t !== track));
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const allTracks = [
    "Devil In A New Dress",
    "Devil In A New Dress",
    "Devil In A New Dress",
    "Devil In A New Dress",
    "Devil In A New Dress",
  ]; // Example tracks

  const similarAlbums = [
    { title: "Devil In A New Dress", artist: "Kanye West", cover: albumUrl },
    { title: "Devil In A New Dress", artist: "Kanye West", cover: albumUrl },
    { title: "Devil In A New Dress", artist: "Kanye West", cover: albumUrl },
  ];

  return (
    <Container>
      <Header>
        <DetailNav>
          <BackButton onClick={onClose}>
            <DownArrow />
          </BackButton>
          <NowPlaying>NOW PLAYING | </NowPlaying>
          <TrackTitle>Devil In A New Dress</TrackTitle>
        </DetailNav>
        <AlbumCover
          src={albumInfo.album.albumSimple?.images[0] || NOIMAGE}
          alt="Album Cover"
        />
        <TrackTitle>Devil In A New Dress</TrackTitle>
        <Artist>Kanye West</Artist>
      </Header>

      <SpotifyButton>
        <Spotify />
      </SpotifyButton>

      <InfoItem>
        <Label>발매일</Label>
        <Value>2023.03.03</Value>
      </InfoItem>
      <InfoItem>
        <Label>장르</Label>
        <Value>POP</Value>
      </InfoItem>
      <InfoItem>
        <Label>RYM 평점</Label>
        <Value>3.78 / 5.0</Value>
      </InfoItem>

      <InfoItem>
        <Label>수록곡</Label>
        <button onClick={() => setSelectedTracks(allTracks)}>
          <Check />
          <Value>전체 선택</Value>
        </button>
      </InfoItem>
      <TrackList>
        {allTracks.map((track, index) => (
          <Track key={index}>
            <input
              type="checkbox"
              checked={selectedTracks.includes(track)}
              onChange={() => handleTrackSelection(track)}
            />
            <TrackName>{track}</TrackName>
            <PlayButton>▶</PlayButton>
          </Track>
        ))}
      </TrackList>
      <AddTrackButton disabled={selectedTracks.length === 0}>
        선택 곡 추가
      </AddTrackButton>
      <SimilarAlbums>
        <ScrollMenu>
          {similarAlbums.map((album, index) => (
            <Album key={index}>
              <AlbumCoverSmall src={album.cover} alt="Similar Album" />
              <AlbumTitle>{album.title}</AlbumTitle>
              <AlbumArtist>{album.artist}</AlbumArtist>
            </Album>
          ))}
        </ScrollMenu>
      </SimilarAlbums>
    </Container>
  );
};

export default SongDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #0d0d0f;
  color: white;
  padding: 1rem;
  z-index: 105;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const DetailNav = styled.div`
  width: 100%;
  display: flex;
  background: red;
  align-items: center;
`;

const BackButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const NowPlaying = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #a9abb8;
`;

const TrackTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const Artist = styled.p`
  font-size: 1rem;
  color: #a9abb8;
  margin: 0;
`;

const AlbumCover = styled.img`
  width: 15rem;
  height: 15rem;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const SpotifyButton = styled.button`
  background: none;
  border: none;
  color: green;
  font-size: 2rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-size: 0.8rem;
  color: #a9abb8;
`;

const Value = styled.div`
  font-size: 1rem;
  color: white;
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const Track = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #1d1e24;
  border-radius: 10px;
  margin-bottom: 0.5rem;
`;

const TrackName = styled.div`
  font-size: 1rem;
  color: white;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const AddTrackButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? "#555" : "#a40bcb")};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 1rem;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const SimilarAlbums = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Album = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AlbumCoverSmall = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const AlbumTitle = styled.div`
  font-size: 0.8rem;
  color: white;
`;

const AlbumArtist = styled.div`
  font-size: 0.7rem;
  color: #a9abb8;
`;
