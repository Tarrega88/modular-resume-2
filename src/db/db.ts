import Dexie, { Table } from "dexie";

export type KV = { key: string; value: unknown };

export class ResumeDB extends Dexie {
    kv!: Table<KV, string>;
    constructor() {
        super("modular-resume-db");
        this.version(1).stores({
            kv: "&key", // & = primary key
        });
    }
}

export const db = new ResumeDB();
// bump this when your state shape changes
export const STATE_KEY = "resume-state-v1";
