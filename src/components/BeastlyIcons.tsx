import React from 'react';

// ──────────────────────────────────────────────────────────
// BEASTLY HAND-DRAWN ICONS (colored circle backgrounds)
// Matching the brand's sketchy/editorial icon style
// Available in 4 brand colors: green, orange, blue, beige
// ──────────────────────────────────────────────────────────

type IconColor = 'green' | 'orange' | 'blue' | 'beige';

const BG_MAP: Record<IconColor, string> = {
    green: '#b4ff00',
    orange: '#fc846d',
    blue: '#b1def3',
    beige: '#f1d8c4',
};

interface BeastlyIconProps {
    size?: number;
    bg?: IconColor;
    className?: string;
}

// 👁 Eye icon — views, insights, analytics
export function BeastlyEye({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <path d="M18 50C18 50 30 30 50 30C70 30 82 50 82 50C82 50 70 70 50 70C30 70 18 50 18 50Z" stroke="black" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="9" fill="black" />
        </svg>
    );
}

// ▶ Play / cursor arrow — campaigns, clicks
export function BeastlyCursor({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <path d="M35 22L35 78L48 62L62 82L69 77L55 57L72 52L35 22Z" fill="black" strokeLinejoin="round" />
        </svg>
    );
}

// 🌐 Globe — reach, international
export function BeastlyGlobe({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <circle cx="50" cy="50" r="24" stroke="black" strokeWidth="3.5" fill="none" />
            <ellipse cx="50" cy="50" rx="12" ry="24" stroke="black" strokeWidth="2.5" fill="none" />
            <line x1="26" y1="50" x2="74" y2="50" stroke="black" strokeWidth="2.5" />
            <path d="M30 38C37 38 43 36 50 36C57 36 63 38 70 38" stroke="black" strokeWidth="2" fill="none" />
            <path d="M30 62C37 62 43 64 50 64C57 64 63 62 70 62" stroke="black" strokeWidth="2" fill="none" />
        </svg>
    );
}

// ✉ Envelope — messages, DMs
export function BeastlyEnvelope({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <rect x="22" y="33" width="56" height="36" rx="4" stroke="black" strokeWidth="3.5" fill="none" />
            <path d="M22 36L50 55L78 36" stroke="black" strokeWidth="3" fill="none" strokeLinejoin="round" />
        </svg>
    );
}

// 🔗 Link / key — connections, partnerships
export function BeastlyLink({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <circle cx="40" cy="42" r="12" stroke="black" strokeWidth="3.5" fill="none" />
            <line x1="49" y1="49" x2="72" y2="72" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="62" y1="72" x2="72" y2="62" stroke="black" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

// 📋 Document / checklist — briefs, contracts
export function BeastlyDocument({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <rect x="30" y="22" width="40" height="56" rx="4" stroke="black" strokeWidth="3.5" fill="none" />
            <line x1="38" y1="36" x2="62" y2="36" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="38" y1="46" x2="58" y2="46" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="38" y1="56" x2="54" y2="56" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="38" y1="66" x2="50" y2="66" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

// 📣 Megaphone — campaigns, promotions
export function BeastlyMegaphone({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <path d="M28 42L28 58L38 58L62 74L62 26L38 42Z" fill="black" />
            <path d="M70 40C75 44 75 56 70 60" stroke="black" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M76 34C84 40 84 60 76 66" stroke="black" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
    );
}

// 😊 Smiley — engagement, sentiment
export function BeastlySmiley({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <circle cx="50" cy="50" r="24" stroke="black" strokeWidth="3.5" fill="none" />
            <circle cx="42" cy="44" r="3" fill="black" />
            <circle cx="58" cy="44" r="3" fill="black" />
            <path d="M38 56C42 64 58 64 62 56" stroke="black" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
    );
}

// 💲 Dollar — finance, earnings
export function BeastlyDollar({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <path d="M42 40C42 34 48 30 54 30C60 30 64 34 60 40C56 44 44 46 42 52C40 58 44 64 50 66C56 68 62 64 62 58" stroke="black" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <line x1="50" y1="24" x2="50" y2="32" stroke="black" strokeWidth="3" strokeLinecap="round" />
            <line x1="52" y1="66" x2="52" y2="76" stroke="black" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

// ▶ YouTube — platform icon
export function BeastlyYoutube({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <rect x="24" y="32" width="52" height="36" rx="8" stroke="black" strokeWidth="3.5" fill="none" />
            <path d="M44 40L44 60L60 50Z" fill="black" />
        </svg>
    );
}

// 📸 Instagram — platform icon  
export function BeastlyInstagram({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <rect x="28" y="28" width="44" height="44" rx="10" stroke="black" strokeWidth="3.5" fill="none" />
            <circle cx="50" cy="50" r="12" stroke="black" strokeWidth="3" fill="none" />
            <circle cx="65" cy="35" r="3.5" fill="black" />
        </svg>
    );
}

// 🎵 TikTok — platform icon
export function BeastlyTiktok({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <path d="M54 28C54 28 54 60 54 64C54 72 46 76 40 72C34 68 34 58 42 56C44 55 46 56 48 56" stroke="black" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M54 28C54 28 58 36 68 38" stroke="black" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
    );
}

// 👻 Snapchat — platform icon
export function BeastlySnapchat({ size = 36, bg = 'green', className = '' }: BeastlyIconProps) {
    const fill = BG_MAP[bg];
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill={fill} />
            <path d="M50 28C40 28 34 36 34 46C34 48 34 50 33 52C30 52 28 54 30 56C32 58 34 56 36 58C34 64 28 68 28 70C28 72 36 72 40 72C42 72 44 76 50 76C56 76 58 72 60 72C64 72 72 72 72 70C72 68 66 64 64 58C66 56 68 58 70 56C72 54 70 52 67 52C66 50 66 48 66 46C66 36 60 28 50 28Z" stroke="black" strokeWidth="3" fill="none" strokeLinejoin="round" />
        </svg>
    );
}

// ──────────────────────────────────────────────────────────
// GLOW ICONS (neon outline style for decorative backgrounds)
// ──────────────────────────────────────────────────────────

export function GlowLightning({ className = '', color = '#f1d8c4', size = 120 }: { className?: string; color?: string; size?: number }) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none">
            <defs>
                <filter id="glow-lightning" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <path d="M70 10L30 65H55L45 110L95 50H65L70 10Z" fill="black" stroke={color} strokeWidth="3" filter="url(#glow-lightning)" />
        </svg>
    );
}

export function GlowEye({ className = '', color = '#fc846d', size = 120 }: { className?: string; color?: string; size?: number }) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none">
            <defs>
                <filter id="glow-eye" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <path d="M10 60C10 60 30 25 60 25C90 25 110 60 110 60C110 60 90 95 60 95C30 95 10 60 10 60Z" fill="black" stroke={color} strokeWidth="3" filter="url(#glow-eye)" />
            <circle cx="60" cy="60" r="15" fill="black" stroke={color} strokeWidth="3" filter="url(#glow-eye)" />
        </svg>
    );
}

export function GlowHeart({ className = '', color = '#b4ff00', size = 120 }: { className?: string; color?: string; size?: number }) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none">
            <defs>
                <filter id="glow-heart" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <path d="M60 100L20 60C10 45 15 25 35 20C50 16 58 28 60 35C62 28 70 16 85 20C105 25 110 45 100 60L60 100Z" fill="black" stroke={color} strokeWidth="3" filter="url(#glow-heart)" />
        </svg>
    );
}

export function GlowCursor({ className = '', color = '#f1d8c4', size = 120 }: { className?: string; color?: string; size?: number }) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none">
            <defs>
                <filter id="glow-cursor" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <path d="M25 15L25 95L45 70L70 105L80 98L55 63L85 55L25 15Z" fill="black" stroke={color} strokeWidth="3" filter="url(#glow-cursor)" />
        </svg>
    );
}

export function GlowArrow({ className = '', color = '#b1def3', size = 120 }: { className?: string; color?: string; size?: number }) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none">
            <defs>
                <filter id="glow-arrow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <path d="M60 15L100 85H20L60 15Z" fill="black" stroke={color} strokeWidth="3" filter="url(#glow-arrow)" />
        </svg>
    );
}
