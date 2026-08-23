"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SOLVE_RESULT } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Status = "idle" | "analyzing" | "done";

export default function SolvePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setStatus("analyzing");
    window.setTimeout(() => setStatus("done"), 1800);
  }

  function reset() {
    setStatus("idle");
    setPreviewUrl(null);
  }

  return (
    <>
      <Topbar title="Rasmga olib yechish" description="Masalani suratga ol — xatoni birga topamiz" />

      <div className="mx-auto max-w-2xl px-5 pb-28 pt-8 lg:px-8 lg:pb-10">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
              <button
                onClick={() => inputRef.current?.click()}
                className="flex w-full flex-col items-center gap-4 rounded-4xl border-2 border-dashed border-line-strong bg-ink-900/50 px-6 py-16 text-center transition-colors duration-300 hover:border-gold-500/50 hover:bg-ink-900"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                  <Camera className="h-7 w-7" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-display text-lg font-medium text-text-primary">
                    Masalaning rasmini yukla
                  </p>
                  <p className="mt-1 max-w-xs text-sm text-text-secondary">
                    Kamerada suratga ol yoki galereyadan tanla — AI xatoni qaysi qadamda ekanini topib beradi
                  </p>
                </div>
              </button>
            </motion.div>
          )}

          {status === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-5 py-16 text-center"
            >
              {previewUrl && (
                <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-3xl border border-line">
                  <Image src={previewUrl} alt="Yuklangan masala" fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="flex items-center gap-2 text-text-secondary">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-gold-400" />
                </motion.div>
                <span className="text-sm font-medium">AI tahlil qilmoqda...</span>
              </div>
            </motion.div>
          )}

          {status === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5"
            >
              {previewUrl && (
                <div className="relative h-40 w-full overflow-hidden rounded-3xl border border-line">
                  <Image src={previewUrl} alt="Yuklangan masala" fill className="object-cover" unoptimized />
                </div>
              )}

              <Card className="border-danger-500/30 bg-danger-500/5 p-5">
                <p className="text-sm font-medium text-danger-500">Topilgan xato</p>
                <p className="mt-1 text-sm leading-relaxed text-text-primary">{SOLVE_RESULT.summary}</p>
              </Card>

              <div className="flex flex-col gap-2">
                {SOLVE_RESULT.steps.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border p-4",
                      step.isMistake
                        ? "border-danger-500/30 bg-danger-500/5"
                        : "border-line bg-ink-900/50"
                    )}
                  >
                    {step.isMistake ? (
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger-500" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-500" />
                    )}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        {step.step}-qadam
                      </p>
                      <p className="mt-0.5 text-sm text-text-primary">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button variant="secondary" size="lg" onClick={reset} className="mt-2">
                <RotateCcw className="h-4 w-4" />
                Yana bir masala yuklash
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
