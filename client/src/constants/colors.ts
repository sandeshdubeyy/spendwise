export const COLORS = {
  // Surfaces
  pageBg: "bg-white dark:bg-[#0b1f3a]",
  heroBg:
    "bg-gradient-to-b from-green-50/80 to-white dark:from-[#0b1f3a] dark:to-[#0b1f3a]",
  cardBg: "bg-white dark:bg-[#132d4a]",
  cardBorder: "border-green-100 dark:border-blue-800/60",
  navbarBg: "bg-white/80 backdrop-blur-md dark:bg-[#071126]/95",
  navbarBorder: "border-green-100 dark:border-[#1e3a8a]/40",

  // Text
  textPrimary: "text-slate-900 dark:text-white",
  textBrand: "text-[#1e3a8a] dark:text-white",
  textSecondary: "text-slate-600 dark:text-slate-300",
  textMuted: "text-slate-500 dark:text-slate-400",

  // Interactive
  link: "text-slate-600 hover:text-green-700 dark:text-slate-300 dark:hover:text-blue-300",
  primaryBtn:
    "bg-green-600 text-white hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-500",
  outlineBtn:
    "border border-green-200 text-[#1e3a8a] hover:bg-green-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/40",

  // Finance semantics
  income: "text-green-600 dark:text-green-400",
  expense: "text-red-600 dark:text-red-400",
  savings: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  danger: "text-red-600 dark:text-red-400",
  accent: "text-orange-500",

  // Focus
  focusRing:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-500 dark:focus-visible:ring-offset-[#0b1f3a]",

  // Image placeholder boxes
  mockupBorder:
    "border-2 border-dashed border-green-200 dark:border-blue-700",
  mockupBg: "bg-green-50/40 dark:bg-blue-900/20",
} as const;