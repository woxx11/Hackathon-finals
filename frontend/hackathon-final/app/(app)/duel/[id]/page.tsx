"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Swords, X } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Avatar } from "@/components/ui/avatar";
import { DuelResultView } from "@/components/features/duel-result-view";
import { ACTIVE_DUEL, CURRENT_USER } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { DuelParticipant, Subject } from "@/lib/types";

const QUESTION_SECONDS = 12;
const OPPONENT_NAMES = ["Diyor", "Malika", "Jasur", "Kamola", "Aziz"];

function computeScore(correct: boolean, elapsedSeconds: number) {
  if (!correct) return 0;
  return Math.max(40, Math.round(100 - elapsedSeconds * 5));
}

type Stage = "lobby" | "battle" | "result";

function DuelRoomInner() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const subject = (searchParams.get("subject") as Subject) ?? ACTIVE_DUEL.subject;
  const isNewDuel = searchParams.get("stage") === "lobby";

  const [stage, setStage] = useState<Stage>(isNewDuel ? "lobby" : "battle");
  const [opponentJoined, setOpponentJoined] = useState(!isNewDuel);
  const [copied, setCopied] = useState(false);

  const opponentName = useMemo(
    () => OPPONENT_NAMES[Math.floor(Math.random() * OPPONENT_NAMES.length)],
    []
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [opponentAnswered, setOpponentAnswered] = useState(false);
  const [opponentCorrect, setOpponentCorrect] = useState(false);

  const [hostScore, setHostScore] = useState(0);
  const [hostCorrect, setHostCorrect] = useState(0);
  const [hostTimes, setHostTimes] = useState<number[]>([]);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentCorrectCount, setOpponentCorrectCount] = useState(0);
  const [opponentTimes, setOpponentTimes] = useState<number[]>([]);

  const questionStart = useRef(performance.now());
  const opponentElapsedRef = useRef(0);
  const opponentCorrectRef = useRef(false);

  const question = ACTIVE_DUEL.questions[questionIndex];
  const inviteLink = `aqlzor.uz/duel/${params.id}`;

  useEffect(() => {
    if (stage !== "lobby") return;
    const joinTimer = window.setTimeout(() => setOpponentJoined(true), 2200);
    const startTimer = window.setTimeout(() => {
      questionStart.current = performance.now();
      setStage("battle");
    }, 3200);
    return () => {
      window.clearTimeout(joinTimer);
      window.clearTimeout(startTimer);
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== "battle") return;
    questionStart.current = performance.now();
    setAnswered(false);
    setSelectedIndex(null);
    setOpponentAnswered(false);
    opponentElapsedRef.current = 2 + Math.random() * 7;
    opponentCorrectRef.current = Math.random() < 0.72;
  }, [questionIndex, stage]);

  function revealOpponentAndAdvance() {
    const elapsed = opponentElapsedRef.current;
    const correct = opponentCorrectRef.current;
    setOpponentCorrect(correct);
    setOpponentAnswered(true);
    const score = computeScore(correct, elapsed);
    setOpponentScore((s) => s + score);
    setOpponentTimes((t) => [...t, elapsed]);
    if (correct) setOpponentCorrectCount((c) => c + 1);

    window.setTimeout(() => {
      if (questionIndex + 1 >= ACTIVE_DUEL.questions.length) {
        setStage("result");
      } else {
        setQuestionIndex((i) => i + 1);
      }
    }, 1400);
  }

  function handleAnswer(index: number | null) {
    if (answered) return;
    const elapsed = Math.min(QUESTION_SECONDS, (performance.now() - questionStart.current) / 1000);
    const correct = index !== null && index === question.correctIndex;
    setSelectedIndex(index);
    setAnswered(true);
    const score = computeScore(correct, elapsed);
    setHostScore((s) => s + score);
    setHostTimes((t) => [...t, elapsed]);
    if (correct) setHostCorrect((c) => c + 1);
    revealOpponentAndAdvance();
  }

  if (stage === "result") {
    const host: DuelParticipant = {
      userId: CURRENT_USER.id,
      name: CURRENT_USER.name,
      avatarSeed: CURRENT_USER.avatarSeed,
      score: hostScore,
      correctCount: hostCorrect,
      avgSeconds: hostTimes.length ? hostTimes.reduce((a, b) => a + b, 0) / hostTimes.length : 0,
    };
    const opponent: DuelParticipant = {
      userId: "opponent",
      name: opponentName,
      avatarSeed: opponentName,
      score: opponentScore,
      correctCount: opponentCorrectCount,
      avgSeconds: opponentTimes.length ? opponentTimes.reduce((a, b) => a + b, 0) / opponentTimes.length : 0,
    };
    return (
      <>
        <Topbar title="Duel natijasi" />
        <DuelResultView
          subject={subject}
          host={host}
          opponent={opponent}
          xpAwarded={Math.round(hostScore * 0.25)}
          currentUserId={CURRENT_USER.id}
        />
      </>
    );
  }

  if (stage === "lobby") {
    return (
      <>
        <Topbar title="Duel" description="Xonaga taklif qil" />
        <div className="mx-auto flex max-w-md flex-col items-center px-5 pb-28 pt-14 text-center lg:pb-10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar seed={CURRENT_USER.avatarSeed} name={CURRENT_USER.name} size="xl" ring />
              <span className="text-xs font-medium text-text-secondary">Sen</span>
            </div>
            <Swords className="h-6 w-6 text-text-muted" />
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-line-strong text-text-muted transition-all duration-500",
                  opponentJoined && "border-solid border-transparent"
                )}
              >
                <AnimatePresence mode="wait">
                  {opponentJoined ? (
                    <motion.div
                      key="joined"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Avatar seed={opponentName} name={opponentName} size="xl" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="waiting"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      className="text-2xl"
                    >
                      ?
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-xs font-medium text-text-secondary">
                {opponentJoined ? opponentName : "Kutilyapti..."}
              </span>
            </div>
          </div>

          <p className="mt-8 font-display text-lg font-medium text-text-primary">
            {opponentJoined ? "Boshlanmoqda..." : "Do'stingga link yubor"}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {opponentJoined
              ? `${opponentName} xonaga qo'shildi. Duel boshlanyapti.`
              : "Qo'shilishi bilan duel avtomatik boshlanadi"}
          </p>

          {!opponentJoined && (
            <button
              onClick={() => {
                navigator.clipboard?.writeText(inviteLink).catch(() => {});
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              }}
              className="mt-6 flex items-center gap-2 rounded-full border border-line bg-ink-900 px-4 py-2.5 text-sm text-text-secondary transition-colors duration-200 hover:border-line-strong hover:text-text-primary"
            >
              {copied ? <Check className="h-4 w-4 text-success-500" /> : <Copy className="h-4 w-4" />}
              {inviteLink}
            </button>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar title="Duel" />
      <div className="mx-auto max-w-xl px-5 pb-28 pt-6 lg:pb-10">
        <div className="flex items-center justify-between">
          <ScoreChip name="Sen" seed={CURRENT_USER.avatarSeed} score={hostScore} align="left" />
          <span className="font-display text-xs font-medium uppercase tracking-widest text-text-muted">
            {questionIndex + 1}/{ACTIVE_DUEL.questions.length}
          </span>
          <ScoreChip name={opponentName} seed={opponentName} score={opponentScore} align="right" />
        </div>

        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-ink-800">
          <motion.div
            key={questionIndex}
            className="h-full bg-gold-500"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: QUESTION_SECONDS, ease: "linear" }}
            onAnimationComplete={() => handleAnswer(null)}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <h2 className="font-display text-xl font-medium leading-snug text-text-primary sm:text-2xl">
              {question.prompt}
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {question.options.map((option, i) => {
                const isCorrect = i === question.correctIndex;
                const isSelected = selectedIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-medium transition-all duration-200",
                      !answered && "border-line bg-ink-900/50 hover:border-line-strong hover:bg-ink-900",
                      answered && isCorrect && "border-success-500/40 bg-success-500/10 text-success-500",
                      answered && isSelected && !isCorrect && "border-danger-500/40 bg-danger-500/10 text-danger-500",
                      answered && !isSelected && !isCorrect && "border-line text-text-muted opacity-60"
                    )}
                  >
                    {option}
                    {answered && isCorrect && <Check className="h-4 w-4 shrink-0" />}
                    {answered && isSelected && !isCorrect && <X className="h-4 w-4 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {opponentAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-center gap-2 text-xs text-text-secondary"
            >
              <Avatar seed={opponentName} name={opponentName} size="sm" />
              {opponentName} {opponentCorrect ? "to'g'ri javob berdi" : "xato javob berdi"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function ScoreChip({
  name,
  seed,
  score,
  align,
}: {
  name: string;
  seed: string;
  score: number;
  align: "left" | "right";
}) {
  return (
    <div className={cn("flex items-center gap-2", align === "right" && "flex-row-reverse")}>
      <Avatar seed={seed} name={name} size="sm" />
      <span className="font-display text-lg font-semibold tabular-nums text-text-primary">{score}</span>
    </div>
  );
}

export default function DuelRoomPage() {
  return (
    <Suspense fallback={null}>
      <DuelRoomInner />
    </Suspense>
  );
}
