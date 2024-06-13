import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecommendations } from "@/apis/queries/driveQueries.ts";
import InstantMusicPlayer from "@/components/instantMusicPlayer/instantMusicPlayer.tsx";
import MyPlayListBelow from "@/components/myPlayListBelow/MyPlayListBelow.tsx";
import { AuthBorder } from "@/components/pages/signupPage/SignupPage.styles.ts";
import { NOIMAGE } from "@/constants/etc.ts";

const PlayListSongSection = () => {
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const { recommendations } = useRecommendations(["all"]);
  return (
    <>
      <motion.div
        key="song"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <SongContent>
          <SectionTitle>노래 추천</SectionTitle>
          <SongList>
            <SongCard key={recommendations?.prevSong?.id}>
              <MusicImageWrapper>
                <InstantMusicPlayer
                  musicUrl={recommendations?.prevSong?.previewUrl || ""}
                  id={recommendations?.prevSong?.id || ""}
                  currentPlayingId={currentPlayingId}
                  setCurrentPlayingId={setCurrentPlayingId}
                />
                <img
                  src={recommendations?.prevSong?.album?.images[0] || NOIMAGE}
                />
              </MusicImageWrapper>
              <SongInfo>
                <SongName>{recommendations?.prevSong?.name}</SongName>
                <SongArtist>
                  {recommendations?.prevSong?.artists
                    .map((artist) => artist.artistName)
                    .join(", ")}
                </SongArtist>
              </SongInfo>
            </SongCard>
            <SongCard key={recommendations?.nowSong?.id}>
              <MusicImageWrapper>
                <InstantMusicPlayer
                  musicUrl={recommendations?.nowSong?.previewUrl || ""}
                  id={recommendations?.nowSong?.id || ""}
                  currentPlayingId={currentPlayingId}
                  setCurrentPlayingId={setCurrentPlayingId}
                />
                <img
                  src={recommendations?.nowSong?.album?.images[0] || NOIMAGE}
                />
              </MusicImageWrapper>
              <SongInfo>
                <SongName>{recommendations?.nowSong?.name}</SongName>
                <SongArtist>
                  {recommendations?.nowSong?.artists
                    .map((artist) => artist.artistName)
                    .join(", ")}
                </SongArtist>
              </SongInfo>
            </SongCard>
            <SongCard key={recommendations?.nextSong?.id}>
              <MusicImageWrapper>
                <InstantMusicPlayer
                  musicUrl={recommendations?.nextSong?.previewUrl || ""}
                  id={recommendations?.nextSong?.id || ""}
                  currentPlayingId={currentPlayingId}
                  setCurrentPlayingId={setCurrentPlayingId}
                />
                <img
                  src={recommendations?.nextSong?.album?.images[0] || NOIMAGE}
                />
              </MusicImageWrapper>
              <SongInfo>
                <SongName>{recommendations?.nextSong?.name}</SongName>
                <SongArtist>
                  {recommendations?.nextSong?.artists
                    .map((artist) => artist.artistName)
                    .join(", ")}
                </SongArtist>
              </SongInfo>
            </SongCard>
          </SongList>
        </SongContent>
      </motion.div>
      <AuthBorder />
      <MyPlayListBelow />
    </>
  );
};

export default PlayListSongSection;

const SongContent = styled.div``;

const SongList = styled.div`
  display: flex;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  margin: 2rem 0;
  font-size: 1.8rem;
  font-weight: bold;
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const SongCard = styled.div`
  overflow: hidden;
  width: 15rem;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px !important;
  }
`;

const SongInfo = styled.div`
  padding: 0.5rem;
  text-align: start;
`;

const SongName = styled.p`
  margin: 0.5rem 0;
  font-weight: bold;
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const SongArtist = styled.p`
  margin: 0;
  color: #ccc;
  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MusicImageWrapper = styled.div`
  position: relative;
`;
