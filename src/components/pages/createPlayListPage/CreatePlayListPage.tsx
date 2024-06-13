import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ROUTES from "@/constants/routes.ts";

const CreatePlayListPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleNavigate = () => {
    if (name.length) {
      navigate(`${ROUTES.createGenre}?name=${encodeURIComponent(name)}`);
    }
  };

  return (
    <Wrapper>
      <Title>플레이리스트 이름을 정해주세요</Title>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="플레이리스트 이름을 입력해주세요"
      />
      <NextButton onClick={handleNavigate}>다음 단계</NextButton>
    </Wrapper>
  );
};

export default CreatePlayListPage;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 93vh;
`;

const Title = styled.h2`
  margin-top: 10.9rem;
  margin-bottom: 2.4rem;
  font-size: 2rem;
  font-weight: 600;
  color: #f0f0f5;
`;

export const Input = styled.input`
  ${({ theme }) => theme.fonts.body_14px_light};
  color: ${({ theme }) => theme.colors.grayScale4};

  background: ${({ theme }) => theme.colors.grayScale9};

  display: block;

  width: 31.2rem;
  height: 4.6rem;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
  border-radius: 0.4rem;
`;

const NextButton = styled.button`
  ${({ theme }) => theme.fonts.body_20px_semibold};

  width: 31.2rem;
  height: 5.4rem;
  border-radius: 0.8rem;
  margin-top: 39rem;
  background: #a40bcb;
`;
