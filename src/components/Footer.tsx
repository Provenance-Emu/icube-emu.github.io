import Link from 'next/link';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm">
    {children}
  </Link>
);

const ExternalFooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm">
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              i<span className="text-blue-500">Cube</span>
            </div>
            <p className="text-gray-500 dark:text-gray-500 text-sm leading-relaxed">
              GameCube and Wii emulator for iPhone, iPad, and Apple TV.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wider mb-3">App</h3>
            <div className="flex flex-col gap-2">
              <FooterLink href="/downloads/">Downloads</FooterLink>
              <FooterLink href="/testflight/">TestFlight Beta</FooterLink>
              <FooterLink href="/features/">Features</FooterLink>
              <FooterLink href="/about/">About</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wider mb-3">Support</h3>
            <div className="flex flex-col gap-2">
              <FooterLink href="/support/">FAQ &amp; Help</FooterLink>
              <FooterLink href="/donate/">Donate</FooterLink>
              <FooterLink href="/links/">Links</FooterLink>
              <FooterLink href="/status/">Site Status</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wider mb-3">Community</h3>
            <div className="flex flex-col gap-2">
              <ExternalFooterLink href="https://discord.com/invite/4TK7PU5">Discord</ExternalFooterLink>
              <ExternalFooterLink href="https://x.com/ProvenanceApp">X / Twitter</ExternalFooterLink>
              <ExternalFooterLink href="https://provenance-emu.itch.io/icube">itch.io</ExternalFooterLink>
              <ExternalFooterLink href="https://github.com/Provenance-Emu/Provenance">GitHub</ExternalFooterLink>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 dark:text-gray-500 text-xs">
            © {new Date().getFullYear()} Joseph Mattiello. Built on{' '}
            <a href="https://github.com/JoeMatt/dolphin" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-400 transition-colors">Dolphin</a>.{' '}
            <a href="https://joemattiello.dev" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-400 transition-colors">Developer</a>.
          </p>
          <div className="flex gap-4">
            <FooterLink href="/support/">Support</FooterLink>
            <FooterLink href="/privacy/">Privacy</FooterLink>
            <FooterLink href="/licenses/">Licenses</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
