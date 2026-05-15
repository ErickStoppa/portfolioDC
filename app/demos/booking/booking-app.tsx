"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Check, Clock, Calendar, User, ArrowLeft } from "lucide-react";
import { serviceCategories, professionals, timeSlots, daysOfWeek, type Professional } from "@/data/booking";

type BookingStep = "service" | "professional" | "datetime" | "confirm" | "success";

const WEEK_DATES = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(2024, 4, 13 + i);
  return { day: daysOfWeek[i], date: d.getDate(), month: d.toLocaleString("en", { month: "short" }) };
});

export function BookingApp() {
  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const canProceed = () => {
    if (step === "service") return !!selectedService;
    if (step === "professional") return !!selectedPro;
    if (step === "datetime") return !!(selectedDate && selectedTime);
    if (step === "confirm") return true;
    return false;
  };

  const nextStep = () => {
    if (step === "service") setStep("professional");
    else if (step === "professional") setStep("datetime");
    else if (step === "datetime") setStep("confirm");
    else if (step === "confirm") setStep("success");
  };

  const prevStep = () => {
    if (step === "professional") setStep("service");
    else if (step === "datetime") setStep("professional");
    else if (step === "confirm") setStep("datetime");
  };

  const steps: BookingStep[] = ["service", "professional", "datetime", "confirm"];
  const stepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-[#070710] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#070710]/95 backdrop-blur-md border-b border-white/6">
        <div className="max-w-xl mx-auto px-5 h-14 flex items-center gap-4">
          {stepIndex > 0 && step !== "success" && (
            <button onClick={prevStep} className="text-white/40 hover:text-white transition-colors" aria-label="Go back">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <h1 className="text-base font-black tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>AURA</h1>
          {step !== "success" && (
            <div className="ml-auto flex items-center gap-1.5" role="progressbar" aria-valuenow={stepIndex + 1} aria-valuemax={4}>
              {steps.map((s, i) => (
                <div
                  key={s}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i <= stepIndex ? "bg-[var(--primary)] w-8" : "bg-white/12 w-4"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-xl mx-auto px-5 py-8 pb-28">
        <AnimatePresence mode="wait">

          {/* Step 1: Service */}
          {step === "service" && (
            <motion.div key="service" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Step 1 of 4</p>
              <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
                What are you looking for?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {serviceCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedService(cat.id)}
                    aria-pressed={selectedService === cat.id}
                    className={`p-5 rounded-2xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                      selectedService === cat.id
                        ? "border-[var(--primary)] bg-[var(--primary-light)]"
                        : "border-white/8 bg-white/4 hover:border-white/16 hover:bg-white/6"
                    }`}
                  >
                    <span className="text-3xl mb-3 block">{cat.emoji}</span>
                    <p className="text-sm font-bold text-white mb-1">{cat.name}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{cat.description}</p>
                    {selectedService === cat.id && (
                      <div className="mt-2 w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Professional */}
          {step === "professional" && (
            <motion.div key="professional" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Step 2 of 4</p>
              <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
                Choose your specialist
              </h2>
              <div className="flex flex-col gap-3">
                {professionals.map((pro) => (
                  <button
                    key={pro.id}
                    onClick={() => pro.available && setSelectedPro(pro)}
                    aria-pressed={selectedPro?.id === pro.id}
                    disabled={!pro.available}
                    className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                      selectedPro?.id === pro.id
                        ? "border-[var(--primary)] bg-[var(--primary-light)]"
                        : "border-white/8 bg-white/4 hover:border-white/16"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-sm font-black text-white shrink-0">
                      {pro.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white">{pro.name}</p>
                      <p className="text-xs text-white/40">{pro.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-white">{pro.rating}</span>
                        <span className="text-xs text-white/30">({pro.reviews})</span>
                      </div>
                    </div>
                    {!pro.available && (
                      <span className="text-[10px] text-white/30 font-medium">Unavailable</span>
                    )}
                    {selectedPro?.id === pro.id && (
                      <div className="w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Date & Time */}
          {step === "datetime" && (
            <motion.div key="datetime" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Step 3 of 4</p>
              <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
                Pick a date & time
              </h2>

              {/* Week calendar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">May 2024</span>
                  <div className="flex gap-1">
                    <button className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors" aria-label="Previous week">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors" aria-label="Next week">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1.5" role="group" aria-label="Select a date">
                  {WEEK_DATES.map(({ day, date }) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      aria-pressed={selectedDate === date}
                      className={`flex flex-col items-center py-2.5 rounded-xl transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                        selectedDate === date
                          ? "bg-[var(--primary)] text-white"
                          : "bg-white/4 hover:bg-white/8 text-white/60"
                      }`}
                    >
                      <span className="text-[10px] font-medium mb-1">{day}</span>
                      <span className="text-sm font-black">{date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div>
                <p className="text-sm font-semibold text-white mb-3">Available times</p>
                <div className="grid grid-cols-3 gap-2" role="group" aria-label="Select a time">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      aria-pressed={selectedTime === slot.time}
                      disabled={!slot.available}
                      className={`py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                        selectedTime === slot.time
                          ? "bg-[var(--primary)] text-white"
                          : slot.available
                          ? "bg-white/6 hover:bg-white/10 text-white/70"
                          : "bg-white/4 text-white/20"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirm */}
          {step === "confirm" && (
            <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Step 4 of 4</p>
              <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
                Confirm your booking
              </h2>
              <div className="bg-white/4 border border-white/8 rounded-2xl p-5 space-y-4 mb-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-sm font-black text-white">
                    {selectedPro?.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{selectedPro?.name}</p>
                    <p className="text-xs text-white/40">{selectedPro?.specialty}</p>
                  </div>
                </div>
                {[
                  { Icon: User, label: "Service", value: serviceCategories.find((s) => s.id === selectedService)?.name },
                  { Icon: Calendar, label: "Date", value: `May ${selectedDate}, 2024` },
                  { Icon: Clock, label: "Time", value: selectedTime },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white/50" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30">{label}</p>
                      <p className="text-sm font-semibold text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Success */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                className="w-20 h-20 rounded-full bg-[var(--success-light)] border border-[var(--success)]/30 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-[var(--success)]" />
              </motion.div>
              <h2 className="text-3xl font-black mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                Booking Confirmed!
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                Your appointment with {selectedPro?.name} on May {selectedDate} at {selectedTime} is confirmed.
              </p>
              <div className="bg-white/4 border border-white/8 rounded-2xl p-4 text-left max-w-xs mx-auto mb-8">
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Booking Reference</p>
                <p className="text-lg font-black text-[var(--primary)]">#AUR-7291</p>
              </div>
              <button
                onClick={() => {
                  setStep("service");
                  setSelectedService(null);
                  setSelectedPro(null);
                  setSelectedDate(null);
                  setSelectedTime(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-white/8 text-white text-sm font-medium hover:bg-white/12 transition-colors"
              >
                Book Another
              </button>
              <p className="text-xs text-white/20 mt-4">This is a demo — no real booking was made.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      {step !== "success" && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#070710] to-transparent pt-8">
          <div className="max-w-xl mx-auto">
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="w-full h-12 rounded-2xl bg-[var(--primary)] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[var(--primary-hover)] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_30px_var(--primary-glow)]"
            >
              {step === "confirm" ? "Confirm Booking" : "Continue"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
