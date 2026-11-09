import { NfcIcon, PencilIcon, ShareIcon } from "./icons";

const STEPS = [
  {
    icon: NfcIcon,
    title: "Scan the card",
    text: "Tap to any smartphone — your profile opens instantly, without an app.",
  },
  {
    icon: PencilIcon,
    title: "Make it yours",
    text: "Customize your socials, bio, contact info, and payment QRs in seconds.",
  },
  {
    icon: ShareIcon,
    title: "Tap and share",
    text: "One card, forever. Update anytime and every tap shows the latest you.",
  },
];

export function HowItWorks() {
  return (
    <section className="lp-section lp-wrap" id="how">
      <div className="lp-head lp-reveal">
        <p className="lp-eyebrow">How it works</p>
        <h2 className="lp-h2">Three taps to a profile that’s always current</h2>
      </div>
      <ol className="lp-steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="lp-step lp-reveal" style={{ ["--d" as string]: `${i * 0.1}s` }}>
            <span className="lp-step-num">0{i + 1}</span>
            <span className="lp-step-icon">
              <s.icon />
            </span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
