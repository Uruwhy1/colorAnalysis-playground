document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("video");
  let currentDominant = null;

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      alert("No camera 🤔.");
    });

  setInterval(() => {
    currentDominant = getColor(video);

    if (currentDominant) {
      const sides = ["top", "right", "bottom", "left"];
      const halves = ["first", "second"];

      sides.forEach((side) => {
        halves.forEach((half) => {
          const span = document.querySelector(`.side.${side} > .${half}`);
          if (span) {
            span.style.setProperty("--shadow", currentDominant[side][half]);
          }
        });
      });
    }
  }, 100);
});

function lightOrDark(color) {
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    document.documentElement.style.setProperty("--background", "#303030");
  } else {
    document.documentElement.style.setProperty("--background", "#EEE");
  }
}
