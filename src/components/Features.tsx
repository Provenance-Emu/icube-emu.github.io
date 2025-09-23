import React from 'react';

// Simple, consistent SVG icon set
const IconWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">
    {children}
  </div>
);

const ControllerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M6 8h12a4 4 0 0 1 3.8 5.2l-1.1 3A3 3 0 0 1 17 18h-2l-2-2h-2l-2 2H7a3 3 0 0 1-3.7-1.8l-1.1-3A4 4 0 0 1 6 8Zm2 2v2H6v2h2v2h2v-2h2v-2h-2v-2H8Zm8 .5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/>
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/>
  </svg>
);
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>
  </svg>
);
const SpeedIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M12 4a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V4Zm6.2 5.2-4.9 4.9a2.5 2.5 0 1 1-3.5-3.5l4.9-4.9a8 8 0 0 1 3.5 3.5Z"/>
  </svg>
);
const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M11 2 9 7l-5 2 5 2 2 5 2-5 5-2-5-2-2-5Zm8 9-1 3-3 1 3 1 1 3 1-3 3-1-3-1-1-3Z"/>
  </svg>
);
const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M9 3h6v2h3a2 2 0 0 1 2 2v3h2v2h-2v3a2 2 0 0 1-2 2h-3v2H9v-2H6a2 2 0 0 1-2-2v-3H2v-2h2V7a2 2 0 0 1 2-2h3V3Zm-1 6v6h8V9H8Z"/>
  </svg>
);
const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M12 2v2a8 8 0 1 1-8 8H2a10 10 0 1 0 10-10Zm0 6a4 4 0 1 0 4 4h2a6 6 0 1 1-6-6v2Z"/>
  </svg>
);
const CursorIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M3 2l8 20 2-7 7-2L3 2Z"/>
  </svg>
);
const CloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M7 18h9a4 4 0 1 0-1.1-7.9A5 5 0 0 0 5 12a4 4 0 0 0 2 6Z"/>
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm8.7 13.3 3.3 3.3-1.4 1.4-3.3-3.3 1.4-1.4Z"/>
  </svg>
);
const SaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M5 3h11l3 3v15a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4v4h8V7H7Zm8 12v-5H9v5h6Z"/>
  </svg>
);
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M4 20V4h2v16H4Zm4 0v-9h2v9H8Zm4 0v-6h2v6h-2Zm4 0v-12h2v12h-2Z"/>
  </svg>
);

export type Feature = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export type FeaturesProps = {
  compact?: boolean;
  className?: string;
};

const allFeatures: Feature[] = [
  {
    title: 'DSU Controller Support',
    description:
      'Use DSU-compatible controllers for precise input and low-latency control.',
    icon: <IconWrap><ControllerIcon /></IconWrap>,
  },
  {
    title: 'SwiftUI Interface',
    description:
      'Modern, native-first UI tailored for iPhone, iPad, and Apple TV with fast, polished navigation.',
    icon: <IconWrap><PhoneIcon /></IconWrap>,
  },
  {
    title: 'Quick Toggles In-Game',
    description:
      'Handy performance and rendering quick toggles directly in the emulation scene.',
    icon: <IconWrap><BoltIcon /></IconWrap>,
  },
  {
    title: 'Auto VBI Skip Mode',
    description:
      'Automatically skips vertical blanks to improve frame pacing and boost frame rates in some games.',
    icon: <IconWrap><SpeedIcon /></IconWrap>,
  },
  {
    title: '1k+ Native Metal Shaders',
    description:
      'Large library of native shaders for visual quality and performance on Apple GPUs.',
    icon: <IconWrap><SparklesIcon /></IconWrap>,
  },
  {
    title: 'ARM64 Optimized Interpreter',
    description:
      'ARM64-specific optimizations in the CPU interpreter for faster JIT-less performance on iOS/tvOS.',
    icon: <IconWrap><CpuIcon /></IconWrap>,
  },
];

// Additional extended features for the full page
const extendedOnly: Feature[] = [
  {
    title: 'Enhanced Controller Mappings',
    description:
      'Thoughtful defaults incl. DualShock/DualSense touchpad → Wii IR, reliable turbo (hold all paddles).',
    icon: <IconWrap><TargetIcon /></IconWrap>,
  },
  {
    title: 'Touchscreen Wii IR',
    description:
      'Precise, tuned on-screen cursor that “just works” for Wii IR input on iOS.',
    icon: <IconWrap><CursorIcon /></IconWrap>,
  },
  {
    title: 'WebDAV Library Support',
    description:
      'Add remote sources with caching and change detection for snappy, bandwidth‑friendly browsing.',
    icon: <IconWrap><CloudIcon /></IconWrap>,
  },
  {
    title: 'Smart Search & Filters',
    description:
      'Find by title, ID, maker, region, or path on iOS and tvOS with fast, stable results.',
    icon: <IconWrap><SearchIcon /></IconWrap>,
  },
  {
    title: 'Save States & Pause Menu',
    description:
      'Fast access to core actions with platform-appropriate UI and stable on‑screen controls toggle.',
    icon: <IconWrap><SaveIcon /></IconWrap>,
  },
  {
    title: 'Performance Controls',
    description:
      'Quick turbo (hold paddles) and VBI/CPU quick sheet to fine-tune smoothness vs. frame rate.',
    icon: <IconWrap><ChartIcon /></IconWrap>,
  },
];

const Features: React.FC<FeaturesProps> = ({ compact = false, className }) => {
  const items = compact ? allFeatures.slice(0, 6) : [...allFeatures, ...extendedOnly];

  return (
    <div className={className}>
      <div className={`grid gap-8 ${compact ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {items.map((f) => (
          <div key={f.title} className="text-center bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 shadow">
            <div className="text-4xl mb-3" aria-hidden>
              {f.icon ?? '🔹'}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
