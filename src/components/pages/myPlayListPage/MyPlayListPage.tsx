import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useRecommendations } from "@/apis/queries/driveQueries.ts";
import { useUserInfo } from "@/apis/queries/userQueries.ts";
import DriveNav from "@/components/_common/driveNav/DriveNav.tsx";
import MyPlayListDetailTab from "@/components/myPlayListDetailTab/MyPlayListDetailTab.tsx";

const MyPlayListPage = () => {
  const imageUrl =
    "https://as1.ftcdn.net/v2/jpg/03/23/32/13/1000_F_323321324_TmBO4VwUSlmiBtx9GIC2ZbPHM9gK6Tf6.jpg"; // example image URL

  const { data: userInfo } = useUserInfo();

  return (
    <MainWrapper>
      <BackgroundOverlay imageUrl={imageUrl} />
      <ContentWrapper>
        <DriveNav />
        {/*유저 상단 정보*/}
        <UserInfoWrapper>
          <UserInfoContents>
            <UserNickName>{userInfo.nickname || "닉네임"}</UserNickName>
            <UserGenres>
              <GenreButton>1970S</GenreButton>
              <GenreButton>Singer-songwriter</GenreButton>
              <GenreButton>EDM</GenreButton>
            </UserGenres>
            <UserSongDetail>총 125곡 · 2개의 플레이리스트</UserSongDetail>
          </UserInfoContents>
        </UserInfoWrapper>
        {/*상단 노래*/}
        <MyPlayListDetailTab />
      </ContentWrapper>
    </MainWrapper>
  );
};

export default MyPlayListPage;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: black;
  color: white;
  position: relative;
  overflow: hidden;
`;

const BackgroundOverlay = styled.div<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), black);
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  z-index: 2;
`;

const GenreButton = styled.button`
  background: none;
  border: 1px solid white;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const UserInfoWrapper = styled.div`
  margin-top: 18rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale8};
`;

const UserInfoContents = styled.div`
  width: 100%;
`;

const UserNickName = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.6rem;
`;

const UserGenres = styled.ul`
  width: 100%;
  display: flex;
  padding: 0 7rem 0 7rem;
  justify-content: space-between;
  margin-bottom: 1.6rem;
`;

const UserSongDetail = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3.2rem;
`;
