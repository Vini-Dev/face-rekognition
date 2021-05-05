import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin: 24px;
`;

export const Video = styled.video`
  border-radius: 8px;
  transform: scaleX(-1);
`;

export const FaceBox = styled.div`
  position: absolute;
  left: 15%;
  top: 50%;

  transform: translateY(-50%);

  width: 20%;
  height: 70%;
  border-radius: 40px;

  border: 3px solid #ffffff;

  z-index: 1;
`;

export const Canvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: 1;
  transform: scaleX(-1);
`;
