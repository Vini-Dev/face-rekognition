import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;

  .webcam {
    border-radius: 16px;
  }
`;

export const FaceBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transform: scaleX(-1);
  z-index: 10;
`;
