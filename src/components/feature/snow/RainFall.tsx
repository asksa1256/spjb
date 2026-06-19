import { useEffect, useRef } from "react";

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

interface RainFallProps {
  dropCount: number;
  speed: number;
}

const createDrop = (width: number, height: number, speedRatio: number): RainDrop => ({
  x: Math.random() * width,
  y: Math.random() * height,
  length: 14 + Math.random() * 18,
  speed: (4 + Math.random() * 4) * speedRatio,
  opacity: 0.25 + Math.random() * 0.35,
  width: 0.8 + Math.random() * 0.8,
});

export default function RainFall({ dropCount, speed }: RainFallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const speedRatio = speed / 50;
    let drops = Array.from({ length: dropCount }, () =>
      createDrop(width, height, speedRatio),
    );

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drops = Array.from({ length: dropCount }, () =>
        createDrop(width, height, speedRatio),
      );
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.lineCap = "round";

      for (const drop of drops) {
        context.strokeStyle = `rgba(186, 230, 253, ${drop.opacity})`;
        context.lineWidth = drop.width;
        context.beginPath();
        context.moveTo(drop.x, drop.y);
        context.lineTo(drop.x, drop.y + drop.length);
        context.stroke();

        drop.y += drop.speed;

        if (drop.y > height + drop.length) {
          Object.assign(drop, createDrop(width, height, speedRatio));
          drop.y = -drop.length;
        }
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [dropCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
