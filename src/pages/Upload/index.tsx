import { FC, useRef, useState } from 'react';

import * as blazeFace from '@tensorflow-models/blazeface';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import {
  Container,
  ImportButton,
  ImageCard,
  ImageCardCover,
  ImageCardCoverCanvas,
  InputFile,
  ImageGrid,
} from './styles';

interface CoverRefI {
  canvas: HTMLCanvasElement;
  img: HTMLImageElement;
}

const Upload: FC = () => {
  const [buffers, setBuffers] = useState<any>([]);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const coverRefs = useRef<CoverRefI[]>([]);

  const drawObjects = (predictions, context) => {
    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction['bbox'];
      const text = prediction['class'];

      // Style
      context.strokeStyle = '#007AFF';
      context.fillStyle = '#5956D6';
      context.font = '13px sans-serif';

      // Boxes
      context.beginPath();
      context.fillText(text, x, y);
      context.rect(x, y, width, height);
      context.stroke();
    });
  };

  const drawFaces = (faces, context) => {
    faces.forEach((face) => {
      const top = face.topLeft[0];
      const left = face.topLeft[1];
      const bottom = face.bottomRight[0];
      const right = face.bottomRight[1];

      const width = right - left;
      const height = bottom - top;

      context.beginPath();
      context.strokeStyle = '#30D158';
      context.lineWidth = 3;
      context.rect(top, left, width, height);
      context.stroke();

      if (face?.probability) {
        const prob = (face.probability[0] * 100).toPrecision(5).toString();
        const text = prob + '%';
        context.fillStyle = '#FF3B30';
        context.font = '13px sans-serif';
        context.fillText(text, top + 5, left + 20);
      }
    });
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleOnClickImportButton = () => {
    inputFileRef.current?.click();
  };

  const handleOnChangeInputFile = async () => {
    try {
      const inputFiles = inputFileRef.current?.files || [];

      const loadedFiles = Array.from(inputFiles)?.map(
        async (file) => await readFile(file)
      );

      const bufferedFiles = await Promise.allSettled(loadedFiles);
      const bufferedFilesFulfilled = bufferedFiles.filter(
        ({ status }) => status === 'fulfilled'
      );

      setBuffers(bufferedFilesFulfilled);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnLoadImage = async (event) => {
    const img = event.target;
    const canvas = coverRefs.current[img.id].canvas;

    const context = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;

    if (!context) {
      return false;
    }

    context.drawImage(img, 0, 0, img.width, img.height);

    const blazeFaceModel = await blazeFace.load();
    const faces = await blazeFaceModel.estimateFaces(img, false, true);

    drawFaces(faces, context);

    const cocoSsdModel = await cocoSsd.load();
    const objects = await cocoSsdModel.detect(img);

    console.log({ faces, objects });
    drawObjects(objects, context);
  };

  return (
    <Container>
      <ImportButton onClick={handleOnClickImportButton}>Import</ImportButton>
      <InputFile ref={inputFileRef} onChange={handleOnChangeInputFile} />
      <ImageGrid>
        {buffers.map(({ value }, index) => (
          <ImageCard key={index}>
            <ImageCardCover
              ref={(element) => {
                console.log();
                coverRefs.current[index] = {
                  ...(coverRefs.current[index] || {}),
                  img: element as HTMLImageElement,
                };
              }}
              id={index}
              src={value}
              onLoad={handleOnLoadImage}
            />
            <ImageCardCoverCanvas
              ref={(element) => {
                coverRefs.current[index] = {
                  ...(coverRefs.current[index] || {}),
                  canvas: element as HTMLCanvasElement,
                };
              }}
            />
          </ImageCard>
        ))}
      </ImageGrid>
    </Container>
  );
};

export default Upload;
