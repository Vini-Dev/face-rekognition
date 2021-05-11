import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 16px;
`;

export const ImportButton = styled.button.attrs((props) => ({
  ...props,
  type: 'button',
}))`
  font-weight: 400;
  font-size: 16px;
  height: 48px;
  padding: 0px 24px;

  color: #ffffff;
  background-color: #006ff2;
  border: 1px solid #006ff2;
  border-radius: 2px;

  transition: background-color 200ms linear, border-color 200ms linear;
`;

export const InputFile = styled.input.attrs((props) => ({
  ...props,
  multiple: true,
  type: 'file',
}))`
  display: none;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  grid-gap: 16px;

  margin-top: 16px;
`;

export const ImageCard = styled.div`
  border: 1px solid #333333;
  padding: 16px;
`;

export const ImageCardCover = styled.img`
  display: block;

  max-width: 100%;
  max-height: 200px;

  margin: 0 auto;
`;

export const ImageCardCoverCanvas = styled.canvas`
  display: block;
  margin: 0 auto;
`;
