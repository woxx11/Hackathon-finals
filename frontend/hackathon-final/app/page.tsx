"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Download, LockKeyhole, Sparkles, Trophy, Zap } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [schoolId, setSchoolId] = useState("school-1");
  const [classId, setClassId] = useState("10A");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("Aqurin_user");
      if (stored) {
        router.push("/dashboard");
      }
    }
  }, [router]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(""); setLoading(true);
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/users/register";
      const response = await fetch(`${API_URL}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, schoolId, classId }) });
      
      let payload;
      try {
        payload = await response.json();
      } catch (e) {
        throw new Error("Server xatosi yoki API javob bermayapti");
      }
      
      if (!response.ok || !payload.success) throw new Error(payload.error?.message || "Xatolik yuz berdi");
      const user = payload.data?.user || payload.data;
      localStorage.setItem("Aqurin_user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err) { setError(err instanceof Error ? err.message : "Проверь соединение с сервером"); }
    finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf8f5] text-[#1e1b2e]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ff6b4a] text-2xl font-black italic text-white shadow-lg shadow-[#ff6b4a]/20">a</span><span className="text-2xl font-black tracking-tight">Aqurin</span></Link>
        <a href="https://hackathon-finals.vercel.app/" className="hidden rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-bold sm:block">О проекте</a>
      </nav>
      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:pb-28 lg:pt-20">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#ffb800]/15 blur-3xl" /><div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#8b5cf6]/10 blur-3xl" />
        <div className="relative"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff6b4a]/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-[#ff6b4a]"><Sparkles className="h-4 w-4" /> AI-платформа для школьников</div><h1 className="max-w-2xl text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-7xl">Учись умнее.<br /><span className="bg-gradient-to-r from-[#ff6b4a] via-[#8b5cf6] to-[#38bdf8] bg-clip-text text-transparent">Побеждай чаще.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">AI-репетитор, интерактивные квизы и дуэли с одноклассниками в одном месте. Начни с первого вопроса — прогресс сохраним автоматически.</p><div className="mt-8 grid max-w-xl grid-cols-3 gap-3"><div className="rounded-2xl bg-white p-4 shadow-sm"><Zap className="h-5 w-5 text-[#ff6b4a]" /><p className="mt-3 text-sm font-black">AI-помощник</p></div><div className="rounded-2xl bg-white p-4 shadow-sm"><Trophy className="h-5 w-5 text-[#ffb800]" /><p className="mt-3 text-sm font-black">Рейтинг школы</p></div><div className="rounded-2xl bg-white p-4 shadow-sm"><span className="text-xl text-[#8b5cf6]">⚔</span><p className="mt-3 text-sm font-black">Дуэли</p></div></div><a href={`${API_URL}/downloads/Aqurin.apk`} className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#8b5cf6]"><Download className="h-4 w-4" /> Скачать приложение для Android</a></div>
        <div className="relative rounded-[2rem] bg-[#1e1b2e] p-6 text-white shadow-2xl shadow-[#1e1b2e]/20 sm:p-8"><div className="mb-7 flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.15em] text-[#ffb800]">Твой старт</p><h2 className="mt-2 text-3xl font-black">Войти в Aqurin</h2></div><LockKeyhole className="h-7 w-7 text-[#ff6b4a]" /></div><div className="mb-6 flex rounded-xl bg-white/10 p-1"><button onClick={() => setMode("login")} className={`flex-1 rounded-lg py-2 text-sm font-bold ${mode === "login" ? "bg-[#ff6b4a] text-white" : "text-white/60"}`}>Войти</button><button onClick={() => setMode("register")} className={`flex-1 rounded-lg py-2 text-sm font-bold ${mode === "register" ? "bg-[#ff6b4a] text-white" : "text-white/60"}`}>Регистрация</button></div><form onSubmit={submit} className="space-y-3"><input required value={name} onChange={e => setName(e.target.value)} placeholder="Имя и фамилия" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-white/40 focus:border-[#ff6b4a]" /><div className="grid grid-cols-2 gap-3"><input required value={schoolId} onChange={e => setSchoolId(e.target.value)} placeholder="ID школы" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-white/40 focus:border-[#ff6b4a]" /><input required value={classId} onChange={e => setClassId(e.target.value)} placeholder="Класс" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-white/40 focus:border-[#ff6b4a]" /></div>{error ? <p className="rounded-xl bg-red-400/15 px-4 py-3 text-sm text-red-200">{error}</p> : null}<button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6b4a] py-4 font-black transition hover:bg-[#f05532] disabled:opacity-60">{loading ? "Проверяем..." : mode === "login" ? "Войти в кабинет" : "Создать профиль"}<ArrowRight className="h-4 w-4" /></button></form><p className="mt-5 text-center text-xs leading-5 text-white/45">Вход нужен, чтобы сохранять XP, streak и результаты квизов.</p></div>
      </section>
    </main>
  );
}
