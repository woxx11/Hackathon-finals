"use client";

import { Topbar } from "@/components/layout/topbar";
import { DuelResultView } from "@/components/features/duel-result-view";
import { DUEL_RESULT, CURRENT_USER } from "@/lib/mock-data";

export default function DuelResultPage() {
  return (
    <>
      <Topbar title="Duel natijasi" />
      <DuelResultView
        subject={DUEL_RESULT.subject}
        host={DUEL_RESULT.host}
        opponent={DUEL_RESULT.opponent}
        xpAwarded={DUEL_RESULT.xpAwarded}
        currentUserId={CURRENT_USER.id}
      />
    </>
  );
}
