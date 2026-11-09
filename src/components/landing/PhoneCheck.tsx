import { useEffect, useState } from "react";
import { AndroidIcon, CameraIcon, CheckIcon, InfoIcon, IphoneIcon, NfcIcon, SearchIcon } from "./icons";
import { PHONES, UA_GUESSES, matchesPhone, phoneResult, type Phone, type PhoneResult } from "./phones";

const BADGE = { ok: CheckIcon, step: NfcIcon, qr: CameraIcon, info: InfoIcon } as const;

const INITIAL: PhoneResult = {
  kind: "info",
  title: "Pick your phone",
  text: "Choose iPhone or Android, then tap your model or brand to see how it works.",
};

export function PhoneCheck() {
  const [os, setOs] = useState<"iphone" | "android">("iphone");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Phone | null>(null);
  const [result, setResult] = useState<PhoneResult>(INITIAL);
  const [detect, setDetect] = useState("");

  const choose = (p: Phone) => {
    setSelected(p);
    setResult(phoneResult(p));
  };

  useEffect(() => {
    const ua = navigator.userAgent || "";
    if (/iPhone/.test(ua)) {
      setOs("iphone");
      setDetect("Looks like you’re on an iPhone — pick your model above.");
    } else if (/Android/i.test(ua)) {
      setOs("android");
      const hit = UA_GUESSES.find(([re]) => re.test(ua));
      const brand = hit && PHONES.find((p) => p.name === hit[1]);
      if (brand) {
        choose(brand);
        setDetect(`Looks like you’re on ${brand.name}.`);
      } else setDetect("Looks like you’re on Android — pick your brand above.");
    }
  }, []);

  const q = query.trim();
  const list = PHONES.filter((p) => (q ? matchesPhone(p, q) : p.os === os));
  const Badge = BADGE[result.kind];

  return (
    <section className="lp-section lp-wrap" id="phonecheck">
      <div className="lp-head lp-head-center lp-reveal">
        <p className="lp-eyebrow lp-eyebrow-center">Phone Check</p>
        <h2 className="lp-h2">Is my phone compatible?</h2>
        <p className="lp-lead">Almost certainly. Find your phone below to see exactly how it works.</p>
      </div>

      <div className="lp-check">
        <div className="lp-stat-card lp-reveal">
          <div>
            <div className="lp-stat-big">99%</div>
            <p>of modern phones open an AVELIOR profile natively — just tap.</p>
          </div>
          <div className="lp-stat-row">
            <div>
              <b>0</b>
              <span>apps to install</span>
            </div>
            <div>
              <b>1</b>
              <span>tap to share your whole profile</span>
            </div>
          </div>
        </div>

        <div className="lp-check-box lp-reveal" style={{ ["--d" as string]: ".1s" }}>
          <div className="lp-tabs" role="tablist" aria-label="Phone type">
            <button
              type="button"
              role="tab"
              className="lp-tab"
              aria-selected={os === "iphone"}
              onClick={() => {
                setQuery("");
                setOs("iphone");
              }}
            >
              <IphoneIcon />
              iPhone
            </button>
            <button
              type="button"
              role="tab"
              className="lp-tab"
              aria-selected={os === "android"}
              onClick={() => {
                setQuery("");
                setOs("android");
              }}
            >
              <AndroidIcon />
              Android
            </button>
          </div>
          <label className="lp-search">
            <SearchIcon />
            <input
              type="search"
              autoComplete="off"
              placeholder="Search your phone, e.g. iPhone 13 or Samsung"
              aria-label="Search your phone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                e.preventDefault();
                const first = list[0];
                if (q && first) choose(first);
              }}
            />
          </label>
          <div className="lp-models">
            {list.length ? (
              list.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  className="lp-model"
                  aria-pressed={selected === p}
                  onClick={() => choose(p)}
                >
                  {p.name}
                </button>
              ))
            ) : (
              <p className="lp-empty">
                Not on the list? If your phone has NFC in Settings, it works. If not, scan the QR Code from the owner’s
                profile.
              </p>
            )}
          </div>
          <div key={result.title} className={`lp-result lp-result-${result.kind}`} aria-live="polite">
            <span className="lp-badge">
              <Badge />
            </span>
            <div>
              <h4>{result.title}</h4>
              <p>{result.text}</p>
              {result.path && <span className="lp-path">{result.path}</span>}
            </div>
          </div>
          {detect && <p className="lp-detect">{detect}</p>}
        </div>
      </div>
    </section>
  );
}
