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
    top: { first: [], second: [] },
    right: { first: [], second: [] },
    bottom: { first: [], second: [] },
    left: { first: [], second: [] },
  };

  const topBottomSideWidth = height * 0.2;
  const leftRightSideWidth = width * 0.2;

  // top
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < topBottomSideWidth; y++) {
      let index = (y * width + x) * 4;
      const color = `rgba(${imageData[index]}, ${imageData[index + 1]}, ${
        imageData[index + 2]
      }, 0.7)`;
      if (x < width / 2) {
        sides.top.first.push(color);
      } else {
        sides.top.second.push(color);
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
      if (y < height / 2) {
        sides.right.first.push(color);
      } else {
        sides.right.second.push(color);
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
      if (x < width / 2) {
        sides.bottom.first.push(color);
      } else {
        sides.bottom.second.push(color);
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
      if (y < height / 2) {
        sides.left.first.push(color);
      } else {
        sides.left.second.push(color);
      }
    }
  }

  const dominantColors = {};
  for (const side in sides) {
    dominantColors[side] = {
      first: getDominantColorFromArray(sides[side].first),
      second: getDominantColorFromArray(sides[side].second),
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
