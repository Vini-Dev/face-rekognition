// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const drawFaces = (faces, context): void => {
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

export default drawFaces;
