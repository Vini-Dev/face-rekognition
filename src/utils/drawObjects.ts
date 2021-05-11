// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const drawObjects = (predictions, context): void => {
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

export default drawObjects;
