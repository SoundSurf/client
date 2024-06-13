import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PlayIcon from "@/assets/icons/playbutton_play.svg?react";
import PauseIcon from "@/assets/icons/playbutton_stop.svg?react"; // Replace with your pause icon

type InstantMusicPlayerProps = {
  musicUrl: string;
};

const InstantMusicPlayer = ({ musicUrl }: InstantMusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", () => setIsPlaying(false));
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, []);

  return (
    <InstantMusicPlayerWrapper>
      <PlayPauseButton onClick={togglePlayPause} progress={progress}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </PlayPauseButton>
      <audio ref={audioRef} src={musicUrl}></audio>
    </InstantMusicPlayerWrapper>
  );
};

export default InstantMusicPlayer;

const InstantMusicPlayerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 4rem;
`;

const PlayPauseButton = styled.button<{ progress: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: conic-gradient(
      #a40bcb ${({ progress }) => progress}%,
      transparent ${({ progress }) => progress}%
    );
    z-index: -1;
  }
`;
