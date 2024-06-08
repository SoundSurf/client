import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackIcon from "@/assets/icons/back.svg?react";

const StyledBackIcon = styled(BackIcon)<{
  width?: string;
  height?: string;
  color?: string;
}>`
  width: ${({ width }) => width || "24px"};
  height: ${({ height }) => height || "24px"};
  fill: ${({ color, theme }) => color || theme.colors.primary};
`;

type BackBtnProps = {
  width?: string;
  height?: string;
  color?: string;
};
const BackBtn = ({ width, height, color }: BackBtnProps) => {
  const navigate = useNavigate();

  const moveBack = () => navigate(-1);

  return (
    <a onClick={moveBack}>
      <StyledBackIcon width={width} height={height} color={color} />
    </a>
  );
};

export default BackBtn;
