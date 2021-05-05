import { FC, useEffect, useRef } from 'react';

import { Canvas, Container, Video } from './styles';

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

    getWebcam();
  }, [videoRef]);

  const handleOnPlay = async () => {
    console.log('Play');
  };

  return (
    <Container>
      <Canvas ref={canvasRef} />
      <Video ref={videoRef} autoPlay muted onPlay={handleOnPlay} />
    </Container>
  );
};

export default Camera;
