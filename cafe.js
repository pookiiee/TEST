/**
 * كافيه البنات المشترك | Pookie Cozy Cafe Rush
 * Game Engine, Audio Synthesizer & WebRTC PeerJS Multiplayer
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
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    this.init();
    if (!this.ctx) return;
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
  }

  playPour() {
    this.init();
    if (!this.ctx) return;
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
  }

  playDing() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // جرس الخدمة النقي (Service Bell)
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
  }

  playCash() {
    this.init();
    if (!this.ctx) return;
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
  }

  playFanfare() {
    this.init();
    if (!this.ctx) return;
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
  }

  playAlert() {
    this.init();
    if (!this.ctx) return;
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
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];
    let chordIdx = 0;
    const playChord = () => {
      if (!this.musicPlaying || !this.ctx) return;
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
// 2. قائمة الوصفات والزبائن (Recipes & Customers)
// ==========================================
const CUSTOMERS = [
  { name: 'ميمي القطة', avatar: '🐱' },
  { name: 'سمسم الأرنوبة', avatar: '🐰' },
  { name: 'بوبا الدبدوب', avatar: '🐻' },
  { name: 'كوكي الشيبا', avatar: '🐶' },
  { name: 'توتو الثعلوبة', avatar: '🦊' }
];

const RECIPES = [
  {
    id: 'matcha_boba',
    name: 'ماتشا مثلجة بالبوبا',
    type: 'drink',
    icon: '🧋',
    tags: ['كوب 🥛', 'ثلج 🧊', 'ماتشا 🍵', 'حليب 🥛', 'بوبا ⚫'],
    required: ['cup', 'ice', 'matcha', 'milk', 'boba']
  },
  {
    id: 'strawberry_milk',
    name: 'حليب الفراولة بالكريمة',
    type: 'drink',
    icon: '🍓',
    tags: ['كوب 🥛', 'ثلج 🧊', 'فراولة 🍓', 'حليب 🥛', 'كريمة 🍦'],
    required: ['cup', 'ice', 'strawberry', 'milk', 'cream']
  },
  {
    id: 'spanish_latte',
    name: 'سبانش كولد لاتيه',
    type: 'drink',
    icon: '☕',
    tags: ['كوب 🥛', 'ثلج 🧊', 'قهوة ☕', 'حليب 🥛', 'كراميل 🍯'],
    required: ['cup', 'ice', 'coffee', 'milk', 'caramel']
  },
  {
    id: 'peach_tea',
    name: 'شاي خوخ منعش بالبوبا',
    type: 'drink',
    icon: '🍑',
    tags: ['كوب 🥛', 'ثلج 🧊', 'شاي 🫖', 'خوخ 🍑', 'بوبا ⚫'],
    required: ['cup', 'ice', 'tea', 'peach', 'boba']
  },
  {
    id: 'pink_donut',
    name: 'دونات وردية بالسبرنكلز',
    type: 'bakery',
    icon: '🍩',
    tags: ['دونات 🍩', 'خبز بالفرن 🔥', 'تغطية وردية 🌸', 'سبرنكلز ✨'],
    required: ['donut_base', 'baked', 'pink_glaze', 'sprinkles']
  },
  {
    id: 'strawberry_cake',
    name: 'كيكة الفراولة السحابية',
    type: 'bakery',
    icon: '🍰',
    tags: ['كيك 🍰', 'خبز بالفرن 🔥', 'كريمة 🍦', 'فراولة 🍓'],
    required: ['cake_base', 'baked', 'cream', 'strawberry']
  },
  {
    id: 'honey_pancake',
    name: 'بان كيك العسل والزبدة',
    type: 'bakery',
    icon: '🥞',
    tags: ['بان كيك 🥞', 'خبز بالفرن 🔥', 'زبدة 🧈', 'عسل 🍯'],
    required: ['pancake_base', 'baked', 'butter', 'honey']
  }
];

// قاموس مسميات المكونات
const INGREDIENT_NAMES = {
  cup: { name: 'كوب فارغ', icon: '🥛' },
  ice: { name: 'ثلج', icon: '🧊' },
  matcha: { name: 'ماتشا', icon: '🍵' },
  strawberry: { name: 'فراولة', icon: '🍓' },
  coffee: { name: 'قهوة', icon: '☕' },
  tea: { name: 'شاي مثلج', icon: '🫖' },
  peach: { name: 'خوخ', icon: '🍑' },
  milk: { name: 'حليب نقي', icon: '🥛' },
  boba: { name: 'بوبا تابيوكا', icon: '⚫' },
  cream: { name: 'كريمة خفق', icon: '🍦' },
  caramel: { name: 'صوص كراميل', icon: '🍯' },
  donut_base: { name: 'عجينة دونات', icon: '🍩' },
  cake_base: { name: 'طبقات كيك', icon: '🍰' },
  pancake_base: { name: 'خليط بانكيك', icon: '🥞' },
  baked: { name: 'مخبوز بالفرن', icon: '🔥' },
  pink_glaze: { name: 'تغطية وردية', icon: '🌸' },
  sprinkles: { name: 'سبرنكلز ملون', icon: '✨' },
  butter: { name: 'مكعب زبدة', icon: '🧈' },
  honey: { name: 'عسل صافي', icon: '🍯' }
};

// ==========================================
// 3. حالة اللعبة المحلية والشبكية
// ==========================================
const state = {
  mode: 'solo', // 'solo' | 'host' | 'client'
  peer: null,
  roomCode: '',
  isHost: false,
  connections: [], // قائمة الاتصالات إذا كان مضيف
  hostConn: null,  // اتصال المضيف إذا كان عميل

  player: {
    name: 'باريستا بوكي',
    avatar: '🐱'
  },
  players: [],

  // حالة الشفت الحي
  shiftActive: false,
  shiftTimeRemaining: 90, // بالثواني
  shiftInterval: null,
  orderInterval: null,

  score: 0,
  coins: 0,
  servedCount: 0,
  missedCount: 0,

  orders: [],        // تذاكر الزبائن النشطة
  sharedItems: [],   // طاولة التجهيز المشتركة

  // أداة العمل الحالية في المحطة
  currentDrink: {
    ingredients: []
  },
  currentBakery: {
    ingredients: []
  },
  isOvenBaking: false,

  selectedStation: 'drinks' // 'drinks' | 'bakery' | 'serving'
};

// ==========================================
// 4. عناصر واجهة المستخدم (DOM Elements)
// ==========================================
const screens = {
  lobby: document.getElementById('lobbyScreen'),
  game: document.getElementById('gameScreen'),
  results: document.getElementById('resultsScreen')
};

const statsBar = document.getElementById('gameStatsBar');
const playerNameInput = document.getElementById('playerNameInput');
const avatarChoices = document.querySelectorAll('.avatar-choice');
const roomWaitingBox = document.getElementById('roomWaitingBox');
const displayRoomCode = document.getElementById('displayRoomCode');
const copyRoomLinkBtn = document.getElementById('copyRoomLinkBtn');
const playersChipsContainer = document.getElementById('playersChipsContainer');
const startShiftBtn = document.getElementById('startShiftBtn');

const ordersRack = document.getElementById('ordersRack');
const sharedItemsContainer = document.getElementById('sharedItemsContainer');
const currentItemVisual = document.getElementById('currentItemVisual');
const stationHint = document.getElementById('stationHint');
const ingredientsGrid = document.getElementById('ingredientsGrid');

const toastShout = document.getElementById('toastShout');
const toggleMusicBtn = document.getElementById('toggleMusicBtn');

// ==========================================
// 5. التهيئة الأولية والأحداث (Init & Setup)
// ==========================================
function initApp() {
  // تفقد إذا كان الرابط يحتوي على كود غرفة للانضمام المباشر
  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  if (roomParam) {
    document.getElementById('joinRoomCodeInput').value = roomParam.toUpperCase();
    showToast(`تم اكتشاف كود الغرفة: ${roomParam} 💖`);
  }

  // اختيار الصورة الرمزية
  avatarChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      audio.playPop();
      avatarChoices.forEach(c => c.classList.remove('selected'));
      choice.classList.add('selected');
      state.player.avatar = choice.dataset.avatar;
    });
  });

  // تحديث الاسم
  playerNameInput.addEventListener('input', (e) => {
    state.player.name = e.target.value.trim() || 'باريستا بوكي';
  });

  // تبديل الموسيقى
  toggleMusicBtn.addEventListener('click', () => {
    const isPlaying = audio.toggleMusic();
    toggleMusicBtn.textContent = isPlaying ? '🎵' : '🔇';
    showToast(isPlaying ? 'تم تشغيل موسيقى لوفاي 🎶' : 'تم كتم الموسيقى 🔇');
  });

  // أزرار إنشاء وانضمام الغرفة
  document.getElementById('createRoomBtn').addEventListener('click', handleCreateRoom);
  document.getElementById('joinRoomBtn').addEventListener('click', handleJoinRoom);
  document.getElementById('soloPlayBtn').addEventListener('click', handleSoloPlay);
  startShiftBtn.addEventListener('click', startShift);
  document.getElementById('playAgainBtn').addEventListener('click', () => {
    showScreen('lobby');
    statsBar.style.display = 'none';
  });

  copyRoomLinkBtn.addEventListener('click', copyDirectLink);

  // أزرار التبديل بين المحطات
  document.querySelectorAll('.station-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      audio.playPop();
      document.querySelectorAll('.station-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedStation = btn.dataset.station;
      renderStationView();
    });
  });

  // أزرار الصرخات الحماسية السريعة
  document.querySelectorAll('.shout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.dataset.shout;
      sendShout(msg);
    });
  });
}

function showScreen(name) {
  Object.keys(screens).forEach(key => {
    screens[key].classList.toggle('active', key === name);
  });
}

function showToast(text, avatar = '✨') {
  toastShout.innerHTML = `<span>${avatar}</span> <span>${text}</span>`;
  toastShout.classList.add('show');
  setTimeout(() => {
    toastShout.classList.remove('show');
  }, 2400);
}

// ==========================================
// 6. الشبكة وتعدد اللاعبين (Dual-Engine: BroadcastChannel + MQTT WebSocket)
// ==========================================
// 6. الشبكة وتعدد اللاعبين (Dual-Engine: BroadcastChannel + MQTT WebSocket)
// ==========================================
class CuteNetwork {
  constructor() {
    this.clientId = 'cl_' + Math.random().toString(36).substring(2, 9);
    this.roomCode = '';
    this.channel = null;
    this.mqttClient = null;
    this.seenMsgIds = new Set();
    this.isMqttConnected = false;
    this.outboxQueue = [];
    this.onMessageCallback = null;
    this.onConnectedCallback = null;
  }

  connect(roomCode, onMessage, onConnected) {
    this.roomCode = roomCode.toUpperCase();
    this.onMessageCallback = onMessage;
    this.onConnectedCallback = onConnected;

    // 1. القناة المحلية المباشرة (BroadcastChannel) - فورية بدون نت
    if (typeof BroadcastChannel !== 'undefined') {
      if (this.channel) {
        try { this.channel.close(); } catch(e){}
      }
      this.channel = new BroadcastChannel('pookie_cafe_' + this.roomCode);
      this.channel.onmessage = (e) => {
        this.receivePacket(e.data);
      };
    }

    // 2. شبكة الإنترنت العامة (MQTT over WebSocket)
    if (window.mqtt) {
      if (this.mqttClient) {
        try { this.mqttClient.end(true); } catch(e){}
      }
      this.initMqttBroker('wss://broker.emqx.io:8084/mqtt');
    }
  }

  initMqttBroker(brokerUrl) {
    try {
      this.mqttClient = mqtt.connect(brokerUrl, {
        clientId: this.clientId + '_' + Math.floor(Math.random() * 10000),
        clean: true,
        connectTimeout: 9000,
        keepalive: 60
      });

      this.mqttClient.on('connect', () => {
        this.isMqttConnected = true;
        this.mqttClient.subscribe(`pookie/cafe/${this.roomCode}/#`);
        console.log('Connected to MQTT Broker:', brokerUrl);

        // إفراغ قائمة الانتظار
        this.flushOutbox();

        if (this.onConnectedCallback) {
          this.onConnectedCallback();
        }
      });

      this.mqttClient.on('message', (topic, payload) => {
        try {
          const data = JSON.parse(payload.toString());
          this.receivePacket(data);
        } catch(e) {}
      });

      this.mqttClient.on('error', (err) => {
        console.warn('MQTT error with ' + brokerUrl + ', trying fallback:', err);
        if (brokerUrl.includes('emqx')) {
          this.initMqttBroker('wss://broker.hivemq.com:8884/mqtt');
        }
      });
    } catch (e) {
      console.warn('MQTT init error:', e);
    }
  }

  flushOutbox() {
    if (!this.mqttClient || !this.isMqttConnected) return;
    while (this.outboxQueue.length > 0) {
      const packet = this.outboxQueue.shift();
      try {
        this.mqttClient.publish(`pookie/cafe/${this.roomCode}/events`, JSON.stringify(packet));
      } catch(e) {}
    }
  }

  receivePacket(packet) {
    if (!packet || typeof packet !== 'object') return;
    if (packet.senderClientId === this.clientId) return; // تجاهل الرسائل الصادرة من نفس الجهاز

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

    // إرسال محلياً
    if (this.channel) {
      try {
        this.channel.postMessage(packet);
      } catch(e) {}
    }

    // إرسال عبر الإنترنت أو وضعه في الانتظار
    if (this.mqttClient && this.isMqttConnected) {
      try {
        this.mqttClient.publish(`pookie/cafe/${this.roomCode}/events`, JSON.stringify(packet));
      } catch(e) {}
    } else {
      this.outboxQueue.push(packet);
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

  net.connect(room, handleIncomingData, () => {
    showToast('🟢 متصل بالشبكة وجاهز لاستقبال الصديقات!');
    broadcastState();
  });

  displayRoomCode.textContent = room;
  roomWaitingBox.style.display = 'block';
  startShiftBtn.style.display = 'inline-flex';

  const joinWrap = document.getElementById('joinRoomInputWrap');
  if (joinWrap) joinWrap.style.display = 'none';
  document.getElementById('createRoomBtn').style.display = 'none';

  renderPlayersChips();
  showToast('تم فتح الكافيه بنجاح! شاركي الكود مع صديقاتك 🎀');
}

let joinHeartbeat = null;

function handleJoinRoom() {
  audio.playPop();
  const code = document.getElementById('joinRoomCodeInput').value.trim().toUpperCase();
  if (!code) {
    showToast('الرجاء إدخال كود الغرفة أولاً 🌸');
    return;
  }

  if (state.isHost && state.roomCode === code) {
    showToast('أنتِ المضيفة لهذه الغرفة حالياً 👑! افتحي نافذة ثانية بالمتصفح لتجربة الانضمام كصديقة 🌸');
    return;
  }

  state.roomCode = code;
  state.isHost = false;
  state.mode = 'client';
  state.joined = false;
  state.players = [{ id: net.clientId, name: state.player.name, avatar: state.player.avatar, isHost: false }];

  displayRoomCode.textContent = code;
  roomWaitingBox.style.display = 'block';
  startShiftBtn.style.display = 'none';

  const joinWrap = document.getElementById('joinRoomInputWrap');
  if (joinWrap) joinWrap.style.display = 'none';
  document.getElementById('createRoomBtn').style.display = 'none';

  renderPlayersChips();
  showToast('جاري الاتصال بالكافيه... ☕✨');

  const sendJoinReq = () => {
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

  net.connect(code, handleIncomingData, () => {
    showToast('🟢 تم الاتصال! جاري إرسال طلب الانضمام للمضيفة...');
    sendJoinReq();
  });

  // محاولة إرسال فورية
  sendJoinReq();

  // تكرار الإرسال كل 1.5 ثانية حتى وصول تأكيد المضيفة
  if (joinHeartbeat) clearInterval(joinHeartbeat);
  joinHeartbeat = setInterval(() => {
    if (!state.joined) {
      sendJoinReq();
    } else {
      clearInterval(joinHeartbeat);
    }
  }, 1500);
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
    timeRemaining: state.shiftTimeRemaining,
    shiftActive: state.shiftActive
  });
}

function handleIncomingData(data) {
  if (data.type === 'JOIN_REQUEST') {
    if (state.isHost) {
      const exists = state.players.some(p => p.id === data.player.id || (p.name === data.player.name && !p.isHost));
      if (!exists) {
        state.players.push(data.player);
        audio.playDing();
        showToast(`انضمت ${data.player.name} إلى الكافيه! 💖`, data.player.avatar);
        renderPlayersChips();
      }
      broadcastState();
    }
  } else if (data.type === 'SYNC_STATE') {
    state.joined = true;
    if (joinHeartbeat) clearInterval(joinHeartbeat);

    state.players = data.players || state.players;
    state.orders = data.orders || [];
    state.sharedItems = data.sharedItems || [];
    state.score = data.score || 0;
    state.coins = data.coins || 0;
    state.shiftTimeRemaining = data.timeRemaining;

    if (data.shiftActive && !state.shiftActive) {
      launchGameView();
    } else if (!data.shiftActive && state.shiftActive) {
      endShift();
    }

    renderOrders();
    renderSharedItems();
    updateStatsDisplay();
    renderPlayersChips();
  } else if (data.type === 'START_SHIFT') {
    launchGameView();
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
  navigator.clipboard.writeText(directUrl).then(() => {
    showToast('تم نسخ الرابط المباشر للواتساب! 📋✨');
  }).catch(() => {
    prompt('انسخي هذا الرابط لصديقاتك:', directUrl);
  });
}

function renderPlayersChips() {
  playersChipsContainer.innerHTML = '';
  state.players.forEach(p => {
    const chip = document.createElement('div');
    chip.className = `player-chip ${p.isHost ? 'is-host' : ''}`;
    chip.innerHTML = `<span>${p.avatar}</span> <span>${p.name}</span> ${p.isHost ? '👑' : ''}`;
    playersChipsContainer.appendChild(chip);
  });
}

// ==========================================
// 7. دورة اللعبة والشفت (Game Loop & Shift)
// ==========================================
function startShift() {
  audio.playDing();
  state.shiftActive = true;
  state.shiftTimeRemaining = 90;
  state.score = 0;
  state.coins = 0;
  state.servedCount = 0;
  state.missedCount = 0;
  state.orders = [];
  state.sharedItems = [];
  resetWorkbenches();

  launchGameView();

  if (state.isHost) {
    broadcastState();
    net.send({ type: 'START_SHIFT' });

    // إنشاء طلبين مبدئيين
    spawnCustomerOrder();
    setTimeout(spawnCustomerOrder, 3000);

    // مؤقت توليد الطلبات المنتظم
    state.orderInterval = setInterval(() => {
      if (state.orders.length < 4) {
        spawnCustomerOrder();
      }
    }, 12000);

    // مؤقت صواني وصبر الزبائن وثواني الشفت
    state.shiftInterval = setInterval(() => {
      state.shiftTimeRemaining--;
      updateCustomerPatience();
      updateStatsDisplay();
      broadcastState();

      if (state.shiftTimeRemaining <= 0) {
        endShift();
      }
    }, 1000);
  }
}

function launchGameView() {
  showScreen('game');
  statsBar.style.display = 'flex';
  renderStationView();
  renderOrders();
  renderSharedItems();
  updateStatsDisplay();
}

function endShift() {
  state.shiftActive = false;
  if (state.shiftInterval) clearInterval(state.shiftInterval);
  if (state.orderInterval) clearInterval(state.orderInterval);

  audio.playFanfare();
  showScreen('results');
  statsBar.style.display = 'none';

  // حساب النجوم
  let stars = '⭐';
  if (state.servedCount >= 8) stars = '⭐⭐⭐';
  else if (state.servedCount >= 4) stars = '⭐⭐';

  document.getElementById('resultStars').textContent = stars;
  document.getElementById('resultScore').textContent = state.score;
  document.getElementById('resultCoins').textContent = `${state.coins} 🪙`;
  document.getElementById('resultServed').textContent = state.servedCount;
  document.getElementById('resultMissed').textContent = state.missedCount;

  broadcastState();
}

function spawnCustomerOrder() {
  const cust = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
  const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
  const newOrder = {
    id: 'ord_' + Date.now() + '_' + Math.floor(Math.random()*100),
    customerName: cust.name,
    customerAvatar: cust.avatar,
    recipeId: recipe.id,
    recipeName: recipe.name,
    recipeIcon: recipe.icon,
    recipeTags: recipe.tags,
    required: recipe.required,
    maxPatience: 45, // 45 ثانية صبر
    patience: 45
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
      // غادر الزبون زعلان
      const missed = state.orders.splice(i, 1)[0];
      state.missedCount++;
      state.score = Math.max(0, state.score - 15);
      showToast(`${missed.customerName} زعل وغادر الكافيه! 💔`, '😭');
      audio.playAlert();
    }
  }
  renderOrders();
}

function updateStatsDisplay() {
  document.getElementById('statScore').textContent = state.score;
  document.getElementById('statCoins').textContent = `${state.coins} 🪙`;
  
  const min = Math.floor(state.shiftTimeRemaining / 60);
  const sec = state.shiftTimeRemaining % 60;
  document.getElementById('statTimer').textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// ==========================================
// 8. عرض تذاكر الزبائن وطاولة التجهيز
// ==========================================
function renderOrders() {
  ordersRack.innerHTML = '';
  if (state.orders.length === 0) {
    ordersRack.innerHTML = '<div style="font-size:13px; color:var(--text-muted); padding:10px;">لا يوجد زبائن حالياً.. استراحة باريستا لطيفة 🌸</div>';
    return;
  }

  state.orders.forEach(order => {
    const card = document.createElement('div');
    const isUrgent = order.patience < 15;
    card.className = `order-card ${isUrgent ? 'urgent' : ''}`;

    const pct = Math.max(0, (order.patience / order.maxPatience) * 100);
    let barColor = '#2ed573';
    if (pct < 35) barColor = '#ff4757';
    else if (pct < 65) barColor = '#ffa502';

    let tagsHtml = order.recipeTags.map(t => `<span class="recipe-tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="order-customer">
        <span class="order-avatar">${order.customerAvatar}</span>
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
  sharedItemsContainer.innerHTML = '';
  if (state.sharedItems.length === 0) {
    sharedItemsContainer.innerHTML = '<span class="shared-empty-hint">طاولة التجهيز فارغة. اصنعي مشروباً أو كيكاً وضعيها هنا ليراها الجميع! 🍰</span>';
    return;
  }

  state.sharedItems.forEach((item, index) => {
    const chip = document.createElement('div');
    chip.className = 'shared-item-chip';
    chip.innerHTML = `<span>${item.icon}</span> <span>${item.name}</span> <span style="font-size:10px; color:#a87400;">(${item.makerName})</span>`;
    
    chip.addEventListener('click', () => {
      // إمكانية تسليم هذا الصحن
      promptServeSharedItem(item, index);
    });

    sharedItemsContainer.appendChild(chip);
  });
}

function promptServeSharedItem(item, itemIdx) {
  // تفقد إذا كان هناك طلب يطابق هذا العنصر
  const matchedOrder = state.orders.find(o => o.recipeId === item.recipeId);
  if (!matchedOrder) {
    showToast(`هذا الصنف (${item.name}) لا يطابق أي طلب مفتوح حالياً!`);
    return;
  }

  if (confirm(`هل ترغبين في تقديم (${item.name}) للزبون (${matchedOrder.customerName})؟ 🛎️`)) {
    handleServeOrder(matchedOrder.id, item.id, state.player.name);
    net.send({
      type: 'SERVE_ORDER',
      orderId: matchedOrder.id,
      itemId: item.id,
      senderName: state.player.name
    });
  }
}

function handleServeOrder(orderId, itemId, senderName) {
  const orderIdx = state.orders.findIndex(o => o.id === orderId);
  const itemIdx = state.sharedItems.findIndex(i => i.id === itemId);

  if (orderIdx !== -1 && itemIdx !== -1) {
    const order = state.orders.splice(orderIdx, 1)[0];
    state.sharedItems.splice(itemIdx, 1);

    // حساب النقاط والعملات
    state.score += 50 + Math.floor(order.patience);
    state.coins += 15;
    state.servedCount++;

    audio.playCash();
    showToast(`كفووو! سلّمت ${senderName} الطلب لـ ${order.customerName} بنجاح! 💖💰`, '🎉');

    renderOrders();
    renderSharedItems();
    updateStatsDisplay();
    broadcastState();
  }
}

// ==========================================
// 9. محطات العمل والتجهيز (Workbench & Stations)
// ==========================================
function renderStationView() {
  ingredientsGrid.innerHTML = '';

  if (state.selectedStation === 'drinks') {
    renderDrinksStation();
  } else if (state.selectedStation === 'bakery') {
    renderBakeryStation();
  } else if (state.selectedStation === 'serving') {
    renderServingStation();
  }
}

function renderDrinksStation() {
  stationHint.textContent = 'اختاري الكوب، ثم اسكبي السائل والثلج، وأضيفي البوبا والكريمة!';

  updateDrinkVisual();

  const drinkIngredients = [
    { key: 'cup', name: 'كوب فارغ', icon: '🥛', sound: 'pour' },
    { key: 'ice', name: 'ثلج', icon: '🧊', sound: 'pop' },
    { key: 'matcha', name: 'ماتشا خضراء', icon: '🍵', sound: 'pour' },
    { key: 'strawberry', name: 'فراولة', icon: '🍓', sound: 'pour' },
    { key: 'coffee', name: 'إسبريسو', icon: '☕', sound: 'pour' },
    { key: 'tea', name: 'شاي مثلج', icon: '🫖', sound: 'pour' },
    { key: 'peach', name: 'نكهة خوخ', icon: '🍑', sound: 'pour' },
    { key: 'milk', name: 'حليب', icon: '🥛', sound: 'pour' },
    { key: 'boba', name: 'كرات البوبا', icon: '⚫', sound: 'pop' },
    { key: 'cream', name: 'كريمة خفق', icon: '🍦', sound: 'pour' },
    { key: 'caramel', name: 'كراميل', icon: '🍯', sound: 'pour' }
  ];

  drinkIngredients.forEach(ing => {
    const card = document.createElement('div');
    card.className = 'ingredient-card';
    card.innerHTML = `<span class="ing-icon">${ing.icon}</span><span class="ing-name">${ing.name}</span>`;

    card.addEventListener('click', () => {
      addDrinkIngredient(ing.key, ing.sound);
    });

    ingredientsGrid.appendChild(card);
  });
}

function addDrinkIngredient(key, soundType) {
  if (soundType === 'pour') audio.playPour();
  else audio.playPop();

  if (key === 'cup' && state.currentDrink.ingredients.includes('cup')) {
    showToast('الكوب موجود بالفعل على الطاولة!');
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

  const badges = current.map(k => {
    const info = INGREDIENT_NAMES[k] || { name: k, icon: '✨' };
    return `<span class="ingredient-badge">${info.icon} ${info.name}</span>`;
  }).join('');

  visualContainer.innerHTML = `
    <span class="item-cup-preview">${previewIcon}</span>
    <div class="item-ingredients-tags">${badges}</div>
    <div style="display:flex; gap:8px; margin-top:10px;">
      <button class="btn-primary" id="finishDrinkBtn" style="padding:8px 16px; font-size:13px;">ضع على طاولة التجهيز 🛎️</button>
      <button class="btn-secondary" id="clearDrinkBtn" style="padding:8px 14px; font-size:13px;">تفريغ 🗑️</button>
    </div>
  `;

  document.getElementById('finishDrinkBtn').addEventListener('click', finishDrink);
  document.getElementById('clearDrinkBtn').addEventListener('click', () => {
    audio.playPop();
    state.currentDrink.ingredients = [];
    updateDrinkVisual();
  });
}

function finishDrink() {
  const ingredients = state.currentDrink.ingredients;
  if (ingredients.length === 0) return;

  // البحث عن أي وصفة تطابق هذه المكونات
  const matchedRecipe = RECIPES.find(r => {
    if (r.type !== 'drink') return false;
    return r.required.every(req => ingredients.includes(req));
  });

  const itemName = matchedRecipe ? matchedRecipe.name : 'مشروب سبيشل لطيف';
  const itemIcon = matchedRecipe ? matchedRecipe.icon : '🧋';
  const recipeId = matchedRecipe ? matchedRecipe.id : 'custom_drink';

  const newItem = {
    id: 'item_' + Date.now() + '_' + Math.random(),
    name: itemName,
    icon: itemIcon,
    recipeId: recipeId,
    makerName: state.player.name,
    ingredients: [...ingredients]
  };

  placeOnSharedCounter(newItem);
  state.currentDrink.ingredients = [];
  updateDrinkVisual();
}

function renderBakeryStation() {
  stationHint.textContent = 'اختاري العجينة، اخبزيها بالفرن، ثم أضيفي الصوصات والتزيين!';
  updateBakeryVisual();

  const bakeryIngredients = [
    { key: 'donut_base', name: 'عجينة دونات', icon: '🍩' },
    { key: 'cake_base', name: 'طبقات كيك', icon: '🍰' },
    { key: 'pancake_base', name: 'خليط بانكيك', icon: '🥞' },
    { key: 'pink_glaze', name: 'تغطية وردية', icon: '🌸' },
    { key: 'sprinkles', name: 'سبرنكلز ملون', icon: '✨' },
    { key: 'cream', name: 'كريمة خفق', icon: '🍦' },
    { key: 'strawberry', name: 'فراولة', icon: '🍓' },
    { key: 'butter', name: 'مكعب زبدة', icon: '🧈' },
    { key: 'honey', name: 'عسل صافي', icon: '🍯' }
  ];

  bakeryIngredients.forEach(ing => {
    const card = document.createElement('div');
    card.className = 'ingredient-card';
    card.innerHTML = `<span class="ing-icon">${ing.icon}</span><span class="ing-name">${ing.name}</span>`;

    card.addEventListener('click', () => {
      addBakeryIngredient(ing.key);
    });

    ingredientsGrid.appendChild(card);
  });
}

function addBakeryIngredient(key) {
  audio.playPop();
  const current = state.currentBakery.ingredients;

  const bases = ['donut_base', 'cake_base', 'pancake_base'];
  if (bases.includes(key)) {
    // قاعدة جديدة تستبدل القديمة إذا لم تخبز
    state.currentBakery.ingredients = [key];
    updateBakeryVisual();
    return;
  }

  if (!bases.some(b => current.includes(b))) {
    showToast('اختاري عجينة المخبوزات أولاً (دونات أو كيك أو بانكيك)! 🍩');
    return;
  }

  if (!current.includes(key)) {
    current.push(key);
    updateBakeryVisual();
  }
}

function updateBakeryVisual() {
  const current = state.currentBakery.ingredients;
  const visualContainer = currentItemVisual;

  if (current.length === 0) {
    visualContainer.innerHTML = `
      <span class="item-cup-preview" style="opacity:0.4;">🍩</span>
      <span style="font-size:12.5px; color:var(--text-muted);">طاولة الحلويات فارغة. اختاري عجينة من الأسفل!</span>
    `;
    return;
  }

  let previewIcon = '🍩';
  if (current.includes('cake_base')) previewIcon = '🍰';
  if (current.includes('pancake_base')) previewIcon = '🥞';

  const isBaked = current.includes('baked');

  const badges = current.map(k => {
    const info = INGREDIENT_NAMES[k] || { name: k, icon: '✨' };
    return `<span class="ingredient-badge">${info.icon} ${info.name}</span>`;
  }).join('');

  visualContainer.innerHTML = `
    <span class="item-cup-preview ${state.isOvenBaking ? 'brand-icon' : ''}">${previewIcon}</span>
    <div class="item-ingredients-tags">${badges}</div>
    <div style="display:flex; gap:8px; margin-top:10px;">
      ${!isBaked ? `<button class="btn-primary" id="bakeOvenBtn" style="padding:8px 16px; font-size:13px; background:#ff8b3d;" ${state.isOvenBaking ? 'disabled' : ''}>خبز في الفرن 🔥</button>` : ''}
      <button class="btn-primary" id="finishBakeryBtn" style="padding:8px 16px; font-size:13px;" ${!isBaked ? 'disabled style="opacity:0.5;"' : ''}>ضع على طاولة التجهيز 🛎️</button>
      <button class="btn-secondary" id="clearBakeryBtn" style="padding:8px 14px; font-size:13px;">تفريغ 🗑️</button>
    </div>
  `;

  const bakeBtn = document.getElementById('bakeOvenBtn');
  if (bakeBtn) {
    bakeBtn.addEventListener('click', startBakingOven);
  }

  document.getElementById('finishBakeryBtn').addEventListener('click', finishBakery);
  document.getElementById('clearBakeryBtn').addEventListener('click', () => {
    audio.playPop();
    state.currentBakery.ingredients = [];
    state.isOvenBaking = false;
    updateBakeryVisual();
  });
}

function startBakingOven() {
  if (state.isOvenBaking) return;
  state.isOvenBaking = true;
  audio.playPour();
  showToast('يخبز في الفرن الآن.. ثواني ويجهز! 🔥');
  updateBakeryVisual();

  setTimeout(() => {
    state.isOvenBaking = false;
    state.currentBakery.ingredients.push('baked');
    audio.playDing();
    showToast('رن جرس الفرن! جهز المخبوز بنجاح 🛎️✨');
    updateBakeryVisual();
  }, 2500);
}

function finishBakery() {
  const ingredients = state.currentBakery.ingredients;
  if (!ingredients.includes('baked')) {
    showToast('يجب خبزها في الفرن أولاً! 🔥');
    return;
  }

  const matchedRecipe = RECIPES.find(r => {
    if (r.type !== 'bakery') return false;
    return r.required.every(req => ingredients.includes(req));
  });

  const itemName = matchedRecipe ? matchedRecipe.name : 'حلى كوايي فاخر';
  const itemIcon = matchedRecipe ? matchedRecipe.icon : '🍰';
  const recipeId = matchedRecipe ? matchedRecipe.id : 'custom_pastry';

  const newItem = {
    id: 'item_' + Date.now() + '_' + Math.random(),
    name: itemName,
    icon: itemIcon,
    recipeId: recipeId,
    makerName: state.player.name,
    ingredients: [...ingredients]
  };

  placeOnSharedCounter(newItem);
  state.currentBakery.ingredients = [];
  updateBakeryVisual();
}

function placeOnSharedCounter(item) {
  audio.playDing();
  showToast(`وضعت ${item.name} على طاولة التجهيز! ✨`, item.icon);
  state.sharedItems.push(item);
  renderSharedItems();

  net.send({
    type: 'ADD_SHARED_ITEM',
    item: item,
    senderName: state.player.name
  });
}

function renderServingStation() {
  stationHint.textContent = 'استلمي الطلبات الجاهزة من طاولة التجهيز وسلّميها للزبائن لدفع الحساب!';
  currentItemVisual.innerHTML = `
    <span class="item-cup-preview">🛎️</span>
    <div style="font-size:13.5px; font-weight:800; color:var(--text-dark);">محطة التسليم والفحص</div>
    <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">اضغطي على أي طلب في تذاكر الزبائن لتسليم الصحن المطابق له!</div>
  `;

  // عرض بطاقات الزبائن للاختيار المباشر
  state.orders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'ingredient-card';
    card.style.padding = '12px';
    card.innerHTML = `
      <span class="ing-icon">${order.customerAvatar}</span>
      <span class="ing-name">${order.customerName}</span>
      <span style="font-size:11px; color:var(--pink-main); font-weight:800;">${order.recipeName}</span>
    `;

    card.addEventListener('click', () => {
      // تفقد إذا كان هناك صنف مطابق في الطاولة
      const item = state.sharedItems.find(i => i.recipeId === order.recipeId);
      if (item) {
        promptServeSharedItem(item, 0);
      } else {
        audio.playAlert();
        showToast(`لا يوجد (${order.recipeName}) جاهز على طاولة التجهيز بعد!`);
      }
    });

    ingredientsGrid.appendChild(card);
  });
}

function resetWorkbenches() {
  state.currentDrink.ingredients = [];
  state.currentBakery.ingredients = [];
  state.isOvenBaking = false;
}

// بدء التطبيق
document.addEventListener('DOMContentLoaded', initApp);
