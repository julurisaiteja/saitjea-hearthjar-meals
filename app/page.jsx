'use client';
import Link from 'next/link';
import { brand, products } from '../lib/brand';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const live =
    typeof brand.stats[0].value === 'number'
      ? brand.stats[0].value + (tick % 7)
      : brand.stats[0].value;

  const steps = [
    { n: '01', t: 'Choose a plan', d: '5, 10, or 14 jars — set prefs, pause anytime.' },
    { n: '02', t: 'Build the week', d: 'Swap meals until Thursday 6pm from the menu.' },
    { n: '03', t: 'Sunday delivery', d: 'Glass jars land evening — heat, eat, rinse.' },
  ];

  return (
    <>
      <div className="ed-masthead">
        <p className="ed-kicker">Vol. 12 · Weekly jar journal</p>
        <p className="brand">{brand.name}</p>
        <p className="ed-kicker mt-2">
          {brand.offer.label} · {brand.offer.code}
        </p>
      </div>

      <section className="ed-hero">
        <div className="ed-hero-media">
          <video autoPlay muted loop playsInline poster={brand.poster}>
            <source src={brand.video} type="video/mp4" />
          </video>
        </div>
        <div className="ed-hero-copy">
          <div>
            <p className="ed-kicker">Cover story</p>
            <h1 className="ed-headline mt-3">{brand.tagline}</h1>
          </div>
          <div>
            <p className="text-muted leading-relaxed">{brand.description}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/special" className="btn-brand">
                Choose a plan
              </Link>
              <Link href="/shop" className="btn-ghost">
                Read the menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="ed-process reveal">
        <p className="ed-kicker">How it works</p>
        <h2 className="ed-headline mt-2" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
          From kitchen to jar
        </h2>
        <div className="ed-process-grid stagger">
          {steps.map((s) => (
            <div key={s.n} className="ed-process-card">
              <p className="ed-kicker">{s.n}</p>
              <p className="ed-headline mt-3" style={{ fontSize: '1.6rem' }}>
                {s.t}
              </p>
              <p className="mt-3 text-muted leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="film-strip ed-film">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="film-cell ed-film-cell">
            <img src={p.img} alt={p.name} />
            <span>
              {p.name}
              {p.macros ? ` · ${p.macros.cal} kcal` : ''}
            </span>
          </Link>
        ))}
      </div>

      <section className="ed-columns">
        {products.slice(0, 6).map((p) => (
          <article key={p.id} className="ed-story">
            <p className="ed-kicker">
              {p.cat} · {p.macros ? p.macros.cal + ' kcal' : ''}
            </p>
            <h2 className="ed-headline" style={{ fontSize: '1.8rem' }}>
              <Link href={`/product/${p.id}`}>{p.name}</Link>
            </h2>
            <img src={p.img} alt={p.name} />
            <p>
              <span className="ed-drop">{p.name[0]}</span>
              {p.blurb} Chef notes pair this jar with a quiet Sunday reset. From ${p.price}.
            </p>
          </article>
        ))}
      </section>

      <section className="loyalty-band ed-loyalty reveal">
        <div>
          <p className="ed-kicker">Subscriber offer</p>
          <p className="ed-headline mt-2" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
            {brand.offer.label}
          </p>
          <p className="mt-2 text-muted">
            Code <strong>{brand.offer.code}</strong> · {brand.offer.detail}
          </p>
        </div>
        <Link href="/special" className="btn-brand">
          Start a plan
        </Link>
      </section>

      <section className="ed-stats reveal">
        {brand.stats.map((s, i) => (
          <div key={s.label} className="ed-stat">
            <p className="ed-headline" style={{ fontSize: '2.4rem' }}>
              {i === 0 ? live : s.value}
            </p>
            <p className="ed-kicker mt-2">{s.label}</p>
          </div>
        ))}
      </section>

      <section id="reviews" className="mx-auto max-w-3xl px-4 py-16">
        <p className="ed-kicker">Letters</p>
        <h2 className="ed-headline mt-2">From the neighborhood</h2>
        <div className="mt-8 space-y-8 stagger">
          {brand.reviews.map((r) => (
            <blockquote key={r.name} className="ed-letter">
              <p className="text-xl md:text-2xl leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <footer className="mt-3 ed-kicker">
                {r.name} · {r.stars}/5
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
