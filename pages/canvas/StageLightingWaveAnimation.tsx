import type { FC } from "react";
import useCanvas from "../../hooks/useCanvas";
import { ILightSource, LightSource } from "./light-source";
import { IPoint, Point } from "./point";

type StageLightingWaveAnimationProps = {
  canvasWidth: number;
  canvasHeight: number;
};

const StageLightingWaveAnimation: FC<StageLightingWaveAnimationProps> = ({
  canvasWidth,
  canvasHeight,
}) => {
  const fillBackGround = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgb(20, 20 ,24)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const lightSource: ILightSource = new LightSource(canvasWidth, canvasHeight);
  let points: IPoint[] = [];
  const initPoints = () => {
    const POINT_NUMBER = canvasWidth / 28;
    const POINT_GAP = canvasWidth / POINT_NUMBER;

    for (let i = 0; i <= POINT_NUMBER; i++) {
      const point: IPoint = new Point(POINT_GAP, i, canvasWidth, canvasHeight);
      points.push(point);
    }
  };

  if (canvasWidth !== 0 && canvasHeight !== 0) {
    initPoints();
  }

  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    fillBackGround(ctx);
    lightSource.drawRadialGradientBehindLightSource(ctx);
    lightSource.drawLightSource(ctx);

    for (let i = 0; i < points.length; i++) {
      lightSource.drawLightLines(
        ctx,
        points[i].pointCenterX,
        points[i].pointCenterY
      );

      points[i].animate(ctx);
    }
  };

  const canvasRef = useCanvas({
    canvasWidth,
    canvasHeight,
    animate,
  });

  return <canvas ref={canvasRef} />;
};
export default StageLightingWaveAnimation;
