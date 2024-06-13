import React, { useState } from "react";
import styled from "styled-components";
import { NOIMAGE } from "@/constants/etc.ts";
import GENRES from "@/constants/genres.ts";

type GenreSelectionProps = {
  setGenre: (genreArr: string[]) => void;
  closeFn: () => void;
  imageUrl: string;
};

const GenreSelection = ({
  setGenre,
  closeFn,
  imageUrl,
}: GenreSelectionProps) => {
  const mainAlbumImage = imageUrl || NOIMAGE;
  const [selectedGenres, setSelectedGenres] = useState<(string[] | "all")[]>(
    [],
  );

  const toggleGenreSelection = (key: number) => {
    setSelectedGenres((prevSelected) => {
      if (prevSelected.includes(key)) {
        return prevSelected.filter((genre) => genre !== key);
      } else if (prevSelected.includes("all")) {
        return prevSelected;
      } else if (prevSelected.length < 3) {
        return [...prevSelected, key];
      } else {
        return prevSelected;
      }
    });
  };

  const handleSelectionComplete = () => {
    setGenre(selectedGenres.length > 0 ? selectedGenres : ["all"]);
    closeFn();
  };

  return (
    <GenreSelectionWrapper>
      <BackgroundBlur style={{ backgroundImage: `url(${mainAlbumImage})` }} />
      <GenreContent>
        <SelectionCntText>{selectedGenres.length}개 선택</SelectionCntText>
        <SelectionInfoText>3개까지 중복선택 가능해요</SelectionInfoText>
        <SelectListWrapper>
          <GenreEl
            key={"all"}
            isSelected={selectedGenres.includes("all")}
            onClick={() => setSelectedGenres(["all"])}
          >
            All
          </GenreEl>
          {Object.entries(GENRES).map(([key, genre]) => {
            const genreKey = parseInt(key, 10);
            return (
              <GenreEl
                key={key}
                isSelected={selectedGenres.includes(genreKey)}
                onClick={() => toggleGenreSelection(genreKey)}
              >
                {genre}
              </GenreEl>
            );
          })}
        </SelectListWrapper>
        <SelectBoxWrapper>
          <SelectButton onClick={handleSelectionComplete}>
            선택완료
          </SelectButton>
        </SelectBoxWrapper>
      </GenreContent>
    </GenreSelectionWrapper>
  );
};

export default GenreSelection;

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
  z-index: 5;
`;

const GenreContent = styled.div`
  position: relative;
  top: -10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: white;
  padding: 1rem 1rem 0 1rem;

  @media (max-width: 768px) {
    padding: 1rem 1rem 0 1rem;
  }
  z-index: 6;
`;

const GenreSelectionWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10rem 2rem 0 2rem;
  background: transparent;
`;

const SelectionCntText = styled.h2`
  color: #a40bcb;
  font-weight: bold;
  font-size: 1.6rem;
  margin-bottom: 1.3rem;
`;

const SelectionInfoText = styled.p`
  color: #f0f0f5;
  font-weight: normal;
  font-size: 1.2rem;
  margin-bottom: 2.8rem;
`;

const SelectListWrapper = styled.ul`
  width: 100%;
  overflow-y: auto;
  max-height: 67vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const GenreEl = styled.li<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 1.6rem 1.2rem;
  width: 100%;
  height: 4.4rem;
  border-radius: 0.8rem;
  color: #cdced6;
  background: #3e404c;
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
  border: ${({ isSelected }) => (isSelected ? "2px solid #a40bcb" : "none")};
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 0 22rem 0;
  position: absolute;
  bottom: -15rem;
  height: 16rem;
  width: 100vw;
  background: rgba(13, 13, 15, 0.9);
  box-shadow: 0 -2px 4px rgba(13, 13, 15, 0.8);
  border-top: 0.5px solid ${({ theme }) => theme.colors.grayScale9};
`;

const SelectButton = styled.button`
  ${({ theme }) => theme.fonts.body_20px_semibold};
  width: 31rem;
  height: 5.4rem;
  background: #a40bcb;
  border-radius: 0.8rem;
  margin-bottom: 3rem;
`;
