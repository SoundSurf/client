import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useMusicDelete } from "@/apis/queries/driveQueries.ts";
import AdditionalButton from "@/assets/icons/additional_button.svg?react";

type MoreIconProps = {
  songId: string;
};

const MoreIcon = ({ songId }: MoreIconProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { deleteMusic } = useMusicDelete();

  const toggleModal = () => {
    setIsModalOpened(!isModalOpened);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpened(false);
    }
  };

  const handleDeleteBtn = () => {
    deleteMusic(songId);
  };

  useEffect(() => {
    if (isModalOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpened]);

  return (
    <MoreIconWrapper ref={modalRef}>
      {isModalOpened && (
        <MoreModal>
          <button onClick={handleDeleteBtn}>노래 삭제</button>
        </MoreModal>
      )}
      <button onClick={toggleModal}>
        <AdditionalButton />
      </button>
    </MoreIconWrapper>
  );
};

export default MoreIcon;

const MoreIconWrapper = styled.div`
  position: relative;
`;

const MoreModal = styled.div`
  position: absolute;
  top: 0.3rem;
  right: 0.7rem;
  width: 14rem;
  padding: 1rem 1.3rem;
  background: rgba(240, 240, 245, 0.1);
  border-radius: 0.8rem;
  color: #e13348;
  font-size: 1.4rem;
  font-weight: 300;
`;
