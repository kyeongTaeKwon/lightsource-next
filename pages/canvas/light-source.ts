import { PI2 } from "../../utils/Math";

export interface ILightSource {
  drawRadialGradientBehindLightSource: (ctx: CanvasRenderingContext2D) => void;
  drawLightSource: (ctx: CanvasRenderingContext2D) => void;
  drawLightLines: (
    ctx: CanvasRenderingContext2D,
    pointCenterX: number,
    pointCenterY: number
  ) => void;
}

export class LightSource implements ILightSource {
  private centerX: number;
  private centerY: number;
  private radius: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 1.2;
    this.radius =
      canvasWidth / 48 > 48
        ? 48
        : canvasWidth / 48 < 24
        ? 24
        : canvasWidth / 48;
  }

  drawRadialGradientBehindLightSource(ctx: CanvasRenderingContext2D) {
    const gradientRadius = this.radius * 16;
    const gradient = ctx.createRadialGradient(
      this.centerX,
      this.centerY,
      0,
      this.centerX,
      this.centerY,
      gradientRadius
    );

    gradient.addColorStop(0, "rgb(245, 215, 77, 0.2");
    gradient.addColorStop(1, "rgb(36, 35, 36, 0.05");

    ctx.fillStyle = gradient;
    ctx.arc(this.centerX, this.centerY, gradientRadius, 0, PI2);
    ctx.fill();
  }

  drawLightSource(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "rgb(245, 215, 77)";
    ctx.arc(this.centerX, this.centerY, this.radius / 1.5, 0, PI2);
    ctx.fill();
  }

  drawLightLines(
    ctx: CanvasRenderingContext2D,
    pointCenterX: number,
    pointCenterY: number
  ) {
    ctx.strokeStyle = "rgb(245, 215, 77, 0.06)";
    ctx.lineWidth = 1.5;
    ctx.moveTo(this.centerX, this.centerY - this.radius / 1.5);
    ctx.lineTo(pointCenterX, pointCenterY);
    ctx.stroke();
  }
}
