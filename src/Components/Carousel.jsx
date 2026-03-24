import React, { useState, useEffect, useRef } from "react";

const slides = [
  {
    image: "/images/about-img1.jpg",
    tag: "Safe & Reliable",
    heading: "Your City,",
    highlight: "Your Ride",
    sub: "Book a cab anywhere in India — in seconds.",
  },
  {
    image: "/images/about-img2.jpg",
    tag: "Affordable Fares",
    heading: "Move Smarter,",
    highlight: "Pay Less",
    sub: "Transparent pricing with zero hidden charges.",
  },
  {
    image: "/images/about-img3.jpg",
    tag: "Verified Drivers",
    heading: "Trusted Captains,",
    highlight: "Every Trip",
    sub: "All CabIndia drivers are background-verified.",
  },
];

export default function Carousel() {
  const [current, setCurrent]   = useState(0);
  const [animKey, setAnimKey]   = useState(0);
  const timerRef                = useRef(null);

  const goTo = (idx) => {
    setCurrent(idx);
    setAnimKey((k) => k + 1);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        setAnimKey((k) => k + 1);
        return next;
      });
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const slide = slides[current];

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp2 {
          0%   { opacity: 0; transform: translateY(28px); }
          30%  { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp3 {
          0%   { opacity: 0; transform: translateY(28px); }
          50%  { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(1.06); }
          to   { transform: scale(1); }
        }
        .anim-tag  { animation: fadeSlideUp  0.6s ease forwards; }
        .anim-h1   { animation: fadeSlideUp2 0.7s ease forwards; }
        .anim-sub  { animation: fadeSlideUp3 0.8s ease forwards; }
        .anim-img  { animation: scaleIn      6s ease forwards; }
      `}</style>

      <div className="relative w-full overflow-hidden bg-gray-950" style={{ height: 400 }}>

        {/* ── Background image ── */}
        <div
          key={`img-${animKey}`}
          className="anim-img absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${slide.image}')` }}
        />

        {/* ── Overlays ── */}
        {/* dark base */}
        <div className="absolute inset-0 bg-gray-950/0" />
        {/* left fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/40 to-transparent" />
        {/* bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

        {/* ── Yellow left accent bar ── */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"
          style={{ boxShadow: "0 0 24px 4px rgba(250,204,21,0.45)" }}
        />

        {/* ── Slide text ── */}
        <div
          key={`text-${animKey}`}
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-2xl"
        >
          {/* tag pill */}
          <span className="anim-tag inline-flex items-center gap-2 self-start mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span className="text-yellow-400 text-xs font-bold tracking-[0.2em] uppercase">
              {slide.tag}
            </span>
          </span>

          {/* heading */}
          <h1 className="anim-h1 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
            {slide.heading}
            <br />
            <span className="text-yellow-400 italic">{slide.highlight}</span>
          </h1>

          {/* subtext */}
          <p className="anim-sub mt-4 text-gray-300 text-sm md:text-base max-w-sm leading-relaxed">
            {slide.sub}
          </p>
        </div>

        {/* ── Dot indicators ── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { goTo(idx); startTimer(); }}
              className={[
                "rounded-full transition-all duration-400",
                idx === current
                  ? "w-6 h-2 bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.7)]"
                  : "w-2 h-2 bg-gray-600 hover:bg-gray-400",
              ].join(" ")}
            />
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-800">
          <div
            key={`bar-${animKey}`}
            className="h-full bg-yellow-400"
            style={{
              animation: "progressBar 3.5s linear forwards",
            }}
          />
        </div>

        <style>{`
          @keyframes progressBar {
            from { width: 0%; }
            to   { width: 100%; }
          }
        `}</style>

        {/* ── Slide counter ── */}
        <div className="absolute top-5 right-6 flex items-center gap-1.5">
          <span className="text-yellow-400 font-black text-sm">
            0{current + 1}
          </span>
          <span className="text-gray-600 text-xs">/</span>
          <span className="text-gray-600 text-xs">0{slides.length}</span>
        </div>

      </div>
    </>
  );
}