import { FC, useEffect, useRef } from 'react';

import * as faceApi from 'face-api.js';

import { Canvas, Container, FaceBox, Video } from './styles';

const FACE_API_MODELS_PATH = '/face-api/models';

const Camera: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getWebcam = async () => {
      console.log(Object.keys(navigator));
      const devices = await navigator?.mediaDevices?.enumerateDevices();

      if (!Array.isArray(devices)) {
        return alert('Cam not available!');
      }

      const videoInput = devices.find(({ kind }) => kind === 'videoinput');

      if (!videoInput) {
        return alert('Cam not available!');
      }

      const camera = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: videoInput?.deviceId,
        },
      });

      if (videoRef.current && camera) {
        videoRef.current.srcObject = camera;
      }
    };

    Promise.allSettled([
      faceApi.nets.tinyFaceDetector.loadFromUri(FACE_API_MODELS_PATH),
    ]).then(getWebcam);
  }, [videoRef]);

  const handleOnPlay = async () => {
    if (!videoRef.current || !canvasRef.current) {
      return;
    }

    console.log('PLAY');

    const canvas = faceApi.createCanvasFromMedia(videoRef.current);

    const canvasSize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    };

    faceApi.matchDimensions(canvas, canvasSize);

    canvasRef.current.innerHTML = '';
    canvasRef.current.appendChild(canvas);

    setInterval(async () => {
      if (!videoRef.current) {
        return console.log('Input video not working');
      }

      const detections = await faceApi.detectAllFaces(
        videoRef.current,
        new faceApi.TinyFaceDetectorOptions()
      );

      const resizedDetections = faceApi.resizeResults(detections, canvasSize);

      faceApi.draw.drawDetections(canvas, resizedDetections);

      setTimeout(() => {
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
      }, 9900);
    }, 10000);
  };

  return (
    <Container>
      <Canvas ref={canvasRef} />
      <Video ref={videoRef} autoPlay muted />
    </Container>
  );
};

export default Camera;
