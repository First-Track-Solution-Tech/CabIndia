import React, { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "How do I book a ride?",
    answer:
      "Simply enter your pickup and drop location on the booking page, choose your preferred ride type — bike, auto, or cab — and confirm your ride. You'll be matched with a nearby verified captain within seconds.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We accept UPI, credit/debit cards, net banking, and wallet payments. Cash on delivery may also be available for select locations. All transactions are encrypted and fully secure.",
  },
  {
    question: "Can I schedule a ride for later?",
    answer:
      "Yes! You can schedule a ride in advance by selecting the date and time during booking. We'll send you a reminder notification before your scheduled pickup so you're never caught off guard.",
  },
  {
    question: "What if my driver cancels the ride?",
    answer:
      "If your captain cancels, you'll be notified instantly and we'll assign another nearby verified driver at no extra cost. Your safety and convenience is always our priority.",
  },
  {
    question: "Is customer support available 24/7?",
    answer:
      "Absolutely! Our support team is available round the clock — via chat, email, or phone — for quick assistance with bookings, payments, or any ride-related issues.",
  },
];

function FAQItem({ item, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index;
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={[
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen
          ? "bg-gray-900 border-yellow-400/40 shadow-[0_0_30px_rgba(250,204,21,0.07)]"
          : "bg-gray-900/60 border-gray-800 hover:border-gray-700",
      ].join(" ")}
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
      >
        {/* number + question */}
        <div className="flex items-center gap-4">
          <span
            className={[
              "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black border transition-all duration-300",
              isOpen
                ? "bg-yellow-400 border-yellow-400 text-gray-950"
                : "bg-transparent border-gray-700 text-gray-600 group-hover:border-gray-500",
            ].join(" ")}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={[
              "font-bold text-[15px] leading-snug transition-colors duration-200",
              isOpen ? "text-yellow-400" : "text-white group-hover:text-gray-200",
            ].join(" ")}
          >
            {item.question}
          </span>
        </div>

        {/* icon */}
        <span
          className={[
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300",
            isOpen
              ? "bg-yellow-400/10 border-yellow-400/40 text-yellow-400 rotate-0"
              : "bg-gray-800 border-gray-700 text-gray-500 group-hover:border-gray-600 group-hover:text-gray-300",
          ].join(" ")}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      {/* animated answer */}
      <div
        style={{
          height: height,
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        <div ref={contentRef}>
          <div className="px-6 pb-5">
            <div className="ml-11">
              <div className="w-full h-px bg-gray-800 mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-950 py-20 px-4 sm:px-8 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-400/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">

        {/* header */}
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-yellow-400" />
            <span className="text-yellow-400 text-[10px] font-bold tracking-[0.25em] uppercase">
              Got Questions?
            </span>
            <div className="w-8 h-px bg-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Frequently Asked{" "}
            <span className="text-yellow-400 italic">Questions</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-md leading-relaxed">
            Everything you need to know about CabIndia. Can't find your answer?{" "}
            <a href="/contact" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors">
              Contact us
            </a>
            .
          </p>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-3">
          {faqData.map((item, idx) => (
            <FAQItem
              key={idx}
              item={item}
              index={idx}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>

        {/* bottom CTA */}
        <div className="mt-14 rounded-2xl bg-yellow-400/5 border border-yellow-400/15 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm">Still have questions?</p>
            <p className="text-gray-500 text-xs mt-0.5">Our support team is available 24/7 for you.</p>
          </div>
          <a
            href="/contact"
            className="flex-shrink-0 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-black text-xs tracking-wide px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-[0_4px_16px_rgba(250,204,21,0.25)]"
          >
            Contact Support
          </a>
        </div>

      </div>
    </div>
  );
}