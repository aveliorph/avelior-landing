// Browser-only QR helpers. The qrcode library is loaded on demand so it never runs during SSR.
type QrLib = typeof import("qrcode");

let qrLib: Promise<QrLib> | null = null;

export function loadQr(): Promise<QrLib> {
  if (!qrLib) {
    qrLib = import("qrcode")
      .then((m) => ((m as unknown as { default?: QrLib }).default ?? m) as QrLib)
      .catch((e) => {
        qrLib = null;
        throw e;
      });
  }
  return qrLib;
}

export async function qrSvg(text: string, dark = "#111111", light = "#ffffff") {
  const Q = await loadQr();
  return Q.toString(text, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 0,
    color: { dark, light },
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 4000);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Renders an AVELIOR-branded QR poster (PNG) from a link or an uploaded QR image. */
export async function downloadQrPoster(opts: { title: string; text?: string; image?: string }) {
  const W = 1080;
  const H = 1350;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  if (!ctx) return;
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#1b1b1b");
  bg.addColorStop(1, "#050505");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#f5f5f5";
  ctx.textAlign = "center";
  ctx.font = '800 54px "Archivo", "Helvetica Neue", Arial, sans-serif';
  if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "18px";
  ctx.fillText("AVELIOR", W / 2 + 9, 180);
  if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "0px";
  const tile = 700;
  const tx = (W - tile) / 2;
  const ty = 260;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(tx, ty, tile, tile, 44);
  else ctx.rect(tx, ty, tile, tile);
  ctx.fill();

  if (opts.image) {
    const img = await loadImage(opts.image);
    const box = tile - 100;
    const scale = Math.min(box / img.width, box / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    ctx.drawImage(img, tx + 50 + (box - w) / 2, ty + 50 + (box - h) / 2, w, h);
  } else if (opts.text) {
    const Q = await loadQr();
    const qc = document.createElement("canvas");
    await Q.toCanvas(qc, opts.text, {
      errorCorrectionLevel: "M",
      margin: 0,
      width: tile - 100,
      color: { dark: "#111111", light: "#ffffff" },
    });
    ctx.drawImage(qc, tx + 50, ty + 50, tile - 100, tile - 100);
  }

  ctx.fillStyle = "#f5f5f5";
  ctx.font = '600 76px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(opts.title, W / 2, 1100);
  const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/png"));
  if (blob) downloadBlob(blob, opts.title.replace(/[^\w -]+/g, "") + "-AVELIOR-QR.png");
}
