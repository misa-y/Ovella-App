const STORAGE_KEYS = {
  painEntries: 'ovella:painEntries',
  reliefSessions: 'ovella:reliefSessions',
  reports: 'ovella:advocacyReports',
  hasWearable: 'ovella:hasHaloWearable',
  stimulationPattern: 'ovella:stimulationPattern',
};

const memoryStore = {};

const state = {
  activeTab: 'home',
  selectedPain: 6,
  latestReport: '',
  hasWearable: readStorage('ovella:hasHaloWearable') === 'true',
  stimulationPattern: readStorage('ovella:stimulationPattern') || 'Wave',
  notifications: false,
};

const icons = {
  home: '<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
  zap: '<svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.04.04a2.1 2.1 0 0 1-3 3l-.04-.04a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1 1.64V21a2.1 2.1 0 0 1-4.2 0v-.06a1.8 1.8 0 0 0-1-1.64 1.8 1.8 0 0 0-2 .36l-.04.04a2.1 2.1 0 0 1-3-3l.04-.04a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.64-1H3a2.1 2.1 0 0 1 0-4.2h.06a1.8 1.8 0 0 0 1.64-1 1.8 1.8 0 0 0-.36-2L4.3 6.4a2.1 2.1 0 0 1 3-3l.04.04a1.8 1.8 0 0 0 2 .36 1.8 1.8 0 0 0 1-1.64V2a2.1 2.1 0 0 1 4.2 0v.06a1.8 1.8 0 0 0 1 1.64 1.8 1.8 0 0 0 2-.36l.04-.04a2.1 2.1 0 0 1 3 3l-.04.04a1.8 1.8 0 0 0-.36 2c.25.61.85 1 1.5 1H22a2.1 2.1 0 0 1 0 4.2h-.06a1.8 1.8 0 0 0-1.64 1z"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  bluetooth: '<svg viewBox="0 0 24 24"><path d="m7 7 10 10-5 4V3l5 4L7 17"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8zM5 14l.7 1.8L8 16.5l-2.3.7L5 19l-.7-1.8L2 16.5l2.3-.7z"/></svg>',
  trend: '<svg viewBox="0 0 24 24"><path d="m3 7 6 6 4-4 8 8"/><path d="M21 11v6h-6"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>',
  brain: '<svg viewBox="0 0 24 24"><path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 5 3 3 0 0 0 2 5v1a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 5 3 3 0 0 1-2 5v1a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z"/></svg>',
  waves: '<svg viewBox="0 0 24 24"><path d="M3 8c3 0 3 2 6 2s3-2 6-2 3 2 6 2M3 14c3 0 3 2 6 2s3-2 6-2 3 2 6 2"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M20.8 5.6a5.3 5.3 0 0 0-7.5 0L12 6.9l-1.3-1.3a5.3 5.3 0 1 0-7.5 7.5L12 22l8.8-8.9a5.3 5.3 0 0 0 0-7.5z"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>',
};

const tabs = [
  ['home', 'Home', icons.home],
  ['history', 'Report', icons.calendar],
  ['session', 'Wearable', icons.zap],
  ['settings', 'Settings', icons.settings],
];

function icon(name) {
  return `<span class="svg-icon">${icons[name]}</span>`;
}

function todayText() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

function isoDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readCollection(key) {
  try {
    return JSON.parse(readStorage(key)) || [];
  } catch {
    return [];
  }
}

function writeCollection(key, records) {
  writeStorage(key, JSON.stringify(records));
}

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memoryStore[key] || null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    memoryStore[key] = value;
  }
}

function removeStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    delete memoryStore[key];
  }
}

function getPainEntries() {
  return readCollection(STORAGE_KEYS.painEntries).sort((a, b) => a.date.localeCompare(b.date));
}

function getReports() {
  return readCollection(STORAGE_KEYS.reports);
}

function getReliefSessions() {
  return readCollection(STORAGE_KEYS.reliefSessions).sort((a, b) => a.date.localeCompare(b.date));
}

function savePainEntry(input) {
  const entry = {
    id: makeId('pain'),
    date: input.date || isoDate(),
    painLevel: Number(input.painLevel),
    painLocation: input.painLocation || 'Lower abdomen',
    symptoms: input.symptoms || [],
    cycleDay: input.cycleDay || '',
    mood: input.mood || '',
    energyLevel: input.energyLevel || '',
    medicationTaken: input.medicationTaken || '',
    missedActivity: Boolean(input.missedActivity),
    notes: input.notes || '',
    createdAt: new Date().toISOString(),
  };
  writeCollection(STORAGE_KEYS.painEntries, [...getPainEntries(), entry]);
  return entry;
}

function saveReliefSession(input) {
  const session = {
    id: makeId('session'),
    date: input.date || isoDate(),
    heatLevel: input.heatLevel || 'Medium',
    tensLevel: input.tensLevel || state.stimulationPattern,
    sessionDuration: Number(input.sessionDuration) || 20,
    startingPainLevel: Number(input.startingPainLevel) || 0,
    endingPainLevel: Number(input.endingPainLevel) || 0,
    skinTemperature: input.skinTemperature || 'Normal',
    safetyStatus: input.safetyStatus || 'Comfortable',
    createdAt: new Date().toISOString(),
  };
  writeCollection(STORAGE_KEYS.reliefSessions, [...getReliefSessions(), session]);
  return session;
}

function recentEntries(days = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days + 1);
  const cutoffIso = cutoff.toISOString().slice(0, 10);
  return getPainEntries().filter((entry) => entry.date >= cutoffIso);
}

function mostCommon(values) {
  const counts = values.filter(Boolean).reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([value]) => value);
}

function analyzePainTrends(days = 30) {
  const entries = recentEntries(days);
  const painLevels = entries.map((entry) => Number(entry.painLevel));
  const symptomList = entries.flatMap((entry) => entry.symptoms || []);
  const averagePain = painLevels.length
    ? painLevels.reduce((sum, level) => sum + level, 0) / painLevels.length
    : 0;

  return {
    periodDays: days,
    entries,
    averagePain: Number(averagePain.toFixed(1)),
    highestPain: painLevels.length ? Math.max(...painLevels) : 0,
    mostCommonSymptoms: mostCommon(symptomList).slice(0, 3),
    mostCommonPainLocation: mostCommon(entries.map((entry) => entry.painLocation))[0] || 'Not enough data',
    highPainDays: entries.filter((entry) => Number(entry.painLevel) >= 7).length,
    missedActivityDays: entries.filter((entry) => entry.missedActivity).length,
    totalEntries: entries.length,
  };
}

function generateAdvocacyReport(days = 30) {
  const trends = analyzePainTrends(days);
  const symptoms = trends.mostCommonSymptoms.length ? trends.mostCommonSymptoms.join(', ') : 'not enough symptoms logged yet';
  const text = `In the past ${days} days, the user logged pelvic pain on ${trends.totalEntries} days. The average pain level was ${trends.averagePain}/10, with the highest pain level reaching ${trends.highestPain}/10. The most common symptoms were ${symptoms}. Pain was most frequently reported in the ${trends.mostCommonPainLocation}. The user reported missing school, work, or daily activities on ${trends.missedActivityDays} days.`;
  const report = {
    id: makeId('report'),
    dateGenerated: new Date().toISOString(),
    averagePain: trends.averagePain,
    highestPain: trends.highestPain,
    mostCommonSymptoms: trends.mostCommonSymptoms,
    mostCommonPainLocation: trends.mostCommonPainLocation,
    highPainDays: trends.highPainDays,
    missedActivityDays: trends.missedActivityDays,
    reportText: text,
  };
  writeCollection(STORAGE_KEYS.reports, [...getReports(), report]);
  state.latestReport = text;
  return report;
}

function estimateAdaptiveSettings(painLevel, energyLevel = 'Medium') {
  const normalizedPain = Math.min(Math.max(Number(painLevel) || 0, 0), 10) / 10;
  const fatigue = energyLevel === 'Low' ? 0.8 : energyLevel === 'High' ? 0.25 : 0.5;
  const amplitude = Math.min(60, Math.max(10, 10 + 40 * normalizedPain + 5 * fatigue));
  const frequency = fatigue > 0.6 ? 2 + 8 * normalizedPain : 60 + 60 * normalizedPain;
  const pulseWidth = Math.min(400, Math.max(100, 100 + 250 * normalizedPain));

  return {
    amplitude: amplitude.toFixed(1),
    frequency: frequency.toFixed(1),
    pulseWidth: pulseWidth.toFixed(0),
  };
}

function seedDemoData() {
  if (getPainEntries().length) return;
  const demoEntries = [
    [-12, 4, 'Lower abdomen', ['cramping', 'fatigue'], 18, 'Okay', 'Medium', 'Ibuprofen', false, 'Managed with heat.'],
    [-10, 7, 'Lower abdomen', ['cramping', 'nausea', 'heavy bleeding'], 20, 'Stressed', 'Low', 'Ibuprofen', true, 'Missed practice.'],
    [-8, 6, 'Pelvis', ['back pain', 'fatigue'], 22, 'Tired', 'Low', 'None', false, 'Rest helped.'],
    [-6, 8, 'Lower abdomen', ['cramping', 'headache'], 24, 'Anxious', 'Low', 'Ibuprofen', true, 'Left school early.'],
    [-4, 5, 'Lower back', ['fatigue'], 26, 'Okay', 'Medium', 'Heat patch', false, 'Short walk was okay.'],
    [-2, 7, 'Lower abdomen', ['cramping', 'nausea'], 28, 'Frustrated', 'Low', 'Ibuprofen', true, 'Could not focus in class.'],
    [0, 6, 'Lower abdomen', ['cramping'], 1, 'Hopeful', 'Medium', 'Heat patch', false, 'Logging for appointment.'],
  ].map(([offset, painLevel, painLocation, symptoms, cycleDay, mood, energyLevel, medicationTaken, missedActivity, notes]) => ({
    id: makeId('demo-pain'),
    date: isoDate(offset),
    painLevel,
    painLocation,
    symptoms,
    cycleDay,
    mood,
    energyLevel,
    medicationTaken,
    missedActivity,
    notes,
    createdAt: new Date().toISOString(),
  }));

  writeCollection(STORAGE_KEYS.painEntries, demoEntries);
}

function render() {
  const app = document.querySelector('#app');
  app.innerHTML = views[state.activeTab]();
  renderNav();
  bindActions();
}

function header(title, subtitle, action = '') {
  return `
    <header class="page-header">
      <div>
        <h1>${title}</h1>
        ${subtitle ? `<p>${subtitle}</p>` : ''}
      </div>
      ${action}
    </header>
  `;
}

const views = {
  home() {
    const trends = analyzePainTrends(30);
    return `
      <section class="screen">
        ${header('Ovella', todayText())}
        <article class="card pain-card">
          <form id="pain-form">
            <div class="card-title-row">
              <h2>Daily pain check-in</h2>
              <button class="text-action" type="submit">${icon('plus')}Save log</button>
            </div>
            <div class="pain-grid">
              ${Array.from({ length: 10 }, (_, i) => {
                const score = i + 1;
                return `<button class="pain-button ${state.selectedPain === score ? 'selected' : ''}" type="button" data-pain="${score}">${score}</button>`;
              }).join('')}
            </div>
            <div class="form-grid">
              ${field('date', 'Date', 'date', isoDate())}
              ${selectField('painLocation', 'Location', ['Lower abdomen', 'Pelvis', 'Lower back', 'Full body'])}
              ${field('cycleDay', 'Cycle day', 'number', '', '1')}
              ${selectField('mood', 'Mood', ['Hopeful', 'Okay', 'Tired', 'Anxious', 'Frustrated'])}
              ${selectField('energyLevel', 'Energy', ['Medium', 'Low', 'High'])}
              ${field('medicationTaken', 'Medication', 'text', '', 'Ibuprofen, heat patch, none')}
            </div>
            <fieldset class="symptom-field">
              <legend>Symptoms</legend>
              ${['cramping', 'nausea', 'fatigue', 'back pain', 'headache', 'heavy bleeding', 'fainting', 'fever', 'sudden severe pain'].map((symptom) => `
                <label><input type="checkbox" name="symptoms" value="${symptom}"> ${symptom}</label>
              `).join('')}
            </fieldset>
            <label class="check-row"><input type="checkbox" name="missedActivity"> Missed school, work, or activity</label>
            <label class="full-label">Notes<textarea name="notes" rows="3" placeholder="What helped? What made it harder?"></textarea></label>
          </form>
        </article>

        <article class="card dashboard-card">
          <h2>Visible data dashboard</h2>
          ${trendStats(trends)}
        </article>

        <article class="card chart-card">
          <h2>This Week</h2>
          ${weeklyChart()}
        </article>

      </section>
    `;
  },
  session() {
    const latest = recentEntries(30).at(-1);
    const settings = estimateAdaptiveSettings(latest?.painLevel || state.selectedPain, latest?.energyLevel);

    return `
      <section class="screen">
        ${header('Wearable', 'Ovella Halo concept')}
        ${!state.hasWearable ? `
          <article class="card prediction-card">
            <div class="row-start">
              <div class="soft-icon muted">${icon('phone')}</div>
              <div>
                <h2>Ovella Halo Wearable required</h2>
                <p>Wearable features use the Ovella Halo concept for localized heat and TENS support. Enable it in Settings if you have one.</p>
              </div>
            </div>
            <button class="primary-button top-space" type="button" data-open-settings>Go to Settings</button>
          </article>
        ` : `
          <article class="card prediction-card">
            <div class="row-start">
              <div class="soft-icon purple">${icon('waves')}</div>
              <div>
                <h2>Wearable relief settings</h2>
                <p>Current concept mode: heat with ${state.stimulationPattern.toLowerCase()} TENS support. Demo values: ${settings.amplitude} mA, ${settings.frequency} Hz, ${settings.pulseWidth} us.</p>
              </div>
            </div>
          </article>
          <article class="card screening-card">
            <form id="session-form">
              <div class="card-title-row"><h2>Save wearable session</h2><button class="text-action" type="submit">${icon('plus')}Save</button></div>
              <div class="form-grid">
                ${field('date', 'Date', 'date', isoDate())}
                ${selectField('heatLevel', 'Heat', ['Low', 'Medium', 'High'])}
                ${selectField('tensLevel', 'TENS pattern', ['Wave', 'Pulse', 'Gentle', 'Deep', 'Cycle'], state.stimulationPattern)}
                ${field('sessionDuration', 'Minutes', 'number', 20)}
                ${field('startingPainLevel', 'Start pain', 'number', latest?.painLevel || 6)}
                ${field('endingPainLevel', 'End pain', 'number', Math.max(0, (latest?.painLevel || 6) - 2))}
                ${selectField('skinTemperature', 'Skin temp', ['Normal', 'Warm', 'Cool'])}
                ${selectField('safetyStatus', 'Safety', ['Comfortable', 'Paused', 'Stopped'])}
              </div>
            </form>
          </article>
          <article class="card dashboard-card">
            <h2>Saved wearable sessions</h2>
            ${sessionList()}
          </article>
        `}
      </section>
    `;
  },
  history() {
    const trends = analyzePainTrends(30);
    return `
      <section class="screen">
        ${header('Advocacy Report', 'Turn symptom logs into clear support evidence')}
        <article class="card report-card">
          <div class="card-title-row">
            <h2>Advocacy report generator</h2>
            <button class="pill-button small" type="button" data-generate-report>Generate</button>
          </div>
          <p class="report-text">${state.latestReport || generatePreviewReport(trends)}</p>
        </article>
        <article class="card dashboard-card">
          <h2>Report summary</h2>
          ${trendStats(trends)}
        </article>
        <article class="card calendar-card">
          <div class="month-row">
            <button class="icon-button" type="button" aria-label="Previous month">${icon('chevronLeft')}</button>
            <h2>${new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())}</h2>
            <button class="icon-button" type="button" aria-label="Next month">${icon('chevronRight')}</button>
          </div>
          ${calendarGrid()}
        </article>
      </section>
    `;
  },
  settings() {
    return `
      <section class="screen settings-screen">
        ${header('Settings', 'Manage your profile and preferences')}
        <article class="card settings-card">
          <div class="user-row"><div class="avatar">${icon('user')}</div><h2>Demo User</h2></div>
          <hr>
          <h3 class="section-label">Cycle Information</h3>
          ${settingRow('calendar', 'Cycle Length', `<button class="select-button" type="button">28 days ${icon('chevronDown')}</button>`)}
          ${settingRow('heart', 'Last Period', `<button class="select-button" type="button">${isoDate(-6)} ${icon('calendar')}</button>`)}
        </article>
        <article class="card settings-card">
          <h3 class="section-label">Ovella Halo Wearable</h3>
          ${settingRow('phone', 'I have the Ovella Halo Wearable', switchButton('hasWearable'))}
          ${state.hasWearable ? '<p class="muted-line">Wearable features are enabled.</p>' : '<p class="muted-line">Wearable features are hidden for now. Turn this on later if you get the Ovella Halo Wearable.</p>'}
        </article>
        ${state.hasWearable ? `
          <article class="card settings-card">
            <h3 class="section-label">Device Settings</h3>
            ${settingRow('bluetooth', 'Connected Device', '<span class="status-dot"><i></i>Not connected</span>')}
            ${settingRow('zap', 'Stimulation Pattern', settingSelect('stimulationPattern', ['Wave', 'Pulse', 'Gentle', 'Deep', 'Cycle']))}
          </article>
        ` : ''}
        <article class="card settings-card">
          <h3 class="section-label">Notifications</h3>
          ${settingRow('bell', 'Enable Notifications', switchButton('notifications'))}
        </article>
        <button class="sign-out" type="button">${icon('logout')}Sign Out</button>
        <button class="secondary-button" type="button" data-reset-demo>Reset demo data</button>
      </section>
    `;
  },
};

function field(name, label, type, value = '', placeholder = '') {
  return `<label>${label}<input name="${name}" type="${type}" value="${value}" placeholder="${placeholder}"></label>`;
}

function selectField(name, label, options, selectedValue = '') {
  return `<label>${label}<select name="${name}">${options.map((option) => `<option value="${option}" ${option === selectedValue ? 'selected' : ''}>${option}</option>`).join('')}</select></label>`;
}

function settingSelect(key, options) {
  return `
    <select class="select-button" data-setting-select="${key}" aria-label="${key}">
      ${options.map((option) => `<option value="${option}" ${state[key] === option ? 'selected' : ''}>${option}</option>`).join('')}
    </select>
  `;
}

function trendStats(trends) {
  const stats = [
    ['Avg pain', `${trends.averagePain}/10`],
    ['Highest', `${trends.highestPain}/10`],
    ['High days', trends.highPainDays],
    ['Missed days', trends.missedActivityDays],
  ];
  return `
    <div class="stat-grid">${stats.map(([label, value]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('')}</div>
    <p class="muted-line">${trends.totalEntries} logs. Common symptoms: ${trends.mostCommonSymptoms.join(', ') || 'not enough data yet'}.</p>
  `;
}

function weeklyChart() {
  const entries = recentEntries(7);
  const byDate = Object.fromEntries(entries.map((entry) => [entry.date, Number(entry.painLevel)]));
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date;
  });
  const values = days.map((day) => byDate[day.toISOString().slice(0, 10)] || 0);
  const labels = days.map((day) => new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(day));
  const points = values.map((value, index) => `${38 + index * 56},${132 - value * 11}`);
  const chartLine = values.some(Boolean)
    ? `<path d="M ${points.join(' L ')}"></path>${points.map((point) => {
        const [cx, cy] = point.split(',');
        return `<circle cx="${cx}" cy="${cy}" r="4"></circle>`;
      }).join('')}`
    : '';

  return `
    <div class="chart-wrap" aria-label="Weekly pain chart">
      <div class="axis-label top">10</div><div class="axis-label mid">5</div><div class="axis-label bottom">0</div>
      <svg class="chart" viewBox="0 0 400 160" role="img">
        <line x1="34" y1="22" x2="374" y2="22"></line>
        <line x1="34" y1="78" x2="374" y2="78"></line>
        <line x1="34" y1="133" x2="374" y2="133"></line>
        ${chartLine}
      </svg>
      <div class="chart-days">${labels.map((label) => `<span>${label}</span>`).join('')}</div>
    </div>
  `;
}

function calendarGrid() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const entriesByDay = Object.fromEntries(getPainEntries()
    .filter((entry) => entry.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`))
    .map((entry) => [Number(entry.date.slice(-2)), entry]));

  return `
    <div class="weekday-grid">${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => `<span>${d}</span>`).join('')}</div>
    <div class="calendar-grid">
      ${Array.from({ length: first.getDay() }, (_, i) => `<span class="calendar-empty" key="${i}"></span>`).join('')}
      ${Array.from({ length: totalDays }, (_, i) => {
        const day = i + 1;
        const entry = entriesByDay[day];
        return `<button class="day-cell ${severityClass(entry?.painLevel)}" type="button" title="${entry ? `${entry.painLevel}/10 ${entry.painLocation}` : ''}">${day}</button>`;
      }).join('')}
    </div>
    <div class="legend">${legend('low', 'Low')}${legend('moderate', 'Moderate')}${legend('high', 'High')}${legend('severe', 'Severe')}</div>
  `;
}

function generatePreviewReport(trends) {
  return `Generate a factual summary from ${trends.totalEntries} recent logs: pain levels, symptoms, pain location, missed activities, and recent patterns.`;
}

function sessionList() {
  const sessions = getReliefSessions().slice(-4).reverse();
  if (!sessions.length) return '<p class="muted-line">No wearable sessions saved yet.</p>';
  return `<div class="log-list">${sessions.map((session) => `
    <div>
      <strong>${session.date}</strong>
      <span>${session.sessionDuration} min, ${session.heatLevel} heat, ${session.tensLevel} pattern, ${session.startingPainLevel}/10 to ${session.endingPainLevel}/10</span>
    </div>
  `).join('')}</div>`;
}

function insight(iconName, tone, text) {
  return `<div class="insight"><span class="mini-icon ${tone}">${icon(iconName)}</span><p>${text}</p></div>`;
}

function settingRow(iconName, label, control) {
  return `<div class="setting-row"><div class="setting-label"><span>${icon(iconName)}</span>${label}</div>${control}</div>`;
}

function switchButton(key) {
  return `<button class="switch ${state[key] ? 'on' : ''}" type="button" aria-pressed="${state[key]}" data-switch="${key}"><span></span></button>`;
}

function legend(color, label) {
  return `<span><i class="${color}"></i>${label}</span>`;
}

function severityClass(value) {
  if (!value) return '';
  if (value <= 3) return 'low';
  if (value <= 6) return 'moderate';
  if (value <= 8) return 'high';
  return 'severe';
}

function renderNav() {
  const nav = document.querySelector('#bottom-nav');
  nav.innerHTML = tabs
    .map(([id, label, svg]) => `
      <button class="${state.activeTab === id ? 'active' : ''}" type="button" data-tab="${id}">
        <span class="svg-icon">${svg}</span>
        <span>${label}</span>
      </button>
    `)
    .join('');
}

function bindActions() {
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeTab = button.dataset.tab;
      render();
    });
  });

  document.querySelectorAll('[data-pain]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedPain = Number(button.dataset.pain);
      render();
    });
  });

  document.querySelectorAll('[data-switch]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.switch;
      state[key] = !state[key];
      if (key === 'hasWearable') {
        writeStorage(STORAGE_KEYS.hasWearable, String(state.hasWearable));
      }
      render();
    });
  });

  document.querySelectorAll('[data-setting-select]').forEach((select) => {
    select.addEventListener('change', () => {
      const key = select.dataset.settingSelect;
      state[key] = select.value;
      if (key === 'stimulationPattern') {
        writeStorage(STORAGE_KEYS.stimulationPattern, state.stimulationPattern);
      }
      render();
    });
  });

  const openSettings = document.querySelector('[data-open-settings]');
  if (openSettings) {
    openSettings.addEventListener('click', () => {
      state.activeTab = 'settings';
      render();
    });
  }

  const painForm = document.querySelector('#pain-form');
  if (painForm) {
    painForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(painForm);
      savePainEntry({
        date: formData.get('date'),
        painLevel: state.selectedPain,
        painLocation: formData.get('painLocation'),
        symptoms: formData.getAll('symptoms'),
        cycleDay: formData.get('cycleDay'),
        mood: formData.get('mood'),
        energyLevel: formData.get('energyLevel'),
        medicationTaken: formData.get('medicationTaken'),
        missedActivity: formData.get('missedActivity') === 'on',
        notes: formData.get('notes'),
      });
      render();
    });
  }

  const sessionForm = document.querySelector('#session-form');
  if (sessionForm) {
    sessionForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(sessionForm);
      saveReliefSession(Object.fromEntries(formData.entries()));
      render();
    });
  }

  const reportButton = document.querySelector('[data-generate-report]');
  if (reportButton) {
    reportButton.addEventListener('click', () => {
      generateAdvocacyReport(30);
      render();
    });
  }

  const resetButton = document.querySelector('[data-reset-demo]');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      Object.values(STORAGE_KEYS).forEach((key) => removeStorage(key));
      state.latestReport = '';
      seedDemoData();
      render();
    });
  }
}

seedDemoData();
render();
