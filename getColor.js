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

  const width = canvas.width;
  const height = canvas.height;

  const sides = {
    top: { 1: [], 2: [], 3: [], 4: [] },
    right: { 1: [], 2: [], 3: [], 4: [] },
    bottom: { 1: [], 2: [], 3: [], 4: [] },
    left: { 1: [], 2: [], 3: [], 4: [] },
  };

  const topBottomSideWidth = height * 0.2;
  const leftRightSideWidth = width * 0.2;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < topBottomSideWidth; y++) {
      let index = (y * width + x) * 4;
      const color = `rgba(${imageData[index]}, ${imageData[index + 1]}, ${
        imageData[index + 2]
      }, 0.7)`;
      if (x < width / 4) {
        sides.top[1].push(color);
      } else if (x < width / 2) {
        sides.top[2].push(color);
      } else if (x < (width * 3) / 4) {
        sides.top[3].push(color);
      } else {
        sides.top[4].push(color);
      }
    }
  }

  // right
  for (let y = 0; y < height; y++) {
    for (let x = width - leftRightSideWidth; x < width; x++) {
      let index = (y * width + x) * 4;
      const color = `rgba(${imageData[index]}, ${imageData[index + 1]}, ${
        imageData[index + 2]
      }, 0.7)`;
      if (y < height / 4) {
        sides.right[1].push(color);
      } else if (y < height / 2) {
        sides.right[2].push(color);
      } else if (y < (height * 3) / 4) {
        sides.right[3].push(color);
      } else {
        sides.right[4].push(color);
      }
    }
  }

  // bottom
  for (let x = 0; x < width; x++) {
    for (let y = height - topBottomSideWidth; y < height; y++) {
      let index = (y * width + x) * 4;
      const color = `rgba(${imageData[index]}, ${imageData[index + 1]}, ${
        imageData[index + 2]
      }, 0.7)`;
      if (x < width / 4) {
        sides.bottom[1].push(color);
      } else if (x < width / 2) {
        sides.bottom[2].push(color);
      } else if (x < (width * 3) / 4) {
        sides.bottom[3].push(color);
      } else {
        sides.bottom[4].push(color);
      }
    }
  }

  // left
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < leftRightSideWidth; x++) {
      let index = (y * width + x) * 4;
      const color = `rgba(${imageData[index]}, ${imageData[index + 1]}, ${
        imageData[index + 2]
      }, 0.7)`;
      if (y < height / 4) {
        sides.left[1].push(color);
      } else if (y < height / 2) {
        sides.left[2].push(color);
      } else if (y < (height * 3) / 4) {
        sides.left[3].push(color);
      } else {
        sides.left[4].push(color);
      }
    }
  }

  const dominantColors = {};
  for (const side in sides) {
    dominantColors[side] = {
      "part-1": getDominantColorFromArray(sides[side][1]),
      "part-2": getDominantColorFromArray(sides[side][2]),
      "part-3": getDominantColorFromArray(sides[side][3]),
      "part-4": getDominantColorFromArray(sides[side][4]),
    };
  }

  return dominantColors;
}

function getDominantColorFromArray(colors) {
  let totalRed = 0;
  let totalGreen = 0;
  let totalBlue = 0;

  for (const color of colors) {
    const rgbaMatch = color.match(/rgba\((\d+), (\d+), (\d+), [\d.]+\)/);
    if (rgbaMatch) {
      totalRed += parseInt(rgbaMatch[1], 10);
      totalGreen += parseInt(rgbaMatch[2], 10);
      totalBlue += parseInt(rgbaMatch[3], 10);
    }
  }

  const numColors = colors.length;
  const averageRed = Math.round(totalRed / numColors);
  const averageGreen = Math.round(totalGreen / numColors);
  const averageBlue = Math.round(totalBlue / numColors);

  const mixedColor = `rgba(${averageRed}, ${averageGreen}, ${averageBlue}, 1)`;
  return mixedColor;
}
