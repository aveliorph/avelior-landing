import { useEffect, useRef, useState } from "react";
import {
  AddContactIcon,
  ArrowUpRightIcon,
  BankIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  MayaIcon,
  QrIcon,
  QrSmallIcon,
  TikTokIcon,
  WalletIcon,
  WhatsAppIcon,
} from "./icons";
import { downloadBlob, downloadQrPoster } from "./qr";
import { AccountNumber, QrCode, type PayMethod } from "./shared";

type Theme = "black" | "white" | "pink";

const THEMES: { id: Theme; label: string; hint: string }[] = [
  { id: "black", label: "Black", hint: "Matte black luxury" },
  { id: "white", label: "White", hint: "Clean minimal" },
  { id: "pink", label: "Pink", hint: "Soft signature" },
];

const SOCIALS = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "TikTok", icon: TikTokIcon },
  { label: "LinkedIn", icon: LinkedInIcon },
  { label: "Portfolio", icon: GlobeIcon },
  { label: "WhatsApp", icon: WhatsAppIcon },
];

type DemoPay = PayMethod & { name: string; number: string; hint: string };

const PAYMENTS: DemoPay[] = [
  { id: "gcash", label: "GCash", icon: WalletIcon, name: "Sofia Reyes", number: "0917 123 4567", hint: "Scan with GCash to pay" },
  { id: "maya", label: "Maya", icon: MayaIcon, name: "Sofia Reyes", number: "0917 123 4567", hint: "Scan with Maya to pay" },
  { id: "bank", label: "BDO · Bank Transfer", icon: BankIcon, name: "Sofia M. Reyes", number: "0012 3456 7890", hint: "Scan with any banking app" },
];

type Sheet = { kind: "profile" } | { kind: "pay"; pay: DemoPay };

export function LiveDemo() {
  const [theme, setTheme] = useState<Theme>("black");
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOn, setToastOn] = useState(false);
  const [shareLabel, setShareLabel] = useState("Share link");
  const [siteUrl, setSiteUrl] = useState("https://avelior.app");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSiteUrl(window.location.origin + window.location.pathname);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (sheet && !d.open) {
      if (typeof d.showModal === "function") d.showModal();
      else d.setAttribute("open", "");
    }
    if (!sheet && d.open) d.close();
  }, [sheet]);

  const toast = (msg: string) => {
    setToastMsg(msg);
    setToastOn(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 2300);
  };

  const saveContact = () => {
    const vcard =
      [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Reyes;Sofia;;;",
        "FN:Sofia Reyes",
        "TITLE:Creative Director",
        `item1.URL:${siteUrl}`,
        "item1.X-ABLabel:AVELIOR",
        "NOTE:Sample AVELIOR profile. Designing brands that feel like home.",
        "END:VCARD",
      ].join("\r\n") + "\r\n";
    downloadBlob(new Blob([vcard], { type: "text/vcard;charset=utf-8" }), "Sofia Reyes.vcf");
    toast("Contact saved — Sofia Reyes.vcf");
  };

  const share = () => {
    const flash = (t: string) => {
      setShareLabel(t);
      setTimeout(() => setShareLabel("Share link"), 1800);
    };
    if (navigator.share) navigator.share({ title: "AVELIOR", url: siteUrl }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(siteUrl).then(() => flash("Link copied"), () => flash(siteUrl));
    else flash(siteUrl);
  };

  const qrText =
    sheet?.kind === "pay"
      ? `AVELIOR demo payment QR · ${sheet.pay.label} · ${sheet.pay.name}`
      : siteUrl;
  const title = sheet?.kind === "pay" ? sheet.pay.name : "Sofia Reyes";

  return (
    <section className="lp-section lp-wrap" id="demo">
      <div className="lp-demo-grid">
        <div className="lp-demo-copy lp-reveal">
          <p className="lp-eyebrow">Try it / Live Demo</p>
          <h2 className="lp-h2">This is a real Avelior profile</h2>
          <p className="lp-lead">
            Go ahead, tap around. Switch the theme, save the contact, open the QR or a payment — exactly what people see
            when you tap your card.
          </p>

          <div className="lp-theme-picker" aria-label="Profile theme">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                className="lp-theme-opt"
                aria-pressed={theme === t.id}
                onClick={() => setTheme(t.id)}
              >
                <span className={`lp-sw lp-sw-${t.id}`} />
                <span>
                  <b>{t.label}</b>
                  <small>{t.hint}</small>
                </span>
                <span className="lp-tick" />
              </button>
            ))}
          </div>

          <ul className="lp-checks">
            <li>Save Contact (vCard)</li>
            <li>QR Code share</li>
            <li>Smart icons</li>
            <li>GCash, Maya &amp; Bank QR</li>
          </ul>
        </div>

        <div className="lp-device lp-reveal" style={{ ["--d" as string]: ".12s" }}>
          <div className="lp-device-frame">
            <div className="lp-device-island" />
            <div className={`lp-screen theme-${theme}`}>
              <div className="lp-screen-scroll">
                <div className="lp-p-brand">A V E L I O R</div>
                <div className="lp-p-avatar">
                  <span>SR</span>
                </div>
                <h3 className="lp-p-name">Sofia Reyes</h3>
                <p className="lp-p-title">Creative Director · Manila</p>
                <p className="lp-p-bio">Designing brands that feel like home. Coffee first, then pixels.</p>

                <div className="lp-p-actions">
                  <button type="button" className="lp-p-action primary" onClick={saveContact}>
                    <AddContactIcon />
                    <span>Save Contact</span>
                  </button>
                  <button type="button" className="lp-p-action" onClick={() => setSheet({ kind: "profile" })}>
                    <QrIcon />
                    <span>QR Code</span>
                  </button>
                </div>

                <p className="lp-p-label">Socials</p>
                <div className="lp-p-links">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      className="lp-p-link"
                      onClick={(e) => {
                        e.preventDefault();
                        toast(`On a real profile, this opens ${s.label}`);
                      }}
                    >
                      <span className="ic">
                        <s.icon />
                      </span>
                      <span className="lb">{s.label}</span>
                      <span className="ar">
                        <ArrowUpRightIcon />
                      </span>
                    </a>
                  ))}
                </div>

                <p className="lp-p-label">Payments</p>
                <div className="lp-p-links">
                  {PAYMENTS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="lp-p-link"
                      onClick={() => setSheet({ kind: "pay", pay: p })}
                    >
                      <span className="ic">
                        <p.icon />
                      </span>
                      <span className="lb">{p.label}</span>
                      <span className="ar">
                        <QrSmallIcon />
                      </span>
                    </button>
                  ))}
                </div>

                <p className="lp-p-foot">Powered by AVELIOR</p>
              </div>
              <div className={`lp-demo-toast${toastOn ? " is-on" : ""}`} role="status" aria-live="polite">
                {toastMsg}
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={`qr-dialog lp-qr theme-${theme}`}
        aria-labelledby="lpQrName"
        onClose={() => setSheet(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSheet(null);
        }}
      >
        <button type="button" className="qr-close" aria-label="Close" onClick={() => setSheet(null)}>
          ×
        </button>
        <div className="qr-brand">AVELIOR</div>
        {sheet?.kind === "pay" && (
          <span className="lp-qr-method">
            <sheet.pay.icon />
            {sheet.pay.label}
          </span>
        )}
        <div className="qr-tile">{sheet && <QrCode text={qrText} />}</div>
        <h3 id="lpQrName" className="qr-name">
          {title}
        </h3>
        <p className="qr-hint">
          {sheet?.kind === "pay" ? `${sheet.pay.hint} · Demo` : "Scan to open this profile"}
        </p>
        {sheet?.kind === "pay" && (
          <div className="lp-acct">
            <AccountNumber number={sheet.pay.number} />
          </div>
        )}
        <div className="qr-buttons">
          <button
            type="button"
            className="lp-p-action primary"
            onClick={() => downloadQrPoster({ title, text: qrText }).catch(() => {})}
          >
            <span>Download QR</span>
          </button>
          {sheet?.kind !== "pay" && (
            <button type="button" className="lp-p-action" onClick={share}>
              <span>{shareLabel}</span>
            </button>
          )}
        </div>
      </dialog>
    </section>
  );
}
