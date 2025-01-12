import { Chip } from "@mui/material";
import styled from "styled-components";

export const S_ContainerProducts = styled.div`
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  padding: 5px;
  background-color: rgb(229, 231, 231);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 110px;
  /* height: auto; */
  height: 230px;
  /* height: auto; */
  overflow: hidden;
  gap: 8px;
  /* border: 1px solid black; */
  border-radius: 16px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

export const S_BoxImage = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100px;
  padding: 1px;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 16px;
  }
`;

export const S_ChipUnit = styled(Chip)`
  position: absolute !important;
  top: 5px;
  right: 8px;
  height: 12px !important;
  font-size: 10px !important;

  top: 85px;
  right: 12px;

  span {
    padding: 2px 4px !important;
  }

  opacity: 90% !important;
`;
