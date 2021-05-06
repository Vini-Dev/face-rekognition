import { FC, useRef } from 'react';

import * as blazeFace from '@tensorflow-models/blazeface';
import Webcam from 'react-webcam';

import { Container, FaceBox } from './styles';

const Camera: FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const faceBoxRef = useRef<HTMLDivElement>(null);

  const faceDetect = async (model, video, canvas) => {
    if (!faceBoxRef.current) {
      return false;
    }

    const faces = await model.estimateFaces(video, false);

    const context = canvas.getContext('2d');

    faces.forEach((face) => {
      const top = Math.round(face.topLeft[0].toFixed(2));
      const left = Math.round(face.topLeft[1].toFixed(2));
      const bottom = Math.round(face.bottomRight[0].toFixed(2));
      const right = Math.round(face.bottomRight[1].toFixed(2));

      // const probability = face.probability[0];

      const width = right - left;
      const height = bottom - top;

      context.beginPath();
      context.strokeStyle = 'green';
      context.lineWidth = 2;
      context.rect(top, left, width, height);
      context.stroke();
    });

    setTimeout(() => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }, 100);
  };

  const handleOnPlay = async () => {
    if (!webcamRef?.current?.video || !faceBoxRef.current) {
      return false;
    }
    console.log('Play');

    const { video } = webcamRef.current;
    const { videoWidth, videoHeight } = video;

    const canvas = document.createElement('canvas');

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    faceBoxRef.current?.appendChild(canvas);

    const model = await blazeFace.load();

    setInterval(async () => {
      await faceDetect(model, video, canvas);
    }, 100);
  };

  return (
    <Container>
      <FaceBox ref={faceBoxRef} />
      <Webcam
        ref={webcamRef}
        className="webcam"
        audio={false}
        mirrored
        screenshotFormat="image/jpeg"
        onPlay={handleOnPlay}
      />
    </Container>
  );
};

export default Camera;
