import React, { useState } from "react";
import { Bike, Car, Package, Clock } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Auto",
    icon: Car,
    tagline: "Daily rides. Minimal cost.",
    price: "₹80–₹150",
    desc: "Your everyday companion for city travel. Quick pickups, affordable fares, always on time.",
    stat1: { label: "Avg Wait", value: "3 min" },
    stat2: { label: "Rides/Day", value: "12K+" },
    emoji: "🛺",
  },
  {
    id: 2,
    name: "Bike",
    icon: Bike,
    tagline: "Fast lanes. Zero delays.",
    price: "₹40–₹90",
    desc: "Cut through traffic like a knife. The fastest point-to-point urban ride money can buy.",
    stat1: { label: "Avg Speed", value: "38 km/h" },
    stat2: { label: "CO₂ Saved", value: "60%" },
    emoji: "🏍️",
  },
  {
    id: 3,
    name: "Mini",
    icon: Car,
    tagline: "Comfort meets budget.",
    price: "₹120–₹220",
    desc: "AC cabin, clean interiors. When you want a car but don't want to break the bank.",
    stat1: { label: "Seats", value: "4" },
    stat2: { label: "Rating", value: "4.7★" },
    emoji: "🚗",
  },
  {
    id: 4,
    name: "Sedan",
    icon: Car,
    tagline: "Premium city travel.",
    price: "₹200–₹350",
    desc: "Arrive in style. Executive-class vehicles for professionals who demand more.",
    stat1: { label: "Seats", value: "4" },
    stat2: { label: "Rating", value: "4.9★" },
    emoji: "🚙",
  },
  {
    id: 5,
    name: "Parcel",
    icon: Package,
    tagline: "Send anything. Anytime.",
    price: "₹60–₹180",
    desc: "Door-to-door delivery across the city. Secure, trackable, always on schedule.",
    stat1: { label: "Max Weight", value: "30 kg" },
    stat2: { label: "Delivered", value: "99.2%" },
    emoji: "📦",
  },
  {
    id: 6,
    name: "Rental",
    icon: Clock,
    tagline: "Ride your way, hourly.",
    price: "₹300+",
    desc: "Full day, half day — your driver, your plan. Explore the city without limits.",
    stat1: { label: "Min Hours", value: "2 hrs" },
    stat2: { label: "Cities", value: "50+" },
    emoji: "⏱️",
  },
];

// Stack visual config: index = distance from active (0=active, 1=right, 2=left, 3=far-right, ...)
const stackConfig = [
  { tx: 0,    ty: 0,  scaleClass: "scale-100", opacityClass: "opacity-100", zClass: "z-50", rotateClass: "rotate-0",  blur: "" },
  { tx: 130,  ty: 10, scaleClass: "scale-95",  opacityClass: "opacity-65",  zClass: "z-40", rotateClass: "-rotate-3", blur: "" },
  { tx: -130, ty: 10, scaleClass: "scale-95",  opacityClass: "opacity-65",  zClass: "z-40", rotateClass: "rotate-3",  blur: "" },
  { tx: 235,  ty: 18, scaleClass: "scale-88",  opacityClass: "opacity-35",  zClass: "z-30", rotateClass: "-rotate-6", blur: "blur-[1px]" },
  { tx: -235, ty: 18, scaleClass: "scale-88",  opacityClass: "opacity-35",  zClass: "z-30", rotateClass: "rotate-6",  blur: "blur-[1px]" },
  { tx: 320,  ty: 24, scaleClass: "scale-80",  opacityClass: "opacity-15",  zClass: "z-20", rotateClass: "-rotate-9", blur: "blur-[2px]" },
];

export default function ServiceSection() {
  const [active, setActive] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [fading, setFading] = useState(false);

  const switchService = (idx) => {
    if (idx === active) {
      setFading(true);
      setTimeout(() => {
        setShowDetail((v) => !v);
        setFading(false);
      }, 150);
      return;
    }
    setShowDetail(false);
    setActive(idx);
  };

  // Build ordered stack: active → right → left → far-right → far-left…
  const orderedIndices = [active];
  for (let i = 1; i < services.length; i++) {
    const r = (active + i) % services.length;
    const l = (active - i + services.length) % services.length;
    if (r !== l) orderedIndices.push(r, l);
    else orderedIndices.push(r);
  }

  const svc = services[active];

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-20 overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-yellow-400/[0.04] blur-[130px] pointer-events-none" />
      <div
        className="absolute top-1/3 w-72 h-72 rounded-full bg-yellow-400/[0.09] blur-[90px] pointer-events-none transition-[left] duration-700 ease-in-out"
        style={{ left: `${16 + active * 11}%` }}
      />

      {/* ── Heading ── */}
      <div className="relative z-10 text-center mb-16">
        <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em] mb-3">
          CabIndia Services
        </p>
        <h3 className="text-5xl md:text-[64px] font-black tracking-tight leading-[1]">
          Ride{" "}
          <span className="text-yellow-400 italic">Your Way</span>
        </h3>
        <p className="mt-4 text-gray-500 text-xs uppercase tracking-[0.2em] font-mono">
          Select a service · tap active card for details
        </p>
      </div>

      {/* ── Stacked Cards ── */}
      <div
        className="relative z-10 w-full max-w-4xl flex items-center justify-center"
        style={{ height: 300 }}
      >
        {orderedIndices.map((svcIdx, stackPos) => {
          const s = services[svcIdx];
          const cfg = stackConfig[Math.min(stackPos, stackConfig.length - 1)];
          const isActive = stackPos === 0;
          const Icon = s.icon;

          return (
            <div
              key={s.id}
              onClick={() => switchService(svcIdx)}
              className={[
                "absolute cursor-pointer rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                cfg.scaleClass,
                cfg.opacityClass,
                cfg.zClass,
                cfg.rotateClass,
                cfg.blur,
                isActive
                  ? "ring-1 ring-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.18)]"
                  : "ring-1 ring-white/5 hover:ring-white/15 hover:scale-[1.02]",
              ].join(" ")}
              style={{
                width: 196,
                height: 256,
                transform: `translateX(${cfg.tx}px) translateY(${cfg.ty}px)`,
                background: isActive
                  ? "linear-gradient(160deg,#1c1c0e 0%,#111108 100%)"
                  : "linear-gradient(160deg,#161620 0%,#0f0f18 100%)",
              }}
            >
              {/* Card index */}
              <span className="absolute top-4 right-4 text-[9px] font-mono text-gray-700 tracking-widest">
                0{s.id}/06
              </span>

              {/* Active pulse dot */}
              {isActive && (
                <span className="absolute top-4 left-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-[8px] font-mono text-yellow-400 uppercase tracking-widest">live</span>
                </span>
              )}

              {/* Icon */}
              <div
                className={[
                  "absolute top-10 left-5 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-yellow-400" : "bg-white/5",
                ].join(" ")}
              >
                <Icon size={18} className={isActive ? "text-black" : "text-gray-500"} />
              </div>

              {/* Decorative emoji */}
              <span className="absolute bottom-14 right-3 text-[44px] opacity-[0.08] select-none pointer-events-none leading-none">
                {s.emoji}
              </span>

              {/* Bottom content */}
              <div className="absolute bottom-5 left-5 right-5">
                <div
                  className={[
                    "text-[17px] font-extrabold tracking-tight leading-tight",
                    isActive ? "text-yellow-400" : "text-white",
                  ].join(" ")}
                >
                  {s.name}
                </div>
                <div className="text-[9px] text-gray-600 font-mono uppercase tracking-wider mt-0.5 leading-snug">
                  {s.tagline}
                </div>
                <div
                  className={[
                    "mt-2.5 inline-block text-[9px] font-bold font-mono px-2.5 py-1 rounded-full",
                    isActive
                      ? "bg-yellow-400 text-black"
                      : "bg-white/5 text-gray-500",
                  ].join(" ")}
                >
                  {s.price}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom Panel ── */}
      <div className="relative z-10 mt-10 w-full max-w-2xl">

        {/* Tab pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-5">
          {services.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => switchService(idx)}
              className={[
                "px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border transition-all duration-200",
                idx === active
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-transparent text-gray-600 border-white/8 hover:border-white/25 hover:text-gray-300",
              ].join(" ")}
            >
              {s.emoji} {s.name}
            </button>
          ))}
        </div>

        {/* Info panel */}
        <div
          className={[
            "rounded-2xl border border-white/8 bg-white/[0.025] p-6 transition-all duration-200",
            fading ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-100 translate-y-0 scale-100",
          ].join(" ")}
        >
          {!showDetail ? (
            /* Summary row */
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{svc.emoji}</span>
                <div>
                  <h3 className="text-2xl font-black text-yellow-400 tracking-tight leading-none">
                    {svc.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-0.5">
                    {svc.tagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="text-right">
                  <div className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">Est. Price</div>
                  <div className="text-xl font-black font-mono text-white">{svc.price}</div>
                </div>

                <button
                  onClick={() => switchService(active)}
                  className="text-[9px] font-mono text-yellow-400/50 hover:text-yellow-400 underline underline-offset-2 transition-colors whitespace-nowrap"
                >
                  View Details ↓
                </button>

                <button className="bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-black font-extrabold text-[13px] px-6 py-3 rounded-xl transition-all duration-150 hover:scale-105 shadow-[0_4px_20px_rgba(250,204,21,0.28)] whitespace-nowrap">
                  Book Now →
                </button>
              </div>
            </div>
          ) : (
            /* Detail view */
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">{svc.emoji}</span>
                    <h3 className="text-xl font-black text-yellow-400 tracking-tight">{svc.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{svc.desc}</p>
                </div>
                <button
                  onClick={() => setShowDetail(false)}
                  className="text-[9px] font-mono text-gray-700 hover:text-gray-400 transition-colors uppercase tracking-widest shrink-0 mt-0.5"
                >
                  ← Back
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-yellow-400/5 border border-yellow-400/12 rounded-xl p-4 text-center">
                  <div className="text-lg font-black font-mono text-yellow-400">{svc.stat1.value}</div>
                  <div className="text-[9px] text-gray-600 font-mono uppercase tracking-wider mt-1">{svc.stat1.label}</div>
                </div>
                <div className="bg-yellow-400/5 border border-yellow-400/12 rounded-xl p-4 text-center">
                  <div className="text-lg font-black font-mono text-yellow-400">{svc.stat2.value}</div>
                  <div className="text-[9px] text-gray-600 font-mono uppercase tracking-wider mt-1">{svc.stat2.label}</div>
                </div>
                <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 text-center">
                  <div className="text-lg font-black font-mono text-white">{svc.price}</div>
                  <div className="text-[9px] text-gray-600 font-mono uppercase tracking-wider mt-1">Est. Fare</div>
                </div>
              </div>

              <button className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-extrabold text-sm py-3.5 rounded-xl transition-all duration-150 hover:scale-[1.01] shadow-[0_4px_24px_rgba(250,204,21,0.22)]">
                Book {svc.name} Now →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}