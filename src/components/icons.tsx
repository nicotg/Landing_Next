import React from 'react';

type IconProps = {
  size?: number;
  className?: string;
};

const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

export const ChatIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <path d="M21 12a8 8 0 0 1-11.6 7.15L3 21l1.85-6.4A8 8 0 1 1 21 12Z" />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const GlassesIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <circle cx="6" cy="15" r="4" />
    <circle cx="18" cy="15" r="4" />
    <path d="M10 15a2 2 0 0 1 4 0" />
    <path d="M2.5 13 5 7c.6-1.3 1.5-2 3-2" />
    <path d="M21.5 13 19 7c-.6-1.3-1.5-2-3-2" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

export const LensIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <path d="M12 2 4 5v7c0 4.5 3.2 8.4 8 9 4.8-.6 8-4.5 8-9V5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const BoltIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

export const DropIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <path d="M12 3c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11Z" />
  </svg>
);

export const PinIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
  >
    <path d="M12 2.1c-5.5 0-10 4.5-10 10 0 1.8.5 3.5 1.3 5L2 22l5-1.3c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2.1 12 2.1Zm-2.8 5.4c.2 0 .4 0 .5.4.2.4.6 1.5.7 1.6.1.1.1.3 0 .4l-.4.5c-.1.1-.2.2-.1.4.2.4.5 1 1.2 1.6.7.6 1.2.8 1.6 1 .2.1.3 0 .4-.1l.5-.6c.1-.2.3-.1.4-.1l1.5.7c.2.1.3.2.4.2.1.2 0 .9-.3 1.3-.3.4-.8.5-1.2.6-.4.1-.9.1-1.7-.1-.3-.1-.7-.2-1.4-.5-2.3-1-3.7-3-3.9-3.2-.1-.2-.9-1.1-.9-2.1 0-1 .5-1.5.7-1.7.2-.2.5-.3.6-.3Z" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} className={className} {...baseProps}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
