function getColor(video) {
  if (!video || !video.videoWidth || !video.videoHeight) {
    console.error("Video element not valid or dimensions not available.");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  const imageData = ctx.getImageData(
    0,
    0,
    video.videoWidth,
    video.videoHeight
  ).data;

  const colorCounts = {};

  for (let i = 0; i < imageData.length; i += 4) {
    const color = `rgba(${imageData[i]}, ${imageData[i + 1]}, ${
      imageData[i + 2]
    }, 1)`;
    colorCounts[color] = (colorCounts[color] || 0) + 1;
  }

  let dominantColor = null;
  let maxCount = 0;

  for (const color in colorCounts) {
    if (colorCounts[color] > maxCount) {
      dominantColor = color;
      maxCount = colorCounts[color];
    }
  }

  return dominantColor;
}
