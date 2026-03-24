import React, { useState } from "react";
import { MapPin, ShieldCheck, Headphones, Heart } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Real-time GPS Tracking",
    desc: "Track your ride live on the map. Share your trip with family for added peace of mind.",
    stat: "Live",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Trained Drivers",
    desc: "Every CabIndia captain passes rigorous background checks and safety training.",
    stat: "100%",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    desc: "Our support team is always on — call, chat, or email us any time of day or night.",
    stat: "24/7",
  },
  {
    icon: Heart,
    title: "Women Safety Features",
    desc: "Dedicated SOS button, live trip sharing, and women-preferred captain options.",
    stat: "SOS",
  },
];

export default function RightAboutUs() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{`
        @keyframes fadeInLeft2 {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight2 {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .right-img-anim  { animation: fadeInLeft2  0.8s ease forwards; }
        .right-text-anim { animation: fadeInRight2 0.8s ease forwards; }
      `}</style>

      <section className="bg-gray-900 py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">

        {/* subtle top separator */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT — Image ── */}
          <div className="right-img-anim relative order-2 lg:order-1">

            {/* decorative corners — flipped from LeftAboutUs */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-yellow-400/40 rounded-tl-2xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-yellow-400/40 rounded-br-2xl pointer-events-none" />

            {/* glow */}
            <div className="absolute inset-4 bg-yellow-400/6 rounded-3xl blur-2xl pointer-events-none" />

            {/* image */}
            <div
              className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src="/images/chooseus.jpg"
                alt="Why choose CabIndia"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.parentElement.style.background = "#111118";
                  e.target.parentElement.style.display = "flex";
                  e.target.parentElement.style.alignItems = "center";
                  e.target.parentElement.style.justifyContent = "center";
                  e.target.style.display = "none";
                  const el = document.createElement("div");
                  el.innerHTML = `<div style="text-align:center;color:#6b7280;font-size:0.8rem;padding:2rem">Place your image at<br/><span style="color:#facc15">/images/about-right.jpg</span></div>`;
                  e.target.parentElement.appendChild(el);
                }}
              />
              {/* bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />

              {/* floating tag — top left of image */}
              <div className="absolute top-4 left-4">
                <div className="bg-yellow-400 text-gray-950 text-[10px] font-black tracking-[0.18em] uppercase px-3 py-1.5 rounded-full shadow-lg">
                  Why CabIndia?
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Feature cards ── */}
          <div className="right-text-anim flex flex-col gap-6 order-1 lg:order-2">

            {/* section label */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-bold tracking-[0.25em] uppercase">
                Why Choose Us
              </span>
            </div>

            {/* heading */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              Built Around{" "}
              <span className="text-yellow-400 italic">Your</span>
              <br />
              Safety & Trust
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed -mt-2">
              We go beyond transportation — every feature is designed with
              your comfort, safety, and convenience as the priority.
            </p>

            {/* feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f, idx) => {
                const Icon      = f.icon;
                const isHovered = hovered === idx;

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    className={[
                      "relative flex flex-col gap-3 p-4 rounded-2xl border cursor-default",
                      "transition-all duration-300",
                      isHovered
                        ? "bg-gray-800 border-yellow-400/50 shadow-[0_0_24px_rgba(250,204,21,0.1)] -translate-y-0.5"
                        : "bg-gray-800/50 border-gray-700/60",
                    ].join(" ")}
                  >
                    {/* stat badge — top right */}
                    <span
                      className={[
                        "absolute top-3 right-3 text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full border transition-all duration-300",
                        isHovered
                          ? "bg-yellow-400 text-gray-950 border-yellow-400"
                          : "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
                      ].join(" ")}
                    >
                      {f.stat}
                    </span>

                    {/* icon */}
                    <div
                      className={[
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                        isHovered
                          ? "bg-yellow-400 text-gray-950 shadow-[0_4px_16px_rgba(250,204,21,0.4)]"
                          : "bg-yellow-400/10 text-yellow-400",
                      ].join(" ")}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>

                    {/* text */}
                    <div>
                      <h4 className="text-white text-sm font-bold leading-snug">
                        {f.title}
                      </h4>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* bottom separator */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent" />
        </div>

      </section>
    </>
  );
}