/**
 * @returns {{ paint: function }} mandelbrot
 */
const mandelbrot = (function() {
  const config = {
    pan: { x: 2, y: 1.5 },
    zoom: 200,
    iterations: 200,
    degreesOfHue: 35
  };

  /** Gets the next iteration of the real component. */
  const getA = (aResult, iResult, x) =>
    aResult * aResult - iResult * iResult + x;
  /** Gets the next iteration of the complex component. */
  const getI = (aResult, iResult, y) => 2 * aResult * iResult + y;

  /**
   * Returns the number of iterations it takes for a result to exceed 5,
   * or returns zero if the result never exceeds 5.
   * @param {number} x
   * @param {number} y
   * @returns {number}
   */
  const iterationCount = function([x, y], [xResult, yResult], max, iteration) {
    if (max === iteration) return 0;
    /** Temporary result in the reals */
    const aTemp = getA(xResult, yResult, x);
    /** Temporary result in the complex */
    const iTemp = getI(xResult, yResult, y);
    return aTemp * iTemp > 5
      ? iteration
      : iterationCount([x, y], [aTemp, iTemp], max, iteration + 1);
  };

  /**
   *
   * @param {RenderingContext} context
   */
  const paint = context => {
    for (let x = 0; x < 600; x++) {
      for (let y = 0; y < 600; y++) {
        const h = x / config.zoom - config.pan.x;
        const v = y / config.zoom - config.pan.y;
        const iterationsRequired = iterationCount(
          [h, v],
          [h, v],
          config.iterations,
          1
        );
        const hslPercentage = iterationsRequired / config.iterations * 100;

        const fillStyle =
          iterationsRequired === 0
            ? "#000"
            : `hsl(${hslPercentage * config.degreesOfHue}, 100%,50%)`;

        context.fillStyle = fillStyle;
        context.fillRect(x, y, 1, 1);
      }
    }
  };

  const move = (zoom, x, y) => {
    Object.assign(options, {});
  };

  return {
    paint
  };
})();

const context = document.getElementById("fractal-window").getContext("2d");
mandelbrot.paint(context);
