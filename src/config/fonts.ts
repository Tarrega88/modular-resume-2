// src/config/fonts.ts
export type FontOption = { label: string; stack: string };

export const SANS_OPTIONS: FontOption[] = [
    {
        label: "System Default",
        stack:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", "Liberation Sans", "Helvetica Neue", Arial, sans-serif',
    },
    {
        label: "Inter",
        stack:
            'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Noto Sans", sans-serif',
    },
    {
        label: "Source Sans 3",
        stack:
            '"Source Sans 3", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Noto Sans", sans-serif',
    },
    {
        label: "Noto Sans",
        stack:
            '"Noto Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    },
    {
        label: "IBM Plex Sans",
        stack:
            '"IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Noto Sans", sans-serif',
    },
    {
        label: "Public Sans",
        stack:
            '"Public Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Noto Sans", sans-serif',
    },

    // New additions:
    {
        label: "Merriweather Sans",
        stack:
            '"Merriweather Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Noto Sans", sans-serif',
    },
    {
        label: "Merriweather (serif)",
        // It's a serif — totally fine to use as a body face if you like the look.
        stack:
            'Merriweather, Georgia, "Times New Roman", "Noto Serif", serif',
    },
];

export const VAR_SANS = "--font-sans";
export const STORE_SANS = "font-sans-stack";
export const DEFAULT_SANS =
    SANS_OPTIONS.find((o) => o.label === "Inter") ?? SANS_OPTIONS[1];
