// Small layout helpers shared by the pages. Not part of the design system.

/** A section rendered from legacy template HTML. data-testid = one Visual diff screenshot. */
export function Legacy({ id, html, className = "" }) {
  return <div data-testid={id} className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

/** A titled block on the Components page. data-testid = one Visual diff screenshot. */
export function Section({ id, title, children }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      <div data-testid={id} className="flex flex-col gap-4 rounded-lg border bg-card p-5">
        {children}
      </div>
    </section>
  )
}
