import React from "react";
import Link from "next/link";
import "./globals.css";

// /workspaces/itefafai/app/layout.tsx

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="container">
          <aside className="sidebar">
            <h3 className="header">Pages</h3>
            <div className="nav-grid">
              <Link href="/" className="btn btn-outline nav-link">
                Home
              </Link>
              <Link href="/about" className="btn btn-outline nav-link">
                AI
              </Link>
              <Link href="/dashboard" className="btn btn-outline nav-link">
                Receipts
              </Link>
              <Link href="/reports" className="btn btn-outline nav-link">
                Reports
              </Link>
              <Link href="/settings" className="btn btn-outline nav-link">
                Settings
              </Link>
              <Link href="/help" className="btn btn-outline nav-link">
                Help
              </Link>
            </div>
          </aside>

          <main className="main-content">
            {/* page content will be rendered here */}
            {children}
          </main>
        </div>

        <style>{`
          /* small responsive tweak */
          @media (max-width: 720px) {
            body > div { flex-direction: column; }
            aside { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(16,24,40,0.06); }
            main { padding: 16px !important; }
            aside div { grid-template-columns: 1fr 1fr !important; }
          }
          a[data-next-link] {
            /* Next.js Link renders an <a> with this attribute in some versions.
               Keep pointer cursor and remove default underline. */
            cursor: pointer;
            text-decoration: none;
          }
        `}</style>
      </body>
    </html>
  );
}