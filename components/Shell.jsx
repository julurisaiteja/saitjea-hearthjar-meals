'use client';
import Link from 'next/link';
import { useState } from 'react';
import { brand } from '../lib/brand';
import { useCart } from '../lib/cart';
import AIAssistant from './AIAssistant';

export default function Shell({ children }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const nav = [
    { href: '/shop', label: brand.nav[0] },
    { href: '/special', label: brand.nav[1] },
    { href: '/shop?cat=Protein', label: brand.nav[2] },
    { href: '/#how', label: brand.nav[3] },
  ];

  return (
    <div data-diamond="batch-1" data-style={brand.styleMarker}>
      <a href="#main" className="skip-link">Skip to journal</a>
      <div className="offer-banner ed-shell-banner">
        {brand.offer.label} · {brand.offer.code} — {brand.offer.detail}
      </div>
      <header className="ed-shell-header">
        <div className="ed-shell-topline">
          <span>Vol. 12</span>
          <span>Weekly jar journal</span>
          <span>{new Date().getFullYear()}</span>
        </div>
        <div className="ed-shell-inner">
          <Link href="/" className="ed-shell-mark">
            {brand.name}
          </Link>
          <nav className="ed-shell-nav" aria-label="Primary">
            {nav.map((item) => (
              <Link key={item.label} href={item.href} className="ed-shell-link">
                {item.label}
              </Link>
            ))}
            <Link href="/cart" className="ed-shell-cart">
              Box{count > 0 ? ` · ${count}` : ''}
            </Link>
          </nav>
          <button
            type="button"
            className="ed-shell-burger md:hidden"
            aria-expanded={open}
            aria-controls="ed-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Index'}
          </button>
        </div>
        {open && (
          <div id="ed-mobile-nav" className="ed-shell-drawer">
            {nav.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)}>
              Box{count > 0 ? ` · ${count}` : ''}
            </Link>
          </div>
        )}
      </header>
      <main id="main">{children}</main>
      <footer className="ed-shell-footer">
        <div className="ed-shell-footer-grid">
          <div>
            <p className="ed-shell-footer-brand">{brand.name}</p>
            <p className="ed-kicker mt-3">Homemade fuel, jarred fresh</p>
            <p className="mt-3 text-muted max-w-md leading-relaxed">{brand.description}</p>
            <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                className="flex-1 px-3 py-2 text-sm outline-none bg-surface"
                style={{ borderBottom: '1px solid var(--text)', borderRadius: 0 }}
                placeholder="Email for the Sunday dispatch"
                aria-label="Email for the Sunday dispatch"
              />
              <button type="submit" className="btn-brand !py-2">
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <p className="ed-kicker mb-3">Departments</p>
            <div className="space-y-2 text-sm">
              <div><Link href="/shop">Weekly menu</Link></div>
              <div><Link href="/special">Plans</Link></div>
              <div><Link href="/checkout">Checkout</Link></div>
              <div><Link href="/#reviews">Letters</Link></div>
            </div>
          </div>
          <div>
            <p className="ed-kicker mb-3">Colophon</p>
            <div className="space-y-2 text-sm text-muted">
              <div>Macros on every jar</div>
              <div>Pause or swap by Thursday 6pm</div>
              <div>Glass oven-safe to 350°F</div>
            </div>
          </div>
        </div>
        <p className="ed-shell-legal">Demo storefront · no real payments · {brand.name} journal</p>
      </footer>
      <div className="sticky-cta md:hidden">
        <Link href="/shop" className="btn-brand !py-2 !px-4 text-sm">
          Menu
        </Link>
        <Link href="/special" className="btn-ghost !py-2 !px-4 text-sm">
          Plans
        </Link>
      </div>
      <AIAssistant />
    </div>
  );
}
