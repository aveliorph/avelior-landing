import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { BankIcon, LockIcon, MayaIcon, UploadIcon, WalletIcon } from "./icons";
import { AccountNumber, QrCode, type PayMethod } from "./shared";

type MethodId = "gcash" | "maya" | "bank";

type MethodForm = { qr: string | null; fileName: string; name: string; number: string; provider: string };

const METHODS: (PayMethod & { id: MethodId; hint: string })[] = [
  { id: "gcash", label: "GCash", icon: WalletIcon, hint: "Scan with GCash to pay" },
  { id: "maya", label: "Maya", icon: MayaIcon, hint: "Scan with Maya to pay" },
  { id: "bank", label: "Bank & more", icon: BankIcon, hint: "Scan with your banking app to pay" },
];

const empty = (): MethodForm => ({ qr: null, fileName: "", name: "", number: "", provider: "" });

export function PaymentsSetup() {
  const [active, setActive] = useState<MethodId>("gcash");
  const [forms, setForms] = useState<Record<MethodId, MethodForm>>({
    gcash: empty(),
    maya: empty(),
    bank: empty(),
  });
  const urls = useRef<string[]>([]);

  useEffect(() => () => urls.current.forEach((u) => URL.revokeObjectURL(u)), []);

  const method = METHODS.find((m) => m.id === active)!;
  const form = forms[active];
  const update = (patch: Partial<MethodForm>) => setForms((f) => ({ ...f, [active]: { ...f[active], ...patch } }));

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    urls.current.push(url);
    update({ qr: url, fileName: file.name });
  };

  const label = active === "bank" ? form.provider.trim() || "Bank Transfer" : method.label;
  const displayName = form.name.trim();

  return (
    <section className="lp-section lp-wrap" id="payments">
      <div className="lp-head lp-reveal">
        <p className="lp-eyebrow">Payments</p>
        <h2 className="lp-h2">
          Get paid with
          <br />
          <em>one tap, too.</em>
        </h2>
        <p className="lp-lead">
          Add your GCash, Maya, or bank QR to your profile. People tap your card, pick how to pay, and scan — no more
          typing numbers or sending screenshots.
        </p>
      </div>

      <div className="lp-pay-grid">
        <div className="lp-editor lp-reveal">
          <div className="lp-editor-head">
            <h3>Payment methods</h3>
            <small>Try it</small>
          </div>

          <div className="lp-tabs lp-pay-tabs" role="tablist" aria-label="Payment method">
            {METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                className="lp-tab"
                aria-selected={active === m.id}
                onClick={() => setActive(m.id)}
              >
                <m.icon />
                {m.label}
              </button>
            ))}
          </div>

          {active === "bank" && (
            <label className="lp-field">
              <span className="lp-field-label">Bank or wallet name</span>
              <input
                type="text"
                value={form.provider}
                onChange={(e) => update({ provider: e.target.value })}
                placeholder="e.g. BDO, BPI, GoTyme, ShopeePay"
                maxLength={40}
              />
            </label>
          )}

          <div className="lp-field">
            <span className="lp-field-label">Upload QR Code</span>
            <label className="lp-drop">
              <input type="file" accept="image/*" onChange={onFile} aria-label={`Upload ${label} QR code`} />
              <span className="lp-drop-thumb">{form.qr ? <img src={form.qr} alt="Your QR code" /> : <UploadIcon />}</span>
              <span>
                <b>{form.qr ? "QR uploaded" : `Upload your ${active === "bank" ? "bank" : method.label} QR`}</b>
                <small>{form.qr ? form.fileName : "PNG or JPG — a screenshot from your app works"}</small>
              </span>
              {form.qr && (
                <button
                  type="button"
                  className="lp-drop-clear"
                  onClick={(e) => {
                    e.preventDefault();
                    update({ qr: null, fileName: "" });
                  }}
                >
                  Remove
                </button>
              )}
            </label>
          </div>

          <label className="lp-field">
            <span className="lp-field-label">Account Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="e.g. Juan Dela Cruz"
              maxLength={60}
              autoComplete="off"
            />
          </label>

          <label className="lp-field">
            <span className="lp-field-label">
              Account Number <em>(optional)</em>
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={form.number}
              onChange={(e) => update({ number: e.target.value })}
              placeholder={active === "bank" ? "e.g. 0012 3456 7890" : "e.g. 0917 123 4567"}
              maxLength={34}
              autoComplete="off"
            />
          </label>

          <p className="lp-editor-note">
            <LockIcon />
            Demo only — your QR stays on this device and isn’t uploaded anywhere.
          </p>
        </div>

        <div className="lp-pay-preview lp-reveal" style={{ ["--d" as string]: ".1s" }}>
          <div>
            <p className="lp-pay-preview-label">What people see</p>
            <div className="qr-dialog lp-paycard">
              <div className="qr-brand">AVELIOR</div>
              <span className="lp-qr-method">
                <method.icon />
                {label}
              </span>
              <div className="qr-tile">
                {form.qr ? (
                  <img src={form.qr} alt={`${label} QR code`} />
                ) : (
                  <QrCode text={`AVELIOR sample payment QR · ${label}`} />
                )}
              </div>
              <h3 className={`qr-name${displayName ? "" : " lp-placeholder"}`}>{displayName || "Your Name"}</h3>
              <p className="qr-hint">{form.qr ? method.hint : "Sample QR — upload yours"}</p>
              {form.number.trim() && (
                <div className="lp-acct">
                  <AccountNumber number={form.number.trim()} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
