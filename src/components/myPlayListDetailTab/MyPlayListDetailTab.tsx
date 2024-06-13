import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useRecommendations } from "@/apis/queries/driveQueries.ts";
import InstantMusicPlayer from "@/components/instantMusicPlayer/instantMusicPlayer.tsx";
import { NOIMAGE } from "@/constants/etc.ts";

const MyPlayListDetailTab = () => {
  const [upperTab, setUpperTab] = useState<"song" | "playlist">("song");
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const { recommendations } = useRecommendations(["all"]);

  return (
    <>
      <TabButtonWrapper>
        <TabButtons>
          <TabButton
            isActive={upperTab === "song"}
            onClick={() => setUpperTab("song")}
          >
            노래
          </TabButton>
          <TabButton
            isActive={upperTab === "playlist"}
            onClick={() => setUpperTab("playlist")}
          >
            플레이리스트
          </TabButton>
        </TabButtons>
      </TabButtonWrapper>
      <AnimatePresence>
        {upperTab === "song" && (
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
                      src={
                        recommendations?.prevSong?.album?.images[0] || NOIMAGE
                      }
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
                      src={
                        recommendations?.nowSong?.album?.images[0] || NOIMAGE
                      }
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
                      src={
                        recommendations?.nextSong?.album?.images[0] || NOIMAGE
                      }
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
        )}
        {upperTab === "playlist" && (
          <motion.div
            key="playlist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PlaylistContent>
              <SectionTitle>플레이리스트</SectionTitle>
              <PlaylistList>
                <PlaylistCard>플레이리스트 1</PlaylistCard>
                <PlaylistCard>플레이리스트 2</PlaylistCard>
              </PlaylistList>
            </PlaylistContent>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MyPlayListDetailTab;

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
  background: ${({ isActive }) => (isActive ? "#525463" : "#2B2D36")};
  color: white;
  border: none;
  border-radius: ${({ isActive, children }) =>
    isActive
      ? children === "노래"
        ? "10px 10px 10px 10px"
        : "10px 10px 10px 10px"
      : "0"};
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
  font-size: 1.5rem;
`;

const SongContent = styled.div`
  padding: 1rem;
`;

const SongList = styled.div`
  display: flex;
  gap: 1rem;
`;

const SongCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  width: 15rem;
  text-align: center;

  img {
    width: 100%;
    height: auto;
  }
`;

const SongInfo = styled.div`
  padding: 0.5rem;
`;

const SongName = styled.p`
  margin: 0.5rem 0;
  font-weight: bold;
`;

const SongArtist = styled.p`
  margin: 0;
  color: #ccc;
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
  padding: 0 10rem;
`;

const MusicImageWrapper = styled.div`
  position: relative;
`;
