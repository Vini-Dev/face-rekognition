import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;

  @media (min-width: 768px) {
    .webcam {
      border-radius: 16px;
    }
  }
`;

export const FaceBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 10;

  canvas {
    top: 0;
    left: 0;

    position: absolute;
  }
`;
