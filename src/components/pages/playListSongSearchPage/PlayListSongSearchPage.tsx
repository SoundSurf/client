import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAddMusic, useSearchData } from "@/apis/queries/driveQueries.ts";
import { NOIMAGE } from "@/constants/etc.ts";
import { Track } from "@/ssTypes/drive/driveTypes.ts";
import X from "@/assets/icons/X_icon.svg?react";
import Back from "@/assets/icons/back.svg?react";
import SearchPlus from "@/assets/icons/search_plus_icon.svg?react";

const PlayListSongSearchPage = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const { id } = useParams();
  const { data: searchRes } = useSearchData({ id: id, title: searchKeyword });
  const { addMusic } = useAddMusic(id);

  const handleAddMusicButton = (song: Track) => {
    addMusic({
      id: id || 1,
      body: { trackId: song.id, imageUrl: song.album.images[0] || "" },
    });
  };

  const clearKeyword = () => {
    setSearchKeyword("");
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <SearchPageWrapper>
      <InputSection>
        <button onClick={handleBackButton}>
          <Back />
        </button>
        <SearchInput
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="노래명 검색"
        />
        {searchKeyword.length > 0 && (
          <button onClick={clearKeyword}>
            <X />
          </button>
        )}
      </InputSection>

      <SearchResWrapper>
        {searchRes &&
          searchRes.tracks.map((song) => {
            return (
              <SearchEl key={song.id}>
                <img src={song.album.images[0] || NOIMAGE} />
                <SearchMiddle>
                  <SongName>{song.name}</SongName>
                  <SongDetail>
                    <SongBasic>{song.album.albumName}</SongBasic> |
                    <SongBasic>
                      {song.artists
                        .map((artist) => artist.artistName)
                        .join(", ")}
                    </SongBasic>
                  </SongDetail>
                </SearchMiddle>
                <AddButton onClick={() => handleAddMusicButton(song)}>
                  <SearchPlus />
                </AddButton>
              </SearchEl>
            );
          })}
      </SearchResWrapper>
    </SearchPageWrapper>
  );
};

export default PlayListSongSearchPage;

const AddButton = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  position: absolute;
  top: 30%;
  right: 0;
`;

const SongBasic = styled.span`
  margin: 0 0.6rem;
`;

const SongDetail = styled.p`
  color: ${({ theme }) => theme.colors.grayScale6};
  font-size: 1.2rem;
  max-width: 430px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const SongName = styled.p`
  font-size: 1.6rem;
  max-width: 430px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const SearchMiddle = styled.div`
  margin-left: 2rem;
`;

const SearchEl = styled.li`
  display: flex;
  position: relative;

  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale9};
  padding: 1rem 0;

  img {
    width: 6rem;
    height: 6rem;
  }
`;

const SearchResWrapper = styled.ul`
  width: 100%;
  padding: 2.4rem 2.3rem;
`;

const SearchInput = styled.input`
  margin: 0 3rem 0 2rem;
  width: 30rem;
  background: transparent;
  font-size: 2rem;
`;

const SearchPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const InputSection = styled.div`
  width: 100%;
  padding: 6.6rem 2.7rem 1.4rem 2.7rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale8};
`;
