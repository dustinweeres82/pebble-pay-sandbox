/*
  Legacy templates — the "server-rendered partials" of Pebble Pay.
  They paint with semantic tokens, so brand and mode switches on <html> reach
  them with no per-template overrides. They return HTML strings, the way a Rails
  partial or a Django template would.
*/

// Literal class names so Tailwind can detect them.
const BUTTON_COLORS = {
  general: {
    fill: "bg-primary",
    border: "border-primary",
    text: "text-primary",
    states: "hover:bg-primary-hover active:bg-primary-active",
  },
  info: {
    fill: "bg-info",
    border: "border-info",
    text: "text-info",
    states: "hover:bg-info-hover active:bg-info-active",
  },
  success: {
    fill: "bg-success",
    border: "border-success",
    text: "text-success",
    states: "hover:bg-success-hover active:bg-success-active",
  },
  caution: {
    fill: "bg-caution",
    border: "border-caution",
    text: "text-caution",
    states: "hover:bg-warning-hover active:bg-warning-active",
  },
  destruction: {
    fill: "bg-destructive",
    border: "border-destructive",
    text: "text-destructive",
    states: "hover:bg-destructive-hover active:bg-destructive-active",
  },
}

const BUTTON_BASE = [
  "inline-flex w-full items-center justify-center gap-2.5 rounded-full border-4 px-4 py-3",
  "text-center text-xl font-semibold",
  "focus:outline-none focus:border-focus-border",
  "hover:border-transparent active:border-transparent",
  "hover:text-on-hover active:text-on-active",
  "disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled",
].join(" ")

/** button({ text, theme: "primary" | "secondary", themeColor, disabled }) */
export function button({ text, theme = "primary", themeColor = "general", disabled = false }) {
  const c = BUTTON_COLORS[themeColor]
  const look =
    theme === "primary"
      ? `${c.fill} ${c.border} text-primary-foreground`
      : `bg-background ${c.border} ${c.text}`
  return `<button type="button" class="${BUTTON_BASE} ${look} ${c.states}"${disabled ? " disabled" : ""}>${text}</button>`
}

const ALERT_THEMES = {
  info: { box: "border-info-emphasis bg-info-subtle", icon: "text-info-emphasis", glyph: "i" },
  success: { box: "border-success-emphasis bg-success-subtle", icon: "text-success-emphasis", glyph: "✓" },
  caution: { box: "border-warning-emphasis bg-warning-subtle", icon: "text-warning-emphasis", glyph: "!" },
  destruction: {
    box: "border-destructive-emphasis bg-destructive-subtle",
    icon: "text-destructive-emphasis",
    glyph: "▲",
  },
}

/** alert({ theme, title, body }) */
export function alert({ theme = "info", title, body }) {
  const t = ALERT_THEMES[theme]
  return `<div class="flex gap-3 border-t-4 px-3 pt-3 pb-4 text-foreground ${t.box}">
    <span class="w-8 px-2 text-2xl font-bold ${t.icon}">${t.glyph}</span>
    <div class="flex flex-col gap-2"><div class="text-base font-bold">${title}</div><div>${body}</div></div>
  </div>`
}

const BADGE_STATUSES = {
  paid: "bg-success",
  pending: "bg-warning",
  overdue: "bg-destructive",
  new: "bg-info",
}

/** badge({ status, label }) */
export function badge({ status, label }) {
  return `<span class="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium leading-tight text-primary-foreground ${BADGE_STATUSES[status]}">${label}</span>`
}

/** textField({ label, description, placeholder }) */
export function textField({ label, description, placeholder }) {
  return `<label class="flex flex-col gap-1">
    <span class="font-semibold text-foreground">${label}</span>
    <span class="text-base font-light italic text-foreground">${description}</span>
    <input class="w-full rounded-t border-b-2 border-field-border bg-field p-4 text-lg font-light text-foreground shadow placeholder:text-field-placeholder focus:border-field-focus focus:outline-none" placeholder="${placeholder}" />
  </label>`
}
