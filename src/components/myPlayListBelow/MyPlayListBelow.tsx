import React from "react";
import styled from "styled-components";
import { useSavedMusics } from "@/apis/queries/driveQueries.ts";
import InstantMusicPlayer from "@/components/instantMusicPlayer/instantMusicPlayer.tsx";
import MoreIcon from "@/components/moreIcon/MoreIcon.tsx";
import { NOIMAGE } from "@/constants/etc.ts";
import Spotify from "@/assets/icons/spotify.svg?react";

const MyPlayListBelow = () => {
  const { data: savedMusics } = useSavedMusics();

  return (
    <EntireWrapper>
      <Title>재생 목록</Title>
      <MusicList>
        {savedMusics &&
          savedMusics.savedMusics.map((music) => {
            return (
              <MusicEl>
                <MusicImageWrapper>
                  <InstantMusicPlayer musicUrl={music.previewUrl} />
                  <img src={music.album.images[0] || NOIMAGE} />
                </MusicImageWrapper>
                <DetailRight>
                  <MusicTitle>{music.title}</MusicTitle>
                  <ArtistName>아티스트</ArtistName>
                  <DetailMoreSection>
                    <a href={music.spotifyUrl} target="_blank">
                      <SpotifyIcon />
                    </a>
                    <MoreIcon songId={music.trackId} />
                  </DetailMoreSection>
                </DetailRight>
              </MusicEl>
            );
          })}
      </MusicList>
    </EntireWrapper>
  );
};

export default MyPlayListBelow;

const EntireWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2.4rem;
`;

const MusicList = styled.ul``;

const MusicEl = styled.li`
  display: flex;

  margin-bottom: 2.4rem;
`;

const MusicImageWrapper = styled.div`
  position: relative;
  width: 11.9rem;
  height: 11.9rem;
  border-radius: 0.5rem;
  margin-right: 1.2rem;

  img {
    width: 11.9rem;
    height: 11.9rem;
  }
`;

const DetailRight = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const MusicTitle = styled.h3`
  font-size: 1.4rem;
  color: #f0f0f5;
  font-weight: normal;
  margin-bottom: 1.2rem;
`;

const ArtistName = styled.p`
  font-size: 1.2rem;
  color: #858899;
`;

const SpotifyIcon = styled(Spotify)`
  width: 2.2rem;
  height: 2.2rem;
`;

const DetailMoreSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
