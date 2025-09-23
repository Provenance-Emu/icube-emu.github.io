import React from 'react';

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
    icon: '🎮',
  },
  {
    title: 'SwiftUI Interface',
    description:
      'Modern, native-first UI tailored for iPhone, iPad, and Apple TV with fast, polished navigation.',
    icon: '📱',
  },
  {
    title: 'Quick Toggles In-Game',
    description:
      'Handy performance and rendering quick toggles directly in the emulation scene.',
    icon: '⚡',
  },
  {
    title: 'Auto VBI Skip Mode',
    description:
      'Automatically skips vertical blanks to improve frame pacing and boost frame rates in some games.',
    icon: '🏎️',
  },
  {
    title: '1k+ Native Metal Shaders',
    description:
      'Large library of native shaders for visual quality and performance on Apple GPUs.',
    icon: '✨',
  },
  {
    title: 'ARM64 Optimized Interpreter',
    description:
      'ARM64-specific optimizations in the CPU interpreter for faster JIT-less performance on iOS/tvOS.',
    icon: '🧠',
  },
];

// Additional extended features for the full page
const extendedOnly: Feature[] = [
  {
    title: 'Enhanced Controller Mappings',
    description:
      'Thoughtful defaults incl. DualShock/DualSense touchpad → Wii IR, reliable turbo (hold all paddles).',
    icon: '🎯',
  },
  {
    title: 'Touchscreen Wii IR',
    description:
      'Precise, tuned on-screen cursor that “just works” for Wii IR input on iOS.',
    icon: '🖱️',
  },
  {
    title: 'WebDAV Library Support',
    description:
      'Add remote sources with caching and change detection for snappy, bandwidth‑friendly browsing.',
    icon: '☁️',
  },
  {
    title: 'Smart Search & Filters',
    description:
      'Find by title, ID, maker, region, or path on iOS and tvOS with fast, stable results.',
    icon: '🔎',
  },
  {
    title: 'Save States & Pause Menu',
    description:
      'Fast access to core actions with platform-appropriate UI and stable on‑screen controls toggle.',
    icon: '💾',
  },
  {
    title: 'Performance Controls',
    description:
      'Quick turbo (hold paddles) and VBI/CPU quick sheet to fine-tune smoothness vs. frame rate.',
    icon: '📈',
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
