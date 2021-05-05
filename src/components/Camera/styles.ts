import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  max-width: 640px;

  .webcam {
    width: 100%;
    border-radius: 16px;
  }
`;

export const FaceBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border: 2px solid #ffffff;

  z-index: 1;

  div {
    position: absolute;
    border: 1px solid green;
    color: green;
    transform: translateX(-100%);
  }
`;
