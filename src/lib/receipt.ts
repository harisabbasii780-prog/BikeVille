import type { Order } from './orders';
import { formatPKR } from './format';

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(' ');
  let line = '';
  let cursorY = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) {
    ctx.fillText(line, x, cursorY);
    cursorY += lineHeight;
  }
  return cursorY;
}

const INK = '#050505';
const CHAR = '#151515';
const LINE = '#2a2a2a';
const ORANGE = '#ff5a00';
const WHITE = '#f5f5f5';
const MUTED = 'rgba(245,245,245,0.45)';

const WIDTH = 960;
const PADDING = 64;
const ROW_HEIGHT = 40;

/** Draws the full receipt onto ctx starting at y=0 and returns the total content height used. */
function render(ctx: CanvasRenderingContext2D, order: Order, bikeImg: HTMLImageElement | null): number {
  ctx.textBaseline = 'alphabetic';

  // background (safe to fill an oversized rect — canvas clips automatically)
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, WIDTH, 100000);
  ctx.fillStyle = ORANGE;
  ctx.fillRect(0, 0, WIDTH, 8);

  let y = 64;

  ctx.font = '800 34px Arial, sans-serif';
  ctx.fillStyle = WHITE;
  ctx.fillText('BIKE', PADDING, y);
  const bikeWidth = ctx.measureText('BIKE').width;
  ctx.fillStyle = ORANGE;
  ctx.fillText('VILLE', PADDING + bikeWidth, y);

  ctx.font = '700 12px Arial, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText('ORDER RECEIPT', WIDTH - PADDING - ctx.measureText('ORDER RECEIPT').width, y - 22);
  ctx.font = '700 16px Arial, sans-serif';
  ctx.fillStyle = ORANGE;
  ctx.fillText(order.id, WIDTH - PADDING - ctx.measureText(order.id).width, y + 4);

  y += 20;
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PADDING, y);
  ctx.lineTo(WIDTH - PADDING, y);
  ctx.stroke();

  // status badge + date
  y += 46;
  const badgeText = 'PAYMENT CONFIRMED';
  ctx.font = '700 12px Arial, sans-serif';
  const badgeWidth = ctx.measureText(badgeText).width + 28;
  const badgeHeight = 26;
  const badgeX = PADDING;
  const badgeY = y - 18;
  const r = 13;
  ctx.fillStyle = 'rgba(46, 204, 113, 0.15)';
  ctx.beginPath();
  ctx.moveTo(badgeX + r, badgeY);
  ctx.arcTo(badgeX + badgeWidth, badgeY, badgeX + badgeWidth, badgeY + badgeHeight, r);
  ctx.arcTo(badgeX + badgeWidth, badgeY + badgeHeight, badgeX, badgeY + badgeHeight, r);
  ctx.arcTo(badgeX, badgeY + badgeHeight, badgeX, badgeY, r);
  ctx.arcTo(badgeX, badgeY, badgeX + badgeWidth, badgeY, r);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#2ecc71';
  ctx.fillText(badgeText, badgeX + 14, y - 1);

  ctx.font = '600 13px Arial, sans-serif';
  ctx.fillStyle = MUTED;
  const dateStr = new Date(order.createdAt).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  ctx.fillText(dateStr, WIDTH - PADDING - ctx.measureText(dateStr).width, y - 1);

  // bike card
  y += 44;
  ctx.fillStyle = CHAR;
  ctx.fillRect(PADDING, y, WIDTH - PADDING * 2, 96);

  if (bikeImg) {
    const boxSize = 80;
    const ratio = Math.min(boxSize / bikeImg.width, boxSize / bikeImg.height);
    const dw = bikeImg.width * ratio;
    const dh = bikeImg.height * ratio;
    ctx.drawImage(bikeImg, PADDING + 16 + (boxSize - dw) / 2, y + 8 + (boxSize - dh) / 2, dw, dh);
  }

  ctx.font = '800 20px Arial, sans-serif';
  ctx.fillStyle = WHITE;
  ctx.fillText(order.bikeName, PADDING + 116, y + 42);
  ctx.font = '600 13px Arial, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText('Configured build', PADDING + 116, y + 64);

  // configuration rows
  y += 96 + 40;
  ctx.font = '700 11px Arial, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText('BUILD CONFIGURATION', PADDING, y);
  y += 20;

  ctx.font = '600 14px Arial, sans-serif';
  for (const line of order.configuration) {
    ctx.strokeStyle = LINE;
    ctx.beginPath();
    ctx.moveTo(PADDING, y + 12);
    ctx.lineTo(WIDTH - PADDING, y + 12);
    ctx.stroke();

    ctx.fillStyle = MUTED;
    ctx.fillText(line.label, PADDING, y + 8);
    ctx.fillStyle = WHITE;
    const valueWidth = ctx.measureText(line.value).width;
    ctx.fillText(line.value, WIDTH - PADDING - valueWidth, y + 8);
    y += ROW_HEIGHT;
  }

  // total
  y += 8;
  ctx.fillStyle = 'rgba(255,90,0,0.08)';
  ctx.fillRect(PADDING, y, WIDTH - PADDING * 2, 64);
  ctx.font = '700 12px Arial, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText('TOTAL PAID', PADDING + 20, y + 26);
  ctx.font = '800 26px Arial, sans-serif';
  ctx.fillStyle = ORANGE;
  const totalStr = formatPKR(order.total);
  ctx.fillText(totalStr, WIDTH - PADDING - 20 - ctx.measureText(totalStr).width, y + 44);
  ctx.font = '600 12px Arial, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText(order.paymentMethod, PADDING + 20, y + 48);
  y += 64;

  // customer + delivery
  y += 40;
  ctx.strokeStyle = LINE;
  ctx.beginPath();
  ctx.moveTo(PADDING, y);
  ctx.lineTo(WIDTH - PADDING, y);
  ctx.stroke();
  y += 30;

  ctx.font = '700 11px Arial, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText('DELIVER TO', PADDING, y);
  y += 22;
  ctx.font = '700 15px Arial, sans-serif';
  ctx.fillStyle = WHITE;
  ctx.fillText(order.customer.name, PADDING, y);
  y += 22;
  ctx.font = '500 13px Arial, sans-serif';
  ctx.fillStyle = MUTED;
  y = wrapText(ctx, `${order.customer.address}, ${order.customer.city}`, PADDING, y, WIDTH - PADDING * 2, 18);
  ctx.fillText(order.customer.phone, PADDING, y);
  y += 20;
  ctx.fillText(order.customer.email, PADDING, y);
  y += 34;

  ctx.font = '600 13px Arial, sans-serif';
  ctx.fillStyle = ORANGE;
  ctx.fillText(`Estimated delivery within ${order.deliveryEstimateDays} working days`, PADDING, y);
  y += 48;

  ctx.font = '500 11px Arial, sans-serif';
  ctx.fillStyle = MUTED;
  const footer = 'Thank you for riding with BIKEVILLE \u2014 0313 5586 0440 \u00b7 harisabbasii7886@gmail.com';
  ctx.fillText(footer, PADDING, y);
  y += 32;

  return y;
}

export async function downloadReceiptImage(order: Order): Promise<void> {
  const bikeImg = await loadImage(order.bikeImage);

  // measurement pass — draws onto an oversized offscreen canvas purely to learn the final height
  const measure = document.createElement('canvas');
  measure.width = WIDTH;
  measure.height = 4000;
  const measureCtx = measure.getContext('2d');
  if (!measureCtx) return;
  const contentHeight = render(measureCtx, order, bikeImg);

  // real pass — properly sized, crisp on retina
  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH * scale;
  canvas.height = contentHeight * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(scale, scale);
  render(ctx, order, bikeImg);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${order.id}-receipt.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, 'image/png');
}
