/**
 * كافيه البنات المشترك | Pookie Cozy Cafe Rush
 * Game Engine, Upgrades Shop, Animated SVG Avatars & Expanded Levels
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
// 2. أيقونات الحركات والحيوانات المتحركة (SVG)
// ==========================================
const ANIMAL_AVATARS = {
  cat: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><g class="bounce-anim"><circle cx="32" cy="36" r="22" fill="#ffeaa7"/><path d="M14 20 L24 8 L28 26 Z" fill="#fdcb6e"/><path d="M50 20 L40 8 L36 26 Z" fill="#fdcb6e"/><circle cx="24" cy="34" r="3" fill="#2d3436"/><circle cx="40" cy="34" r="3" fill="#2d3436"/><ellipse cx="32" cy="40" rx="4" ry="2.5" fill="#ff7597"/><ellipse cx="18" cy="38" rx="3.5" ry="2" fill="#ff7597" opacity="0.5"/><ellipse cx="46" cy="38" rx="3.5" ry="2" fill="#ff7597" opacity="0.5"/></g></svg>`,
  bunny: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><g class="bounce-anim"><ellipse cx="22" cy="16" rx="6" ry="16" fill="#ffd6e0"/><ellipse cx="42" cy="16" rx="6" ry="16" fill="#ffd6e0"/><circle cx="32" cy="38" r="20" fill="#fff"/><circle cx="24" cy="36" r="3" fill="#2d3436"/><circle cx="40" cy="36" r="3" fill="#2d3436"/><polygon points="32,41 29,44 35,44" fill="#ff7597"/><ellipse cx="18" cy="40" rx="3" ry="2" fill="#ff7597" opacity="0.6"/><ellipse cx="46" cy="40" rx="3" ry="2" fill="#ff7597" opacity="0.6"/></g></svg>`,
  bear: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><g class="bounce-anim"><circle cx="16" cy="18" r="8" fill="#e1b12c"/><circle cx="48" cy="18" r="8" fill="#e1b12c"/><circle cx="32" cy="36" r="22" fill="#fbc531"/><ellipse cx="32" cy="40" rx="9" ry="7" fill="#fff"/><circle cx="24" cy="32" r="3" fill="#2d3436"/><circle cx="40" cy="32" r="3" fill="#2d3436"/><ellipse cx="32" cy="38" rx="3" ry="2" fill="#2d3436"/></g></svg>`,
  shiba: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><g class="bounce-anim"><path d="M12 18 L24 10 L26 28 Z" fill="#e67e22"/><path d="M52 18 L40 10 L38 28 Z" fill="#e67e22"/><circle cx="32" cy="36" r="21" fill="#f39c12"/><path d="M20 44 C20 30, 44 30, 44 44 C44 54, 20 54, 20 44 Z" fill="#fff"/><circle cx="24" cy="32" r="3" fill="#2d3436"/><circle cx="40" cy="32" r="3" fill="#2d3436"/><ellipse cx="32" cy="37" rx="3" ry="2" fill="#2d3436"/></g></svg>`,
  fox: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><g class="bounce-anim"><path d="M10 14 L24 10 L28 30 Z" fill="#e74c3c"/><path d="M54 14 L40 10 L36 30 Z" fill="#e74c3c"/><circle cx="32" cy="36" r="21" fill="#e67e22"/><polygon points="32,56 18,36 46,36" fill="#fff"/><circle cx="23" cy="32" r="3" fill="#2d3436"/><circle cx="41" cy="32" r="3" fill="#2d3436"/><circle cx="32" cy="48" r="3" fill="#2d3436"/></g></svg>`
};

const CUSTOMERS = [
  { name: 'قورو', avatar: ANIMAL_AVATARS.cat },
  { name: 'هابر', avatar: ANIMAL_AVATARS.bunny },
  { name: 'قريزلي', avatar: ANIMAL_AVATARS.bear },
  { name: 'بوبي', avatar: ANIMAL_AVATARS.shiba },
  { name: 'فوكسي', avatar: ANIMAL_AVATARS.fox }
];

// الأجهزة المتاحة للشراء بالمتجر
const SHOP_MACHINES = {
  espresso_machine: { id: 'espresso_machine', name: 'آلة الإسبريسو الاحترافية', price: 100, icon: '☕', desc: 'تفتح تحضير القهوة، الإسبريسو واللاتيه' },
  boba_brewer: { id: 'boba_brewer', name: 'صانعة شاي البوبا', price: 150, icon: '🧋', desc: 'تفتح المشروبات المتقدمة وشاي الخوخ' },
  pastry_oven: { id: 'pastry_oven', name: 'فرن الحلويات المتقدم', price: 200, icon: '🍪', desc: 'يفتح الكوكيز والوافل الملكي' },
  ice_cream_maker: { id: 'ice_cream_maker', name: 'آلة الآيس كريم', price: 250, icon: '🍦', desc: 'تفتح آيس كريم الماتشا والحلويات المثلجة' }
};

const RECIPES = [
  // اللفل 1
  { id: 'matcha_boba', name: 'ماتشا مثلجة بالبوبا', type: 'drink', icon: '🧋', minLevel: 1, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'ماتشا 🍵', 'حليب 🥛', 'بوبا ⚫'], required: ['cup', 'ice', 'matcha', 'milk', 'boba'] },
  { id: 'strawberry_milk', name: 'حليب الفراولة بالكريمة', type: 'drink', icon: '🍓', minLevel: 1, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'فراولة 🍓', 'حليب 🥛', 'كريمة 🍦'], required: ['cup', 'ice', 'strawberry', 'milk', 'cream'] },
  { id: 'pink_donut', name: 'دونات وردية بالسبرنكلز', type: 'bakery', icon: '🍩', minLevel: 1, requiredMachine: null, tags: ['دونات 🍩', 'خبز بالفرن 🔥', 'تغطية وردية 🌸', 'سبرنكلز ✨'], required: ['donut_base', 'baked', 'pink_glaze', 'sprinkles'] },
  
  // اللفل 2
  { id: 'spanish_latte', name: 'سبانش كولد لاتيه', type: 'drink', icon: '☕', minLevel: 2, requiredMachine: 'espresso_machine', tags: ['كوب 🥛', 'ثلج 🧊', 'قهوة ☕', 'حليب 🥛', 'كراميل 🍯'], required: ['cup', 'ice', 'coffee', 'milk', 'caramel'] },
  { id: 'strawberry_cake', name: 'كيكة الفراولة السحابية', type: 'bakery', icon: '🍰', minLevel: 2, requiredMachine: null, tags: ['كيك 🍰', 'خبز بالفرن 🔥', 'كريمة 🍦', 'فراولة 🍓'], required: ['cake_base', 'baked', 'cream', 'strawberry'] },
  
  // اللفل 3
  { id: 'peach_tea', name: 'شاي خوخ منعش بالبوبا', type: 'drink', icon: '🍑', minLevel: 3, requiredMachine: 'boba_brewer', tags: ['كوب 🥛', 'ثلج 🧊', 'شاي 🫖', 'خوخ 🍑', 'بوبا ⚫'], required: ['cup', 'ice', 'tea', 'peach', 'boba'] },
  { id: 'honey_pancake', name: 'بان كيك العسل والزبدة', type: 'bakery', icon: '🥞', minLevel: 3, requiredMachine: null, tags: ['بان كيك 🥞', 'خبز بالفرن 🔥', 'زبدة 🧈', 'عسل 🍯'], required: ['pancake_base', 'baked', 'butter', 'honey'] },

  // اللفل 4 (جديد)
  { id: 'cortado', name: 'كورتادو دافئ', type: 'drink', icon: '☕', minLevel: 4, requiredMachine: 'espresso_machine', tags: ['كوب 🥛', 'قهوة ☕', 'حليب 🥛'], required: ['cup', 'coffee', 'milk'] },
  { id: 'iced_choco', name: 'آيس شوكولاتة مارشميلو', type: 'drink', icon: '🍫', minLevel: 4, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'شوكولاتة 🍫', 'حليب 🥛', 'مارشميلو ☁️'], required: ['cup', 'ice', 'choco', 'milk', 'marshmallow'] },
  { id: 'choc_cookie', name: 'كوكيز الشوكولاتة والجوز', type: 'bakery', icon: '🍪', minLevel: 4, requiredMachine: 'pastry_oven', tags: ['عجينة كوكيز 🍪', 'خبز بالفرن 🔥', 'قطع شوكولاتة 🍫'], required: ['cookie_base', 'baked', 'choco_chips'] },

  // اللفل 5 (جديد)
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

  ownedMachines: [], // الآلات والأجهزة المشتراة

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
  injectAnimationStyles();
  initDOMReferences();

  // تخصيص خيارات الصور المتحركة باللوبي
  setupAvatarChoiceElements();

  playerNameInput.addEventListener('input', (e) => {
    state.player.name = e.target.value.trim() || 'باريستا بوكي';
  });

  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  if (roomParam) {
    const inputField = document.getElementById('joinRoomCodeInput');
    if (inputField) inputField.value = roomParam.toUpperCase();
    showToast(`تم تعبئة كود الغرفة تلقائياً: ${roomParam} 💖`);
  }

  toggleMusicBtn.addEventListener('click', () => {
    const isPlaying = audio.toggleMusic();
    toggleMusicBtn.textContent = isPlaying ? '🎵' : '🔇';
    showToast(isPlaying ? 'تم تشغيل الموسيقى 🎶' : 'تم كتم الموسيقى 🔇');
  });

  document.getElementById('createRoomBtn').addEventListener('click', handleCreateRoom);
  document.getElementById('joinRoomBtn').addEventListener('click', handleJoinRoom);
  document.getElementById('soloPlayBtn').addEventListener('click', handleSoloPlay);
  startShiftBtn.addEventListener('click', startShift);

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

function injectAnimationStyles() {
  if (document.getElementById('pookieAnimStyles')) return;
  const style = document.createElement('style');
  style.id = 'pookieAnimStyles';
  style.innerHTML = `
    @keyframes avatarBounce {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-4px) scale(1.03); }
    }
    .bounce-anim {
      animation: avatarBounce 2.4s ease-in-out infinite;
      transform-origin: center bottom;
    }
    .animated-avatar-svg {
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
    }
    .shop-card-machine {
      background: #fff;
      border: 2px solid var(--pink-subtle);
      border-radius: 14px;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    }
  `;
  document.head.appendChild(style);
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
    div.innerHTML = item.svg;
    div.addEventListener('click', () => {
      audio.playPop();
      document.querySelectorAll('.avatar-choice').forEach(c => c.classList.remove('selected'));
      div.classList.add('selected');
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

  displayRoomCode.textContent = room;
  roomWaitingBox.style.display = 'block';
  startShiftBtn.style.display = 'inline-flex';

  const joinWrap = document.getElementById('joinRoomInputWrap');
  if (joinWrap) joinWrap.style.display = 'none';
  document.getElementById('createRoomBtn').style.display = 'none';

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

  displayRoomCode.textContent = code;
  roomWaitingBox.style.display = 'block';
  startShiftBtn.style.display = 'none';

  const joinWrap = document.getElementById('joinRoomInputWrap');
  if (joinWrap) joinWrap.style.display = 'none';
  document.getElementById('createRoomBtn').style.display = 'none';

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
// 7. اللعبة ومتجر الأجهزة وقائمة المتصدرين
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
    row.style.cssText = 'display:flex; align-items:center; justify-content:space-between; background:var(--bg-primary); padding:8px 12px; border-radius:12px; font-size:13px; font-weight:800;';
    
    let medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx+1}`;

    row.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span>${medal}</span>
        <span style="width:24px; height:24px; display:inline-block;">${entry.avatar}</span>
        <span>${entry.name}</span>
      </div>
      <div style="color:var(--pink-main); font-weight:900;">
        ${entry.score} نقطة <span style="font-size:10px; color:var(--text-muted);">(لفل ${entry.level})</span>
      </div>
    `;
    lbList.appendChild(row);
  });
}

function saveToLeaderboard() {
  if (state.score <= 0) return;

  state.players.forEach(p => {
    state.leaderboard.push({
      name: p.name,
      avatar: p.avatar,
      score: state.score,
      level: state.level,
      date: new Date().toLocaleDateString('ar-SA')
    });
  });

  state.leaderboard.sort((a, b) => b.score - a.score);
  state.leaderboard = state.leaderboard.slice(0, 20);
  localStorage.setItem('pookie_leaderboard', JSON.stringify(state.leaderboard));
}

function startShift() {
  audio.playDing();
  state.shiftActive = true;
  state.level = 1;
  state.levelTargetScore = 200;
  state.score = 0;
  state.coins = 50; // رصيد بداية ترحيبي للشراء
  state.servedCount = 0;
  state.missedCount = 0;
  state.ownedMachines = [];
  state.orders = [];
  state.sharedItems = [];
  state.currentDrink = { ingredients: [] };
  state.currentBakery = { ingredients: [] };

  launchGameView();

  const stopBtn = document.getElementById('stopShiftBtn');
  if (stopBtn) stopBtn.style.display = 'inline-flex';

  if (state.isHost) {
    spawnCustomerOrder();
    setTimeout(spawnCustomerOrder, 2500);

    if (state.orderInterval) clearInterval(state.orderInterval);
    if (state.shiftInterval) clearInterval(state.shiftInterval);

    const spawnSpeed = Math.max(4500, 11000 - (state.level * 1300));
    state.orderInterval = setInterval(() => {
      if (state.orders.length < 5) {
        spawnCustomerOrder();
      }
    }, spawnSpeed);

    state.shiftInterval = setInterval(() => {
      updateCustomerPatience();
      checkLevelUpProgress();
      updateStatsDisplay();
      broadcastState();
    }, 1000);
  }
}

function stopShift() {
  if (!confirm('هل أنتِ متأكدة من إنهاء الشيفت الآن وعرض النتائج؟ 🛑')) return;
  
  state.shiftActive = false;
  if (state.orderInterval) clearInterval(state.orderInterval);
  if (state.shiftInterval) clearInterval(state.shiftInterval);

  saveToLeaderboard();

  net.send({ type: 'END_SHIFT' });
  endShiftLocally();
}

function endShiftLocally() {
  state.shiftActive = false;
  if (state.orderInterval) clearInterval(state.orderInterval);
  if (state.shiftInterval) clearInterval(state.shiftInterval);

  const stopBtn = document.getElementById('stopShiftBtn');
  if (stopBtn) stopBtn.style.display = 'none';

  audio.playFanfare();
  showScreen('results');

  document.getElementById('resScore').textContent = state.score;
  document.getElementById('resCoins').textContent = state.coins;
  document.getElementById('resServed').textContent = state.servedCount;
  document.getElementById('resMissed').textContent = state.missedCount;

  renderLeaderboard();
}

function checkLevelUpProgress() {
  if (state.score >= state.levelTargetScore) {
    state.level++;
    state.levelTargetScore += 250 + (state.level * 100);
    audio.playFanfare();
    showToast(`👑 مبرووك! ارتفع المستوى إلى اللفل ${state.level}! انفتحت وصفات وأجهزة جديدة بالمتجر!`, '🎉');
    renderStationView();
    broadcastState();
  }
}

function launchGameView() {
  showScreen('game');
  if (statsBar) statsBar.style.display = 'flex';
  renderStationView();
  renderOrders();
  renderSharedItems();
  updateStatsDisplay();
}

function spawnCustomerOrder() {
  // تصفية الوصفات المتاحة حسب اللفل والآلات المشتراة
  const availableRecipes = RECIPES.filter(r => {
    if (r.minLevel > state.level) return false;
    if (r.requiredMachine && !state.ownedMachines.includes(r.requiredMachine)) return false;
    return true;
  });

  if (availableRecipes.length === 0) return;

  const recipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
  const cust = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
  
  const basePatience = Math.max(40, 85 - (state.level * 7));

  const newOrder = {
    id: 'ord_' + Date.now() + '_' + Math.floor(Math.random()*100),
    customerName: cust.name,
    customerAvatar: cust.avatar,
    recipeId: recipe.id,
    recipeName: recipe.name,
    recipeIcon: recipe.icon,
    recipeTags: recipe.tags,
    required: recipe.required,
    maxPatience: basePatience,
    patience: basePatience
  };
  state.orders.push(newOrder);
  audio.playDing();
  showToast(`وصل زبون جديد: ${cust.name}!`, cust.avatar);
  renderOrders();
  broadcastState();
}

function updateCustomerPatience() {
  for (let i = state.orders.length - 1; i >= 0; i--) {
    state.orders[i].patience--;
    if (state.orders[i].patience <= 0) {
      const missed = state.orders.splice(i, 1)[0];
      state.missedCount++;
      state.score = Math.max(0, state.score - 20);
      showToast(`${missed.customerName} زعل وغادر! 💔`, '😭');
      audio.playAlert();
    }
  }
  renderOrders();
}

function updateStatsDisplay() {
  const scElem = document.getElementById('statScore');
  const cnElem = document.getElementById('statCoins');
  if (scElem) scElem.textContent = `${state.score} / ${state.levelTargetScore}`;
  if (cnElem) cnElem.textContent = `${state.coins} 🪙`;
  
  const timerElem = document.getElementById('statTimer');
  if (timerElem) {
    timerElem.innerHTML = `اللفل <strong style="color:var(--pink-main); font-size:16px;">${state.level}</strong> ⭐`;
  }
}

// ==========================================
// 8. عرض تذاكر الزبائن وطاولة التجهيز
// ==========================================
function renderOrders() {
  if (!ordersRack) return;
  ordersRack.innerHTML = '';
  if (state.orders.length === 0) {
    ordersRack.innerHTML = '<div style="font-size:13px; color:var(--text-muted); padding:10px;">لا يوجد زبائن حالياً.. استراحة باريستا 🌸</div>';
    return;
  }

  state.orders.forEach(order => {
    const card = document.createElement('div');
    const isUrgent = order.patience < 20;
    card.className = `order-card ${isUrgent ? 'urgent' : ''}`;

    const pct = Math.max(0, (order.patience / order.maxPatience) * 100);
    let barColor = '#2ed573';
    if (pct < 35) barColor = '#ff4757';
    else if (pct < 65) barColor = '#ffa502';

    let tagsHtml = order.recipeTags.map(t => `<span class="recipe-tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="order-customer" style="display:flex; align-items:center; gap:8px;">
        <span class="order-avatar" style="width:36px; height:36px; display:inline-block;">${order.customerAvatar}</span>
        <span class="order-name">${order.customerName}</span>
      </div>
      <div class="patience-bar-bg">
        <div class="patience-bar-fill" style="width: ${pct}%; background-color: ${barColor};"></div>
      </div>
      <div class="order-recipe">
        <div class="recipe-title">${order.recipeIcon} ${order.recipeName}</div>
        <div class="recipe-tags">${tagsHtml}</div>
      </div>
    `;

    ordersRack.appendChild(card);
  });
}

function renderSharedItems() {
  if (!sharedItemsContainer) return;
  sharedItemsContainer.innerHTML = '';
  if (state.sharedItems.length === 0) {
    sharedItemsContainer.innerHTML = '<span class="shared-empty-hint">طاولة التجهيز فارغة. جهزي صنفاً وضعيها هنا! 🍰</span>';
    return;
  }

  state.sharedItems.forEach((item) => {
    const card = document.createElement('div');
    card.style.cssText = 'display:flex; flex-direction:column; align-items:center; background:var(--gold-light); border:1.5px solid #ffde8a; border-radius:12px; padding:6px 8px; gap:4px; margin-left:6px; min-width:110px;';
    
    card.innerHTML = `
      <div style="font-size:12px; font-weight:800; color:#7a4f00; display:flex; align-items:center; gap:4px; white-space:nowrap;">
        <span>${item.icon}</span> <span>${item.name}</span>
      </div>
      <div style="font-size:9.5px; color:#a87400; font-weight:700;">(${item.makerName})</div>
      <div style="display:flex; gap:4px; width:100%; margin-top:2px;">
        <button class="quick-serve-btn" style="background:var(--pink-main); color:#fff; border:none; border-radius:10px; padding:4px 6px; font-size:11px; font-weight:800; cursor:pointer; flex:1; box-shadow:0 2px 6px rgba(255,117,151,0.3); transition:all 0.2s;">
          🛎️ تقديم
        </button>
        <button class="trash-item-btn" title="رمي في السلة" style="background:#ff4757; color:#fff; border:none; border-radius:10px; padding:4px 8px; font-size:11px; font-weight:800; cursor:pointer; box-shadow:0 2px 6px rgba(255,71,87,0.3); transition:all 0.2s;">
          🗑️
        </button>
      </div>
    `;
    
    const serveBtn = card.querySelector('.quick-serve-btn');
    serveBtn.addEventListener('click', () => {
      directServeSharedItem(item);
    });

    const trashBtn = card.querySelector('.trash-item-btn');
    trashBtn.addEventListener('click', () => {
      discardSharedItem(item.id);
    });

    sharedItemsContainer.appendChild(card);
  });
}

function discardSharedItem(itemId) {
  audio.playPop();
  const idx = state.sharedItems.findIndex(i => i.id === itemId);
  if (idx !== -1) {
    const removed = state.sharedItems.splice(idx, 1)[0];
    showToast(`تم رمي (${removed.name}) في السلة! 🗑️`);
    renderSharedItems();
    
    net.send({
      type: 'DISCARD_SHARED_ITEM',
      itemId: itemId
    });

    if (state.isHost) broadcastState();
  }
}

function directServeSharedItem(item) {
  const matchedOrder = state.orders.find(o => o.recipeId === item.recipeId);
  if (!matchedOrder) {
    showToast(`هذا الصنف (${item.name}) لا يطابق أي طلب مفتوح حالياً!`);
    return;
  }

  handleServeOrder(matchedOrder.id, item.id, state.player.name);
  net.send({
    type: 'SERVE_ORDER',
    orderId: matchedOrder.id,
    itemId: item.id,
    senderName: state.player.name
  });
}

function handleServeOrder(orderId, itemId, senderName) {
  const orderIdx = state.orders.findIndex(o => o.id === orderId);
  const itemIdx = state.sharedItems.findIndex(i => i.id === itemId);

  if (orderIdx !== -1 && itemIdx !== -1) {
    const order = state.orders.splice(orderIdx, 1)[0];
    state.sharedItems.splice(itemIdx, 1);

    state.score += 60 + Math.floor(order.patience);
    state.coins += 25;
    state.servedCount++;

    audio.playCash();
    showToast(`كفووو! سلّمت ${senderName} الطلب لـ ${order.customerName} بنجاح! 💖💰`, '🎉');

    renderOrders();
    renderSharedItems();
    checkLevelUpProgress();
    updateStatsDisplay();
    broadcastState();
  }
}

// ==========================================
// 9. محطات العمل ومتجر الآلات
// ==========================================
function renderStationView() {
  if (!ingredientsGrid) return;
  ingredientsGrid.innerHTML = '';

  if (state.selectedStation === 'drinks') {
    renderDrinksStation();
  } else if (state.selectedStation === 'bakery') {
    renderBakeryStation();
  } else if (state.selectedStation === 'serving') {
    renderServingStation();
  } else if (state.selectedStation === 'shop') {
    renderShopStation();
  }
}

function renderDrinksStation() {
  if (stationHint) stationHint.textContent = `مستواك الحالي: اللفل ${state.level} 🌟 (المكونات المقفولة تتطلب لفل أعلى أو شراء آلتها من متجر الأجهزة 🛍️)`;

  updateDrinkVisual();

  const drinkIngredients = [
    { key: 'cup', name: 'كوب فارغ', icon: '🥛', sound: 'pour' },
    { key: 'ice', name: 'ثلج', icon: '🧊', sound: 'pop' },
    { key: 'matcha', name: 'ماتشا خضراء', icon: '🍵', sound: 'pour' },
    { key: 'strawberry', name: 'فراولة', icon: '🍓', sound: 'pour' },
    { key: 'milk', name: 'حليب', icon: '🥛', sound: 'pour' },
    { key: 'boba', name: 'كرات البوبا', icon: '⚫', sound: 'pop' },
    { key: 'cream', name: 'كريمة خفق', icon: '🍦', sound: 'pour' },
    { key: 'coffee', name: 'إسبريسو', icon: '☕', sound: 'pour' },
    { key: 'caramel', name: 'كراميل', icon: '🍯', sound: 'pour' },
    { key: 'tea', name: 'شاي مثلج', icon: '🫖', sound: 'pour' },
    { key: 'peach', name: 'نكهة خوخ', icon: '🍑', sound: 'pour' },
    { key: 'choco', name: 'شوكولاتة', icon: '🍫', sound: 'pour' },
    { key: 'marshmallow', name: 'مارشميلو', icon: '☁️', sound: 'pop' },
    { key: 'lemon', name: 'ليمون', icon: '🍋', sound: 'pop' },
    { key: 'mint', name: 'نعناع', icon: '🌿', sound: 'pop' },
    { key: 'soda', name: 'صودا فوارة', icon: '🫧', sound: 'pour' }
  ];

  drinkIngredients.forEach(ing => {
    const meta = INGREDIENT_NAMES[ing.key] || {};
    const minLvl = meta.minLevel || 1;
    const reqMachine = meta.machine;

    const levelLocked = state.level < minLvl;
    const machineLocked = reqMachine && !state.ownedMachines.includes(reqMachine);
    const isLocked = levelLocked || machineLocked;

    let lockText = '';
    if (levelLocked) lockText = `🔒 لفل ${minLvl}`;
    else if (machineLocked) lockText = `🛒 شراء الآلة`;

    const card = document.createElement('div');
    card.className = `ingredient-card ${isLocked ? 'locked' : ''}`;
    card.innerHTML = `
      <span class="ing-icon">${ing.icon}</span>
      <span class="ing-name">${ing.name}</span>
      ${isLocked ? `<span class="lock-badge">${lockText}</span>` : ''}
    `;

    card.addEventListener('click', () => {
      if (levelLocked) {
        showToast(`هذا المكون ينفتح في اللفل ${minLvl}! ⭐`);
        audio.playAlert();
        return;
      }
      if (machineLocked) {
        showToast(`تحتاجين لشراء (${SHOP_MACHINES[reqMachine].name}) من قسم متجر الأجهزة! 🛍️`);
        audio.playAlert();
        return;
      }
      addDrinkIngredient(ing.key, ing.sound);
    });

    ingredientsGrid.appendChild(card);
  });
}

function addDrinkIngredient(key, soundType) {
  if (soundType === 'pour') audio.playPour();
  else audio.playPop();

  if (key === 'cup' && state.currentDrink.ingredients.includes('cup')) {
    showToast('الكوب موجود بالفعل!');
    return;
  }
  if (key !== 'cup' && !state.currentDrink.ingredients.includes('cup')) {
    showToast('ضعي الكوب الفارغ أولاً 🥛');
    return;
  }

  if (!state.currentDrink.ingredients.includes(key)) {
    state.currentDrink.ingredients.push(key);
    updateDrinkVisual();
  }
}

function updateDrinkVisual() {
  const current = state.currentDrink.ingredients;
  const visualContainer = currentItemVisual;
  if (!visualContainer) return;

  if (current.length === 0) {
    visualContainer.innerHTML = `
      <span class="item-cup-preview" style="opacity:0.4;">🥛</span>
      <span style="font-size:12.5px; color:var(--text-muted);">طاولة المشروبات فارغة. اضغطي على كوب للبدء!</span>
    `;
    return;
  }

  let previewIcon = '🥛';
  if (current.includes('boba')) previewIcon = '🧋';
  else if (current.includes('matcha')) previewIcon = '🍵';
  else if (current.includes('strawberry')) previewIcon = '🍓';
  else if (current.includes('coffee')) previewIcon = '☕';
  else if (current.includes('tea')) previewIcon = '🫖';
  else if (current.includes('lemon')) previewIcon = '🍹';

  const badges = current.map(k => {
    const info = INGREDIENT_NAMES[k] || { name: k, icon: '✨' };
    return `<span class="ingredient-badge">${info.icon} ${info.name}</span>`;
  }).join('');

  visualContainer.innerHTML = `
    <span class="item-cup-preview">${previewIcon}</span>
    <div class="item-ingredients-tags">${badges}</div>
    <div style="display:flex; gap:8px; margin-top:10px;">
      <button class="btn-primary" id="placeDrinkBtn" style="font-size:12px; padding:7px 14px;">✨ وضع على طاولة التجهيز</button>
      <button class="btn-solo" id="clearDrinkBtn" style="font-size:12px; padding:7px 14px; background:#ffeaa7; color:#d63031;">🗑️ تفريغ</button>
    </div>
  `;

  document.getElementById('placeDrinkBtn').addEventListener('click', finishDrink);
  document.getElementById('clearDrinkBtn').addEventListener('click', () => {
    audio.playPop();
    state.currentDrink.ingredients = [];
    updateDrinkVisual();
  });
}

function finishDrink() {
  const ing = state.currentDrink.ingredients;
  const matchedRecipe = RECIPES.find(r => r.type === 'drink' && r.required.every(req => ing.includes(req)));

  if (!matchedRecipe) {
    showToast('هذه الخلطة لا تطابق أي مشروب في القائمة! 🍵');
    audio.playAlert();
    return;
  }

  const newItem = {
    id: 'item_' + Date.now() + '_' + Math.floor(Math.random()*100),
    recipeId: matchedRecipe.id,
    name: matchedRecipe.name,
    icon: matchedRecipe.icon,
    makerName: state.player.name
  };

  state.sharedItems.push(newItem);
  audio.playDing();
  showToast(`تم تجهيز ${matchedRecipe.name}! ✨`);

  net.send({
    type: 'ADD_SHARED_ITEM',
    item: newItem,
    senderName: state.player.name
  });

  state.currentDrink.ingredients = [];
  updateDrinkVisual();
  renderSharedItems();
  if (state.isHost) broadcastState();
}

function renderBakeryStation() {
  if (stationHint) stationHint.textContent = 'جهزي العجينة والحلويات ثم اخبزي بالفرن 🔥 كوني مبدعة!';

  updateBakeryVisual();

  const bakeryIngredients = [
    { key: 'donut_base', name: 'عجينة دونات', icon: '🍩' },
    { key: 'pink_glaze', name: 'تغطية وردية', icon: '🌸' },
    { key: 'sprinkles', name: 'سبرنكلز', icon: '✨' },
    { key: 'cake_base', name: 'طبقات كيك', icon: '🍰' },
    { key: 'cream', name: 'كريمة خفق', icon: '🍦' },
    { key: 'strawberry', name: 'فراولة', icon: '🍓' },
    { key: 'pancake_base', name: 'خليط بانكيك', icon: '🥞' },
    { key: 'butter', name: 'مكعب زبدة', icon: '🧈' },
    { key: 'honey', name: 'عسل صافي', icon: '🍯' },
    { key: 'cookie_base', name: 'عجينة كوكيز', icon: '🍪' },
    { key: 'choco_chips', name: 'قطع شوكولاتة', icon: '🍫' },
    { key: 'waffle_base', name: 'عجينة وافل', icon: '🧇' },
    { key: 'icecream_scoop', name: 'كرة آيس كريم', icon: '🍦' }
  ];

  bakeryIngredients.forEach(ing => {
    const meta = INGREDIENT_NAMES[ing.key] || {};
    const minLvl = meta.minLevel || 1;
    const reqMachine = meta.machine;

    const levelLocked = state.level < minLvl;
    const machineLocked = reqMachine && !state.ownedMachines.includes(reqMachine);
    const isLocked = levelLocked || machineLocked;

    let lockText = '';
    if (levelLocked) lockText = `🔒 لفل ${minLvl}`;
    else if (machineLocked) lockText = `🛒 شراء الآلة`;

    const card = document.createElement('div');
    card.className = `ingredient-card ${isLocked ? 'locked' : ''}`;
    card.innerHTML = `
      <span class="ing-icon">${ing.icon}</span>
      <span class="ing-name">${ing.name}</span>
      ${isLocked ? `<span class="lock-badge">${lockText}</span>` : ''}
    `;

    card.addEventListener('click', () => {
      if (levelLocked) {
        showToast(`هذا الصنف يفتح باللفل ${minLvl}! ⭐`);
        audio.playAlert();
        return;
      }
      if (machineLocked) {
        showToast(`اشتري (${SHOP_MACHINES[reqMachine].name}) أولاً من قسم متجر الأجهزة! 🛍️`);
        audio.playAlert();
        return;
      }
      addBakeryIngredient(ing.key);
    });

    ingredientsGrid.appendChild(card);
  });
}

function addBakeryIngredient(key) {
  audio.playPop();
  const bases = ['donut_base', 'cake_base', 'pancake_base', 'cookie_base', 'waffle_base'];
  const ing = state.currentBakery.ingredients;

  if (bases.includes(key)) {
    if (ing.some(b => bases.includes(b))) {
      showToast('القاعدة موجودة بالفعل على صينية التحضير!');
      return;
    }
  } else {
    if (!ing.some(b => bases.includes(b)) && key !== 'matcha' && key !== 'icecream_scoop') {
      showToast('اختاري قاعدة الحلى أو الكيك أولاً! 🧁');
      return;
    }
  }

  if (!ing.includes(key)) {
    ing.push(key);
    updateBakeryVisual();
  }
}

function updateBakeryVisual() {
  const current = state.currentBakery.ingredients;
  const visualContainer = currentItemVisual;
  if (!visualContainer) return;

  if (current.length === 0) {
    visualContainer.innerHTML = `
      <span class="item-cup-preview" style="opacity:0.4;">🧁</span>
      <span style="font-size:12.5px; color:var(--text-muted);">طاولة الفرن فارغة. اختاري قاعدة حلى للبدء!</span>
    `;
    return;
  }

  let previewIcon = '🧁';
  if (current.includes('donut_base')) previewIcon = '🍩';
  else if (current.includes('cake_base')) previewIcon = '🍰';
  else if (current.includes('pancake_base')) previewIcon = '🥞';
  else if (current.includes('cookie_base')) previewIcon = '🍪';
  else if (current.includes('waffle_base')) previewIcon = '🧇';
  else if (current.includes('icecream_scoop')) previewIcon = '🍨';

  const badges = current.map(k => {
    const info = INGREDIENT_NAMES[k] || { name: k, icon: '✨' };
    return `<span class="ingredient-badge">${info.icon} ${info.name}</span>`;
  }).join('');

  const isBaked = current.includes('baked');

  visualContainer.innerHTML = `
    <span class="item-cup-preview">${previewIcon}</span>
    <div class="item-ingredients-tags">${badges}</div>
    <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; justify-content:center;">
      <button class="btn-primary" id="bakeOvenBtn" style="font-size:12px; padding:7px 14px; background:linear-gradient(135deg, #ff9f43, #ee5253); display:${isBaked ? 'none' : 'inline-flex'};">🔥 خبز بالفرن</button>
      <button class="btn-primary" id="placeBakeryBtn" style="font-size:12px; padding:7px 14px;">✨ وضع على طاولة التجهيز</button>
      <button class="btn-solo" id="clearBakeryBtn" style="font-size:12px; padding:7px 14px; background:#ffeaa7; color:#d63031;">🗑️ تفريغ</button>
    </div>
  `;

  const bakeBtn = document.getElementById('bakeOvenBtn');
  if (bakeBtn) {
    bakeBtn.addEventListener('click', () => {
      if (!current.includes('baked')) {
        current.push('baked');
        audio.playPour();
        showToast('تم الخبز بالفرن بنجاح! 🔥✨');
        updateBakeryVisual();
      }
    });
  }

  document.getElementById('placeBakeryBtn').addEventListener('click', finishBakery);
  document.getElementById('clearBakeryBtn').addEventListener('click', () => {
    audio.playPop();
    state.currentBakery.ingredients = [];
    updateBakeryVisual();
  });
}

function finishBakery() {
  const ing = state.currentBakery.ingredients;
  const matchedRecipe = RECIPES.find(r => r.type === 'bakery' && r.required.every(req => ing.includes(req)));

  if (!matchedRecipe) {
    showToast('هذه الوصفة غير مكتملة أو لم تُخبز بالفرن بعد! 🍰');
    audio.playAlert();
    return;
  }

  const newItem = {
    id: 'item_' + Date.now() + '_' + Math.floor(Math.random()*100),
    recipeId: matchedRecipe.id,
    name: matchedRecipe.name,
    icon: matchedRecipe.icon,
    makerName: state.player.name
  };

  state.sharedItems.push(newItem);
  audio.playDing();
  showToast(`تم التجهيز: ${matchedRecipe.name} جاهزة! ✨`);

  net.send({
    type: 'ADD_SHARED_ITEM',
    item: newItem,
    senderName: state.player.name
  });

  state.currentBakery.ingredients = [];
  updateBakeryVisual();
  renderSharedItems();
  if (state.isHost) broadcastState();
}

function renderServingStation() {
  if (stationHint) stationHint.textContent = 'شاشة التقديم: تسليم مباشر للزبائن بمجرد التجهيز!';

  if (currentItemVisual) {
    currentItemVisual.innerHTML = `
      <span style="font-size:32px;">🛎️</span>
      <span style="font-size:13px; color:var(--text-dark); font-weight:700;">تسليم الزبائن الفوري</span>
      <span style="font-size:11.5px; color:var(--text-muted);">اضغطي زر التسليم تحت الطلب المطابق مباشرة!</span>
    `;
  }

  if (!ingredientsGrid) return;
  ingredientsGrid.innerHTML = '';
  if (state.orders.length === 0) {
    ingredientsGrid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px; color:var(--text-muted);">لا توجد طلبات جارية الآن 🎉</div>';
    return;
  }

  state.orders.forEach(ord => {
    const matchedItem = state.sharedItems.find(i => i.recipeId === ord.recipeId);

    const card = document.createElement('div');
    card.style.cssText = 'background:#fff; border-radius:12px; padding:10px; border:1px solid #ffd6e0; display:flex; flex-direction:column; gap:6px; align-items:center; text-align:center; position:relative;';
    card.innerHTML = `
      <div style="font-size:24px;">${ord.recipeIcon}</div>
      <div style="font-weight:800; font-size:12px; color:var(--text-dark);">${ord.recipeName}</div>
      <div style="font-size:11px; color:var(--pink-main); font-weight:700; display:flex; align-items:center; gap:4px; justify-content:center;">
        <span style="width:20px; height:20px; display:inline-block;">${ord.customerAvatar}</span>
        <span>${ord.customerName}</span>
      </div>
      <button class="serve-direct-btn" style="background:${matchedItem ? 'var(--pink-main)' : '#ccc'}; color:#fff; border:none; border-radius:10px; padding:6px 12px; font-size:11px; font-weight:800; cursor:${matchedItem ? 'pointer' : 'not-allowed'}; margin-top:4px; width:100%;">
        ${matchedItem ? '🛎️ تسليم الآن!' : '⏳ غير جاهز'}
      </button>
    `;

    if (matchedItem) {
      card.querySelector('.serve-direct-btn').addEventListener('click', () => {
        directServeSharedItem(matchedItem);
      });
    }

    ingredientsGrid.appendChild(card);
  });
}

// قسم متجر الأجهزة جديد 🛍️
function renderShopStation() {
  if (stationHint) stationHint.textContent = 'متجر الكافيه: استثمري النقود 🪙 لتطوير الكافيه وفتح أجهزة ووصفات جديدة!';

  if (currentItemVisual) {
    currentItemVisual.innerHTML = `
      <span style="font-size:32px;">🛍️</span>
      <span style="font-size:13px; color:var(--text-dark); font-weight:700;">متجر معدات الكافيه</span>
      <span style="font-size:11.5px; color:var(--text-muted);">رصيدكم الحالي: <strong style="color:#d63031;">${state.coins} 🪙</strong></span>
    `;
  }

  if (!ingredientsGrid) return;
  ingredientsGrid.innerHTML = '';

  Object.keys(SHOP_MACHINES).forEach(key => {
    const item = SHOP_MACHINES[key];
    const isOwned = state.ownedMachines.includes(item.id);

    const card = document.createElement('div');
    card.className = 'shop-card-machine';
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:28px;">${item.icon}</span>
        <div style="text-align:right;">
          <div style="font-size:13px; font-weight:900; color:var(--text-dark);">${item.name}</div>
          <div style="font-size:11px; color:var(--text-muted);">${item.desc}</div>
        </div>
      </div>
      <button class="buy-machine-btn" style="background:${isOwned ? '#2ed573' : 'var(--pink-main)'}; color:#fff; border:none; border-radius:10px; padding:8px 14px; font-size:12px; font-weight:800; cursor:${isOwned ? 'default' : 'pointer'};">
        ${isOwned ? '✅ متوفرة' : `شراء بـ ${item.price} 🪙`}
      </button>
    `;

    if (!isOwned) {
      card.querySelector('.buy-machine-btn').addEventListener('click', () => {
        if (state.coins < item.price) {
          showToast(`النقود لا تكفي! تحتاجين إلى ${item.price} 🪙 (رصيدكم: ${state.coins})`);
          audio.playAlert();
          return;
        }

        state.coins -= item.price;
        state.ownedMachines.push(item.id);
        audio.playCash();
        showToast(`🎉 مبروووك! تم شراء ${item.name} بنجاح!`, '🛍️');

        net.send({
          type: 'BUY_MACHINE',
          machineId: item.id
        });

        updateStatsDisplay();
        renderStationView();
        if (state.isHost) broadcastState();
      });
    }

    ingredientsGrid.appendChild(card);
  });
}

// ==========================================
// 10. التشغيل التلقائي المضمون
// ==========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
