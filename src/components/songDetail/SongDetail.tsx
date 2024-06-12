import React, { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import styled from "styled-components";
import Check from "@/assets/icons/white_check_icon.svg?react";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { useAlbumInfo } from "@/apis/queries/driveQueries.ts";
import { NOIMAGE } from "@/constants/etc.ts";
import { RelatedSong, Song, SongInfo } from "@/ssTypes/drive/driveTypes.ts";
import DownArrow from "@/assets/icons/downarrow.svg?react";
import Spotify from "@/assets/icons/spotify.svg?react";

type SongDetailProps = {
  songId: string;
  currSong: SongInfo;
  onClose: () => void;
  songSetter: (songInfo: Song | RelatedSong) => void;
};

const SongDetail = ({
  songSetter,
  currSong,
  songId,
  onClose,
}: SongDetailProps) => {
  const { data: albumInfo } = useAlbumInfo(songId);
  const albumUrl = albumInfo?.album.albumSimple?.images[0] || NOIMAGE;
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

  const handleTrackSelection = (track: string) => {
    if (selectedTracks.includes(track)) {
      setSelectedTracks(selectedTracks.filter((t) => t !== track));
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const handlePlayClick = (songInfo: Song | RelatedSong) => {
    songSetter(songInfo);
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
      {/*<BackgroundHalfCircle src={albumUrl} />*/}
      <Header>
        <DetailNav>
          <DetailNavLeft>
            <BackButton onClick={onClose}>
              <DownArrow />
            </BackButton>
            <NowPlaying>NOW PLAYING | </NowPlaying>
          </DetailNavLeft>
          <TrackTitle>{currSong.name}</TrackTitle>
        </DetailNav>
        <AlbumCover
          src={albumInfo?.album.albumSimple?.images[0] || NOIMAGE}
          alt="Album Cover"
        />
        <TrackTitle>{currSong.name}</TrackTitle>
        <Artist>
          {currSong.artists.map((artist) => artist.artistName).join(", ")}
        </Artist>
      </Header>

      <SpotifyButton>
        <a href={currSong.spotifyUrl} target="_blank">
          <Spotify />
        </a>
      </SpotifyButton>

      <InfoItem>
        <Label>발매일</Label>
        <Value>{currSong.album?.releaseDate}</Value>
      </InfoItem>

      <InfoItem>
        <Label>수록곡</Label>
        <button onClick={() => setSelectedTracks(allTracks)}>
          <Check />
          <Value>전체 선택</Value>
        </button>
      </InfoItem>
      <TrackList>
        {albumInfo?.album?.songs.map((track, index) => (
          <Track key={index}>
            <input
              type="checkbox"
              // checked={selectedTracks.includes(track.id)}
              // onChange={() => handleTrackSelection(track.id)}
            />
            <TrackName>{track.name}</TrackName>
            <PlayButton onClick={() => handlePlayClick(track)}>▶</PlayButton>
          </Track>
        ))}
      </TrackList>
      <AddTrackButton disabled={selectedTracks.length === 0}>
        선택 곡 추가
      </AddTrackButton>
      <SimilarAlbums>
        <ScrollMenu>
          {albumInfo?.relatedSongs?.slice(0, 3).map((album, index) =>
            React.createElement(
              "div",
              {
                itemId: album.id || index.toString(),
                key: album.id || index.toString(),
              },
              <Album>
                <AlbumCoverSmall
                  src={album?.images[0] || NOIMAGE}
                  alt="Similar Album"
                />
                <AlbumTitle>{album.name}</AlbumTitle>
                <AlbumArtist>
                  {album?.artists.map((artist) => artist.artistName).join(", ")}
                </AlbumArtist>
              </Album>,
            ),
          ) || []}
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
  background-color: #0d0d0f;
  color: white;
  padding: 2rem;
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
  margin-bottom: 3rem;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const NowPlaying = styled.div`
  margin-top: 1rem;
  font-size: 1.8rem;
  color: white;
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
  width: 24rem;
  height: 24rem;
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

  margin-right: 3rem;
`;

const AlbumCoverSmall = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const AlbumTitle = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  color: white;
`;

const AlbumArtist = styled.div`
  font-size: 0.7rem;
  color: #a9abb8;
`;

const DetailNavLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const BackgroundHalfCircle = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  -webkit-filter: blur(8px);
  clip-path: ellipse(50% 50% at 50% 0%);
  z-index: 1;
`;
