import React from "react";

export default function LeftAboutUs() {
  return (
    <>
      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .about-left-text  { animation: fadeInLeft  0.8s ease forwards; }
        .about-right-img  { animation: fadeInRight 0.8s ease forwards; }
      `}</style>

      <section className="bg-gray-950 py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT — Text ── */}
          <div className="about-left-text flex flex-col gap-6">

            {/* section label */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-bold tracking-[0.25em] uppercase">
                Our Story
              </span>
            </div>

            {/* heading */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              India's Most{" "}
              <span className="text-yellow-400 italic">Trusted</span>
              <br />
              Ride Partner
            </h2>

            {/* founded + mission */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-[0.2em] text-yellow-400/60 uppercase">
                  Est. 2026
                </span>
                <div className="flex-1 h-px bg-gray-800" />
              </div>

              <p className="text-gray-400 text-base leading-relaxed">
                CabIndia is a smart mobility platform developed by First Track Technology Solution, delivering reliable, efficient, and user-friendly cab services for seamless travel experiences.
                CabIndia was born from a simple belief — that every person in every
                corner of India deserves a{" "}
                <span className="text-white font-semibold">safe, affordable, and dignified</span>{" "}
                ride. From our first trip in Bhubaneswar, we've grown into a platform
                that connects thousands of daily commuters with verified, professional
                captains across the country.
              </p>

              <p className="text-gray-500 text-sm leading-relaxed">
                Our mission is to make urban mobility seamless — powered by
                technology, driven by trust, and built for every Indian.
              </p>
            </div>

            {/* founder quote */}
            <div className="relative mt-2 pl-5 border-l-2 border-yellow-400">
              <div
                className="absolute -top-1 -left-3 text-yellow-400 font-black"
                style={{ fontSize: "2.5rem", lineHeight: 1 }}
              >
                "
              </div>
              <p className="text-white text-base font-medium italic leading-relaxed">
                We didn't just build an app — we built a promise. Every ride
                with CabIndia is a commitment to safety, speed, and respect.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-xs font-black">
                  TP
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Tejash Parekh</p>
                  <p className="text-gray-600 text-[10px] tracking-wide uppercase">
                    Founder & CEO, CabIndia
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT — Image ── */}
          <div className="about-right-img relative">

            {/* decorative yellow corner */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-yellow-400/40 rounded-tr-2xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-yellow-400/40 rounded-bl-2xl pointer-events-none" />

            {/* glow behind image */}
            <div className="absolute inset-4 bg-yellow-400/8 rounded-3xl blur-2xl pointer-events-none" />

            {/* image */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src="/images/about-ride.jpg"
                alt="CabIndia - Safe rides across India"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.parentElement.classList.add(
                    "bg-gray-900", "flex", "items-center", "justify-center"
                  );
                  e.target.style.display = "none";
                  const placeholder = document.createElement("div");
                  placeholder.innerHTML = `<div style="text-align:center;color:#6b7280;font-size:0.8rem;padding:2rem">Place your image at<br/><span style="color:#facc15">/images/about-left.jpg</span></div>`;
                  e.target.parentElement.appendChild(placeholder);
                }}
              />

              {/* image overlay — bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />

              {/* floating badge on image */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-gray-950/80 backdrop-blur-sm border border-yellow-400/20 rounded-2xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-yellow-400 font-black text-lg leading-none">
                      50,000+
                    </p>
                    <p className="text-gray-400 text-[11px] mt-0.5 tracking-wide uppercase">
                      Happy Riders
                    </p>
                  </div>
                  <div className="w-px h-8 bg-gray-700" />
                  <div>
                    <p className="text-yellow-400 font-black text-lg leading-none">
                      20+
                    </p>
                    <p className="text-gray-400 text-[11px] mt-0.5 tracking-wide uppercase">
                      Cities
                    </p>
                  </div>
                  <div className="w-px h-8 bg-gray-700" />
                  <div>
                    <p className="text-yellow-400 font-black text-lg leading-none">
                      4.8 ★
                    </p>
                    <p className="text-gray-400 text-[11px] mt-0.5 tracking-wide uppercase">
                      Avg Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}