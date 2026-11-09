export type Phone =
  | { os: "iphone"; name: string; status: "native" | "reader" | "none" }
  | { os: "android"; name: string; keys: string[]; path: string; budget: boolean };

const IPHONE_NATIVE = [
  "iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone Air", "iPhone 17", "iPhone 16e",
  "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
  "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
  "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
  "iPhone SE (3rd gen)", "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini",
  "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 mini",
  "iPhone SE (2nd gen)", "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11",
  "iPhone XS Max", "iPhone XS", "iPhone XR",
];
const IPHONE_READER = ["iPhone X", "iPhone 8 Plus", "iPhone 8", "iPhone 7 Plus", "iPhone 7"];
const IPHONE_NONE = ["iPhone SE (1st gen)", "iPhone 6s Plus", "iPhone 6s", "iPhone 6 or older"];

const ANDROID: [string, string[], string, boolean?][] = [
  ["Samsung", ["samsung", "galaxy"], "Settings → Connections → NFC and contactless payments"],
  ["Google Pixel", ["pixel", "google"], "Settings → Connected devices → Connection preferences → NFC"],
  ["Xiaomi / Redmi / POCO", ["xiaomi", "redmi", "poco", "mi "], "Settings → Connection & sharing → NFC"],
  ["OPPO", ["oppo", "reno"], "Settings → Connection & sharing → NFC"],
  ["vivo", ["vivo"], "Settings → Other networks & connections → NFC"],
  ["realme", ["realme"], "Settings → Connection & sharing → NFC"],
  ["Huawei", ["huawei"], "Settings → More connections → NFC"],
  ["Honor", ["honor"], "Settings → More connections → NFC"],
  ["OnePlus", ["oneplus", "one plus"], "Settings → Connection & sharing → NFC"],
  ["Motorola", ["motorola", "moto"], "Settings → Connected devices → Connection preferences → NFC"],
  ["Nothing", ["nothing"], "Settings → Connected devices → Connection preferences → NFC"],
  ["Infinix", ["infinix"], "Settings → search “NFC”", true],
  ["Tecno", ["tecno"], "Settings → search “NFC”", true],
  ["Other Android", ["android", "other"], "Settings → search “NFC”", true],
];

export const PHONES: Phone[] = [
  ...IPHONE_NATIVE.map((name) => ({ os: "iphone" as const, name, status: "native" as const })),
  ...IPHONE_READER.map((name) => ({ os: "iphone" as const, name, status: "reader" as const })),
  ...IPHONE_NONE.map((name) => ({ os: "iphone" as const, name, status: "none" as const })),
  ...ANDROID.map(([name, keys, path, budget]) => ({ os: "android" as const, name, keys, path, budget: !!budget })),
];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

export function matchesPhone(p: Phone, q: string) {
  const nq = norm(q);
  if (!nq) return true;
  if (norm(p.name).includes(nq)) return true;
  if (p.os === "android")
    return p.keys.some((k) => {
      const nk = norm(k);
      return nk && (nq.includes(nk) || nk.includes(nq));
    });
  return false;
}

export type PhoneResult = { kind: "ok" | "step" | "qr" | "info"; title: string; text: string; path?: string };

export function phoneResult(p: Phone): PhoneResult {
  if (p.os === "iphone") {
    if (p.status === "native")
      return {
        kind: "ok",
        title: `${p.name} is compatible`,
        text: "It taps natively — hold the top of your iPhone near the card and the profile opens. No app, no settings.",
      };
    if (p.status === "reader")
      return {
        kind: "step",
        title: `${p.name} works with one quick step`,
        text: "Open Control Center and tap the NFC Tag Reader, then hold the top of the phone near the card.",
        path: "Settings → Control Center → add NFC Tag Reader",
      };
    return {
      kind: "qr",
      title: `${p.name}: scan the profile QR instead`,
      text: "This model can’t read NFC. The card owner can open the QR Code on their profile and your camera scans it — same profile, no app.",
    };
  }
  const text = p.budget
    ? "Most newer models with NFC tap natively. Turn NFC on, then hold the card near the back of the phone, around the camera. No NFC? Scan the QR Code from the owner’s profile instead."
    : `Compatible on ${p.name === "Other Android" ? "most phones" : `most ${p.name} phones`} with NFC. Make sure NFC is on, then hold the card near the back of the phone, around the camera.`;
  return {
    kind: "ok",
    title: p.name === "Other Android" ? "Android phones with NFC are compatible" : `${p.name} is compatible`,
    text,
    path: p.path,
  };
}

export const UA_GUESSES: [RegExp, string][] = [
  [/SM-|Samsung/i, "Samsung"],
  [/Pixel/i, "Google Pixel"],
  [/Redmi|POCO|Xiaomi|\bMi /i, "Xiaomi / Redmi / POCO"],
  [/OPPO|CPH\d/i, "OPPO"],
  [/vivo|V2\d{3}/i, "vivo"],
  [/RMX\d/i, "realme"],
  [/HUAWEI/i, "Huawei"],
  [/HONOR/i, "Honor"],
  [/OnePlus/i, "OnePlus"],
  [/moto/i, "Motorola"],
  [/Infinix/i, "Infinix"],
  [/TECNO/i, "Tecno"],
];
