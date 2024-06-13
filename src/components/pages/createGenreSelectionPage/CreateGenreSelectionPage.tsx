import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCreatePlayList } from "@/apis/queries/driveQueries.ts";
import DriveNav from "@/components/_common/driveNav/DriveNav.tsx";
import GENRES from "@/constants/genres.ts";

const CreateGenreSelectionPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const playlistName = queryParams.get("name");

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const { createPlayList } = useCreatePlayList();

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
    if (playlistName && selectedGenres.length) {
      createPlayList({
        genreIds: selectedGenres,
        name: playlistName,
      });
    }
  };

  return (
    <Wrapper>
      <DriveNav />
      <GenreSelectionWrapper>
        <GenreContent>
          <SelectionCntText>{selectedGenres.length}개 선택</SelectionCntText>
          <SelectionInfoText>3개까지 중복선택 가능해요</SelectionInfoText>
          <SelectListWrapper>
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
    </Wrapper>
  );
};

export default CreateGenreSelectionPage;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  overflow-y: hidden;
  max-height: 100vh;
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
  margin-top: -5rem;

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
  position: absolute;
  width: 40rem;
  bottom: -15rem;
  display: flex;
  justify-content: center;
  padding: 3rem 0 22rem 0;

  height: 16rem;
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
