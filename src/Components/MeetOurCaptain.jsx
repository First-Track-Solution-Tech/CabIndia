import React, { useState, useRef } from "react";
import { Star, MapPin, Award } from "lucide-react";

const captains = [
  {
    name: "Ravi Kumar",
    city: "Bhubaneswar",
    rating: 4.9,
    rides: "3,240",
    quote: "Your safety is my priority. Every ride, every time.",
    avatar: "/images/captain1.jpg",
    initials: "RK",
    badge: "Top Captain",
  },
  {
    name: "Anjali Verma",
    city: "Cuttack",
    rating: 4.8,
    rides: "2,185",
    quote: "Fast, friendly service — I treat every passenger like family.",
    avatar: "/images/captain2.jpg",
    initials: "AV",
    badge: "Women's Choice",
  },
  {
    name: "Amit Singh",
    city: "Puri",
    rating: 4.9,
    rides: "4,510",
    quote: "Always on time, every time. That's the CabIndia promise.",
    avatar: "/images/captain3.jpg",
    initials: "AS",
    badge: "Most Rides",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-700 fill-gray-700"}
        />
      ))}
      <span className="text-yellow-400 text-xs font-bold ml-1">{rating}</span>
    </div>
  );
}

function CaptainCard({ captain, isActive }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      className={[
        "relative flex flex-col rounded-3xl border overflow-hidden transition-all duration-400",
        isActive
          ? "bg-gray-900 border-yellow-400/50 shadow-[0_0_40px_rgba(250,204,21,0.12)] scale-100"
          : "bg-gray-900/60 border-gray-800 scale-95 opacity-70",
      ].join(" ")}
    >
      {/* top yellow glow */}
      {isActive && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-16 bg-yellow-400/15 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="flex items-center gap-1 bg-yellow-400 text-gray-950 text-[9px] font-black tracking-[0.12em] uppercase px-2.5 py-1 rounded-full shadow-lg">
          <Award size={9} />
          {captain.badge}
        </span>
      </div>

      {/* avatar area */}
      <div className="relative h-52 bg-gray-800 overflow-hidden">
        {!imgErr ? (
          <img
            src={captain.avatar}
            alt={captain.name}
            className="w-full h-full object-cover object-top"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="w-20 h-20 rounded-full bg-yellow-400/15 border-2 border-yellow-400/30 flex items-center justify-center">
              <span className="text-yellow-400 text-2xl font-black">{captain.initials}</span>
            </div>
          </div>
        )}
        {/* bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      {/* card body */}
      <div className="flex flex-col gap-3 px-5 pb-6 pt-3">

        {/* name + city */}
        <div>
          <h3 className="text-white text-lg font-black tracking-tight leading-none">
            {captain.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={11} className="text-yellow-400/70" />
            <span className="text-gray-500 text-xs">{captain.city}</span>
          </div>
        </div>

        {/* rating */}
        <StarRating rating={captain.rating} />

        {/* rides stat */}
        <div className="flex items-center gap-2 bg-gray-800/60 border border-gray-700/50 rounded-xl px-3 py-2">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <span className="text-gray-400 text-xs">Total Rides:</span>
          <span className="text-white text-xs font-bold ml-auto">{captain.rides}</span>
        </div>

        {/* divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* quote */}
        <div className="relative pl-3 border-l-2 border-yellow-400/50">
          <p className="text-gray-400 text-xs italic leading-relaxed">
            "{captain.quote}"
          </p>
        </div>

      </div>
    </div>
  );
}

export default function MeetOurCaptain() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX   = useRef(0);

  const prev = () => setCurrent((c) => (c === 0 ? captains.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === captains.length - 1 ? 0 : c + 1));

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50)  next();
    if (diff < -50) prev();
  };

  return (
    <section className="bg-gray-950 py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-yellow-400" />
            <span className="text-yellow-400 text-xs font-bold tracking-[0.25em] uppercase">
              Our Team
            </span>
            <div className="w-8 h-px bg-yellow-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Meet Our{" "}
            <span className="text-yellow-400 italic">Captains</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md leading-relaxed">
            The heart of CabIndia — verified, trained, and passionate about
            getting you there safely.
          </p>
        </div>

        {/* ── Desktop: 3-column grid ── */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {captains.map((captain, idx) => (
            <CaptainCard key={idx} captain={captain} isActive={true} />
          ))}
        </div>

        {/* ── Mobile: carousel slider ── */}
        <div
          className="md:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* cards track */}
          <div className="flex items-center justify-center gap-4 px-4">
            {captains.map((captain, idx) => (
              <div
                key={idx}
                className={[
                  "transition-all duration-400 w-full max-w-xs flex-shrink-0",
                  idx === current ? "block" : "hidden",
                ].join(" ")}
              >
                <CaptainCard captain={captain} isActive={true} />
              </div>
            ))}
          </div>

          {/* dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {captains.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={[
                  "rounded-full transition-all duration-300",
                  idx === current
                    ? "w-6 h-2 bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                    : "w-2 h-2 bg-gray-700 hover:bg-gray-500",
                ].join(" ")}
              />
            ))}
          </div>

          {/* swipe hint */}
          <p className="text-center text-gray-700 text-[10px] tracking-widest uppercase mt-3">
            Swipe to explore
          </p>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
          <p className="text-gray-600 text-xs tracking-wide text-center">
            500+ verified captains across India —{" "}
            <span className="text-yellow-400 font-semibold">and growing every day.</span>
          </p>
        </div>

      </div>
    </section>
  );
}