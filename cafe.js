/**
 * كافيه البنات المشترك | Pookie Cozy Cafe Rush
 * Game Engine, Upgrades Shop, Clean SVG Avatars & Expanded Levels
 */

// ==========================================
// 1. نظام المؤثرات الصوتية (Web Audio API)
// ==========================================
class CuteAudio {
  constructor() {
    this.ctx = null;
    this.musicPlaying = false;
    this.musicInterval = null;
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch(e) {}
  }

  playPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch(e) {}
  }

  playPour() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(560, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch(e) {}
  }

  playDing() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [1046.5, 2093].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(idx === 0 ? 0.4 : 0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.8);
      });
    } catch(e) {}
  }

  playCash() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [587.33, 880, 1174.66].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.25, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.2);
      });
    } catch(e) {}
  }

  playFanfare() {
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const now = this.ctx.currentTime + i * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch(e) {}
  }

  playAlert() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch(e) {}
  }

  toggleMusic() {
    this.init();
    this.musicPlaying = !this.musicPlaying;
    if (this.musicPlaying) {
      this.startLofiLoop();
    } else {
      this.stopLofiLoop();
    }
    return this.musicPlaying;
  }

  startLofiLoop() {
    if (!this.ctx) return;
    const chords = [
      [261.63, 329.63, 392.00, 493.88],
      [220.00, 261.63, 329.63, 392.00],
      [174.61, 220.00, 261.63, 329.63],
      [196.00, 246.94, 293.66, 349.23]
    ];
    let chordIdx = 0;
    const playChord = () => {
      if (!this.musicPlaying || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const current = chords[chordIdx % chords.length];
        chordIdx++;
        current.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.02, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 2.8);
        });
      } catch(e) {}
    };
    playChord();
    this.musicInterval = setInterval(playChord, 3000);
  }

  stopLofiLoop() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

const audio = new CuteAudio();

// ==========================================
// 2. أيقونات رسومية ثابتة للحيوانات (SVG Icons)
// ==========================================
const ANIMAL_AVATARS = {
  cat: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><circle cx="32" cy="36" r="22" fill="#ffeaa7"/><path d="M14 20 L24 8 L28 26 Z" fill="#fdcb6e"/><path d="M50 20 L40 8 L36 26 Z" fill="#fdcb6e"/><circle cx="24" cy="34" r="3" fill="#2d3436"/><circle cx="40" cy="34" r="3" fill="#2d3436"/><ellipse cx="32" cy="40" rx="4" ry="2.5" fill="#ff7597"/><ellipse cx="18" cy="38" rx="3.5" ry="2" fill="#ff7597" opacity="0.5"/><ellipse cx="46" cy="38" rx="3.5" ry="2" fill="#ff7597" opacity="0.5"/></svg>`,
  bunny: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><ellipse cx="22" cy="16" rx="6" ry="16" fill="#ffd6e0"/><ellipse cx="42" cy="16" rx="6" ry="16" fill="#ffd6e0"/><circle cx="32" cy="38" r="20" fill="#fff"/><circle cx="24" cy="36" r="3" fill="#2d3436"/><circle cx="40" cy="36" r="3" fill="#2d3436"/><polygon points="32,41 29,44 35,44" fill="#ff7597"/><ellipse cx="18" cy="40" rx="3" ry="2" fill="#ff7597" opacity="0.6"/><ellipse cx="46" cy="40" rx="3" ry="2" fill="#ff7597" opacity="0.6"/></svg>`,
  bear: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><circle cx="16" cy="18" r="8" fill="#e1b12c"/><circle cx="48" cy="18" r="8" fill="#e1b12c"/><circle cx="32" cy="36" r="22" fill="#fbc531"/><ellipse cx="32" cy="40" rx="9" ry="7" fill="#fff"/><circle cx="24" cy="32" r="3" fill="#2d3436"/><circle cx="40" cy="32" r="3" fill="#2d3436"/><ellipse cx="32" cy="38" rx="3" ry="2" fill="#2d3436"/></svg>`,
  shiba: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><path d="M12 18 L24 10 L26 28 Z" fill="#e67e22"/><path d="M52 18 L40 10 L38 28 Z" fill="#e67e22"/><circle cx="32" cy="36" r="21" fill="#f39c12"/><path d="M20 44 C20 30, 44 30, 44 44 C44 54, 20 54, 20 44 Z" fill="#fff"/><circle cx="24" cy="32" r="3" fill="#2d3436"/><circle cx="40" cy="32" r="3" fill="#2d3436"/><ellipse cx="32" cy="37" rx="3" ry="2" fill="#2d3436"/></svg>`,
  fox: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><path d="M10 14 L24 10 L28 30 Z" fill="#e74c3c"/><path d="M54 14 L40 10 L36 30 Z" fill="#e74c3c"/><circle cx="32" cy="36" r="21" fill="#e67e22"/><polygon points="32,56 18,36 46,36" fill="#fff"/><circle cx="23" cy="32" r="3" fill="#2d3436"/><circle cx="41" cy="32" r="3" fill="#2d3436"/><circle cx="32" cy="48" r="3" fill="#2d3436"/></svg>`
};

const CUSTOMERS = [
  { name: 'قورو', avatar: ANIMAL_AVATARS.cat },
  { name: 'هابر', avatar: ANIMAL_AVATARS.bunny },
  { name: 'قريزلي', avatar: ANIMAL_AVATARS.bear },
  { name: 'بوبي', avatar: ANIMAL_AVATARS.shiba },
  { name: 'فوكسي', avatar: ANIMAL_AVATARS.fox }
];

const SHOP_MACHINES = {
  espresso_machine: { id: 'espresso_machine', name: 'آلة الإسبريسو الاحترافية', price: 100, icon: '☕', desc: 'تفتح تحضير القهوة، الإسبريسو واللاتيه' },
  boba_brewer: { id: 'boba_brewer', name: 'صانعة شاي البوبا', price: 150, icon: '🧋', desc: 'تفتح المشروبات المتقدمة وشاي الخوخ' },
  pastry_oven: { id: 'pastry_oven', name: 'فرن الحلويات المتقدم', price: 200, icon: '🍪', desc: 'يفتح الكوكيز والوافل الملكي' },
  ice_cream_maker: { id: 'ice_cream_maker', name: 'آلة الآيس كريم', price: 250, icon: '🍦', desc: 'تفتح آيس كريم الماتشا والحلويات المثلجة' }
};

const RECIPES = [
  { id: 'matcha_boba', name: 'ماتشا مثلجة بالبوبا', type: 'drink', icon: '🧋', minLevel: 1, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'ماتشا 🍵', 'حليب 🥛', 'بوبا ⚫'], required: ['cup', 'ice', 'matcha', 'milk', 'boba'] },
  { id: 'strawberry_milk', name: 'حليب الفراولة بالكريمة', type: 'drink', icon: '🍓', minLevel: 1, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'فراولة 🍓', 'حليب 🥛', 'كريمة 🍦'], required: ['cup', 'ice', 'strawberry', 'milk', 'cream'] },
  { id: 'pink_donut', name: 'دونات وردية بالسبرنكلز', type: 'bakery', icon: '🍩', minLevel: 1, requiredMachine: null, tags: ['دونات 🍩', 'خبز بالفرن 🔥', 'تغطية وردية 🌸', 'سبرنكلز ✨'], required: ['donut_base', 'baked', 'pink_glaze', 'sprinkles'] },
  
  { id: 'spanish_latte', name: 'سبانش كولد لاتيه', type: 'drink', icon: '☕', minLevel: 2, requiredMachine: 'espresso_machine', tags: ['كوب 🥛', 'ثلج 🧊', 'قهوة ☕', 'حليب 🥛', 'كراميل 🍯'], required: ['cup', 'ice', 'coffee', 'milk', 'caramel'] },
  { id: 'strawberry_cake', name: 'كيكة الفراولة السحابية', type: 'bakery', icon: '🍰', minLevel: 2, requiredMachine: null, tags: ['كيك 🍰', 'خبز بالفرن 🔥', 'كريمة 🍦', 'فراولة 🍓'], required: ['cake_base', 'baked', 'cream', 'strawberry'] },
  
  { id: 'peach_tea', name: 'شاي خوخ منعش بالبوبا', type: 'drink', icon: '🍑', minLevel: 3, requiredMachine: 'boba_brewer', tags: ['كوب 🥛', 'ثلج 🧊', 'شاي 🫖', 'خوخ 🍑', 'بوبا ⚫'], required: ['cup', 'ice', 'tea', 'peach', 'boba'] },
  { id: 'honey_pancake', name: 'بان كيك العسل والزبدة', type: 'bakery', icon: '🥞', minLevel: 3, requiredMachine: null, tags: ['بان كيك 🥞', 'خبز بالفرن 🔥', 'زبدة 🧈', 'عسل 🍯'], required: ['pancake_base', 'baked', 'butter', 'honey'] },

  { id: 'cortado', name: 'كورتادو دافئ', type: 'drink', icon: '☕', minLevel: 4, requiredMachine: 'espresso_machine', tags: ['كوب 🥛', 'قهوة ☕', 'حليب 🥛'], required: ['cup', 'coffee', 'milk'] },
  { id: 'iced_choco', name: 'آيس شوكولاتة مارشميلو', type: 'drink', icon: '🍫', minLevel: 4, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'شوكولاتة 🍫', 'حليب 🥛', 'مارشميلو ☁️'], required: ['cup', 'ice', 'choco', 'milk', 'marshmallow'] },
  { id: 'choc_cookie', name: 'كوكيز الشوكولاتة والجوز', type: 'bakery', icon: '🍪', minLevel: 4, requiredMachine: 'pastry_oven', tags: ['عجينة كوكيز 🍪', 'خبز بالفرن 🔥', 'قطع شوكولاتة 🍫'], required: ['cookie_base', 'baked', 'choco_chips'] },

  { id: 'waffle_delight', name: 'وافل الكراميل والآيس كريم', type: 'bakery', icon: '🧇', minLevel: 5, requiredMachine: 'pastry_oven', tags: ['وافل 🧇', 'خبز بالفرن 🔥', 'آيس كريم 🍦', 'كراميل 🍯'], required: ['waffle_base', 'baked', 'icecream_scoop', 'caramel'] },
  { id: 'matcha_icecream', name: 'آيس كريم الماتشا الملكي', type: 'bakery', icon: '🍨', minLevel: 5, requiredMachine: 'ice_cream_maker', tags: ['ماتشا 🍵', 'آيس كريم 🍦', 'سبرنكلز ✨'], required: ['matcha', 'icecream_scoop', 'sprinkles'] },
  { id: 'lemon_mojito', name: 'موهيتو الليمون والنعناع', type: 'drink', icon: '🍹', minLevel: 5, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'ليمون 🍋', 'نعناع 🌿', 'صودا 🫧'], required: ['cup', 'ice', 'lemon', 'mint', 'soda'] }
];

const INGREDIENT_NAMES = {
  cup: { name: 'كوب فارغ', icon: '🥛', minLevel: 1 },
  ice: { name: 'ثلج', icon: '🧊', minLevel: 1 },
  matcha: { name: 'ماتشا', icon: '🍵', minLevel: 1 },
  strawberry: { name: 'فراولة', icon: '🍓', minLevel: 1 },
  milk: { name: 'حليب نقي', icon: '🥛', minLevel: 1 },
  boba: { name: 'بوبا تابيوكا', icon: '⚫', minLevel: 1 },
  cream: { name: 'كريمة خفق', icon: '🍦', minLevel: 1 },
  donut_base: { name: 'عجينة دونات', icon: '🍩', minLevel: 1 },
  pink_glaze: { name: 'تغطية وردية', icon: '🌸', minLevel: 1 },
  sprinkles: { name: 'سبرنكلز ملون', icon: '✨', minLevel: 1 },

  coffee: { name: 'قهوة', icon: '☕', minLevel: 2, machine: 'espresso_machine' },
  caramel: { name: 'صوص كراميل', icon: '🍯', minLevel: 2 },
  cake_base: { name: 'طبقات كيك', icon: '🍰', minLevel: 2 },

  tea: { name: 'شاي مثلج', icon: '🫖', minLevel: 3, machine: 'boba_brewer' },
  peach: { name: 'خوخ', icon: '🍑', minLevel: 3 },
  pancake_base: { name: 'خليط بانكيك', icon: '🥞', minLevel: 3 },
  butter: { name: 'مكعب زبدة', icon: '🧈', minLevel: 3 },
  honey: { name: 'عسل صافي', icon: '🍯', minLevel: 3 },
  
  choco: { name: 'شوكولاتة', icon: '🍫', minLevel: 4 },
  marshmallow: { name: 'مارشميلو', icon: '☁️', minLevel: 4 },
  cookie_base: { name: 'عجينة كوكيز', icon: '🍪', minLevel: 4, machine: 'pastry_oven' },
  choco_chips: { name: 'قطع شوكولاتة', icon: '🍫', minLevel: 4 },

  waffle_base: { name: 'عجينة وافل', icon: '🧇', minLevel: 5, machine: 'pastry_oven' },
  icecream_scoop: { name: 'كرة آيس كريم', icon: '🍦', minLevel: 5, machine: 'ice_cream_maker' },
  lemon: { name: 'ليمون', icon: '🍋', minLevel: 5 },
  mint: { name: 'نعناع', icon: '🌿', minLevel: 5 },
  soda: { name: 'صودا فوارة', icon: '🫧', minLevel: 5 },

  baked: { name: 'مخبوز بالفرن', icon: '🔥', minLevel: 1 }
};

// ==========================================
// 3. حالة اللعبة المحلية والشبكية
// ==========================================
const state = {
  mode: 'solo',
  roomCode: '',
  isHost: false,

  player: {
    name: 'باريستا بوكي',
    avatar: ANIMAL_AVATARS.cat
  },
  players: [],

  level: 1,
  levelTargetScore: 200,
  shiftActive: false,
  shiftInterval: null,
  orderInterval: null,

  score: 0,
  coins: 0,
  servedCount: 0,
  missedCount: 0,

  ownedMachines: [],

  orders: [],
  sharedItems: [],

  currentDrink: { ingredients: [] },
  currentBakery: { ingredients: [] },

  selectedStation: 'drinks',

  leaderboard: JSON.parse(localStorage.getItem('pookie_leaderboard') || '[]')
};

// ==========================================
// 4. عناصر واجهة المستخدم (DOM Elements)
// ==========================================
let screens, statsBar, playerNameInput, avatarChoices, roomWaitingBox, displayRoomCode, copyRoomLinkBtn, playersChipsContainer, startShiftBtn, ordersRack, sharedItemsContainer, currentItemVisual, stationHint, ingredientsGrid, toastShout, toggleMusicBtn;

function initDOMReferences() {
  screens = {
    lobby: document.getElementById('lobbyScreen'),
    game: document.getElementById('gameScreen'),
    results: document.getElementById('resultsScreen')
  };
  statsBar = document.getElementById('gameStatsBar');
  playerNameInput = document.getElementById('playerNameInput');
  avatarChoices = document.querySelectorAll('.avatar-choice');
  roomWaitingBox = document.getElementById('roomWaitingBox');
  displayRoomCode = document.getElementById('displayRoomCode');
  copyRoomLinkBtn = document.getElementById('copyRoomLinkBtn');
  playersChipsContainer = document.getElementById('playersChipsContainer');
  startShiftBtn = document.getElementById('startShiftBtn');
  ordersRack = document.getElementById('ordersRack');
  sharedItemsContainer = document.getElementById('sharedItemsContainer');
  currentItemVisual = document.getElementById('currentItemVisual');
  stationHint = document.getElementById('stationHint');
  ingredientsGrid = document.getElementById('ingredientsGrid');
  toastShout = document.getElementById('toastShout');
  toggleMusicBtn = document.getElementById('toggleMusicBtn');
}

// ==========================================
// 5. التهيئة والأحداث (Init & Setup)
// ==========================================
function initApp() {
  initDOMReferences();
  setupAvatarChoiceElements();

  if (playerNameInput) {
    playerNameInput.addEventListener('input', (e) => {
      state.player.name = e.target.value.trim() || 'باريستا بوكي';
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  if (roomParam) {
    const inputField = document.getElementById('joinRoomCodeInput');
    if (inputField) inputField.value = roomParam.toUpperCase();
    showToast(`تم تعبئة كود الغرفة تلقائياً: ${roomParam} 💖`);
  }

  if (toggleMusicBtn) {
    toggleMusicBtn.addEventListener('click', () => {
      const isPlaying = audio.toggleMusic();
      toggleMusicBtn.textContent = isPlaying ? '🎵' : '🔇';
      showToast(isPlaying ? 'تم تشغيل الموسيقى 🎶' : 'تم كتم الموسيقى 🔇');
    });
  }

  const createBtn = document.getElementById('createRoomBtn');
  const joinBtn = document.getElementById('joinRoomBtn');
  const soloBtn = document.getElementById('soloPlayBtn');

  if (createBtn) createBtn.addEventListener('click', handleCreateRoom);
  if (joinBtn) joinBtn.addEventListener('click', handleJoinRoom);
  if (soloBtn) soloBtn.addEventListener('click', handleSoloPlay);
  if (startShiftBtn) startShiftBtn.addEventListener('click', startShift);

  setupLeaderboardUI();
  setupStopShiftButton();

  const playAgain = document.getElementById('playAgainBtn');
  if (playAgain) {
    playAgain.addEventListener('click', () => {
      showScreen('lobby');
      if (statsBar) statsBar.style.display = 'none';
      renderLeaderboard();
    });
  }

  if (copyRoomLinkBtn) copyRoomLinkBtn.addEventListener('click', copyDirectLink);

  document.querySelectorAll('.station-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      audio.playPop();
      document.querySelectorAll('.station-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedStation = btn.dataset.station;
      renderStationView();
    });
  });

  document.querySelectorAll('.shout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.dataset.shout;
      sendShout(msg);
    });
  });

  renderLeaderboard();
}

function setupAvatarChoiceElements() {
  const container = document.querySelector('.avatar-choices');
  if (!container) return;
  container.innerHTML = '';

  const list = [
    { key: 'cat', svg: ANIMAL_AVATARS.cat },
    { key: 'bunny', svg: ANIMAL_AVATARS.bunny },
    { key: 'bear', svg: ANIMAL_AVATARS.bear },
    { key: 'shiba', svg: ANIMAL_AVATARS.shiba },
    { key: 'fox', svg: ANIMAL_AVATARS.fox }
  ];

  list.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = `avatar-choice ${index === 0 ? 'selected' : ''}`;
    div.style.cssText = 'cursor:pointer; display:flex; align-items:center; justify-content:center; padding:6px; border-radius:12px; border:2px solid transparent; transition:all 0.2s;';
    div.innerHTML = item.svg;

    div.addEventListener('click', () => {
      audio.playPop();
      document.querySelectorAll('.avatar-choice').forEach(c => {
        c.classList.remove('selected');
        c.style.borderColor = 'transparent';
        c.style.background = 'transparent';
      });
      div.classList.add('selected');
      div.style.borderColor = 'var(--pink-main)';
      div.style.background = 'var(--pink-subtle)';
      state.player.avatar = item.svg;
    });

    container.appendChild(div);
  });
}

function showScreen(name) {
  Object.keys(screens).forEach(key => {
    if (screens[key]) screens[key].classList.toggle('active', key === name);
  });
}

function showToast(text, avatarSvg = '✨') {
  if (!toastShout) return;
  toastShout.innerHTML = `<span>${avatarSvg}</span> <span>${text}</span>`;
  toastShout.classList.add('show');
  setTimeout(() => {
    toastShout.classList.remove('show');
  }, 2400);
}

// ==========================================
// 6. شبكة الاتصال
// ==========================================
class CuteNetwork {
  constructor() {
    this.clientId = 'client_' + Math.random().toString(36).substring(2, 9);
    this.roomCode = '';
    this.channel = null;
    this.mqttClient = null;
    this.seenMsgIds = new Set();
    this.isMqttConnected = false;
    this.onMessageCallback = null;
  }

  connect(roomCode, onMessage) {
    this.roomCode = roomCode.toUpperCase();
    this.onMessageCallback = onMessage;

    if (typeof BroadcastChannel !== 'undefined') {
      if (this.channel) {
        try { this.channel.close(); } catch(e){}
      }
      this.channel = new BroadcastChannel('pookie_cafe_' + this.roomCode);
      this.channel.onmessage = (e) => {
        this.receivePacket(e.data);
      };
    }

    if (window.mqtt) {
      if (this.mqttClient) {
        try { this.mqttClient.end(true); } catch(e){}
      }
      try {
        const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
        this.mqttClient = mqtt.connect(brokerUrl, {
          clientId: this.clientId + '_' + Math.floor(Math.random() * 1000),
          clean: true,
          connectTimeout: 8000,
          keepalive: 60
        });

        this.mqttClient.on('connect', () => {
          this.isMqttConnected = true;
          this.mqttClient.subscribe(`pookie/cafe/${this.roomCode}/#`);
        });

        this.mqttClient.on('message', (topic, payload) => {
          try {
            const data = JSON.parse(payload.toString());
            this.receivePacket(data);
          } catch(e) {}
        });
      } catch (e) {}
    }
  }

  receivePacket(packet) {
    if (!packet || typeof packet !== 'object') return;
    if (packet.senderClientId === this.clientId) return;

    if (packet.msgId) {
      if (this.seenMsgIds.has(packet.msgId)) return;
      this.seenMsgIds.add(packet.msgId);
      if (this.seenMsgIds.size > 200) {
        const first = this.seenMsgIds.values().next().value;
        this.seenMsgIds.delete(first);
      }
    }

    if (this.onMessageCallback) {
      this.onMessageCallback(packet);
    }
  }

  send(data) {
    const packet = {
      ...data,
      msgId: this.clientId + '_' + Date.now() + '_' + Math.floor(Math.random()*10000),
      senderClientId: this.clientId
    };
    this.seenMsgIds.add(packet.msgId);

    if (this.channel) {
      try { this.channel.postMessage(packet); } catch(e) {}
    }

    if (this.mqttClient && this.isMqttConnected) {
      try {
        this.mqttClient.publish(`pookie/cafe/${this.roomCode}/events`, JSON.stringify(packet));
      } catch(e) {}
    }
  }
}

const net = new CuteNetwork();

function generateRoomCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
}

function handleCreateRoom() {
  audio.playPop();
  const room = generateRoomCode();
  state.roomCode = room;
  state.isHost = true;
  state.mode = 'host';
  state.players = [{ id: net.clientId, name: state.player.name, avatar: state.player.avatar, isHost: true }];

  net.connect(room, handleIncomingData);

  if (displayRoomCode) displayRoomCode.textContent = room;
  if (roomWaitingBox) roomWaitingBox.style.display = 'block';
  if (startShiftBtn) startShiftBtn.style.display = 'inline-flex';

  const joinWrap = document.getElementById('joinRoomInputWrap');
  if (joinWrap) joinWrap.style.display = 'none';
  const createBtn = document.getElementById('createRoomBtn');
  if (createBtn) createBtn.style.display = 'none';

  renderPlayersChips();
  showToast('تم فتح الغرفة بنجاح! شاركي الكود مع صديقاتك 🎀');
}

function handleJoinRoom() {
  audio.playPop();
  const codeInput = document.getElementById('joinRoomCodeInput');
  const code = codeInput ? codeInput.value.trim().toUpperCase() : '';
  if (!code) {
    showToast('الرجاء إدخال كود الغرفة أولاً 🌸');
    return;
  }

  state.roomCode = code;
  state.isHost = false;
  state.mode = 'client';
  state.players = [{ id: net.clientId, name: state.player.name, avatar: state.player.avatar, isHost: false }];

  net.connect(code, handleIncomingData);

  if (displayRoomCode) displayRoomCode.textContent = code;
  if (roomWaitingBox) roomWaitingBox.style.display = 'block';
  if (startShiftBtn) startShiftBtn.style.display = 'none';

  const joinWrap = document.getElementById('joinRoomInputWrap');
  if (joinWrap) joinWrap.style.display = 'none';
  const createBtn = document.getElementById('createRoomBtn');
  if (createBtn) createBtn.style.display = 'none';

  renderPlayersChips();
  showToast('جاري الاتصال بالكافيه... ☕✨');

  const sendJoin = () => {
    net.send({
      type: 'JOIN_REQUEST',
      player: {
        id: net.clientId,
        name: state.player.name,
        avatar: state.player.avatar,
        isHost: false
      }
    });
  };

  setTimeout(sendJoin, 200);
  setTimeout(sendJoin, 1000);
}

function handleSoloPlay() {
  audio.playPop();
  state.mode = 'solo';
  state.isHost = true;
  state.players = [{ id: 'solo', name: state.player.name, avatar: state.player.avatar, isHost: true }];
  startShift();
}

function broadcastState() {
  if (!state.isHost) return;
  net.send({
    type: 'SYNC_STATE',
    players: state.players,
    orders: state.orders,
    sharedItems: state.sharedItems,
    score: state.score,
    coins: state.coins,
    level: state.level,
    ownedMachines: state.ownedMachines,
    shiftActive: state.shiftActive
  });
}

function handleIncomingData(data) {
  if (data.type === 'JOIN_REQUEST') {
    if (state.isHost) {
      const exists = state.players.some(p => p.id === data.player.id);
      if (!exists) {
        state.players.push(data.player);
        audio.playDing();
        showToast(`انضمت ${data.player.name} إلى الكافيه! 💖`, data.player.avatar);
        renderPlayersChips();
      }
      broadcastState();
    }
  } else if (data.type === 'SYNC_STATE') {
    state.players = data.players || state.players;
    state.orders = data.orders || [];
    state.sharedItems = data.sharedItems || [];
    state.score = data.score || 0;
    state.coins = data.coins || 0;
    state.ownedMachines = data.ownedMachines || [];
    
    if (data.level && data.level !== state.level) {
      state.level = data.level;
      showToast(`🎉 انتقل الجميع إلى اللفل ${state.level}!`, '🌟');
      audio.playFanfare();
    }

    if (data.shiftActive && !state.shiftActive) {
      launchGameView();
    } else if (!data.shiftActive && state.shiftActive) {
      endShiftLocally();
    }

    renderOrders();
    renderSharedItems();
    updateStatsDisplay();
    renderPlayersChips();
    renderStationView();
  } else if (data.type === 'SHOUT') {
    audio.playAlert();
    showToast(data.message, data.avatar || '💬');
  } else if (data.type === 'ADD_SHARED_ITEM') {
    if (!state.sharedItems.some(i => i.id === data.item.id)) {
      state.sharedItems.push(data.item);
      audio.playDing();
      showToast(`وضعت ${data.senderName} ${data.item.name} على طاولة التجهيز!`, '✨');
      renderSharedItems();
      if (state.isHost) broadcastState();
    }
  } else if (data.type === 'SERVE_ORDER') {
    handleServeOrder(data.orderId, data.itemId, data.senderName);
  } else if (data.type === 'DISCARD_SHARED_ITEM') {
    const idx = state.sharedItems.findIndex(i => i.id === data.itemId);
    if (idx !== -1) {
      state.sharedItems.splice(idx, 1);
      renderSharedItems();
      if (state.isHost) broadcastState();
    }
  } else if (data.type === 'BUY_MACHINE') {
    if (!state.ownedMachines.includes(data.machineId)) {
      state.ownedMachines.push(data.machineId);
      audio.playCash();
      showToast(`اشترت الكافيه آلة جديدة: ${SHOP_MACHINES[data.machineId].name}! 🎉`, '🛍️');
      renderStationView();
    }
  } else if (data.type === 'END_SHIFT') {
    endShiftLocally();
  }
}

function sendShout(msg) {
  audio.playPop();
  const text = `${state.player.name}: ${msg}`;
  showToast(text, state.player.avatar);
  net.send({
    type: 'SHOUT',
    message: text,
    avatar: state.player.avatar
  });
}

function copyDirectLink() {
  audio.playPop();
  const directUrl = `${window.location.origin}${window.location.pathname}?room=${state.roomCode}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(directUrl).then(() => {
      showToast('تم نسخ الرابط المباشر! 📋✨');
    }).catch(() => {
      prompt('انسخي هذا الرابط وصلي لصديقاتك:', directUrl);
    });
  } else {
    prompt('انسخي هذا الرابط وصلي لصديقاتك:', directUrl);
  }
}

function renderPlayersChips() {
  if (!playersChipsContainer) return;
  playersChipsContainer.innerHTML = '';
  state.players.forEach(p => {
    const chip = document.createElement('div');
    chip.className = `player-chip ${p.isHost ? 'is-host' : ''}`;
    chip.style.cssText = 'display:flex; align-items:center; gap:6px;';
    chip.innerHTML = `<span style="width:28px; height:28px; display:inline-block;">${p.avatar}</span> <span>${p.name}</span> ${p.isHost ? '👑' : ''}`;
    playersChipsContainer.appendChild(chip);
  });
}

// ==========================================
// 7. اللعبة، المتجر ولوحة المتصدرين
// ==========================================
function setupStopShiftButton() {
  const headerControls = document.querySelector('.header-controls');
  if (headerControls && !document.getElementById('stopShiftBtn')) {
    const stopBtn = document.createElement('button');
    stopBtn.id = 'stopShiftBtn';
    stopBtn.className = 'icon-btn';
    stopBtn.style.cssText = 'background:#ff4757; color:#fff; border-color:#ff4757; width:auto; padding:0 12px; border-radius:20px; font-size:12px; font-weight:800; display:none; gap:4px;';
    stopBtn.innerHTML = '⏹️ إنهاء الشيفت';
    stopBtn.addEventListener('click', stopShift);
    headerControls.prepend(stopBtn);
  }
}

function setupLeaderboardUI() {
  const lobbyCard = document.querySelector('.lobby-card');
  if (lobbyCard && !document.getElementById('leaderboardSection')) {
    const lbBox = document.createElement('div');
    lbBox.id = 'leaderboardSection';
    lbBox.style.cssText = 'margin-top:24px; background:#fff; border:1.5px solid var(--pink-subtle); border-radius:var(--radius-md); padding:16px; text-align:right;';
    lbBox.innerHTML = `
      <div style="font-size:15px; font-weight:900; color:var(--pink-main); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
        <span>🏆</span> <span>لوحة المتصدرين (أفضل الباريستات)</span>
      </div>
      <div id="leaderboardList" style="display:flex; flex-direction:column; gap:6px;"></div>
    `;
    lobbyCard.appendChild(lbBox);
  }
}

function renderLeaderboard() {
  const lbList = document.getElementById('leaderboardList');
  if (!lbList) return;

  lbList.innerHTML = '';
  if (state.leaderboard.length === 0) {
    lbList.innerHTML = '<div style="font-size:12px; color:var(--text-muted); text-align:center; padding:8px;">لا توجد نتائج مسجلة بعد.. ابدأي أول شيفت لتتصَدّري! 🌸</div>';
    return;
  }

  const sorted = [...state.leaderboard].sort((a, b) => b.score - a.score).slice(0, 5);

  sorted.forEach((entry, idx) => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex; justify-content:space-between; align-items:center; background:var(--bg-primary); padding:8px 12px; border-radius:10px; font-size:12px; font-weight:800;';
    row.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span>#${idx+1}</span>
        <span>${entry.name}</span>
      </div>
      <span>${entry.score} نقطة</span>
    `;
    lbList.appendChild(row);
  });
}

function startShift() {
  audio.playFanfare();
  state.shiftActive = true;
  state.score = 0;
  state.servedCount = 0;
  state.missedCount = 0;
  state.orders = [];
  state.sharedItems = [];

  showScreen('game');
  if (statsBar) statsBar.style.display = 'flex';
  const stopBtn = document.getElementById('stopShiftBtn');
  if (stopBtn) stopBtn.style.display = 'inline-flex';

  generateInitialOrders();
  renderOrders();
  renderSharedItems();
  renderStationView();
  updateStatsDisplay();

  if (state.isHost) {
    if (state.orderInterval) clearInterval(state.orderInterval);
    state.orderInterval = setInterval(() => {
      if (!state.shiftActive) return;
      if (state.orders.length < 5) {
        spawnRandomOrder();
        broadcastState();
      }
    }, 9000);
  }

  showToast('بدأ الشيفت! جهزن ألذ المشروبات والحلويات 🎀');
}

function launchGameView() {
  state.shiftActive = true;
  showScreen('game');
  if (statsBar) statsBar.style.display = 'flex';
  const stopBtn = document.getElementById('stopShiftBtn');
  if (stopBtn) stopBtn.style.display = 'inline-flex';
  renderOrders();
  renderSharedItems();
  renderStationView();
  updateStatsDisplay();
}

function stopShift() {
  audio.playPop();
  state.shiftActive = false;
  if (state.orderInterval) {
    clearInterval(state.orderInterval);
    state.orderInterval = null;
  }
  if (state.shiftInterval) {
    clearInterval(state.shiftInterval);
    state.shiftInterval = null;
  }

  if (state.isHost) {
    net.send({ type: 'END_SHIFT' });
  }
  endShiftLocally();
}

function endShiftLocally() {
  state.shiftActive = false;
  if (statsBar) statsBar.style.display = 'none';
  const stopBtn = document.getElementById('stopShiftBtn');
  if (stopBtn) stopBtn.style.display = 'none';

  if (state.score > 0) {
    state.leaderboard.push({ name: state.player.name, score: state.score, date: new Date().toLocaleDateString() });
    localStorage.setItem('pookie_leaderboard', JSON.stringify(state.leaderboard));
  }

  const finalScoreVal = document.getElementById('finalScoreVal');
  const finalServedVal = document.getElementById('finalServedVal');
  if (finalScoreVal) finalScoreVal.textContent = state.score;
  if (finalServedVal) finalServedVal.textContent = state.servedCount;

  showScreen('results');
  audio.playFanfare();
  renderLeaderboard();
  showToast('انتهى الشيفت بنجاح! رائع يا بنات 🌟');
}

function generateInitialOrders() {
  if (!state.isHost) return;
  state.orders = [];
  for (let i = 0; i < 2; i++) {
    spawnRandomOrder();
  }
}

function spawnRandomOrder() {
  const availableRecipes = RECIPES.filter(r => r.minLevel <= state.level);
  if (availableRecipes.length === 0) return;
  const recipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
  const customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];

  const newOrder = {
    id: 'ord_' + Math.random().toString(36).substring(2, 8),
    recipeId: recipe.id,
    name: recipe.name,
    icon: recipe.icon,
    required: recipe.required,
    customerName: customer.name,
    customerAvatar: customer.avatar,
    timeLeft: 45,
    maxTime: 45
  };

  state.orders.push(newOrder);
  renderOrders();
}

function renderOrders() {
  if (!ordersRack) return;
  ordersRack.innerHTML = '';

  if (state.orders.length === 0) {
    ordersRack.innerHTML = '<div style="font-size:12px; color:var(--text-muted); text-align:center; width:100%; padding:10px;">لا توجد طلبات معلقة.. استعدي للطلبات القادمة! ☕</div>';
    return;
  }

  state.orders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.style.cssText = 'background:#fff; border:2px solid var(--pink-subtle); border-radius:12px; padding:10px; min-width:180px; display:flex; flex-direction:column; gap:6px; box-shadow:0 3px 8px rgba(0,0,0,0.04); position:relative;';
    
    card.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:6px;">
          <span style="width:24px; height:24px; display:inline-block;">${order.customerAvatar}</span>
          <span style="font-size:11px; font-weight:800; color:var(--text-muted);">${order.customerName}</span>
        </div>
        <span style="font-size:18px;">${order.icon}</span>
      </div>
      <div style="font-size:13px; font-weight:900; color:var(--text-main);">${order.name}</div>
      <div style="font-size:11px; color:var(--pink-main); font-weight:700;">المطلوب: ${order.required.join(', ')}</div>
    `;

    ordersRack.appendChild(card);
  });
}

function renderSharedItems() {
  if (!sharedItemsContainer) return;
  sharedItemsContainer.innerHTML = '';

  if (state.sharedItems.length === 0) {
    sharedItemsContainer.innerHTML = '<div style="font-size:11px; color:var(--text-muted); text-align:center; width:100%;">لا توجد عناصر جاهزة على الطاولة حالياً.. ابدأي التحضير! ✨</div>';
    return;
  }

  state.sharedItems.forEach(item => {
    const chip = document.createElement('div');
    chip.style.cssText = 'background:#fff; border:1.5px solid var(--pink-main); border-radius:10px; padding:6px 12px; display:flex; align-items:center; gap:8px; font-size:12px; font-weight:800; box-shadow:0 2px 6px rgba(0,0,0,0.03); cursor:pointer;';
    chip.innerHTML = `<span>${item.icon}</span> <span>${item.name}</span> <span style="font-size:10px; color:var(--pink-main);">قدميها 🛎️</span>`;
    
    chip.addEventListener('click', () => {
      attemptServeItem(item);
    });

    sharedItemsContainer.appendChild(chip);
  });
}

function attemptServeItem(item) {
  const matchingOrder = state.orders.find(o => arraysEqual(o.required, item.ingredients));
  if (matchingOrder) {
    audio.playCash();
    showToast(`تم تقديم ${matchingOrder.name} بنجاح! كفو يا باريستا 💖`, '🎉');
    
    state.score += 50;
    state.coins += 20;
    state.servedCount++;

    state.orders = state.orders.filter(o => o.id !== matchingOrder.id);
    state.sharedItems = state.sharedItems.filter(i => i.id !== item.id);

    if (state.score >= state.level * state.levelTargetScore && state.level < 5) {
      state.level++;
      audio.playFanfare();
      showToast(`🎉 مبروك! ترقى الكافيه إلى المستوى ${state.level}!`, '🌟');
    }

    updateStatsDisplay();
    renderOrders();
    renderSharedItems();
    broadcastState();
  } else {
    audio.playAlert();
    showToast('هذا الطلب غير مطابق لأي زبون حالي.. جربي التحضير بدقة 🌸');
  }
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, idx) => val === sortedB[idx]);
}

function renderStationView() {
  if (!ingredientsGrid) return;
  ingredientsGrid.innerHTML = '';

  if (state.selectedStation === 'drinks') {
    if (stationHint) stationHint.textContent = 'اختاري المكونات لتحضير المشروبات المنعشة والقهوة ☕🧋';
    renderIngredientsList(['cup', 'ice', 'matcha', 'strawberry', 'milk', 'boba', 'cream', 'coffee', 'caramel', 'tea', 'peach', 'choco', 'marshmallow', 'lemon', 'mint', 'soda']);
  } else if (state.selectedStation === 'bakery') {
    if (stationHint) stationHint.textContent = 'اختاري المكونات والحلويات لخبزها وتقديمها ألذ المخبوزات 🍩🍰';
    renderIngredientsList(['donut_base', 'baked', 'pink_glaze', 'sprinkles', 'cake_base', 'pancake_base', 'butter', 'honey', 'cookie_base', 'choco_chips', 'waffle_base', 'icecream_scoop']);
  } else if (state.selectedStation === 'shop') {
    if (stationHint) stationHint.textContent = 'اشتري آلات ومعدات جديدة لتطوير كافيه البنات وتوسيع المنيو 🛍️';
    renderShopView();
  }

  renderCurrentItemVisual();
}

function renderIngredientsList(keys) {
  keys.forEach(key => {
    const ing = INGREDIENT_NAMES[key];
    if (!ing) return;

    const isLocked = ing.minLevel > state.level || (ing.machine && !state.ownedMachines.includes(ing.machine));

    const btn = document.createElement('button');
    btn.className = 'ingredient-btn';
    btn.style.cssText = `background:#fff; border:2px solid ${isLocked ? '#ddd' : 'var(--pink-subtle)'}; border-radius:12px; padding:10px; display:flex; flex-direction:column; align-items:center; gap:4px; cursor:${isLocked ? 'not-allowed' : 'pointer'}; opacity:${isLocked ? 0.6 : 1}; transition:all 0.2s;`;
    
    btn.innerHTML = `
      <span style="font-size:24px;">${ing.icon}</span>
      <span style="font-size:11px; font-weight:800; color:var(--text-main);">${ing.name}</span>
      ${isLocked ? '<span style="font-size:9px; color:#ff4757;">🔒 مقفل</span>' : ''}
    `;

    if (!isLocked) {
      btn.addEventListener('click', () => {
        audio.playPop();
        addIngredientToCurrent(key);
      });
    }

    ingredientsGrid.appendChild(btn);
  });
}

function renderShopView() {
  Object.keys(SHOP_MACHINES).forEach(machineId => {
    const machine = SHOP_MACHINES[machineId];
    const isOwned = state.ownedMachines.includes(machineId);

    const card = document.createElement('div');
    card.className = 'shop-card-machine';
    card.style.cssText = 'background:#fff; border:2px solid var(--pink-subtle); border-radius:14px; padding:12px; display:flex; align-items:center; justify-content:space-between; gap:10px; box-shadow:0 4px 10px rgba(0,0,0,0.03);';
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:28px;">${machine.icon}</span>
        <div>
          <div style="font-size:13px; font-weight:900; color:var(--text-main);">${machine.name}</div>
          <div style="font-size:11px; color:var(--text-muted);">${machine.desc}</div>
        </div>
      </div>
      <div>
        ${isOwned ? '<span style="font-size:11px; font-weight:800; color:#2ed573; background:#e8f8f5; padding:4px 8px; border-radius:8px;">مملوكة ✅</span>' : `<button class="btn-primary" style="padding:6px 12px; font-size:11px;" onclick="buyMachine('${machineId}')">شراء (${machine.price} 🪙)</button>`}
      </div>
    `;
    ingredientsGrid.appendChild(card);
  });
}

window.buyMachine = function(machineId) {
  const machine = SHOP_MACHINES[machineId];
  if (state.coins >= machine.price) {
    state.coins -= machine.price;
    state.ownedMachines.push(machineId);
    audio.playCash();
    showToast(`اشتريتِ ${machine.name} بنجاح! 🎉`, '🛍️');
    updateStatsDisplay();
    renderStationView();
    broadcastState();
    net.send({ type: 'BUY_MACHINE', machineId });
  } else {
    audio.playAlert();
    showToast('الكوتشينة (العملات) لا تكفي لشراء هذه الآلة.. اكسب المزيد من الأرباح! 🪙');
  }
};

function addIngredientToCurrent(key) {
  if (state.selectedStation === 'drinks') {
    state.currentDrink.ingredients.push(key);
    audio.playPour();
    checkAndFinalizeItem('drink');
  } else if (state.selectedStation === 'bakery') {
    state.currentBakery.ingredients.push(key);
    audio.playPour();
    checkAndFinalizeItem('bakery');
  }
  renderCurrentItemVisual();
}

function checkAndFinalizeItem(type) {
  const current = type === 'drink' ? state.currentDrink : state.currentBakery;
  
  const matchedRecipe = RECIPES.find(r => arraysEqual(r.required, current.ingredients));
  if (matchedRecipe) {
    audio.playDing();
    showToast(`أتممتِ تحضير ${matchedRecipe.name}! ✨`, matchedRecipe.icon);

    const newItem = {
      id: 'item_' + Math.random().toString(36).substring(2, 8),
      recipeId: matchedRecipe.id,
      name: matchedRecipe.name,
      icon: matchedRecipe.icon,
      ingredients: [...matchedRecipe.required]
    };

    state.sharedItems.push(newItem);
    net.send({ type: 'ADD_SHARED_ITEM', item: newItem, senderName: state.player.name });

    if (type === 'drink') state.currentDrink = { ingredients: [] };
    if (type === 'bakery') state.currentBakery = { ingredients: [] };

    renderSharedItems();
    renderCurrentItemVisual();
  }
}

function renderCurrentItemVisual() {
  if (!currentItemVisual) return;
  const current = state.selectedStation === 'drinks' ? state.currentDrink : state.currentBakery;
  
  if (current.ingredients.length === 0) {
    currentItemVisual.innerHTML = '<span style="font-size:12px; color:var(--text-muted);">اضغطي على المكونات بالأعلى لبدء التحضير 🥤✨</span>';
    return;
  }

  currentItemVisual.innerHTML = current.ingredients.map(k => `<span>${INGREDIENT_NAMES[k] ? INGREDIENT_NAMES[k].icon : '✨'}</span>`).join(' + ');
}

function updateStatsDisplay() {
  const scoreVal = document.getElementById('statScoreVal');
  const coinsVal = document.getElementById('statCoinsVal');
  const levelVal = document.getElementById('statLevelVal');

  if (scoreVal) scoreVal.textContent = state.score;
  if (coinsVal) coinsVal.textContent = state.coins;
  if (levelVal) levelVal.textContent = state.level;
}

window.addEventListener('DOMContentLoaded', () => {
  initApp();
});
