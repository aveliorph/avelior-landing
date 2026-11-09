import { AddContactIcon, GlobeIcon, InstagramIcon, WalletIcon } from "./icons";
import { ORDER_URL } from "./shared";

function todayLabel() {
  return new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export function Hero() {
  return (
    <section className="lp-hero lp-wrap" id="top">
      <p className="lp-eyebrow lp-eyebrow-center">The AVELIOR NFC Card</p>
      <h1 className="lp-h1">
        Your whole profile,
        <br />
        <em>one tap away.</em>
      </h1>
      <p className="lp-sub">
        Tap your Avelior card to any phone and your links, socials, and contact appear instantly. No app needed.
      </p>
      <div className="lp-cta-row">
        <a href={ORDER_URL} target="_blank" rel="noopener" className="lp-btn lp-btn-solid">
          Get your card
        </a>
        <a href="#how" className="lp-btn lp-btn-ghost">
          See how it works
        </a>
      </div>

      <div className="lp-stage" aria-hidden="true">
        <div className="lp-stage-inner">
          <div className="lp-glow" />
          <div className="lp-phone">
            <div className="lp-phone-screen">
              <div className="lp-island" />
              <div className="lp-lock">
                <span className="lp-time">9:41</span>
                <span className="lp-date" suppressHydrationWarning>
                  {todayLabel()}
                </span>
                <span className="lp-hold">Hold near card</span>
              </div>
              <div className="lp-mini">
                <div className="lp-mini-brand">A V E L I O R</div>
                <div className="lp-mini-avatar">
                  <span>SR</span>
                </div>
                <div className="lp-mini-name">Sofia Reyes</div>
                <div className="lp-mini-role">Creative Director</div>
                <div className="lp-mini-btns">
                  <span>Save Contact</span>
                  <span>QR Code</span>
                </div>
                <div className="lp-mini-link">
                  <i>
                    <InstagramIcon />
                  </i>
                  Instagram
                </div>
                <div className="lp-mini-link">
                  <i>
                    <WalletIcon />
                  </i>
                  GCash
                </div>
                <div className="lp-mini-link">
                  <i>
                    <GlobeIcon />
                  </i>
                  Portfolio
                </div>
              </div>
            </div>
            <span className="lp-pulse" />
            <span className="lp-pulse lp-pulse-2" />
          </div>
          <div className="lp-card">
            <span>AVELIOR</span>
          </div>

          <div className="lp-chip lp-chip-1">
            <i>
              <InstagramIcon />
            </i>
            <span>
              Instagram<small>@sofia.reyes</small>
            </span>
          </div>
          <div className="lp-chip lp-chip-2">
            <i>
              <WalletIcon />
            </i>
            <span>
              GCash<small>Scan to pay</small>
            </span>
          </div>
          <div className="lp-chip lp-chip-3">
            <i>
              <AddContactIcon />
            </i>
            <span>
              vCard<small>Saved to contacts</small>
            </span>
          </div>
          <div className="lp-chip lp-chip-4">
            <i>
              <GlobeIcon />
            </i>
            <span>
              Portfolio<small>sofiareyes.ph</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
