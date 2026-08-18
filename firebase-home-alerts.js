import { auth, db, onAuthStateChanged, collection, onSnapshot } from './firebase-config.js';

const panel = document.getElementById('fleetAlerts');
const list = document.getElementById('fleetAlertList');
const count = document.getElementById('fleetAlertCount');
let unsubscribe = null;

const esc = (value = '') => String(value).replace(/[&<>'"]/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[char]));

function dateLabel(value) {
  return new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
    .format(new Date(value + 'T12:00:00'));
}

function daysUntil(value) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(value + 'T12:00:00') - today) / 86400000);
}

function deadlineText(days) {
  if (days < 0) return `Scaduta da ${Math.abs(days)} ${Math.abs(days) === 1 ? 'giorno' : 'giorni'}`;
  if (days === 0) return 'Scade oggi';
  if (days === 1) return 'Scade domani';
  return `Scade tra ${days} giorni`;
}

function render(vehicles) {
  const alerts = vehicles
    .filter(vehicle => vehicle.revisionDate)
    .map(vehicle => ({ ...vehicle, days: daysUntil(vehicle.revisionDate) }))
    .filter(vehicle => vehicle.days <= 30)
    .sort((a, b) => a.days - b.days);

  if (!alerts.length) {
    panel.classList.remove('show', 'has-expired');
    list.innerHTML = '';
    count.textContent = '0';
    return;
  }

  panel.classList.toggle('has-expired', alerts.some(vehicle => vehicle.days < 0));
  panel.classList.add('show');
  count.textContent = alerts.length;
  list.innerHTML = alerts.map(vehicle => `
    <a class="alert-row${vehicle.days < 0 ? ' expired' : ''}" href="gestione-mezzi.html" title="Apri la gestione mezzi">
      <div class="alert-vehicle">
        <strong>${esc(vehicle.vehicleName || [vehicle.make, vehicle.model].filter(Boolean).join(' ') || 'Mezzo aziendale')}</strong>
        <span>N. ${esc(vehicle.vehicleNumber || '—')} · Targa ${esc((vehicle.plate || '—').toUpperCase())}</span>
      </div>
      <div class="alert-deadline">
        <strong>${esc(deadlineText(vehicle.days))}</strong>
        <span>Revisione: ${esc(dateLabel(vehicle.revisionDate))}</span>
      </div>
    </a>`).join('');
}

onAuthStateChanged(auth, user => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }

  if (!user) {
    panel.classList.remove('show', 'has-expired');
    return;
  }

  unsubscribe = onSnapshot(collection(db, 'mezzi'), snapshot => {
    render(snapshot.docs.map(document => ({ id: document.id, ...document.data() })));
  }, error => {
    console.error('Impossibile caricare le scadenze dei mezzi:', error);
    panel.classList.remove('show', 'has-expired');
  });
});
