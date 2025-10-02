// utils/getFontStack.ts
import { SANS_OPTIONS, DEFAULT_SANS } from "@/config/fonts";
export function getFontStack(label?: string) {
    return SANS_OPTIONS.find(o => o.label === label)?.stack ?? DEFAULT_SANS.stack;
}
