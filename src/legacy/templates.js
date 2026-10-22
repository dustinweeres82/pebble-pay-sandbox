/*
  Legacy templates — the "server-rendered partials" of Pebble Pay.
  Like many older design systems, they paint with palette classes and repeat
  every color with a `dark:` twin. They return HTML strings, the way a Rails
  partial or a Django template would.
*/

// Literal class names so Tailwind can detect them.
const BUTTON_COLORS = {
  general: {
    fill: "bg-ocean-600 dark:bg-ocean-400",
    border: "border-ocean-600 dark:border-ocean-400",
    text: "text-ocean-600 dark:text-ocean-400",
    states: "hover:bg-ocean-200 dark:hover:bg-ocean-200 active:bg-ocean-700 dark:active:bg-ocean-600",
  },
  info: {
    fill: "bg-sky-600 dark:bg-sky-400",
    border: "border-sky-600 dark:border-sky-400",
    text: "text-sky-600 dark:text-sky-400",
    states: "hover:bg-sky-200 dark:hover:bg-sky-200 active:bg-sky-700 dark:active:bg-sky-600",
  },
  success: {
    fill: "bg-leaf-600 dark:bg-leaf-400",
    border: "border-leaf-600 dark:border-leaf-400",
    text: "text-leaf-600 dark:text-leaf-400",
    states: "hover:bg-leaf-200 dark:hover:bg-leaf-200 active:bg-leaf-700 dark:active:bg-leaf-600",
  },
  caution: {
    fill: "bg-sun-650 dark:bg-sun-400",
    border: "border-sun-650 dark:border-sun-400",
    text: "text-sun-650 dark:text-sun-400",
    states: "hover:bg-sun-200 dark:hover:bg-sun-200 active:bg-sun-700 dark:active:bg-sun-650",
  },
  destruction: {
    fill: "bg-ember-600 dark:bg-ember-400",
    border: "border-ember-600 dark:border-ember-400",
    text: "text-ember-600 dark:text-ember-400",
    states: "hover:bg-ember-200 dark:hover:bg-ember-200 active:bg-ember-700 dark:active:bg-ember-600",
  },
}

const BUTTON_BASE = [
  "inline-flex w-full items-center justify-center gap-2.5 rounded-full border-4 px-4 py-3",
  "text-center text-xl font-semibold",
  "focus:outline-none focus:border-stone-600 dark:focus:border-stone-50",
  "hover:border-transparent active:border-transparent",
  "hover:text-stone-800 dark:hover:text-stone-800 active:text-stone-200 dark:active:text-stone-900",
  "disabled:bg-stone-200 disabled:text-stone-500 disabled:border-stone-200",
  "dark:disabled:bg-stone-700 dark:disabled:text-stone-400 dark:disabled:border-stone-700",
].join(" ")

/** button({ text, theme: "primary" | "secondary", themeColor, disabled }) */
export function button({ text, theme = "primary", themeColor = "general", disabled = false }) {
  const c = BUTTON_COLORS[themeColor]
  const look =
    theme === "primary"
      ? `${c.fill} ${c.border} text-white dark:text-stone-800`
      : `bg-stone-50 dark:bg-stone-800 ${c.border} ${c.text}`
  return `<button type="button" class="${BUTTON_BASE} ${look} ${c.states}"${disabled ? " disabled" : ""}>${text}</button>`
}

const ALERT_THEMES = {
  info: { box: "border-sky-500 bg-sky-100", icon: "text-sky-500", glyph: "i" },
  success: { box: "border-leaf-500 bg-leaf-100", icon: "text-leaf-500", glyph: "✓" },
  caution: { box: "border-sun-500 bg-sun-100", icon: "text-sun-500", glyph: "!" },
  destruction: { box: "border-ember-500 bg-ember-100", icon: "text-ember-500", glyph: "▲" },
}

/** alert({ theme, title, body }) */
export function alert({ theme = "info", title, body }) {
  const t = ALERT_THEMES[theme]
  return `<div class="flex gap-3 border-t-4 px-3 pt-3 pb-4 text-stone-800 dark:bg-stone-700 dark:text-white ${t.box}">
    <span class="w-8 px-2 text-2xl font-bold ${t.icon}">${t.glyph}</span>
    <div class="flex flex-col gap-2"><div class="text-base font-bold">${title}</div><div>${body}</div></div>
  </div>`
}

const BADGE_STATUSES = {
  paid: "bg-leaf-600 dark:bg-leaf-400",
  pending: "bg-sun-600 dark:bg-sun-400",
  overdue: "bg-ember-600 dark:bg-ember-400",
  new: "bg-sky-600 dark:bg-sky-400",
}

/** badge({ status, label }) */
export function badge({ status, label }) {
  return `<span class="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium leading-tight text-white dark:text-stone-800 ${BADGE_STATUSES[status]}">${label}</span>`
}

/** textField({ label, description, placeholder }) */
export function textField({ label, description, placeholder }) {
  return `<label class="flex flex-col gap-1">
    <span class="font-semibold text-stone-800 dark:text-white">${label}</span>
    <span class="text-base font-light italic text-stone-800 dark:text-white">${description}</span>
    <input class="w-full rounded-t border-b-2 border-stone-300 bg-white p-4 text-lg font-light text-stone-800 shadow placeholder:text-stone-500 focus:border-sky-600 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:border-sky-400" placeholder="${placeholder}" />
  </label>`
}
