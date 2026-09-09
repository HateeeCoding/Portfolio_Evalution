import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SuperInvesting | Next-Gen Portfolio Evaluation & Health Scorecard',
  description: 'Multi-pillar portfolio health scorecard with 100-point parameter scoring, risk analysis, and actionable rebalancing recommendations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
