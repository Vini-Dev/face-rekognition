import { FC, useEffect, useRef } from 'react';

import * as blazeFace from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';

import { Container, FaceBox } from './styles';

const Camera: FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const faceBoxRef = useRef<HTMLDivElement>(null);

  const faceDetect = async (model, video) => {
    if (!faceBoxRef.current) {
      return false;
    }

    const faces = await model.estimateFaces(video, false);

    faces.forEach((face) => {
      const top = face.topLeft[0].toFixed(2);
      const left = face.topLeft[1].toFixed(2);
      const bottom = face.bottomRight[0].toFixed(2);
      const right = face.bottomRight[1].toFixed(2);

      const probability = face.probability[0];

      const width = right - left;
      const height = bottom - top;

      const box = document.createElement('div');

      box.style.top = `${top - height}px`;
      box.style.left = `${left - width}px`;
      box.style.width = `${width}px`;
      box.style.height = `${height}px`;
      box.innerText = probability.toFixed(2).toString();

      faceBoxRef.current?.appendChild(box);
    });

    // setTimeout(() => {
    //   if (faceBoxRef.current) {
    //     faceBoxRef.current.innerHTML = '';
    //   }
    // }, 200);
  };

  const handleOnPlay = async () => {
    if (!webcamRef?.current?.video || !faceBoxRef.current) {
      return false;
    }
    console.log('Play');

    const { video } = webcamRef.current;
    const { videoHeight, videoWidth } = video;

    const model = await blazeFace.load();

    // setInterval(async () => {
    await faceDetect(model, video);
    // }, 200);
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
