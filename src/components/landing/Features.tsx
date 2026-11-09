import { useMemo } from "react";
import {
  ArrowDownIcon,
  BankIcon,
  CheckIcon,
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  MayaIcon,
  TelegramIcon,
  TikTokIcon,
  WalletIcon,
  WhatsAppIcon,
  XIcon,
  YouTubeIcon,
} from "./icons";

const SOCIAL_ICONS = [
  InstagramIcon,
  TikTokIcon,
  FacebookIcon,
  YouTubeIcon,
  LinkedInIcon,
  XIcon,
  WhatsAppIcon,
  TelegramIcon,
  GlobeIcon,
];

/** Decorative (non-scannable) QR pattern for the payments tile. */
function DecorativeQr() {
  const cells = useMemo(() => {
    const n = 21;
    let seed = 7;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
    const out: [number, number][] = [];
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) if (!inFinder(x, y) && rnd() > 0.52) out.push([x, y]);
    return out;
  }, []);
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx=".6" />
    </g>
  );
  return (
    <div className="lp-pay-qr">
      <svg viewBox="-.5 -.5 22 22" fill="currentColor" aria-hidden="true">
        {finder(0, 0)}
        {finder(14, 0)}
        {finder(0, 14)}
        {cells.map(([x, y]) => (
          <rect key={`${x}.${y}`} x={x} y={y} width="1" height="1" />
        ))}
      </svg>
    </div>
  );
}

export function Features() {
  return (
    <section className="lp-section lp-wrap" id="features">
      <div className="lp-head lp-head-center lp-reveal">
        <p className="lp-eyebrow lp-eyebrow-center">Features</p>
        <h2 className="lp-h2">
          Everything you need.
          <br />
          <em>Nothing you don’t.</em>
        </h2>
      </div>

      <div className="lp-bento">
        <article className="lp-tile lp-tile-wide lp-reveal">
          <div className="lp-tile-visual">
            <div className="lp-icon-row">
              {SOCIAL_ICONS.map((Icon, i) => (
                <span key={i} style={{ ["--i" as string]: i }}>
                  <Icon />
                </span>
              ))}
            </div>
          </div>
          <h3>Links &amp; Socials</h3>
          <p>Paste any link — Instagram, TikTok, LinkedIn, WhatsApp and more get a sleek icon automatically.</p>
        </article>

        <article className="lp-tile lp-reveal" style={{ ["--d" as string]: ".08s" }}>
          <div className="lp-tile-visual">
            <div className="lp-vcard">
              <div className="lp-vcard-top">
                <span className="lp-vcard-av">SR</span>
                <span>
                  <b>Sofia Reyes</b>
                  <small>Creative Director</small>
                </span>
              </div>
              <div className="lp-vcard-btn">
                <CheckIcon />
                Added to Contacts
              </div>
            </div>
          </div>
          <h3>One-Tap Save Contact</h3>
          <p>A vCard that goes straight into the iPhone or Android address book.</p>
        </article>

        <article className="lp-tile lp-reveal">
          <div className="lp-tile-visual">
            <div className="lp-pay">
              <div className="lp-pay-list">
                <span>
                  <WalletIcon />
                  GCash
                </span>
                <span>
                  <MayaIcon />
                  Maya
                </span>
                <span>
                  <BankIcon />
                  Bank Transfer
                </span>
              </div>
              <DecorativeQr />
            </div>
          </div>
          <h3>Payments &amp; QR</h3>
          <p>Upload your GCash, Maya, or bank QR with your account name and number so anyone can pay you in seconds.</p>
        </article>

        <article className="lp-tile lp-tile-wide lp-reveal" style={{ ["--d" as string]: ".08s" }}>
          <div className="lp-tile-visual">
            <div className="lp-live">
              <div className="lp-live-row">
                <small>Dashboard</small>
                <span className="lp-live-type">Creative Director</span>
              </div>
              <div className="lp-live-arrow">
                <ArrowDownIcon />
              </div>
              <div className="lp-live-row lp-live-out">
                <small>
                  <i />
                  Live on your card
                </small>
                <span>Updated just now</span>
              </div>
            </div>
          </div>
          <h3>Real-time instant updates</h3>
          <p>Edit in your dashboard and your card updates live — no reprinting, ever.</p>
        </article>
      </div>
    </section>
  );
}
