'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { brand, products } from '../../lib/brand';
import { useCart } from '../../lib/cart';
export default function SpecialPage(){
  const [plan,setPlan]=useState(brand.variants.plans[1]);
  const [pref,setPref]=useState(brand.variants.prefs[0]);
  const [picks,setPicks]=useState(products.slice(0,4).map(p=>p.id));
  const { add }=useCart(); const router=useRouter();
  function toggle(id){ setPicks(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]); }
  function start(){ add({ id:'plan', name:plan.label, price:plan.price, img:products[0].img, qty:1, lineKey:`plan-${plan.id}-${pref}`, meta:`${pref} · ${picks.length} meals selected` }); router.push('/checkout'); }
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <header className="special-chrome reveal">
        <p className="ed-kicker">Subscription desk</p>
        <h1 className="ed-headline mt-2">Meal plans</h1>
        <p className="text-muted mt-2">Macros, prefs, weekly menu — subscription-ready.</p>
      </header>
      <div className="mt-8 grid gap-4 md:grid-cols-3">{brand.variants.plans.map(p=>(
        <button key={p.id} onClick={()=>setPlan(p)} className="card-soft p-6 text-left" style={{outline:plan.id===p.id?'2px solid var(--brand)':undefined}}>
          <p className="font-display text-2xl">{p.label}</p><p className="mt-2 font-semibold" style={{color:'var(--brand)'}}>${p.price}/wk</p>
        </button>))}</div>
      <div className="mt-8"><p className="font-semibold mb-2">Dietary preference</p><div className="flex flex-wrap gap-2">{brand.variants.prefs.map(p=><button key={p} onClick={()=>setPref(p)} className="chip" style={{outline:pref===p?'2px solid var(--brand)':undefined}}>{p}</button>)}</div></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map(p=>{
        const on=picks.includes(p.id); const m=p.macros;
        return <button key={p.id} onClick={()=>toggle(p.id)} className="card-soft overflow-hidden text-left" style={{outline:on?'2px solid var(--brand)':undefined}}>
          <img src={p.img} alt="" className="aspect-video w-full object-cover" />
          <div className="p-3"><p className="font-semibold text-sm">{p.name}</p>{m&&<p className="text-xs text-muted mt-1">{m.cal} cal · {m.p}g protein</p>}</div>
        </button>;
      })}</div>
      <button className="btn-brand mt-8" onClick={start}>Start {plan.label} · ${plan.price}</button>
    </div>
  );
}
