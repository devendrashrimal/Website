/** Progressive motion: no resting CSS hides content; every animation is a short enhancement. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const running = new Set<Animation>();
const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
const animate = (element: Element, delay = 0, distance = 18, duration = 620) => {
  if (reduceMotion.matches || !element.animate) return;
  const animation = element.animate([
    { opacity: .72, transform: `translateY(${distance}px)` },
    { opacity: 1, transform: 'translateY(0)' },
  ], { duration, delay, easing: 'cubic-bezier(.16,1,.3,1)' });
  running.add(animation);
  animation.finished.then(() => running.delete(animation), () => running.delete(animation));
};
const enter = (element: HTMLElement) => {
  element.dataset.motionState = 'entered';
  if (element.dataset.reveal === 'sequence') {
    [...element.children].forEach((child, index) => animate(child, Math.min(index * 65, 195), 14, 560));
  } else animate(element);
};
const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    observer?.unobserve(entry.target);
    enter(entry.target as HTMLElement);
  }
}, { threshold: .12, rootMargin: '0px 0px -24px 0px' }) : null;
if (!reduceMotion.matches) targets.forEach(element => observer?.observe(element));
// Disclosures keep native keyboard and no-JavaScript behavior; only their answer enters.
document.querySelectorAll<HTMLDetailsElement>('.faq-list details').forEach(details => {
  details.addEventListener('toggle', () => {
    const answer = details.querySelector('p');
    if (details.open && answer) animate(answer, 0, 6, 260);
  });
});
// Stop immediately if the preference changes while an entrance is running.
reduceMotion.addEventListener('change', () => {
  if (reduceMotion.matches) {
    observer?.disconnect();
    running.forEach(animation => animation.cancel());
    running.clear();
  } else {
    targets.filter(element => element.dataset.motionState !== 'entered').forEach(element => observer?.observe(element));
  }
});
