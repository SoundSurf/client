import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Play from "@/assets/icons/playbutton_play.svg?react";
import Stop from "@/assets/icons/playbutton_stop.svg?react";
import PurplePlus from "@/assets/icons/purple_plus.svg?react";
import Spotify from "@/assets/icons/spotify.svg?react";

type MusicPlayerProps = {
  songUrl: string;
};

const MusicPlayer = ({ songUrl }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      audio.addEventListener("timeupdate", updateProgress);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
  }, [songUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressBarClick = (clientX: number) => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    if (audio && progressBar) {
      const rect = progressBar.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      audio.currentTime = (newProgress / 100) * audio.duration;
      setProgress(newProgress);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    handleProgressBarClick(event.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressBarClick(event.clientX);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchMove = (event: TouchEvent) => {
    handleProgressBarClick(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressBarClick(event.touches[0].clientX);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <PlayerContainer>
      <audio ref={audioRef} src={songUrl}></audio>

      <ProgressBar
        ref={progressBarRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        isDragging={isDragging}
      >
        <Progress progress={progress} />
      </ProgressBar>
      <ControlPannel>
        <Spotify />
        <button onClick={togglePlayPause}>
          {isPlaying ? <Stop /> : <Play />}
        </button>

        <CircleButton>
          <PurplePlus />
        </CircleButton>
      </ControlPannel>
    </PlayerContainer>
  );
};

export default MusicPlayer;

const PlayerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  height: 100vh;
  color: white;
  z-index: 2;
`;

const PlayButton = styled.button`
  background-color: #61dafb;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5em;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #21a1f1;
  }
`;

const ProgressBar = styled.div<{ isDragging: boolean }>`
  width: 80%;
  height: ${(props) => (props.isDragging ? "10px" : "6px")};
  background-color: rgba(203, 203, 203, 0.1);
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: height 0.2s ease;
  margin-bottom: 2.4rem;
`;

const Progress = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.grayScale1};
  cursor: pointer;
`;

const ControlPannel = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CircleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(240, 240, 245, 0.3);
  cursor: pointer;
`;
