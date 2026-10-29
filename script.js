const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const assemblyImage = document.querySelector('#assembly-image');
const viewControls = document.querySelector('.assembly-controls');
if (assemblyImage && viewControls) {
  const views = {
    isometric: { src: 'assets/amphibious-isometric.webp', alt: 'Isometric CAD view of the amphibious robot, showing its six-wheel body and powered front arm', caption: 'CAD assembly · isometric view' },
    side: { src: 'assets/amphibious-side.webp', alt: 'Side CAD view showing the amphibious robot chassis and its front arm in the level position', caption: 'CAD assembly · side view' },
    top: { src: 'assets/amphibious-top.webp', alt: 'Top CAD view of the amphibious robot body, six wheels, and front arm', caption: 'CAD assembly · top view' }
  };
  let latestView = 0;
  viewControls.hidden = false;
  viewControls.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-view]');
    if (!button || !views[button.dataset.view]) return;
    const view = views[button.dataset.view];
    const request = ++latestView;
    const candidate = new Image();
    candidate.onload = () => {
      if (request !== latestView) return;
      assemblyImage.src = view.src;
      assemblyImage.alt = view.alt;
      document.querySelector('#assembly-caption').textContent = view.caption;
      viewControls.querySelectorAll('button').forEach((control) => control.setAttribute('aria-pressed', String(control === button)));
    };
    candidate.onerror = () => {
      if (request === latestView) document.querySelector('#assembly-caption').textContent = 'View unavailable. Please try another view.';
    };
    candidate.src = view.src;
  });
}

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.gait-media').forEach((media) => {
  const image = media.querySelector('img[data-animation]');
  const button = media.querySelector('.play-control');
  if (!image || !button) return;
  let request = 0;
  function pause() {
    request += 1;
    image.src = image.dataset.poster;
    button.setAttribute('aria-pressed', 'false');
    button.querySelector('span').textContent = 'Play gait';
    button.disabled = false;
  }
  button.hidden = false;
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return pause();
    const current = ++request;
    const candidate = new Image();
    button.disabled = true;
    button.querySelector('span').textContent = 'Loading gait…';
    candidate.onload = () => {
      if (current !== request) return;
      image.src = image.dataset.animation;
      button.disabled = false;
      button.setAttribute('aria-pressed', 'true');
      button.querySelector('span').textContent = 'Pause gait';
    };
    candidate.onerror = () => {
      if (current !== request) return;
      button.disabled = false;
      button.querySelector('span').textContent = 'Retry animation';
    };
    candidate.src = image.dataset.animation;
  });
  motionPreference.addEventListener('change', (event) => { if (event.matches) pause(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
});
