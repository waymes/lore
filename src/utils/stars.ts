function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateInitialStarPoint(
  x: number,
  y: number,
  width: number,
  height: number
) {
  const genX = randomIntFromInterval(x, x + width);
  const genY = y + height;
  const size = randomIntFromInterval(1, 5);
  const speed = randomIntFromInterval(20, 40);
  const offsetStart = randomIntFromInterval(0, 25000);

  return { genX, genY, size, speed, offsetStart };
}

function applyNewStyles(
  star: HTMLElement,
  point: Partial<{ genX: number; genY: number; size: number }>,
  initialStyle = false
) {
  star.style.position = 'absolute';
  star.style.top = `${point.genY}px`;
  star.style.left = `${point.genX}px`;
  star.style.width = `${point.size}px`;
  star.style.height = `${point.size}px`;
  star.style.borderRadius = '50%';
  if (initialStyle) {
    star.style.background = `rgba(255,255,255,${randomIntFromInterval(
      0.4,
      0.7
    )})`;
  }
}

export const renderStars = (amount: number = 10, id: string) => {
  const arr = [];
  const root = document.getElementById(id);
  const { x, y, height, width } = root!.getBoundingClientRect();

  for (let i = 0; i < amount; i++) {
    const starDiv = document.createElement('div');
    starDiv.classList.add('star-item');
    const initialPoint = generateInitialStarPoint(x, y, width, height);
    const startAt = Date.now() + initialPoint.offsetStart;
    applyNewStyles(starDiv, initialPoint, true);
    root?.appendChild(starDiv);

    const interval = setInterval(() => {
      requestAnimationFrame(() => {
        const top = parseFloat(starDiv.style.top);
        if (Date.now() < startAt) {
          return;
        }
        if (top < y) {
          const newPoint = generateInitialStarPoint(x, y, width, height);
          applyNewStyles(starDiv, newPoint);
        } else {
          starDiv.style.top = `${parseFloat(starDiv.style.top) - 1}px`;
        }
      });
    }, initialPoint.speed);

    arr.push(interval);
  }
  return arr;
};
