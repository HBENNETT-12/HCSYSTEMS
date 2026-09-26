'use strict';
// Progressive navigation: without JS, links remain visible and usable.
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
document.documentElement.classList.add('enhanced');
menuButton.hidden = false;
function closeMenu(returnFocus = false) {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  closeMenu();
  if (link.hash) {
    const target = document.querySelector(link.hash);
    if (target) { target.setAttribute('tabindex', '-1'); target.focus({preventScroll: true}); }
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) closeMenu(true);
});
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
const mobile = matchMedia('(max-width: 768px)');
mobile.addEventListener('change', () => closeMenu());
const links = [...navigation.querySelectorAll('a[href^="#"]')];
const sections = links.map(link => document.querySelector(link.hash));
let scheduled = false;
function updateScroll() {
  header.classList.toggle('scrolled', scrollY > 20);
  let active = sections[0];
  for (const section of sections) if (section.getBoundingClientRect().top <= innerHeight * .35) active = section;
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) active = sections.at(-1);
  for (const link of links) {
    if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, {passive:true});
addEventListener('resize', updateScroll);
updateScroll();
// Hide only off-screen content, and reveal once. Reduced motion stays visible.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.remove('pending'); observer.unobserve(entry.target); }
  }), {threshold: .08});
  document.querySelectorAll('.reveal').forEach(element => {
    if (element.getBoundingClientRect().top > innerHeight) { element.classList.add('pending'); observer.observe(element); }
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); document.querySelectorAll('.pending').forEach(el => el.classList.remove('pending')); }
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
// No backend or email was supplied. Validation prepares a local downloadable
// message; it never implies successful delivery or transmits personal data.
const form = document.querySelector('#contact-form');
const fields = [...form.querySelectorAll('input, textarea')];
const status = document.querySelector('#form-status');
const download = document.querySelector('#download-message');
let messageURL;
function validate(field) {
  const value = field.value.trim();
  let error = '';
  if (!value) error = `Please enter your ${field.name}.`;
  else if (field.type === 'email' && field.validity.typeMismatch) error = 'Please enter a valid email address.';
  else if (field.name === 'message' && value.length < 10) error = 'Please write at least 10 characters.';
  field.setAttribute('aria-invalid', String(Boolean(error)));
  document.getElementById(field.id + '-error').textContent = error;
  return !error;
}
fields.forEach(field => field.addEventListener('input', () => {
  if (field.getAttribute('aria-invalid') === 'true') validate(field);
  download.hidden = true;
  status.textContent = '';
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  const results = fields.map(validate);
  if (results.includes(false)) {
    status.textContent = 'Please correct the highlighted fields.';
    fields[results.indexOf(false)].focus();
    return;
  }
  if (messageURL) URL.revokeObjectURL(messageURL);
  const body = `To: Hunter Bennett\nFrom: ${form.elements.name.value.trim()}\nEmail: ${form.elements.email.value.trim()}\n\n${form.elements.message.value.trim()}\n`;
  messageURL = URL.createObjectURL(new Blob([body], {type:'text/plain;charset=utf-8'}));
  download.href = messageURL;
  download.hidden = false;
  status.textContent = 'Your message is ready to download. It has not been sent; direct contact details are coming soon.';
});
addEventListener('pagehide', () => { if (messageURL) URL.revokeObjectURL(messageURL); });
