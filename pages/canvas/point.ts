import { PI2 } from "../../utils/Math";

export interface IPoint {
  pointCenterX: number;
  pointCenterY: number;
  animate: (ctx: CanvasRenderingContext2D) => void;
}

export class Point implements IPoint {
  pointCenterX: number;
  pointCenterY: number;
  private radian: number;
  private CENTER_LINE: number;
  private VELOCITY: number;
  private AMPLITUDE: number;
  private POINT_RADIUS: number;

  constructor(
    POINT_GAP: number,
    index: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this.pointCenterX = POINT_GAP * index;
    this.radian = index * 0.38;
    this.CENTER_LINE = canvasHeight / 3;
    this.VELOCITY = 0.008;
    this.AMPLITUDE = canvasHeight / 14;
    this.POINT_RADIUS =
      canvasWidth / 370 > 5.8
        ? 5.8
        : canvasWidth / 370 < 2.5
        ? 2.5
        : canvasWidth / 370;

    this.pointCenterY =
      this.AMPLITUDE * Math.sin(this.radian) + this.CENTER_LINE;
  }

  animate(ctx: CanvasRenderingContext2D) {
    this.radian += this.VELOCITY;
    this.pointCenterY =
      this.AMPLITUDE * Math.sin(this.radian) + this.CENTER_LINE;

    ctx.beginPath();
    ctx.fillStyle = "rgb(245, 215, 77)";
    ctx.arc(this.pointCenterX, this.pointCenterY, this.POINT_RADIUS, 0, PI2);
    ctx.fill();
  }
}
