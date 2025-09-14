import { db, STATE_KEY } from "./db";
import type { ResumeState } from "../state/types";

// optional: don't preserve drag indices across reloads
function sanitizeForSave(s: ResumeState): ResumeState {
    return {
        ...s,
        dragFromIndex: -1,
        dragToIndex: -1,
    };
}

export async function loadState(): Promise<ResumeState | null> {
    try {
        const row = await db.kv.get(STATE_KEY);
        return (row?.value as ResumeState) ?? null;
    } catch (e) {
        console.error("Dexie load error", e);
        return null;
    }
}

export async function saveState(state: ResumeState): Promise<void> {
    try {
        await db.kv.put({ key: STATE_KEY, value: sanitizeForSave(state) });
    } catch (e) {
        console.error("Dexie save error", e);
    }
}
