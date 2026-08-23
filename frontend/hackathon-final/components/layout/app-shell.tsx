import { Sidebar } from "./sidebar";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950">
      <Sidebar />
      <main className="min-h-screen lg:pl-64">{children}</main>
      <BottomNav />
    </div>
  );
}
