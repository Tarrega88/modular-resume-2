import { db } from "@/db/db";

export default function DevToolbar() {
  // Only render in dev
  if (!import.meta.env.DEV) return null;

  async function purge() {
    try {
      // Nuke the whole Dexie DB (you can also do: await db.kv.clear())
      await db.delete();
      // Fresh boot (BootGate will recreate DB + initial state)
      window.location.reload();
    } catch (e) {
      console.error("Purge failed", e);
    }
  }

  return (
    <div className="fixed bottom-3 left-3 z-50 rounded-lg bg-black/70 text-white px-3 py-2 shadow">
      <button className="text-sm font-medium" onClick={purge}>
        Purge DB
      </button>
    </div>
  );
}
