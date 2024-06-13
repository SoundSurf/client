import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import PlayListSongSection from "@/components/playListSongSection/PlayListSongSection.tsx";

const MyPlayListDetailTab = () => {
  const [upperTab, setUpperTab] = useState<"song" | "playlist">("song");

  return (
    <EntireWrapper>
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
        {upperTab === "song" && <PlayListSongSection />}
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
    </EntireWrapper>
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
  border-bottom: 1px solid #2b2d36;
  padding: 0 2.8rem;
`;
