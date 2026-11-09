import { useState } from "react";
import { ChipIcon, DropIcon, LogoMarkIcon, NfcIcon, PaletteIcon } from "./icons";
import { ORDER_URL } from "./shared";

type Finish = "black" | "white";

export function TheCard() {
  const [finish, setFinish] = useState<Finish>("black");
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="lp-section lp-wrap" id="thecard">
      <div className="lp-card-grid">
        <div className="lp-card-stage lp-reveal">
          <button
            type="button"
            className={`lp-flip${finish === "white" ? " is-white" : ""}`}
            aria-pressed={flipped}
            aria-label={`Flip the ${finish} card`}
            onClick={() => setFlipped((f) => !f)}
          >
            <span className="lp-flip-inner">
              <span className="lp-face lp-face-front">
                <span>AVELIOR</span>
              </span>
              <span className="lp-face lp-face-back">
                <span className="lp-back-text">
                  <NfcIcon className="ico lp-back-nfc" />
                  <b>AVELIOR</b>
                  <small>Tap to connect</small>
                </span>
              </span>
            </span>
          </button>
          <p className="lp-flip-hint">Tap the card to flip</p>
        </div>

        <div className="lp-card-copy lp-reveal" style={{ ["--d" as string]: ".1s" }}>
          <p className="lp-eyebrow">The Card</p>
          <h2 className="lp-h2">
            {finish === "black" ? "Matte black." : "Clean white."}
            <br />
            <em>Made to last.</em>
          </h2>
          <p className="lp-lead">
            Two finishes, one design — black with a white logo, or white with a black logo. Nothing but AVELIOR on the
            front, and everything about you one tap away.
          </p>

          <div className="lp-tabs lp-variant" role="tablist" aria-label="Card color">
            {(["black", "white"] as Finish[]).map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                className="lp-tab"
                aria-selected={finish === f}
                onClick={() => setFinish(f)}
              >
                <span className={`lp-dot lp-dot-${f}`} />
                {f === "black" ? "Black" : "White"}
              </button>
            ))}
          </div>

          <ul className="lp-specs">
            <li>
              <DropIcon />
              <b>Waterproof</b>
              <span>Rain, spills, everyday life — no problem.</span>
            </li>
            <li>
              <ChipIcon />
              <b>Durable NFC chip</b>
              <span>Built in, no battery, made for thousands of taps.</span>
            </li>
            <li>
              <PaletteIcon />
              <b>Black or White</b>
              <span>Black card with a white logo, or white card with a black logo.</span>
            </li>
            <li>
              <LogoMarkIcon />
              <b>Clean AVELIOR logo</b>
              <span>Centered, minimal, unmistakably premium.</span>
            </li>
          </ul>
          <a href={ORDER_URL} target="_blank" rel="noopener" className="lp-btn lp-btn-solid">
            Get your card
          </a>
        </div>
      </div>
    </section>
  );
}
