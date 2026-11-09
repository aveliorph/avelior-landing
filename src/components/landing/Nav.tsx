import { useEffect, useState } from "react";
import { ORDER_URL } from "./shared";

const LINKS = [
  { id: "how", label: "How it works" },
  { id: "demo", label: "Try it / Live Demo" },
  { id: "payments", label: "Payments" },
  { id: "thecard", label: "The Card" },
  { id: "phonecheck", label: "Phone Check" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", "how", "demo", "features", "payments", "thecard", "phonecheck"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  return (
    <nav className={`lp-nav${open ? " is-open" : ""}`} aria-label="Main">
      <div className="lp-nav-inner">
        <a href="#top" className="lp-logo" aria-label="AVELIOR home">
          AVELIOR
        </a>
        <div className="lp-links" id="lpLinks">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "is-active" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="lp-nav-actions">
          <a href={ORDER_URL} target="_blank" rel="noopener" className="lp-btn lp-btn-solid lp-btn-sm">
            Get your card
          </a>
          <button
            type="button"
            className="lp-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="lpLinks"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
