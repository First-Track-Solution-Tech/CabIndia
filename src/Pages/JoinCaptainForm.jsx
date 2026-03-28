import React, { useState } from "react";
import { User, MapPin, CreditCard, Car, Upload, Check, ChevronRight, ChevronLeft, Eye, EyeOff } from "lucide-react";

const STEPS = [
  { id: 1, label: "Personal",  icon: User       },
  { id: 2, label: "Address",   icon: MapPin     },
  { id: 3, label: "KYC & Bank",icon: CreditCard },
  { id: 4, label: "Vehicle",   icon: Car        },
  { id: 5, label: "Documents", icon: Upload     },
];

const qualifications = ["10th Pass","12th Pass","Graduate","Post Graduate","Other"];
const genders        = ["Male","Female","Other","Prefer not to say"];
const vehicleTypes   = ["Auto","Bike","Mini Car","Sedan","SUV"];

function Label({ children, required }) {
  return (
    <label className="text-[11px] font-bold tracking-[0.12em] text-gray-500 uppercase mb-1 block">
      {children}{required && <span className="text-yellow-400 ml-0.5">*</span>}
    </label>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-gray-800 border border-gray-700 focus:border-yellow-400/60 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(250,204,21,0.08)] ${className}`}
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-400/60 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(250,204,21,0.08)] appearance-none cursor-pointer"
    >
      {children}
    </select>
  );
}

function FileField({ label, name, hint }) {
  const [fileName, setFileName] = useState("");
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <label className="flex items-center gap-3 bg-gray-800 border border-gray-700 hover:border-yellow-400/40 rounded-xl px-4 py-3 cursor-pointer transition-all group">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-gray-950 transition-all">
          <Upload size={14} />
        </span>
        <span className="text-sm text-gray-500 truncate">{fileName || hint || "Choose file…"}</span>
        <input type="file" name={name} className="hidden"
          onChange={(e) => setFileName(e.target.files[0]?.name || "")} />
      </label>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-5 h-px bg-yellow-400" />
      <span className="text-yellow-400 text-[10px] font-bold tracking-[0.2em] uppercase">{children}</span>
    </div>
  );
}

export default function JoinCaptainForm() {
  const [step, setStep]       = useState(1);
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [sameAddr, setSameAddr] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm]       = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const next = () => { if (step < 5) setStep(s => s + 1); else setSubmitted(true); };
  const prev = () => { if (step > 1) setStep(s => s - 1); };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-5 text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-yellow-400/15 border-2 border-yellow-400/40 flex items-center justify-center text-yellow-400">
            <Check size={36} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Application <span className="text-yellow-400 italic">Submitted!</span></h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Thanks for joining CabIndia! Our team will review your application and contact you within <span className="text-white font-semibold">48 hours</span>.
          </p>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
          <p className="text-gray-700 text-xs tracking-wide">No joining fee · Fully verified process</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <p className="text-yellow-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-2">CabIndia</p>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Become a <span className="text-yellow-400 italic">Captain</span>
          </h1>
          <p className="text-gray-600 text-sm mt-2">Complete all 5 steps to submit your application</p>
        </div>

        {/* ── Step indicator ── */}
        <div className="flex items-center justify-between mb-8 relative">
          {/* progress line bg */}
          <div className="absolute top-5 left-0 right-0 h-px bg-gray-800 z-0" />
          {/* progress fill */}
          <div
            className="absolute top-5 left-0 h-px bg-yellow-400 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((s) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-1.5 z-10">
                <div className={[
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  done   ? "bg-yellow-400 border-yellow-400 text-gray-950 shadow-[0_0_16px_rgba(250,204,21,0.4)]"
                         : active ? "bg-gray-950 border-yellow-400 text-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.2)]"
                                  : "bg-gray-900 border-gray-700 text-gray-600",
                ].join(" ")}>
                  {done ? <Check size={16} strokeWidth={3} /> : <Icon size={16} />}
                </div>
                <span className={[
                  "text-[9px] font-bold tracking-[0.1em] uppercase hidden sm:block",
                  active ? "text-yellow-400" : done ? "text-yellow-400/60" : "text-gray-700",
                ].join(" ")}>{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* ── Form card ── */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Step label */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-600 text-xs font-bold tracking-widest uppercase">Step {step} of 5</p>
              <h2 className="text-xl font-black text-white tracking-tight mt-0.5">{STEPS[step-1].label}</h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
              {React.createElement(STEPS[step-1].icon, { size: 18 })}
            </div>
          </div>

          <div className="h-px bg-gray-800 mb-6" />

          {/* ── STEP 1: Personal Info ── */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <SectionTitle>Basic Details</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label required>Full Name</Label><Input placeholder="Ravi Kumar" onChange={e=>set("name",e.target.value)} /></div>
                <div><Label required>Email</Label><Input type="email" placeholder="you@email.com" onChange={e=>set("email",e.target.value)} /></div>
              </div>
              <div>
                <Label required>Password</Label>
                <div className="relative">
                  <Input type={showPwd?"text":"password"} placeholder="Min 8 characters" className="pr-10" onChange={e=>set("password",e.target.value)} />
                  <button type="button" onClick={()=>setShowPwd(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">
                    {showPwd ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                </div>
              </div>
              <div>
                <Label required>Confirm Password</Label>
                <div className="relative">
                  <Input type={showCPwd?"text":"password"} placeholder="Repeat password" className="pr-10" onChange={e=>set("cpassword",e.target.value)} />
                  <button type="button" onClick={()=>setShowCPwd(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">
                    {showCPwd ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label required>Phone Number</Label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 bg-gray-800 border border-gray-700 rounded-xl text-xs text-gray-400 font-bold whitespace-nowrap">🇮🇳 +91</span>
                    <Input placeholder="98765 43210" onChange={e=>set("phone",e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Highest Qualification</Label>
                  <Select onChange={e=>set("qualification",e.target.value)}>
                    <option value="">Select…</option>
                    {qualifications.map(q=><option key={q}>{q}</option>)}
                  </Select>
                </div>
              </div>
              <div>
                <Label>Gender</Label>
                <Select onChange={e=>set("gender",e.target.value)}>
                  <option value="">Select…</option>
                  {genders.map(g=><option key={g}>{g}</option>)}
                </Select>
              </div>
            </div>
          )}

          {/* ── STEP 2: Address ── */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <SectionTitle>Present Address</SectionTitle>
              <div className="flex flex-col gap-4">
                <div><Label required>Street Address</Label><Input placeholder="Plot no, Street name" onChange={e=>set("pAddr",e.target.value)} /></div>
                <div><Label required>Landmark</Label><Input placeholder="Near school, temple…" onChange={e=>set("pLandmark",e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label required>City</Label><Input placeholder="Bhubaneswar" onChange={e=>set("pCity",e.target.value)} /></div>
                  <div><Label required>State</Label><Input placeholder="Odisha" onChange={e=>set("pState",e.target.value)} /></div>
                </div>
                <div className="w-40"><Label required>Pincode</Label><Input placeholder="751001" maxLength={6} onChange={e=>set("pPin",e.target.value)} /></div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div onClick={()=>setSameAddr(v=>!v)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${sameAddr?"bg-yellow-400 border-yellow-400":"border-gray-700 bg-gray-800 group-hover:border-gray-500"}`}>
                  {sameAddr && <Check size={12} className="text-gray-950" strokeWidth={3}/>}
                </div>
                <span className="text-sm text-gray-400">Permanent address same as present address</span>
              </label>

              {!sameAddr && (
                <>
                  <div className="h-px bg-gray-800" />
                  <SectionTitle>Permanent Address</SectionTitle>
                  <div className="flex flex-col gap-4">
                    <div><Label>Street Address</Label><Input placeholder="Plot no, Street name" onChange={e=>set("permAddr",e.target.value)} /></div>
                    <div><Label>Landmark</Label><Input placeholder="Near school, temple…" onChange={e=>set("permLandmark",e.target.value)} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>City</Label><Input placeholder="City" onChange={e=>set("permCity",e.target.value)} /></div>
                      <div><Label>State</Label><Input placeholder="State" onChange={e=>set("permState",e.target.value)} /></div>
                    </div>
                    <div className="w-40"><Label>Pincode</Label><Input placeholder="Pincode" maxLength={6} onChange={e=>set("permPin",e.target.value)} /></div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── STEP 3: KYC & Bank ── */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <SectionTitle>KYC Details</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label required>Aadhaar Number</Label><Input placeholder="XXXX XXXX XXXX" maxLength={14} onChange={e=>set("aadhaar",e.target.value)} /></div>
                <div><Label required>PAN Number</Label><Input placeholder="ABCDE1234F" maxLength={10} onChange={e=>set("pan",e.target.value)} /></div>
              </div>

              <div className="h-px bg-gray-800" />
              <SectionTitle>Bank Details</SectionTitle>
              <div className="flex flex-col gap-4">
                <div><Label required>Account Holder Name</Label><Input placeholder="As per bank records" onChange={e=>set("accName",e.target.value)} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label required>Account Number</Label><Input placeholder="Enter account number" onChange={e=>set("accNum",e.target.value)} /></div>
                  <div><Label required>IFSC Code</Label><Input placeholder="SBIN0001234" onChange={e=>set("ifsc",e.target.value)} /></div>
                </div>
                <div><Label required>Bank Name</Label><Input placeholder="State Bank of India" onChange={e=>set("bankName",e.target.value)} /></div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Vehicle Details ── */}
          {step === 4 && (
            <div className="flex flex-col gap-4">
              <SectionTitle>Vehicle Information</SectionTitle>
              <div>
                <Label required>Vehicle Type</Label>
                <Select onChange={e=>set("vehicleType",e.target.value)}>
                  <option value="">Select vehicle type…</option>
                  {vehicleTypes.map(v=><option key={v}>{v}</option>)}
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label required>Vehicle Model</Label><Input placeholder="e.g. Honda Activa" onChange={e=>set("vehicleModel",e.target.value)} /></div>
                <div><Label required>Vehicle Number</Label><Input placeholder="OD 01 AB 1234" onChange={e=>set("vehicleNum",e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label required>RC Number</Label><Input placeholder="Registration certificate no." onChange={e=>set("rcNum",e.target.value)} /></div>
                <div><Label required>Chassis Number</Label><Input placeholder="Vehicle chassis number" onChange={e=>set("chassis",e.target.value)} /></div>
              </div>
              <div><Label required>Driving Licence Number</Label><Input placeholder="DL number" onChange={e=>set("dlNum",e.target.value)} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Pollution Certificate Valid?</Label>
                  <div className="flex gap-4 mt-2">
                    {["Yes","No"].map(v=>(
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <div onClick={()=>set("pollutionValid",v)}
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${form.pollutionValid===v?"border-yellow-400":"border-gray-700"}`}>
                          {form.pollutionValid===v && <div className="w-2 h-2 rounded-full bg-yellow-400"/>}
                        </div>
                        <span className="text-sm text-gray-400">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Insurance Valid?</Label>
                  <div className="flex gap-4 mt-2">
                    {["Yes","No"].map(v=>(
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <div onClick={()=>set("insuranceValid",v)}
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${form.insuranceValid===v?"border-yellow-400":"border-gray-700"}`}>
                          {form.insuranceValid===v && <div className="w-2 h-2 rounded-full bg-yellow-400"/>}
                        </div>
                        <span className="text-sm text-gray-400">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 5: Documents ── */}
          {step === 5 && (
            <div className="flex flex-col gap-4">
              <SectionTitle>Upload Documents</SectionTitle>
              <p className="text-gray-600 text-xs -mt-2 mb-1">Upload clear photos or scans. Accepted: JPG, PNG, PDF (max 5MB each)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FileField label="Selfie Photo *"           name="selfie"       hint="Clear face photo" />
                <FileField label="Aadhaar Card *"           name="aadhaar"      hint="Front side" />
                <FileField label="PAN Card *"               name="pan"          hint="Clear scan" />
                <FileField label="Driving Licence *"        name="dl"           hint="Front side" />
                <FileField label="Vehicle RC *"             name="rc"           hint="Registration certificate" />
                <FileField label="Insurance Certificate"    name="insurance"    hint="Valid insurance doc" />
                <FileField label="Pollution Certificate"    name="pollution"    hint="Valid PUC certificate" />
                <FileField label="Passbook / Cancelled Cheque *" name="passbook" hint="Bank account proof" />
              </div>
              <div className="mt-2 bg-yellow-400/5 border border-yellow-400/15 rounded-2xl p-4">
                <p className="text-yellow-400/80 text-xs font-semibold mb-1">Before you submit</p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  All documents will be verified by our team within 48 hours. Ensure all uploads are legible and not expired. Your data is encrypted and stored securely.
                </p>
              </div>
            </div>
          )}

          {/* ── Navigation buttons ── */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-800">
            <button
              onClick={prev}
              disabled={step === 1}
              className={[
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all",
                step === 1
                  ? "text-gray-700 border-gray-800 cursor-not-allowed"
                  : "text-gray-300 border-gray-700 hover:border-gray-500 hover:text-white active:scale-95",
              ].join(" ")}
            >
              <ChevronLeft size={16}/> Back
            </button>

            <span className="text-gray-700 text-xs font-bold tracking-widest">
              {step} / 5
            </span>

            <button
              onClick={next}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black bg-yellow-400 hover:bg-yellow-300 text-gray-950 transition-all active:scale-95 shadow-[0_4px_20px_rgba(250,204,21,0.25)] hover:shadow-[0_4px_28px_rgba(250,204,21,0.4)] relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"/>
              {step === 5 ? "Submit Application" : "Next Step"}
              {step < 5 && <ChevronRight size={16}/>}
              {step === 5 && <Check size={16}/>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}