import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function make(children: ReactNode) {
  return function Icon(props: IconProps) {
    return (
      <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        {children}
      </svg>
    );
  };
}

export const InstagramIcon = make(
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </>,
);
export const TikTokIcon = make(
  <>
    <path d="M14 3.5v11.25a3.75 3.75 0 1 1-3.75-3.75" />
    <path d="M14 3.5c.35 2.7 2.3 4.65 5 5" />
  </>,
);
export const FacebookIcon = make(
  <path d="M15.5 3.5h-2.2A3.8 3.8 0 0 0 9.5 7.3v2.7H7v3.3h2.5v7.2h3.3v-7.2h2.5l.6-3.3h-3.1V7.6c0-.6.5-1 1-1h1.7z" />,
);
export const YouTubeIcon = make(
  <>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10.25 9.3v5.4L14.9 12z" fill="currentColor" stroke="none" />
  </>,
);
export const LinkedInIcon = make(
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5v6M8 7.6v.01M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6 1.4 0 2.1.9 2.1 2.6v3.5" />
  </>,
);
export const XIcon = make(
  <>
    <path d="M4.5 4h4.2l10.8 16h-4.2z" />
    <path d="M19.2 4l-6.3 7.1M11.1 12.9 4.8 20" />
  </>,
);
export const WhatsAppIcon = make(
  <>
    <path d="M4 20l1.2-3.9A8.2 8.2 0 1 1 8.3 19z" />
    <path d="M9.3 8.4c-.4.4-.6 1-.4 1.7.6 2 2.3 3.7 4.4 4.4.7.2 1.3 0 1.7-.4l.4-.6-1.6-.9-.8.6c-.9-.4-1.6-1.1-2-2l.6-.8-.9-1.6z" />
  </>,
);
export const TelegramIcon = make(
  <>
    <path d="M21 4 3 11l6.3 2.3L12 20l3.3-4.4L21 4z" />
    <path d="M9.3 13.3 21 4" />
  </>,
);
export const GlobeIcon = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z" />
  </>,
);
export const WalletIcon = make(
  <>
    <rect x="3" y="6" width="18" height="13" rx="3" />
    <path d="M3 10h18M16 14.5h2" />
  </>,
);
export const MayaIcon = make(<path d="M5 18V7l7 7 7-7v11" />);
export const BankIcon = make(
  <path d="M3 9.5 12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3.5 20h17" />,
);
export const QrIcon = make(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1.2" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" />
    <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
  </>,
);
export const QrSmallIcon = make(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1.2" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" />
    <path d="M14 14h3v3h-3z" />
  </>,
);
export const AddContactIcon = make(
  <>
    <circle cx="9" cy="8" r="3.6" />
    <path d="M2.8 20c.6-3.6 3.2-5.6 6.2-5.6s5.6 2 6.2 5.6" />
    <path d="M19 8v6M16 11h6" />
  </>,
);
export const ArrowUpRightIcon = make(<path d="M7 17 17 7M9 7h8v8" />);
export const ArrowDownIcon = make(<path d="M12 4v16M6 14l6 6 6-6" />);
export const PencilIcon = make(
  <>
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" />
    <path d="M13.5 6.5l4 4" />
  </>,
);
export const ShareIcon = make(
  <>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="17.5" cy="6" r="2.5" />
    <circle cx="17.5" cy="18" r="2.5" />
    <path d="M8.3 10.8l7-3.6M8.3 13.2l7 3.6" />
  </>,
);
export const NfcIcon = make(
  <>
    <path d="M8 8.6a4.6 4.6 0 0 1 0 6.8" />
    <path d="M11.6 6a8.4 8.4 0 0 1 0 12" />
    <path d="M15.2 3.4a12.2 12.2 0 0 1 0 17.2" />
  </>,
);
export const CheckIcon = make(<path d="M5 12.5l4.2 4.2L19 7" />);
export const DropIcon = make(
  <path d="M12 3.5s6 6.4 6 10.6a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5z" />,
);
export const ChipIcon = make(
  <>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 2.5v3.5M15 2.5v3.5M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
  </>,
);
export const LogoMarkIcon = make(<path d="M5 6.5h14M12 6.5v12M8.5 18.5h7" />);
export const PaletteIcon = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 3.5v17" />
    <path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor" stroke="none" />
  </>,
);
export const CameraIcon = make(
  <>
    <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.8l1.4-2h4.6l1.4 2h1.8A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" />
    <circle cx="12" cy="12.5" r="3.4" />
  </>,
);
export const InfoIcon = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 8v5M12 16v.01" />
  </>,
);
export const SearchIcon = make(
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </>,
);
export const IphoneIcon = make(
  <>
    <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
    <path d="M10.5 5.5h3" />
  </>,
);
export const AndroidIcon = make(
  <>
    <path d="M5 17a7 7 0 0 1 14 0z" />
    <path d="M8.2 10.4 6.6 7.8M15.8 10.4l1.6-2.6" />
    <circle cx="9.6" cy="13.6" r=".7" fill="currentColor" stroke="none" />
    <circle cx="14.4" cy="13.6" r=".7" fill="currentColor" stroke="none" />
  </>,
);
export const UploadIcon = make(
  <>
    <path d="M12 15V4M7.5 8.5 12 4l4.5 4.5" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </>,
);
export const CopyIcon = make(
  <>
    <rect x="8" y="8" width="12" height="12" rx="2.5" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </>,
);
export const LockIcon = make(
  <>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </>,
);
