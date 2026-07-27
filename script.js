const header = document.querySelector('[data-header]')
const nav = document.querySelector('[data-nav]')
const menuButton = document.querySelector('[data-menu-button]')
const railLinks = Array.from(document.querySelectorAll('[data-rail-link]'))
const sections = Array.from(document.querySelectorAll('[data-section]'))
const revealItems = Array.from(document.querySelectorAll('.reveal'))

const setHeaderState = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 18)
}

setHeaderState()
window.addEventListener('scroll', setHeaderState, { passive: true })

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open')
  menuButton.setAttribute('aria-expanded', String(isOpen))
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu')
})

nav.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove('is-open')
    menuButton.setAttribute('aria-expanded', 'false')
    menuButton.setAttribute('aria-label', 'Open menu')
  }
})

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.16 })

  revealItems.forEach((item) => revealObserver.observe(item))

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return
      }

      railLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`)
      })
    })
  }, { rootMargin: '-45% 0px -45% 0px' })

  sections.forEach((section) => sectionObserver.observe(section))
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'))
  railLinks[0]?.classList.add('is-active')
}
