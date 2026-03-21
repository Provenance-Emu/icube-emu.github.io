import type { Metadata } from 'next';
import StatusDashboard from './StatusDashboard';

export const metadata: Metadata = {
  title: 'Site Status',
  description: 'Live site health for icube-app.com: Lighthouse scores, HTML/link check results, SSL grade, and Mozilla Observatory security rating.',
  alternates: { canonical: 'https://icube-app.com/status/' },
  robots: { index: false, follow: false },
};

export default function StatusPage() {
  return <StatusDashboard />;
}
