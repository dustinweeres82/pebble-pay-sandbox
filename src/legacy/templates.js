/*
  Legacy templates — the "server-rendered partials" of Pebble Pay.
  Like many older design systems, they paint with palette classes and repeat
  every color with a `dark:` twin. They return HTML strings, the way a Rails
  partial or a Django template would.

  data-src names the partial (shown by "Show components").
  data-go="<page>" makes an element navigate inside the demo app.
*/

const go = (page) => (page ? ` data-go="${page}"` : "")

// ---------------------------------------------------------------- Button
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
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap border-4 py-3",
  "text-center font-semibold",
  "focus:outline-none focus:border-stone-600 dark:focus:border-stone-50",
  "hover:border-transparent active:border-transparent",
  "hover:text-stone-800 dark:hover:text-stone-800 active:text-stone-200 dark:active:text-stone-900",
  "disabled:bg-stone-200 disabled:text-stone-500 disabled:border-stone-200",
  "dark:disabled:bg-stone-700 dark:disabled:text-stone-400 dark:disabled:border-stone-700",
].join(" ")

const BUTTON_SIZES = { xl: "text-xl", base: "text-base" }

/**
 * button({ text, theme: "primary" | "secondary", themeColor, size: "xl" | "base",
 *          inline, joinStart, disabled, go })
 * inline: fit the text instead of the full width. joinStart: square left edge, to sit
 * flush against a field (a select + button pair).
 */
export function button({ text, theme = "primary", themeColor = "general", size = "xl", inline = false, joinStart = false, disabled = false, go: page }) {
  const c = BUTTON_COLORS[themeColor]
  const look =
    theme === "primary"
      ? `${c.fill} ${c.border} text-white dark:text-stone-800`
      : `bg-stone-50 dark:bg-stone-800 ${c.border} ${c.text}`
  const width = inline ? "w-fit px-7" : "w-full px-4"
  const shape = joinStart ? "rounded-r-full rounded-l-none" : "rounded-full"
  return `<button type="button" data-src="legacy.button" class="${BUTTON_BASE} ${BUTTON_SIZES[size]} ${width} ${shape} ${look} ${c.states}"${disabled ? " disabled" : ""}${go(page)}>${text}</button>`
}

/** textButton({ text, go }) — a link-style action ("View payment", "Cancel"). */
export function textButton({ text, go: page }) {
  return `<a href="#${page || ""}" data-src="legacy.textButton" class="text-lg font-medium text-ocean-600 hover:underline dark:text-ocean-400"${go(page)}>${text}</a>`
}

// ---------------------------------------------------------------- Type
/** titleText({ text }) — the serif page title. */
export function titleText({ text }) {
  return `<h1 data-src="legacy.titleText" class="font-serif text-4xl leading-tight text-stone-800 dark:text-white">${text}</h1>`
}

/** breadcrumb({ text, go }) */
export function breadcrumb({ text, go: page }) {
  return `<a href="#${page}" data-src="legacy.breadcrumb" class="inline-flex items-center gap-1 font-serif text-2xl text-ocean-600 dark:text-ocean-400"${go(page)}>${text}
    <svg class="size-5 text-stone-800 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg></a>`
}

// ---------------------------------------------------------------- Badge
const BADGE_STATUSES = {
  completed: "bg-leaf-600 dark:bg-leaf-400",
  processing: "bg-sun-600 dark:bg-sun-400",
  failed: "bg-ember-600 dark:bg-ember-400",
  new: "bg-sky-600 dark:bg-sky-400",
}

/** badge({ status: "completed" | "processing" | "failed" | "new", label, small }) */
export function badge({ status, label, small = false }) {
  const size = small ? "px-2.5 py-1 text-xs" : "px-4 py-1.5 text-sm"
  return `<span data-src="legacy.badge" class="inline-flex items-center rounded-full font-semibold leading-tight text-white dark:text-stone-800 ${size} ${BADGE_STATUSES[status]}">${label}</span>`
}

// ---------------------------------------------------------------- Alert
const ALERT_THEMES = {
  info: { box: "border-sky-500 bg-sky-100", icon: "text-sky-500", glyph: "i" },
  success: { box: "border-leaf-500 bg-leaf-100", icon: "text-leaf-500", glyph: "✓" },
  caution: { box: "border-sun-500 bg-sun-100", icon: "text-sun-500", glyph: "!" },
  destruction: { box: "border-ember-500 bg-ember-100", icon: "text-ember-500", glyph: "▲" },
}

/** alert({ theme, title, body }) */
export function alert({ theme = "info", title, body }) {
  const t = ALERT_THEMES[theme]
  return `<div data-src="legacy.alert" class="flex gap-3 border-t-4 px-3 pt-3 pb-4 text-stone-800 dark:bg-stone-700 dark:text-white ${t.box}">
    <span class="w-8 px-2 text-2xl font-bold ${t.icon}">${t.glyph}</span>
    <div class="flex flex-col gap-2"><div class="text-base font-bold">${title}</div><div>${body}</div></div>
  </div>`
}

// ---------------------------------------------------------------- Fields
const LABEL = "text-lg font-semibold text-stone-800 dark:text-white"
const HELP = "text-base font-semibold text-stone-500 dark:text-stone-400"
const FIELD =
  "w-full border border-stone-200 border-b-2 border-b-stone-300 bg-white px-5 text-xl text-stone-800 " +
  "placeholder:text-stone-500 focus:border-b-sky-600 focus:outline-none " +
  "dark:border-stone-700 dark:border-b-stone-700 dark:bg-stone-900 dark:text-white dark:focus:border-b-sky-400"
const FIELD_DISABLED = "disabled:border-transparent disabled:bg-stone-200 disabled:text-stone-500 dark:disabled:bg-stone-700 dark:disabled:text-stone-400"

const help = (text) => (text ? `<span class="${HELP}">${text}</span>` : "")

/** textField({ label, description, help, placeholder, value, type, disabled }) */
export function textField({ label, description, help: helpText, placeholder = "", value = "", type = "text", disabled = false }) {
  return `<label data-src="legacy.textField" class="flex flex-col gap-2">
    <span class="${LABEL}">${label}</span>
    ${description ? `<span class="text-base font-light italic text-stone-800 dark:text-white">${description}</span>` : ""}
    <input type="${type}" class="h-14 ${FIELD} ${FIELD_DISABLED}" placeholder="${placeholder}" value="${value}"${disabled ? " disabled" : ""} />
    ${help(helpText)}
  </label>`
}

/** select({ label, options, help, width }) — a native select with the legacy field look. */
export function select({ label, options, help: helpText, width = "w-full" }) {
  const field = `<span class="relative block ${width}">
      <select class="h-14 appearance-none pr-12 ${FIELD}">${options.map((o) => `<option>${o}</option>`).join("")}</select>
      <svg class="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2 text-stone-800 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
    </span>`
  if (!label) return `<span data-src="legacy.select" class="block ${width}">${field}</span>`
  return `<label data-src="legacy.select" class="flex flex-col gap-2 ${width}"><span class="${LABEL}">${label}</span>${field}${help(helpText)}</label>`
}

/** textArea({ label, rows }) */
export function textArea({ label, rows = 4 }) {
  return `<label data-src="legacy.textArea" class="flex flex-col gap-2">
    <span class="${LABEL}">${label}</span>
    <textarea rows="${rows}" class="py-4 ${FIELD}"></textarea>
  </label>`
}

// ---------------------------------------------------------------- Table
/** table({ columns, rows }) — rows are arrays of HTML strings. */
export function table({ columns, rows }) {
  const th = "whitespace-nowrap border-b border-stone-200 px-6 py-5 text-left font-bold text-stone-800 dark:border-stone-700 dark:text-white"
  const td = "whitespace-nowrap border-b border-stone-200 px-6 py-5 text-stone-800 dark:border-stone-700 dark:text-white"
  return `<table data-src="legacy.table" class="w-full border-collapse text-lg">
    <thead><tr>${columns.map((c) => `<th class="${th}">${c}</th>`).join("")}</tr></thead>
    <tbody>${rows
      .map((r, i) => `<tr class="${i % 2 === 0 ? "bg-white dark:bg-stone-850" : ""}">${r.map((c) => `<td class="${td}">${c}</td>`).join("")}</tr>`)
      .join("")}</tbody>
  </table>`
}

// ---------------------------------------------------------------- Layout
const ICONS = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  chart: '<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6"/>',
  people: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2.5 1.5-4.5 4-4.5"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  gift: '<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M12 8v13M3 12h18"/>',
  dollar: '<path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
}

/** nav({ active }) — the app's side navigation. */
export function nav({ active }) {
  const items = [
    ["home", "Home"], ["grid", "Dashboard"], ["chart", "Reports"], ["people", "Manage team"],
    ["card", "Off-cycle payouts", "payouts", badge({ status: "new", label: "BETA", small: true })],
    ["gift", "Rewards"], ["dollar", "Tips"], ["gear", "Settings"],
  ]
  return `<nav data-src="legacy.nav" class="flex h-full w-80 flex-col bg-ocean-900 py-6 text-white dark:bg-stone-900">
    <div class="flex items-center gap-3 px-6 pb-6 text-2xl font-bold"><span class="size-8 rounded-lg bg-ocean-400"></span>Pebble Pay</div>

    ${items
      .map(([icon, label, page, extra]) => {
        const on = page === active
        return `<a href="#${page || ""}" class="flex items-center gap-3 whitespace-nowrap px-6 py-3 text-lg font-semibold ${on ? "bg-white/10" : "hover:bg-white/10"}"${go(page)}>
          <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICONS[icon]}</svg>${label}${extra ? ` ${extra}` : ""}</a>`
      })
      .join("")}
    <div class="mt-auto flex items-center gap-3 border-t border-white/15 px-6 pt-5">
      <span class="grid size-9 place-items-center rounded-full bg-white text-sm font-bold text-ocean-900">JS</span>
      <span class="flex flex-col"><b>Jordan Smith</b><span class="text-sm text-stone-300">View profile</span></span>
    </div>
  </nav>`
}

/** supportBanner({ title, body, action }) */
export function supportBanner({ title, body, action }) {
  return `<div data-src="legacy.supportBanner" class="flex flex-wrap items-center justify-between gap-6 bg-stone-100 px-16 py-9 text-stone-800 dark:bg-stone-700 dark:text-white">
    <div><div class="font-serif text-3xl">${title}</div><div class="mt-1 text-lg">${body}</div></div>
    ${button({ text: action, inline: true })}
  </div>`
}
