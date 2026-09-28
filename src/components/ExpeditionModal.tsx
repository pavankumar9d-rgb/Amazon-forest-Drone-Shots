"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MILESTONES } from "@/data/milestones";

interface ExpeditionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpeditionModal({
  isOpen,
  onClose,
}: ExpeditionModalProps) {
  const [tab, setTab] = useState<"dossier" | "route" | "inquire">("dossier");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    focus: "Acoustic Canopy & Wildlife Photography",
    season: "Cheia (High Water · May–July)",
    partySize: "2",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="expedition-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#0A0F0A]/85 backdrop-blur-2xl select-none"
        >
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col glass-panel rounded-3xl bg-[#0A0F0A]/95 border border-[#F7F4EC]/15 shadow-2xl overflow-hidden text-[#F7F4EC]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#F7F4EC]/10">
              <div className="flex items-center gap-3">
                <div className="w-4 h-6 border-[2px] border-[#F7F4EC] flex items-center justify-center">
                  <div className="w-1 h-2 bg-[#B23A2E]" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg sm:text-xl tracking-wider text-[#F7F4EC]">
                    AMAZON EXPEDITION DOSSIER
                  </h3>
                  <p className="font-mono text-[10px] text-[#4FD1B8] tracking-widest uppercase">
                    Scientific Survey · 80-Second Flight Corridor
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#F7F4EC]/20 hover:border-[#4FD1B8] flex items-center justify-center text-xs font-mono text-[#F7F4EC]/60 hover:text-[#F7F4EC] transition-colors"
                data-magnetic
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs (Scrollable on small mobile screens) */}
            <div className="flex border-b border-[#F7F4EC]/10 px-4 sm:px-8 bg-[#0A0F0A]/50 overflow-x-auto">
              <button
                onClick={() => setTab("dossier")}
                className={`py-2.5 sm:py-3 px-3 sm:px-4 font-mono text-[10px] sm:text-xs tracking-wider border-b-2 transition-all whitespace-nowrap shrink-0 ${
                  tab === "dossier"
                    ? "border-[#4FD1B8] text-[#4FD1B8] font-medium"
                    : "border-transparent text-[#F7F4EC]/50 hover:text-[#F7F4EC]"
                }`}
              >
                01. FLIGHT TELEMETRY
              </button>
              <button
                onClick={() => setTab("route")}
                className={`py-2.5 sm:py-3 px-3 sm:px-4 font-mono text-[10px] sm:text-xs tracking-wider border-b-2 transition-all whitespace-nowrap shrink-0 ${
                  tab === "route"
                    ? "border-[#4FD1B8] text-[#4FD1B8] font-medium"
                    : "border-transparent text-[#F7F4EC]/50 hover:text-[#F7F4EC]"
                }`}
              >
                02. 8 BIOME SECTORS
              </button>
              <button
                onClick={() => setTab("inquire")}
                className={`py-2.5 sm:py-3 px-3 sm:px-4 font-mono text-[10px] sm:text-xs tracking-wider border-b-2 transition-all whitespace-nowrap shrink-0 ${
                  tab === "inquire"
                    ? "border-[#4FD1B8] text-[#4FD1B8] font-medium"
                    : "border-transparent text-[#F7F4EC]/50 hover:text-[#F7F4EC]"
                }`}
              >
                03. EXPEDITION ENQUIRY
              </button>
            </div>

            {/* Modal Body with smooth scrolling */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {tab === "dossier" && (
                <div className="space-y-6">
                  {/* Hero Statement */}
                  <div className="p-6 rounded-2xl bg-[#3C4A3A]/20 border border-[#3C4A3A]/40 space-y-3">
                    <span className="font-mono text-[10px] tracking-widest text-[#4FD1B8] uppercase">
                      Executive Summary
                    </span>
                    <h4 className="font-editorial text-xl sm:text-2xl text-[#F7F4EC] leading-snug">
                      “An unbroken biological sanctuary breathing across six million square kilometers.”
                    </h4>
                    <p className="text-xs sm:text-sm text-[#F7F4EC]/70 leading-relaxed font-sans">
                      This 80-second cinematic flight traverses the full vertical and horizontal gradient of the Central Amazonian Biosphere—from emergent sunrise canopies at 140m altitude down into the flooded Igapó blackwater mirror, through millennial Kapok microclimates, past Indigenous riverine communities, along crystalline Guiana Shield cascades, and out to the bioluminescent night.
                    </p>
                  </div>

                  {/* Telemetry Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-[#0A0F0A] border border-[#F7F4EC]/10">
                      <div className="font-mono text-[10px] text-[#F7F4EC]/40 uppercase">Total Distance</div>
                      <div className="font-editorial text-2xl text-[#F7F4EC] mt-1">42.8 km</div>
                      <div className="font-mono text-[9px] text-[#4FD1B8]">Aerial Corridors</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0A0F0A] border border-[#F7F4EC]/10">
                      <div className="font-mono text-[10px] text-[#F7F4EC]/40 uppercase">Elevation Span</div>
                      <div className="font-editorial text-2xl text-[#F7F4EC] mt-1">128 m</div>
                      <div className="font-mono text-[9px] text-[#4FD1B8]">Vertical Profiling</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0A0F0A] border border-[#F7F4EC]/10">
                      <div className="font-mono text-[10px] text-[#F7F4EC]/40 uppercase">Recorded Species</div>
                      <div className="font-editorial text-2xl text-[#F7F4EC] mt-1">1,400+</div>
                      <div className="font-mono text-[9px] text-[#4FD1B8]">Vascular & Avian</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0A0F0A] border border-[#F7F4EC]/10">
                      <div className="font-mono text-[10px] text-[#F7F4EC]/40 uppercase">Solar Range</div>
                      <div className="font-editorial text-2xl text-[#F7F4EC] mt-1">24h Arc</div>
                      <div className="font-mono text-[9px] text-[#4FD1B8]">Dawn to Midnight</div>
                    </div>
                  </div>

                  {/* Stewardship Note */}
                  <div className="p-4 rounded-xl bg-[#4A3B2A]/25 border border-[#4A3B2A]/50 flex items-start gap-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#B23A2E] mt-1 shrink-0" />
                    <div>
                      <div className="font-editorial text-sm text-[#F7F4EC] tracking-wide">
                        Indigenous Sovereignty & Stewardship
                      </div>
                      <p className="text-xs text-[#F7F4EC]/75 mt-1 leading-relaxed">
                        Home to Indigenous peoples who have protected this forest for millennia. Over 80% of intact Amazonian biodiversity exists within demarcated Indigenous territories.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {tab === "route" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MILESTONES.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-xl bg-[#0A0F0A] border border-[#F7F4EC]/10 space-y-2 hover:border-[#4FD1B8]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#4FD1B8]">
                        <span>PHASE 0{m.id}</span>
                        <span>{m.timeStart}s – {m.timeEnd}s</span>
                      </div>
                      <h5 className="font-editorial text-base text-[#F7F4EC]">
                        {m.title}
                      </h5>
                      <p className="text-xs text-[#F7F4EC]/60 font-sans">
                        {m.subtitle}
                      </p>
                      <div className="pt-2 border-t border-[#F7F4EC]/10 flex flex-wrap gap-2 text-[10px] font-mono text-[#F7F4EC]/50">
                        <span>{m.coordinates}</span>
                        <span>•</span>
                        <span>{m.altitude}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === "inquire" && (
                <div>
                  {submitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#4FD1B8]/20 border border-[#4FD1B8] mx-auto flex items-center justify-center text-[#4FD1B8] text-xl">
                        ✓
                      </div>
                      <h4 className="font-editorial text-2xl text-[#F7F4EC]">
                        EXPEDITION REQUEST LOGGED
                      </h4>
                      <p className="text-xs sm:text-sm text-[#F7F4EC]/70 max-w-md mx-auto font-sans leading-relaxed">
                        Your dossier request has been recorded. Our expedition leaders and Indigenous liaison council will transmit the full seasonal field itinerary to <span className="text-[#4FD1B8]">{formData.email}</span> within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                      <div className="text-center mb-6">
                        <h4 className="font-editorial text-xl text-[#F7F4EC]">
                          COMMENCE EXPEDITION FIELD INQUIRY
                        </h4>
                        <p className="font-mono text-[10px] text-[#4FD1B8] uppercase tracking-wider mt-1">
                          Strictly Limited to 8 Explorers per Season · Zero Impact Protocol
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-[#F7F4EC]/60 uppercase mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Dr. Helena Rostova"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#0A0F0A] border border-[#F7F4EC]/15 focus:border-[#4FD1B8] text-xs font-sans text-[#F7F4EC] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-[#F7F4EC]/60 uppercase mb-1">
                            Field Dispatch Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="explorer@institution.org"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#0A0F0A] border border-[#F7F4EC]/15 focus:border-[#4FD1B8] text-xs font-sans text-[#F7F4EC] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-[#F7F4EC]/60 uppercase mb-1">
                            Primary Focus
                          </label>
                          <select
                            value={formData.focus}
                            onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#0A0F0A] border border-[#F7F4EC]/15 focus:border-[#4FD1B8] text-xs font-sans text-[#F7F4EC] focus:outline-none"
                          >
                            <option value="Acoustic Canopy & Wildlife Photography">Acoustic Canopy & Wildlife Photography</option>
                            <option value="Igapó Blackwater Ecology">Igapó Blackwater Ecology</option>
                            <option value="Indigenous Traditional Ecological Knowledge">Indigenous Traditional Ecological Knowledge</option>
                            <option value="Nocturnal Bioluminescence Survey">Nocturnal Bioluminescence Survey</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-[#F7F4EC]/60 uppercase mb-1">
                            Target Season
                          </label>
                          <select
                            value={formData.season}
                            onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#0A0F0A] border border-[#F7F4EC]/15 focus:border-[#4FD1B8] text-xs font-sans text-[#F7F4EC] focus:outline-none"
                          >
                            <option value="Cheia (High Water · May–July)">Cheia (High Water · May–July)</option>
                            <option value="Seca (Low Water Sandbars · Sept–Nov)">Seca (Low Water Sandbars · Sept–Nov)</option>
                            <option value="Equinox Migration · March">Equinox Migration · March</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#4FD1B8] hover:bg-[#3C4A3A] hover:text-[#F7F4EC] text-[#0A0F0A] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_24px_rgba(79,209,184,0.35)] mt-4"
                        data-magnetic
                      >
                        SUBMIT EXPEDITION APPLICATION
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-3.5 border-t border-[#F7F4EC]/10 bg-[#0A0F0A]/80 flex items-center justify-between font-mono text-[10px] text-[#F7F4EC]/40">
              <span>GPS: 03°08&apos;42.1&quot;S 60°01&apos;38.4&quot;W</span>
              <span>PROTECTED SANCTUARY · STRICT ZERO EXTRACTION</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
