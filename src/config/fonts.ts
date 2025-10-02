// src/config/fonts.ts
export type FontOption = { label: string; stack: string };

export const SANS_OPTIONS: FontOption[] = [
    {
        label: "System Default",
        stack:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Liberation Sans", sans-serif',
    },
    {
        label: "Arial (system)",
        stack:
            'Arial, "Helvetica Neue", Helvetica, "Noto Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Liberation Sans", sans-serif',
    },
    {
        label: "Helvetica (system)",
        stack:
            '"Helvetica Neue", Helvetica, Arial, "Noto Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Liberation Sans", sans-serif',
    },

    // Static packages (classic family names)
    {
        label: "Lato",
        stack:
            'Lato, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
    },
    {
        label: "Ubuntu",
        stack:
            'Ubuntu, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
    },

    {
        label: "Noto Sans",
        stack:
            '"Noto Sans Variable", "Noto Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Liberation Sans", sans-serif',
    },
    {
        label: "Noto Serif",
        stack: '"Noto Serif", Georgia, "Times New Roman", "Liberation Serif", serif',
    },
    {
        label: "Open Sans",
        stack:
            '"Open Sans Variable", "Open Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
    },
    {
        label: "Roboto",
        stack:
            '"Roboto Variable", Roboto, ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
    },
];

export const VAR_SANS = "--font-sans";
export const STORE_SANS = "font-sans-stack";
export const DEFAULT_SANS =
    SANS_OPTIONS.find((o) => o.label === "Noto Sans") ?? SANS_OPTIONS[1];
