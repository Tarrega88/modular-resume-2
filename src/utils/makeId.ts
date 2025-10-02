import { nanoid } from "nanoid";

export function makeId(): string {
    try {
        if (typeof window !== "undefined" &&
            (window as any).isSecureContext &&
            typeof crypto !== "undefined" &&
            typeof (crypto as any).randomUUID === "function") {
            return crypto.randomUUID();
        }
    } catch { }
    return nanoid();
}
