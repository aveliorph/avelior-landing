import { ORDER_URL } from "./shared";

export function FinalCta() {
  return (
    <>
      <section className="lp-final lp-wrap">
        <div className="lp-final-card lp-reveal">
          <p className="lp-eyebrow lp-eyebrow-center">AVELIOR</p>
          <h2 className="lp-h2">Ready to share yourself in one tap?</h2>
          <p className="lp-lead">One card. Every link. Always current.</p>
          <div className="lp-cta-row">
            <a href={ORDER_URL} target="_blank" rel="noopener" className="lp-btn lp-btn-solid">
              Get your card
            </a>
            <a href="#demo" className="lp-btn lp-btn-ghost">
              Try the live demo
            </a>
          </div>
        </div>
      </section>
      <footer className="lp-footer lp-wrap">
        <a href="#top" className="lp-logo">
          AVELIOR
        </a>
        <span suppressHydrationWarning>© {new Date().getFullYear()} AVELIOR · Your identity. One tap.</span>
      </footer>
    </>
  );
}
