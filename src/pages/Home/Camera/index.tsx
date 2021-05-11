import { FC, useRef } from 'react';

import * as blazeFace from '@tensorflow-models/blazeface';
// import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';

import { Container, FaceBox } from './styles';

const Camera: FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const faceBoxRef = useRef<HTMLDivElement>(null);

  const getVideoConstraints = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    const isMobile = toMatch.some((toMatchItem) =>
      toMatchItem.test(navigator.userAgent)
    );

    console.log(window.innerWidth);
    return isMobile
      ? {
          width: window.innerWidth,
          height: window.innerHeight - 60,
        }
      : {
          width: 720,
          height: 539,
        };
  };

  const faceDetect = async (model, video, canvas, context) => {
    if (!faceBoxRef.current) {
      return false;
    }

    const faces = await model.estimateFaces(video, false);

    faces.forEach((face) => {
      const top = Math.round(face.topLeft[0]);
      const left = Math.round(face.topLeft[1]);
      const bottom = Math.round(face.bottomRight[0]);
      const right = Math.round(face.bottomRight[1]);

      // const probability = face.probability[0];

      const width = right - left;
      const height = bottom - top;

      context.beginPath();
      context.strokeStyle = '#30D158';
      context.lineWidth = 3;
      context.rect(top * 1.05, left * 0.9, width, height);
      context.stroke();

      // const prob = (probability * 100).toPrecision(5).toString();
      // const text = prob + '%';
      // context.fillStyle = 'red';
      // context.font = '13px sans-serif';
      // context.fillText(text, top + 5, left + 20);
    });
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

    const context = canvas.getContext('2d');

    const model = await blazeFace.load();

    setInterval(async () => {
      // console.log(tf.memory());
      context?.clearRect(0, 0, canvas.width, canvas.height);
      await faceDetect(model, video, canvas, context);
    }, 200);
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
        videoConstraints={{
          ...getVideoConstraints(),
          facingMode: 'user',
        }}
      />
    </Container>
  );
};

export default Camera;