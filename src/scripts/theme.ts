/** A local preference only: no cookies, account or network request. */
const root = document.documentElement;
const button = document.querySelector<HTMLButtonElement>('.theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let explicitChoice = false;
try { explicitChoice = ['light', 'dark'].includes(localStorage.getItem('clinic-theme') || ''); } catch { /* Storage may be disabled. */ }
function updateTheme(dark: boolean) {
  root.dataset.theme = dark ? 'dark' : 'light';
  button?.setAttribute('aria-pressed', String(dark));
  button?.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
  const color = getComputedStyle(root).getPropertyValue('--color-paper').trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
}
updateTheme(root.dataset.theme === 'dark');
if (button) {
  button.hidden = false;
  button.addEventListener('click', () => {
    explicitChoice = true;
    updateTheme(root.dataset.theme !== 'dark');
    try { localStorage.setItem('clinic-theme', root.dataset.theme!); } catch { /* Current page still works. */ }
  });
}
systemTheme.addEventListener('change', event => { if (!explicitChoice) updateTheme(event.matches); });
window.addEventListener('storage', event => {
  if (event.key !== 'clinic-theme') return;
  explicitChoice = event.newValue === 'dark' || event.newValue === 'light';
  updateTheme(explicitChoice ? event.newValue === 'dark' : systemTheme.matches);
});
