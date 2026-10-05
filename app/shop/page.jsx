'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { brand, products } from '../../lib/brand';
import { useCart } from '../../lib/cart';

export default function ShopPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('featured');
  const { toggleWish, wish } = useCart();
  useEffect(() => {
    try {
      const c = new URLSearchParams(window.location.search).get('cat');
      if (c) setCat(c);
    } catch {}
  }, []);
  const cats = ['All', ...Array.from(new Set(products.map((p) => p.cat)))];
  const list = useMemo(() => {
    let out = products.filter((p) => {
      const hay = (p.name + ' ' + p.blurb + ' ' + (p.tags || []).join(' ')).toLowerCase();
      return (cat === 'All' || p.cat === cat) && hay.includes(q.toLowerCase());
    });
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [q, cat, sort]);

  return (
    <div className="ed-index">
      <header className="ed-index-head reveal">
        <p className="ed-kicker">Contents · {brand.offer.code}</p>
        <h1 className="ed-headline mt-2">Menu index</h1>
        <p className="text-muted mt-3 max-w-xl">
          Magazine columns with macros in the folio — search, filter, sort the week&apos;s jars.
        </p>
      </header>

      <div className="ed-index-controls reveal reveal-delay-1">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the index…"
          className="ed-index-input"
          aria-label="Search menu"
        />
        <div className="ed-index-cats">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`ed-index-cat${cat === c ? ' is-on' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="ed-index-input"
          aria-label="Sort"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className="ed-index-columns stagger">
        {list.map((p, i) => (
          <article key={p.id} className="ed-index-row">
            <div className="ed-index-folio">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span>{p.cat}</span>
            </div>
            <Link href={`/product/${p.id}`} className="ed-index-thumb">
              <img src={p.img} alt={p.name} />
            </Link>
            <div className="ed-index-copy">
              <div className="flex justify-between gap-3 items-start">
                <h2 className="ed-headline" style={{ fontSize: '1.55rem' }}>
                  <Link href={`/product/${p.id}`}>{p.name}</Link>
                </h2>
                <button type="button" onClick={() => toggleWish(p.id)} aria-label="Wishlist" className="ed-wish">
                  {wish.includes(p.id) ? '♥' : '♡'}
                </button>
              </div>
              <p className="mt-2 leading-relaxed">
                <span className="ed-drop">{p.name[0]}</span>
                {p.blurb} From ${p.price}.
              </p>
              {p.macros && (
                <p className="ed-kicker mt-3">
                  {p.macros.cal} kcal · P {p.macros.p} · C {p.macros.c} · F {p.macros.f} · ★ {p.rating}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
      {!list.length && <p className="mt-10 text-muted ed-kicker">No entries — revise the filter.</p>}
    </div>
  );
}
