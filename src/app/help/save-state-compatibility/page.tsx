import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Save State Compatibility',
  description: 'Why save states can become incompatible after an iCube update, and how to protect your progress with in-game saves.',
  alternates: { canonical: 'https://icube-emu.com/help/save-state-compatibility/' },
};

export default function SaveStateCompatibility() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Save State Compatibility</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 space-y-6 text-gray-700 dark:text-gray-300">
          <p>A game save is written by the game to its memory card or Wii save storage. A save state is a snapshot of the emulator, including memory and processor state. They are different kinds of progress.</p>
          <p>Save states depend on the Dolphin core version that created them. An iCube update can change the required state format. If the version markers differ, a state is marked Incompatible rather than loaded into a mismatched core.</p>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Protect your progress</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Use the game&apos;s own save feature for long-term progress, and keep backups of important saves.</li>
            <li>Use save states for short-term convenience. Do not rely on them remaining compatible across updates.</li>
            <li>If a state is incompatible, resume from an in-game save. Create a fresh state after updating.</li>
          </ul>
          <Link href="/support/" className="text-blue-600 dark:text-blue-400 hover:underline">Contact support</Link>
        </div>
      </div>
    </div>
  );
}
