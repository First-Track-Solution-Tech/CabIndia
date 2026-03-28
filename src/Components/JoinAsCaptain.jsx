import React from "react";
import { Clock, Star, Users, Headphones, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  {
    icon: Clock,
    title: "Flexible Working Hours",
    desc: "Drive on your own schedule — morning, evening, or whenever suits you best.",
  },
  {
    icon: Star,
    title: "Grow Your Reputation",
    desc: "Build your captain rating and unlock exclusive perks as you complete more rides.",
  },
  {
    icon: Users,
    title: "Join a Trusted Community",
    desc: "Be part of a growing family of 500+ verified captains across India.",
  },
  {
    icon: Headphones,
    title: "Dedicated Captain Support",
    desc: "Our captain support team is available 24/7 to help you on the road.",
  },
];

const steps = [
  { num: "01", label: "Apply Online" },
  { num: "02", label: "Get Verified" },
  { num: "03", label: "Start Riding" },
];

export default function JoinAsCaptain() {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-900 py-20 px-4 sm:px-8 lg:px-16 overflow-hidden relative">

      {/* background glow orbs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* section header */}
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-yellow-400" />
            <span className="text-yellow-400 text-xs font-bold tracking-[0.25em] uppercase">
              Drive With Us
            </span>
            <div className="w-8 h-px bg-yellow-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
            Become a{" "}
            <span className="text-yellow-400 italic">CabIndia</span>
            <br />
            Captain Today
          </h2>
          <p className="text-gray-500 text-sm max-w-lg leading-relaxed">
            Turn your driving skills into an opportunity. Join India's
            fastest-growing ride network and be your own boss.
          </p>
        </div>

        {/* main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">

          {/* LEFT — benefits */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="group flex flex-col gap-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/60 hover:border-yellow-400/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(250,204,21,0.07)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-gray-950 transition-all duration-300">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold leading-snug">{b.title}</h4>
                    <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT — CTA card */}
          <div className="lg:col-span-2">
            <div className="relative h-full bg-gray-950 border border-yellow-400/20 rounded-3xl p-7 flex flex-col justify-between gap-8 overflow-hidden shadow-[0_0_50px_rgba(250,204,21,0.06)]">

              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col gap-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-3xl">
                  🚗
                </div>
                <div>
                  <h3 className="text-white text-xl font-black leading-tight">
                    Ready to hit <br />
                    <span className="text-yellow-400">the road?</span>
                  </h3>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    The application takes less than 5 minutes. Our team will
                    review and get back to you within 48 hours.
                  </p>
                </div>

                {/* steps */}
                <div className="flex flex-col gap-1">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <span className="w-7 h-7 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-[10px] font-black flex-shrink-0">
                          {step.num}
                        </span>
                        {idx < steps.length - 1 && (
                          <div className="w-px h-3 bg-yellow-400/20" />
                        )}
                      </div>
                      <span className="text-gray-300 text-xs font-semibold">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 relative z-10">
                <button
                  onClick={() => navigate("/register/join-captain-form")}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-black text-sm tracking-wide py-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-[0_4px_24px_rgba(250,204,21,0.3)] hover:shadow-[0_6px_32px_rgba(250,204,21,0.45)] relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none" />
                  Join as a Captain
                  <ChevronRight size={16} />
                </button>
                <p className="text-center text-gray-700 text-[10px] tracking-wide">
                    Open to all verified drivers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* bottom image banner */}
        <div className="mt-12 rounded-3xl overflow-hidden relative h-40 md:h-52 border border-gray-800">
          <img
            src="/images/join-captain.jpg"
            alt="Join CabIndia as a captain"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.parentElement.style.background = "#111118";
              e.target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
            <p className="text-yellow-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
              CabIndia Promise
            </p>
            <p className="text-white text-xl md:text-2xl font-black leading-tight max-w-sm">
              "Drive with pride.{" "}
              <span className="text-yellow-400 italic">Serve with purpose.</span>"
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}