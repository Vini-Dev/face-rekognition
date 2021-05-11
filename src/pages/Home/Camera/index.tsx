import { FC, useRef } from 'react';

import * as blazeFace from '@tensorflow-models/blazeface';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';
import drawFaces from 'src/utils/drawFaces';
import drawObjects from 'src/utils/drawObjects';

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

  const objectRekognition = async (cocoSsdModel, video, context) => {
    if (!faceBoxRef.current) {
      return false;
    }

    const objects = await cocoSsdModel.detect(video);
    drawObjects(objects, context);
  };

  const faceRekognition = async (blazeFaceModel, video, context) => {
    if (!faceBoxRef.current) {
      return false;
    }

    const faces = await blazeFaceModel.estimateFaces(video, false);
    drawFaces(faces, context);
  };

  const handleOnPlay = async () => {
    if (!webcamRef?.current?.video || !faceBoxRef.current) {
      return false;
    }
    console.log('Play');

    const { video } = webcamRef.current;
    const { videoWidth, videoHeight } = video;

    // Face Detection
    const faceCanvas = document.createElement('canvas');

    faceCanvas.width = videoWidth;
    faceCanvas.height = videoHeight;

    faceBoxRef.current?.appendChild(faceCanvas);

    const faceContext = faceCanvas.getContext('2d');

    const blazeFaceModel = await blazeFace.load();

    setInterval(async () => {
      // console.log(tf.memory());
      faceContext?.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
      await faceRekognition(blazeFaceModel, video, faceContext);
    }, 300);

    // Object Detection
    const cocoSsdModel = await cocoSsd.load();

    const objectCanvas = document.createElement('canvas');

    objectCanvas.width = videoWidth;
    objectCanvas.height = videoHeight;

    faceBoxRef.current?.appendChild(objectCanvas);

    const objectContext = objectCanvas.getContext('2d');

    setInterval(async () => {
      // console.log(tf.memory());
      objectContext?.clearRect(0, 0, objectCanvas.width, objectCanvas.height);
      await objectRekognition(cocoSsdModel, video, objectContext);
    }, 1000);
  };

  return (
    <Container>
      <FaceBox ref={faceBoxRef} />
      <Webcam
        ref={webcamRef}
        className="webcam"
        audio={false}
        // mirrored
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
