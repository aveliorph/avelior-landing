import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { CopyIcon } from "./icons";
import { qrSvg } from "./qr";

/** Where every "Get your card" button goes. */
export const ORDER_URL = "https://www.facebook.com/share/19mZFL7FU3/";

export function QrCode({ text, className = "qr-code" }: { text: string; className?: string }) {
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    setFailed(false);
    qrSvg(text)
      .then((s) => alive && setSvg(s))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [text]);

  return (
    <div className={className} role="img" aria-label="QR code">
      {svg ? (
        <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <span className="qr-loading">{failed ? "QR unavailable" : "Loading…"}</span>
      )}
    </div>
  );
}

export type PayMethod = {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/** Account name + number block with a copy button, shown under a payment QR. */
export function AccountNumber({ number, onCopied }: { number: string; onCopied?: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const done = () => {
      setCopied(true);
      onCopied?.();
      setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(number.replace(/\s+/g, "")).then(done, done);
    else done();
  };
  return (
    <div className="lp-acct-num">
      <span>{number}</span>
      <button type="button" className="lp-acct-copy" onClick={copy}>
        <CopyIcon />
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
