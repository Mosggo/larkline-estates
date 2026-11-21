const photos = {
  living: { file: 'village-living.webp', label: ['Living room', 'Wohnzimmer', 'Woonkamer'], alt: ['Illustrative living room with warm timber and daylight', 'Beispielbild eines Wohnzimmers mit Holztönen und Tageslicht', 'Voorbeeldfoto van een woonkamer met warme houttinten en daglicht'] },
  kitchen: { file: 'village-kitchen.webp', label: ['Kitchen', 'Küche', 'Keuken'], alt: ['Illustrative kitchen with dark timber cupboards', 'Beispielbild einer Küche mit dunklen Holzschränken', 'Voorbeeldfoto van een keuken met donkere houten kasten'] },
  bedroom: { file: 'village-bedroom.webp', label: ['Bedroom', 'Schlafzimmer', 'Slaapkamer'], alt: ['Illustrative bedroom in warm neutral tones', 'Beispielbild eines Schlafzimmers in warmen Naturtönen', 'Voorbeeldfoto van een slaapkamer in warme natuurtinten'] },
  tamina: { file: 'tamina.webp', label: ['Living room', 'Wohnzimmer', 'Woonkamer'], alt: ['Illustrative apartment living room with soft neutral finishes', 'Beispielbild eines Wohnzimmers in dezenten Naturtönen', 'Voorbeeldfoto van een woonkamer in zachte natuurtinten'] },
  townhouse: { file: 'townhouse.webp', label: ['Exterior', 'Aussenansicht', 'Buitenkant'], alt: ['Illustrative townhouse with a cream façade and slate roof', 'Beispielbild eines Stadthauses mit cremefarbener Fassade und Schieferdach', 'Voorbeeldfoto van een stadshuis met een crèmekleurige gevel en een leien dak'] },
  street: { file: 'flaescherstrasse.webp', label: 'Fläscherstrasse', alt: ['A street-level view of homes on Fläscherstrasse in Bad Ragaz', 'Häuser an der Fläscherstrasse in Bad Ragaz auf Strassenhöhe', 'Straatbeeld met woningen aan de Fläscherstrasse in Bad Ragaz'] },
};

const listings = {
  'village-loft': {
    name: 'Village Loft', neighborhood: 'Dorfkern', street: 'Pfäferserstrasse',
    type: 'Loft', area: '195 m²', beds: '3', baths: '2', price: 'CHF 1’950’000',
    description: [
      'A 195 m² loft on Pfäferserstrasse in Dorfkern, with three bedrooms and two bathrooms. If you’re deciding whether village-centre living is right for you, Daniel can walk you through the area and the property in one visit.',
      'Ein 195 m² grosses Loft an der Pfäferserstrasse im Dorfkern mit drei Schlafzimmern und zwei Badezimmern. Daniel zeigt Ihnen das Loft und das Quartier bei einem gemeinsamen Rundgang.',
      'Een loft van 195 m² aan de Pfäferserstrasse in het dorpshart, met drie slaapkamers en twee badkamers. Daniel laat u tijdens één rondleiding zowel het loft als de buurt zien.',
    ],
    locationTitle: ['In the heart of Dorfkern', 'Mitten im Dorfkern', 'In het dorpshart'],
    agent: 'Daniel Reyes', firstName: 'Daniel', portrait: 'agent-daniel.webp', agentRole: ['Senior agent', 'Senior-Makler', 'Senior makelaar'],
    agentCopy: ['Daniel looks after Dorfkern, Kirchgasse and Bahnhof. Ask him about Village Loft or arrange a viewing directly.', 'Daniel betreut den Dorfkern, die Kirchgasse und das Bahnhofsquartier. Fragen zum Village Loft oder einen Besichtigungstermin klären Sie direkt mit ihm.', 'Daniel is beschikbaar voor woningen in de Dorfkern, aan de Kirchgasse en rond het station. Neem rechtstreeks contact met hem op voor vragen over Village Loft of voor een bezichtiging.'],
    email: 'daniel@larkline.example', phone: '+41 81 555 01 01', whatsapp: '41795550111',
    photos: [photos.living, photos.kitchen, photos.bedroom],
  },
  'tamina-classic': {
    name: 'Tamina Classic', neighborhood: 'Kurgebiet', street: 'Bäderstrasse',
    type: ['Apartment', 'Wohnung', 'Appartement'], area: '172 m²', beds: '3', baths: '2', price: 'CHF 1’750’000',
    description: [
      'A 172 m² apartment on Bäderstrasse in the spa quarter, with three bedrooms and two bathrooms. Priya can help you get to know Kurgebiet and see how the location fits your day-to-day routine.',
      'Eine 172 m² grosse Wohnung an der Bäderstrasse im Kurgebiet mit drei Schlafzimmern und zwei Badezimmern. Mit Priya lernen Sie das Quartier kennen und sehen, wie die Lage zu Ihrem Alltag passt.',
      'Een appartement van 172 m² aan de Bäderstrasse in de kuurwijk, met drie slaapkamers en twee badkamers. Priya helpt u de buurt te leren kennen en te ontdekken of de ligging bij uw dagelijks leven past.',
    ],
    locationTitle: ['In the spa quarter', 'Im Kurgebiet', 'In de kuurwijk'],
    agent: 'Priya Nair', firstName: 'Priya', portrait: 'agent-priya.webp', agentRole: ['Senior agent', 'Senior-Maklerin', 'Senior makelaar'],
    agentCopy: ['Priya looks after Kurgebiet, Blumenrain-Sand and Freudenberg. Ask her about Tamina Classic or arrange a viewing directly.', 'Priya betreut das Kurgebiet, Blumenrain-Sand und Freudenberg. Fragen zu Tamina Classic oder einen Besichtigungstermin klären Sie direkt mit ihr.', 'Priya is uw aanspreekpunt in Kurgebiet, Blumenrain-Sand en Freudenberg. Neem rechtstreeks contact met haar op voor vragen over Tamina Classic of voor een bezichtiging.'],
    email: 'priya@larkline.example', phone: '+41 81 555 01 02', whatsapp: '41795550112',
    photos: [photos.tamina, photos.bedroom],
  },
  'flaescherstrasse-townhouse': {
    name: ['Fläscherstrasse Townhouse', 'Stadthaus an der Fläscherstrasse', 'Stadshuis aan de Fläscherstrasse'], neighborhood: 'Fläscherstrasse', street: 'Fläscherstrasse',
    type: ['Townhouse', 'Stadthaus', 'Stadshuis'], area: '297 m²', beds: '4', baths: '4', price: 'CHF 3’250’000',
    description: [
      'A 297 m² townhouse on Fläscherstrasse, with four bedrooms and four bathrooms. Sofia can show you the home and help you get a feel for living on this side of Bad Ragaz.',
      'Ein 297 m² grosses Stadthaus an der Fläscherstrasse mit vier Schlafzimmern und vier Badezimmern. Sofia zeigt Ihnen das Haus und gibt Ihnen einen Eindruck vom Wohnen in diesem Teil von Bad Ragaz.',
      'Een stadshuis van 297 m² aan de Fläscherstrasse, met vier slaapkamers en vier badkamers. Sofia laat u de woning zien en geeft u een indruk van het wonen in dit deel van Bad Ragaz.',
    ],
    locationTitle: ['Life on Fläscherstrasse', 'Wohnen an der Fläscherstrasse', 'Wonen aan de Fläscherstrasse'],
    agent: 'Sofia Lindqvist', firstName: 'Sofia', portrait: 'agent-sofia.webp', agentRole: ['Agent', 'Immobilienmaklerin', 'Makelaar'],
    agentCopy: ['Sofia looks after Fläscherstrasse, Grossfeld and St. Leonhard. Ask her about the townhouse or arrange a viewing directly.', 'Sofia betreut die Fläscherstrasse, das Grossfeld und St. Leonhard. Fragen zum Stadthaus oder einen Besichtigungstermin klären Sie direkt mit ihr.', 'Sofia is uw aanspreekpunt aan de Fläscherstrasse, in Grossfeld en in St. Leonhard. Neem rechtstreeks contact met haar op voor vragen over het stadshuis of voor een bezichtiging.'],
    email: 'sofia@larkline.example', phone: '+41 81 555 01 04', whatsapp: '41795550114',
    photoNote: ['The exterior is illustrative. The street photo shows Fläscherstrasse in Bad Ragaz.', 'Die Aussenansicht ist ein Beispielbild. Das Strassenfoto zeigt die Fläscherstrasse in Bad Ragaz.', 'De buitenfoto dient ter illustratie. Op de straatfoto ziet u de Fläscherstrasse in Bad Ragaz.'],
    photos: [photos.townhouse, photos.street],
  },
};

const menu = document.querySelector('[data-menu]');
const mobileViewport = matchMedia('(max-width: 60rem)');

menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) menu.open = false;
});

menu.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});

mobileViewport.addEventListener('change', () => { menu.open = false; });

const homeNav = document.querySelector('[data-home-nav]');
const cover = document.querySelector('[data-curtain-cover]');
const footer = document.querySelector('[data-curtain-footer]');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');

function enableWheelEasing() {
  const scrollRoot = document.scrollingElement;
  const easingTime = 90;
  let frame = 0;
  let previousTime = 0;
  let target = 0;
  let position = 0;
  let lastScrollY = 0;

  function stop() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
  }

  function limit(value) {
    return Math.max(0, Math.min(value, scrollRoot.scrollHeight - scrollRoot.clientHeight));
  }

  function draw(now) {
    // Give anchors, focus changes and other native scrolling priority.
    if (Math.abs(window.scrollY - lastScrollY) > 1) {
      stop();
      return;
    }

    const elapsed = previousTime ? Math.min(now - previousTime, 48) : 16;
    previousTime = now;
    target = limit(target);
    position += (target - position) * (1 - Math.exp(-elapsed / easingTime));
    const settled = Math.abs(target - position) < 0.5;

    window.scrollTo({ top: settled ? target : position, behavior: 'instant' });
    lastScrollY = window.scrollY;
    if (settled) stop();
    else frame = requestAnimationFrame(draw);
  }

  function hasNativeWheelTarget(event) {
    for (const node of event.composedPath()) {
      if (node === document.body || node === scrollRoot) break;
      if (!(node instanceof HTMLElement)) continue;
      if (node.matches('input, select, textarea, [contenteditable], dialog[open]')) return true;
      if (node.scrollHeight > node.clientHeight && /^(auto|scroll|overlay)$/.test(getComputedStyle(node).overflowY)) return true;
    }
    return false;
  }

  window.addEventListener('wheel', (event) => {
    const mode = event.deltaMode;
    if (motionPreference.matches || event.defaultPrevented || !event.cancelable ||
        event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX) || hasNativeWheelTarget(event)) {
      stop();
      return;
    }

    let scale = 1;
    if (mode === WheelEvent.DOM_DELTA_LINE) scale = parseFloat(getComputedStyle(document.body).lineHeight) || 16;
    if (mode === WheelEvent.DOM_DELTA_PAGE) scale = scrollRoot.clientHeight;
    const delta = event.deltaY * scale;
    const current = window.scrollY;
    if (frame && Math.abs(current - lastScrollY) > 1) stop();

    // On reversal, respond immediately from the part of the page already visible.
    const continues = frame && Math.sign(delta) === Math.sign(target - current);
    const next = limit((continues ? target : current) + delta);
    if (!frame && next === current) return;

    event.preventDefault();
    target = next;
    if (!frame) {
      window.scrollTo({ top: current, behavior: 'instant' });
      position = lastScrollY = current;
      frame = requestAnimationFrame(draw);
    }
  }, { passive: false });

  window.addEventListener('pointerdown', stop, { passive: true, capture: true });
  window.addEventListener('keydown', stop, { capture: true });
  window.addEventListener('hashchange', stop);
  document.addEventListener('focusin', stop);
  document.addEventListener('visibilitychange', stop);
  motionPreference.addEventListener('change', stop);
}

enableWheelEasing();

const heroVideo = document.querySelector('[data-hero-video]');
if (heroVideo) {
  let inView = false;

  function syncVideoPlayback() {
    if (motionPreference.matches || !inView || document.hidden) {
      heroVideo.pause();
      return;
    }
    // If the browser blocks autoplay, leave the first frame in place.
    heroVideo.play().catch(() => {});
  }

  heroVideo.addEventListener('error', () => { heroVideo.hidden = true; });
  document.addEventListener('visibilitychange', syncVideoPlayback);
  motionPreference.addEventListener('change', syncVideoPlayback);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncVideoPlayback();
    });
    observer.observe(heroVideo);
  } else {
    inView = true;
    syncVideoPlayback();
  }
}

const canReveal = CSS.supports('overflow', 'clip');
let footerHeight = 0;
let curtainActive = false;
let scrollFrame = 0;

function syncScrollEffects() {
  scrollFrame = 0;
  const viewportHeight = document.documentElement.clientHeight;

  if (homeNav && !mobileViewport.matches) {
    const position = homeNav.getBoundingClientRect();
    const stickyInset = parseFloat(getComputedStyle(homeNav).insetBlockStart);
    homeNav.toggleAttribute('data-docked', position.top <= stickyInset + 1);
  }

  if (!curtainActive || motionPreference.matches) return;

  const revealed = Math.max(0, viewportHeight - cover.getBoundingClientRect().bottom);
  const progress = Math.min(1, revealed / footerHeight);
  // Finish the fade in the padding so exposed footer links retain full contrast.
  const opacity = 0.3 + 0.7 * Math.min(1, revealed / 32);
  footer.style.setProperty('--curtain-progress', progress);
  footer.style.setProperty('--curtain-opacity', opacity);
}

function measureFooter() {
  footerHeight = Math.ceil(footer.getBoundingClientRect().height);
  const viewportHeight = Math.min(window.innerHeight, window.visualViewport?.height ?? window.innerHeight);
  curtainActive = canReveal && footerHeight > 0 && footerHeight < viewportHeight;
  cover.style.setProperty('--curtain-height', `${footerHeight}px`);
  document.body.classList.toggle('curtain-active', curtainActive);
  syncScrollEffects();
}

function queueScrollEffects() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncScrollEffects);
}

if (cover && footer) {
  window.addEventListener('scroll', queueScrollEffects, { passive: true });
  window.addEventListener('resize', measureFooter);
  window.visualViewport?.addEventListener('resize', measureFooter);
  motionPreference.addEventListener('change', queueScrollEffects);
  if ('ResizeObserver' in window) new ResizeObserver(measureFooter).observe(footer);
  else footer.addEventListener('toggle', measureFooter, true);
  footer.addEventListener('focusin', (event) => {
    if (!curtainActive) return;

    const activeBounds = event.target.getBoundingClientRect();
    const viewportHeight = document.documentElement.clientHeight;
    if (activeBounds.top < cover.getBoundingClientRect().bottom || activeBounds.bottom > viewportHeight) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
    }
  });
  measureFooter();
}

if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!motionPreference.matches) entry.target.classList.add('scroll-entered');
      reveal.unobserve(entry.target);
    }
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-scroll-reveal]').forEach((section) => reveal.observe(section));
}

const commission = document.querySelector('[data-commission]');
if (commission) {
  const larklineBasisPoints = 120;
  const price = commission.querySelector('#commission-price');
  const rate = commission.querySelector('#commission-rate');
  const hint = commission.querySelector('[data-commission-hint]');
  const comparisonResult = commission.querySelector('[data-commission-other]');
  const larklineResult = commission.querySelector('[data-commission-larkline]');
  const differenceResult = commission.querySelector('[data-commission-difference]');
  const differenceLabel = commission.querySelector('[data-commission-difference-label]');
  const francs = new Intl.NumberFormat('de-CH', {
    style: 'currency', currency: 'CHF', minimumFractionDigits: 0, maximumFractionDigits: 2,
  });
  const priceSlider = commission.querySelector('[aria-labelledby="commission-price-label"]');
  const rateSlider = commission.querySelector('[aria-labelledby="commission-rate-label"]');

  function renderCommission() {
    const percent = new Intl.NumberFormat(document.documentElement.lang, {
      style: 'percent', maximumFractionDigits: 2,
    });
    priceSlider.setAttribute('aria-valuetext', francs.format(priceSlider.valueAsNumber));
    rateSlider.setAttribute('aria-valuetext', percent.format(rateSlider.valueAsNumber / 100));

    const valid = price.validity.valid && rate.validity.valid;
    hint.hidden = valid;
    const salePrice = price.valueAsNumber;
    const comparisonBasisPoints = Math.round(rate.valueAsNumber * 100);
    const comparisonCents = Math.round(salePrice * comparisonBasisPoints / 100);
    const larklineCents = Math.round(salePrice * larklineBasisPoints / 100);
    const difference = comparisonCents - larklineCents;
    differenceLabel.textContent = valid && difference < 0
      ? siteLanguage.text('Additional commission with Larkline', 'Mehrkosten bei Larkline', 'Hogere makelaarskosten bij Larkline')
      : siteLanguage.text('Estimated savings with Larkline', 'Geschätzte Ersparnis mit Larkline', 'Geschatte besparing met Larkline');
    comparisonResult.textContent = valid ? francs.format(comparisonCents / 100) : '—';
    larklineResult.textContent = valid ? francs.format(larklineCents / 100) : '—';
    differenceResult.textContent = valid ? francs.format(Math.abs(difference) / 100) : '—';
  }

  for (const [field, slider] of [[price, priceSlider], [rate, rateSlider]]) {
    const unitId = field.getAttribute('aria-describedby');
    function syncValidation() {
      const invalid = !field.validity.valid;
      field.setAttribute('aria-invalid', String(invalid));
      field.setAttribute('aria-describedby', invalid ? unitId + ' ' + hint.id : unitId);
      renderCommission();
    }
    slider.addEventListener('input', () => {
      field.value = slider.value;
      syncValidation();
    });
    field.addEventListener('input', () => {
      if (field.validity.valid) slider.value = field.value;
      syncValidation();
    });
  }

  document.addEventListener('languagechange', renderCommission);
  renderCommission();
  commission.hidden = false;
}

const form = document.querySelector('[data-valuation]');
if (form) {
  const status = form.querySelector('[role="status"]');
  const fields = [...form.querySelectorAll('input, select')];
  form.addEventListener('invalid', (event) => {
    const field = event.target;
    const message = field.validity.typeMismatch
      ? siteLanguage.text('Enter a valid email address.', 'Geben Sie eine gültige E-Mail-Adresse ein.', 'Vul een geldig e-mailadres in.')
      : siteLanguage.text('Please complete this field.', 'Bitte füllen Sie dieses Feld aus.', 'Vul dit veld in.');
    field.setCustomValidity(message);
  }, true);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    status.hidden = false;
    status.focus();
  });
  form.addEventListener('input', (event) => {
    event.target.setCustomValidity('');
    status.hidden = true;
  });
  document.addEventListener('languagechange', () => fields.forEach((field) => field.setCustomValidity('')));
  form.querySelector('button[type="submit"]').disabled = false;
}

const property = document.querySelector('[data-property]');
if (property) {
  const key = new URLSearchParams(location.search).get('listing');
  const listing = Object.hasOwn(listings, key) ? listings[key] : listings['village-loft'];
  const localized = (value) => Array.isArray(value) ? siteLanguage.text(...value) : value;
  const listingFields = property.querySelectorAll('[data-listing]');
  const email = property.querySelector('[data-agent-email]');
  const phone = property.querySelector('[data-agent-phone]');
  phone.textContent = listing.phone;
  phone.href = `tel:${listing.phone.replaceAll(' ', '')}`;
  property.querySelector('[data-agent-whatsapp]').href = `https://wa.me/${listing.whatsapp}`;
  property.querySelector('[data-agent-portrait]').src = `assets/${listing.portrait}`;

  const gallery = property.querySelector('[data-gallery]');
  const hero = gallery.querySelector('[data-gallery-main]');
  const choices = gallery.querySelector('[data-gallery-choices]');
  const dialog = gallery.querySelector('[data-gallery-dialog]');
  const dialogImage = dialog.querySelector('[data-dialog-image]');
  const dialogTitle = dialog.querySelector('[data-dialog-title]');
  const thumbnails = [...choices.children].slice(0, listing.photos.length);
  [...choices.children].slice(thumbnails.length).forEach((link) => link.remove());
  let selectedPhoto = 0;
  let dialogPhoto = 0;

  function photoTitle(photo, index) {
    return `${localized(photo.label)} · ${index + 1} / ${listing.photos.length}`;
  }

  function setGalleryLink(link, photo, index, isMain) {
    const image = link.querySelector('img');
    link.href = `assets/${photo.file}`;
    const label = localized(photo.label);
    link.setAttribute('aria-label', isMain
      ? siteLanguage.text(`Open full-size photo: ${label}`, `Foto in voller Grösse öffnen: ${label}`, `Open foto op volledige grootte: ${label}`)
      : siteLanguage.text(`Show photo: ${label}`, `Foto anzeigen: ${label}`, `Toon foto: ${label}`));
    image.src = link.getAttribute('href');
    image.alt = localized(photo.alt);
    link.querySelector('.photo-caption').textContent = isMain ? photoTitle(photo, index) : label;
  }

  function selectPhoto(index) {
    selectedPhoto = index;
    setGalleryLink(hero, listing.photos[index], index, true);
    thumbnails.forEach((link, choice) => {
      if (choice === index) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  function showDialogPhoto(index) {
    dialogPhoto = (index + listing.photos.length) % listing.photos.length;
    const photo = listing.photos[dialogPhoto];
    dialogImage.src = `assets/${photo.file}`;
    dialogImage.alt = localized(photo.alt);
    dialogTitle.textContent = photoTitle(photo, dialogPhoto);
  }

  function renderListing() {
    const fields = {
      ...listing,
      location: listing.street === listing.neighborhood
        ? `${listing.street} · 7310 Bad Ragaz`
        : `${listing.street}, ${listing.neighborhood} · 7310 Bad Ragaz`,
      status: ['For sale', 'Zum Kauf', 'Te koop'],
      photoNote: listing.photoNote || ['Property photos are illustrative.', 'Die Immobilienfotos sind Beispielbilder.', 'De woningfoto’s dienen ter illustratie.'],
    };
    const name = localized(listing.name);
    document.title = `${name} | Larkline Estates`;
    listingFields.forEach((element) => { element.textContent = localized(fields[element.dataset.listing]); });
    email.textContent = siteLanguage.text(`Email ${listing.firstName}`, `E-Mail an ${listing.firstName}`, `E-mail ${listing.firstName}`);
    const subject = siteLanguage.text(`${name} viewing`, `Besichtigung: ${name}`, `Bezichtiging: ${name}`);
    email.href = `mailto:${listing.email}?subject=${encodeURIComponent(subject)}`;
    thumbnails.forEach((link, index) => setGalleryLink(link, listing.photos[index], index, false));
    selectPhoto(selectedPhoto);
    if (dialog.open) showDialogPhoto(dialogPhoto);
  }

  const modified = (event) => event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  hero.addEventListener('click', (event) => {
    if (modified(event) || !dialog.showModal) return;
    event.preventDefault();
    showDialogPhoto(selectedPhoto);
    dialog.showModal();
  });
  thumbnails.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      if (modified(event)) return;
      event.preventDefault();
      selectPhoto(index);
    });
  });

  dialog.querySelector('[data-prev-photo]').addEventListener('click', () => showDialogPhoto(dialogPhoto - 1));
  dialog.querySelector('[data-next-photo]').addEventListener('click', () => showDialogPhoto(dialogPhoto + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showDialogPhoto(dialogPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  document.addEventListener('languagechange', renderListing);
  renderListing();
}
