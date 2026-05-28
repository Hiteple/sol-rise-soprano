/** Marks full-width / page-top hero blocks the skip link should scroll past. */
export const SKIP_PAST_HERO_ATTR = 'data-skip-past-hero'

function nextContentSection(hero: Element): HTMLElement | null {
  let sibling = hero.nextElementSibling
  while (sibling) {
    if (sibling instanceof HTMLElement) {
      if (sibling.tagName === 'SECTION') return sibling
      const nested = sibling.querySelector('section')
      if (nested instanceof HTMLElement) return nested
    }
    sibling = sibling.nextElementSibling
  }
  return null
}

/** Scroll target: section after the page hero, or main when there is no hero. */
export function getSkipScrollTarget(): HTMLElement | null {
  const main = document.getElementById('main-content')
  if (!main) return null

  const hero = main.querySelector(`[${SKIP_PAST_HERO_ATTR}]`)
  if (hero) {
    const afterHero = nextContentSection(hero)
    if (afterHero) return afterHero
  }

  const firstSection = main.querySelector('section')
  if (firstSection instanceof HTMLElement) return firstSection

  return main
}

export function skipToContent() {
  const target = getSkipScrollTarget()
  if (!target) return

  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1')
  }

  target.focus({ preventScroll: true })
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
