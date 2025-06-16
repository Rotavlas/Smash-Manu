// src/main.js
document.getElementById('playBtn').onclick = () => {
  alert('Sélection du mode de jeu à venir !');
};
document.getElementById('settingsBtn').onclick = () => {
  alert('Paramètres à venir !');
};

// Création dynamique des écrans
function showMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'flex';
  menu.style.flexDirection = 'column';
  menu.style.alignItems = 'flex-start';
  removeScreen('gameModeScreen');
  removeScreen('settingsScreen');
  removeScreen('creditsScreen');
  removeScreen('characterSelectScreen');
}

function showGameModeScreen() {
  document.getElementById('menu').style.display = 'none';
  removeScreen('settingsScreen');
  removeScreen('creditsScreen');
  removeScreen('characterSelectScreen');
  if (!document.getElementById('gameModeScreen')) {
    const screen = document.createElement('div');
    screen.id = 'gameModeScreen';
    screen.className = 'dynamic-screen';
    screen.innerHTML = `
      <h2>Choix du mode de jeu</h2>
      <button id="soloBtn">Solo</button>
      <button id="localBtn">Local</button>
      <button id="onlineBtn">En Ligne</button>
      <button id="backToMenu1">Retour</button>
    `;
    document.body.appendChild(screen);

    document.getElementById('soloBtn').onclick = () => {
      alert('Le mode Solo arrive bientôt !');
    };
    document.getElementById('onlineBtn').onclick = () => {
      alert('Le mode En Ligne arrive bientôt !');
    };
    document.getElementById('localBtn').onclick = showCharacterSelectScreen;
    document.getElementById('backToMenu1').onclick = () => {
      removeScreen('gameModeScreen');
      showMenu();
    };
  }
}

function showCharacterSelectScreen() {
  removeScreen('gameModeScreen');
  removeScreen('settingsScreen');
  removeScreen('creditsScreen');
  removeScreen('characterSelectScreen');
  document.getElementById('bg-video').style.display = 'none';

  const screen = document.createElement('div');
  screen.id = 'characterSelectScreen';

  // Ajout du titre flottant
  const title = document.createElement('div');
  title.className = 'character-select-title';
  title.textContent = 'Sélection du personnage';
  screen.appendChild(title);

  // Ajout du fond étoilé animé
  const starsBg = document.createElement('canvas');
  starsBg.className = 'stars-bg';
  screen.appendChild(starsBg);

  function animateStars() {
    const ctx = starsBg.getContext('2d');
    const w = window.innerWidth;
    const h = window.innerHeight;
    starsBg.width = w;
    starsBg.height = h;
    const stars = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        alpha: Math.random() * 0.5 + 0.5
      });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffe066";
        ctx.shadowColor = "#fffbe6";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        s.y += s.speed;
        if (s.y > h) s.y = 0;
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  }
  setTimeout(animateStars, 10);

  // Infos des personnages
  const characterInfos = [
    {
      name: "PA",
      subtitle: "Tank Ultime / Résistance / Poigne de l'immortel",
      description: "PA se distingue par son jeu très lent (il roule pour avancer) mais son écrasement inflige de gros dégâts."
    },
    {
      name: "Léo",
      subtitle: "Tank / Tchoupinesse / Milf Apex Prédator (MAP)",
      description: "Leo est un personnage qui allie force et résistance, cependant son cardio héritant de son père l'alcoolique le nerf pas mal."
    }
  ];

  // Images des personnages
  const characterImages = [
    'assets/lebossmetalique.png',
    'assets/leo.jpg'
  ];

  // Grille de personnages (2 images + placeholders)
  const grid = document.createElement('div');
  grid.className = 'character-grid';
  for (let i = 0; i < 10; i++) {
    const char = document.createElement('div');
    char.className = 'character-placeholder';
    char.dataset.index = i;
    if (i < characterImages.length) {
      const img = document.createElement('img');
      img.src = characterImages[i];
      img.alt = characterInfos[i]?.name || `Perso ${i + 1}`;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '20px';
      char.appendChild(img);

      // Nom du personnage sous l'image
      const label = document.createElement('div');
      label.textContent = characterInfos[i]?.name || `Perso ${i + 1}`;
      label.style.position = 'absolute';
      label.style.bottom = '8px';
      label.style.left = '50%';
      label.style.transform = 'translateX(-50%)';
      label.style.background = 'rgba(34,34,34,0.85)';
      label.style.color = '#ffe066';
      label.style.fontSize = '1.1em';
      label.style.fontFamily = "'Press Start 2P', monospace";
      label.style.padding = '2px 10px';
      label.style.borderRadius = '8px';
      label.style.pointerEvents = 'none';
      char.appendChild(label);
    } else {
      char.textContent = `P${i + 1}`;
    }
    grid.appendChild(char);
  }

  // Fiche info personnage
  const charInfo = document.createElement('div');
  charInfo.className = 'character-info-card';
  charInfo.style.display = 'none';
  charInfo.style.position = 'absolute';
  charInfo.style.right = '40px';
  charInfo.style.top = '120px';
  charInfo.style.width = '340px';
  charInfo.style.background = 'rgba(34,34,34,0.98)';
  charInfo.style.border = '2px solid #ffe066';
  charInfo.style.borderRadius = '18px';
  charInfo.style.color = '#ffe066';
  charInfo.style.fontFamily = "'Press Start 2P', monospace";
  charInfo.style.padding = '24px 24px 18px 24px';
  charInfo.style.zIndex = '10';
  charInfo.style.boxShadow = '0 4px 24px 0 rgba(0,0,0,0.18)';
  charInfo.innerHTML = `
    <div class="char-info-name" style="font-size:1.5em;margin-bottom:8px;"></div>
    <div class="char-info-subtitle" style="font-size:1em;margin-bottom:12px;color:#fffbe6;"></div>
    <div class="char-info-desc" style="font-size:1em;color:#fff;"></div>
  `;

  // Affichage dynamique de la fiche info
  function showCharInfo(idx) {
    if (characterInfos[idx]) {
      charInfo.querySelector('.char-info-name').textContent = characterInfos[idx].name;
      charInfo.querySelector('.char-info-subtitle').textContent = characterInfos[idx].subtitle;
      charInfo.querySelector('.char-info-desc').textContent = characterInfos[idx].description;
      charInfo.style.display = 'block';
    } else {
      charInfo.style.display = 'none';
    }
  }
  function hideCharInfo() {
    charInfo.style.display = 'none';
  }

  // Séparateur décoratif
  const separator = document.createElement('div');
  separator.className = 'separator';

  // Zone joueurs en bas
  const players = document.createElement('div');
  players.className = 'players-row';
  players.innerHTML = `
    <div class="player-slot">
      <div class="player-selection" id="player1-selection"></div>
      <div class="player-card active" id="player1-card">
        <div class="player-name">Joueur 1</div>
        <div class="player-controls">
          <span class="key-zqsd">
            <span class="key">Z</span>
            <span style="display:flex;justify-content:center;">
              <span class="key">Q</span>
              <span class="key">S</span>
              <span class="key">D</span>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="player-slot">
      <div class="player-selection" id="player2-selection"></div>
      <div class="player-card" id="player2-card">
        <div class="player-name">Joueur 2</div>
        <div class="player-controls">
          <span class="key-arrows">
            <span class="arrow-key">&#8593;</span>
            <span style="display:flex;justify-content:center;">
              <span class="arrow-key">&#8592;</span>
              <span class="arrow-key">&#8595;</span>
              <span class="arrow-key">&#8594;</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  `;

  // Gestion de la sélection
  let selectionStep = 1; // 1: joueur 1, 2: joueur 2
  let selectedCharacters = [null, null];

  function updatePlayerImages() {
    [1, 2].forEach(player => {
      const container = document.getElementById(`player${player}-selection`);
      container.innerHTML = '';
      const idx = selectedCharacters[player - 1];
      if (idx !== null && idx < characterImages.length) {
        const img = document.createElement('img');
        img.src = characterImages[idx];
        img.alt = `Perso ${idx + 1}`;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '20px';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        img.style.boxShadow = '0 4px 16px 0 rgba(0,0,0,0.18)';
        container.appendChild(img);

        // Croix de déselection
        const cross = document.createElement('span');
        cross.textContent = '✖';
        cross.className = 'deselect-cross';
        cross.title = 'Déselectionner';
        cross.onclick = (e) => {
          e.stopPropagation();
          selectedCharacters[player - 1] = null;
          container.innerHTML = '';
          selectionStep = player;
          document.getElementById('player1-card').classList.toggle('active', selectionStep === 1);
          document.getElementById('player2-card').classList.toggle('active', selectionStep === 2);
          const banner = document.getElementById('smash-banner');
          if (banner) banner.remove();
        };
        container.appendChild(cross);
      }
    });
  }

  // Ajout du clic sur les cartes joueurs pour changer la sélection en cours
  document.addEventListener('click', function playerCardClick(e) {
    const p1 = document.getElementById('player1-card');
    const p2 = document.getElementById('player2-card');
    if (!p1 || !p2) return;

    if (p1.contains(e.target)) {
      selectionStep = 1;
      p1.classList.add('active');
      p2.classList.remove('active');
    } else if (p2.contains(e.target)) {
      selectionStep = 2;
      p2.classList.add('active');
      p1.classList.remove('active');
    }
  }, { once: true });

  players.querySelector('#player1-card').onclick = function(e) {
    selectionStep = 1;
    this.classList.add('active');
    players.querySelector('#player2-card').classList.remove('active');
    e.stopPropagation();
  };
  players.querySelector('#player2-card').onclick = function(e) {
    selectionStep = 2;
    this.classList.add('active');
    players.querySelector('#player1-card').classList.remove('active');
    e.stopPropagation();
  };

  grid.querySelectorAll('.character-placeholder').forEach((char, i) => {
    char.onmouseenter = () => showCharInfo(i);
    char.onmouseleave = hideCharInfo;
    char.onclick = () => {
      const idx = parseInt(char.dataset.index, 10);
      if (selectionStep === 1 && selectedCharacters[0] === null) {
        selectedCharacters[0] = idx;
        updatePlayerImages();
        document.getElementById('player1-card').classList.remove('active');
        document.getElementById('player2-card').classList.add('active');
        selectionStep = 2;
      } else if (selectionStep === 2 && selectedCharacters[1] === null && idx !== selectedCharacters[0]) {
        selectedCharacters[1] = idx;
        updatePlayerImages();
        document.getElementById('player2-card').classList.remove('active');
        showSmashBanner();
      }
    };
  });

  function showSmashBanner() {
    let banner = document.getElementById('smash-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'smash-banner';
      banner.style.position = 'fixed';
      banner.style.left = '0';
      banner.style.bottom = '0';
      banner.style.width = '100vw';
      banner.style.height = '120px';
      banner.style.background = 'rgba(255,224,102,0.85)';
      banner.style.display = 'flex';
      banner.style.alignItems = 'center';
      banner.style.justifyContent = 'center';
      banner.style.zIndex = '200';
      banner.style.cursor = 'pointer';
      banner.style.boxShadow = '0 -8px 32px 0 rgba(0,0,0,0.25)';
      banner.style.transition = 'background 0.2s';
      banner.onmouseenter = () => banner.style.background = 'rgba(255,224,102,1)';
      banner.onmouseleave = () => banner.style.background = 'rgba(255,224,102,0.85)';
      // Texte façon Smash
      const smashText = document.createElement('span');
      smashText.textContent = 'SMASH !';
      smashText.style.fontFamily = "'Press Start 2P', monospace";
      smashText.style.fontSize = '3.5em';
      smashText.style.letterSpacing = '0.15em';
      smashText.style.color = '#222';
      smashText.style.textShadow = '0 4px 24px #ffe066, 0 2px 2px #000';
      smashText.style.textTransform = 'uppercase';
      smashText.style.userSelect = 'none';
      banner.appendChild(smashText);
      // Clique sur la bannière = choisir la map
      banner.onclick = () => {
        banner.remove();
        showMapSelectScreen(selectedCharacters);
      };
      document.body.appendChild(banner);
    }
  }

  // Bouton retour
  const backBtn = document.createElement('button');
  backBtn.textContent = 'Retour';
  backBtn.className = 'back-invert';
  backBtn.style.position = 'absolute';
  backBtn.style.top = '32px';
  backBtn.style.left = '32px';
  backBtn.onclick = () => {
    removeScreen('characterSelectScreen');
    document.getElementById('bg-video').style.display = '';
    const banner = document.getElementById('smash-banner');
    if (banner) banner.remove();
    showGameModeScreen();
  };

  screen.appendChild(backBtn);
  screen.appendChild(grid);
  screen.appendChild(charInfo);
  screen.appendChild(separator);
  screen.appendChild(players);
  document.body.appendChild(screen);

  // Initial update
  updatePlayerImages();
}

function showSettingsScreen() {
  document.getElementById('menu').style.display = 'none';
  removeScreen('gameModeScreen');
  removeScreen('creditsScreen');
  removeScreen('characterSelectScreen');
  if (!document.getElementById('settingsScreen')) {
    const screen = document.createElement('div');
    screen.id = 'settingsScreen';
    screen.className = 'dynamic-screen';
    screen.innerHTML = `
      <h2>Paramètres</h2>
      <div class="settings-option" style="margin-bottom:18px;">
        <label>
          <input type="checkbox" id="musicToggle" checked>
          Musique
        </label>
      </div>
      <div class="settings-option" style="margin-bottom:18px;">
        <label>
          Volume
          <input type="range" id="volumeSlider" min="0" max="100" value="50">
          <span id="volumeValue" style="margin-left:8px;">50</span>
        </label>
      </div>
      <button id="backToMenu2">Retour</button>
    `;
    document.body.appendChild(screen);

    document.getElementById('musicToggle').onchange = (e) => {
      alert('Musique ' + (e.target.checked ? 'activée' : 'désactivée'));
    };
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    volumeSlider.oninput = (e) => {
      volumeValue.textContent = e.target.value;
    };
    document.getElementById('backToMenu2').onclick = () => {
      removeScreen('settingsScreen');
      showMenu();
    };
  }
}

function showCreditsScreen() {
  document.getElementById('menu').style.display = 'none';
  removeScreen('gameModeScreen');
  removeScreen('settingsScreen');
  removeScreen('characterSelectScreen');
  if (!document.getElementById('creditsScreen')) {
    const screen = document.createElement('div');
    screen.id = 'creditsScreen';
    screen.className = 'dynamic-screen';
    screen.innerHTML = `
      <h2>Crédits</h2>
      <div class="credits-list">
        <strong>Développeur principal :</strong> <span class="credits-highlight">Toi</span><br>
        <strong>Graphismes :</strong> <span class="credits-highlight">Toi</span><br>
        <strong>Musique :</strong> <span class="credits-highlight">Libre de droits</span>
      </div>
      <div class="credits-inspiration">
        Inspiré de la Manu
      </div>
      <div class="credits-thanks">
        Merci à tous ceux qui soutiennent ce projet !
      </div>
      <button id="backToMenuCredits">Retour</button>
    `;
    document.body.appendChild(screen);
    document.getElementById('backToMenuCredits').onclick = () => {
      removeScreen('creditsScreen');
      showMenu();
    };
  }
}

function removeScreen(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// Gestion du bouton Quitter
document.getElementById('quitBtn').onclick = () => {
  // Tentative de fermeture de l'onglet (ne marche que si ouvert par script)
  window.close();
  // Si la fermeture échoue, afficher un message
  setTimeout(() => {
    if (!window.closed) {
      alert('Impossible de quitter automatiquement. Fermez l\'onglet manuellement.');
    }
  }, 100);
};

document.getElementById('playBtn').onclick = showGameModeScreen;
document.getElementById('settingsBtn').onclick = showSettingsScreen;
document.getElementById('creditsBtn').onclick = showCreditsScreen;

// === JEU ===
function startGame(selectedCharacters, mapData) {
  removeScreen('characterSelectScreen');
  removeScreen('mapSelectScreen');
  const banner = document.getElementById('smash-banner');
  if (banner) banner.remove();
  document.getElementById('bg-video').style.display = 'none';
  // Création du canvas
  let gameScreen = document.getElementById('gameScreen');
  if (gameScreen) gameScreen.remove();
  gameScreen = document.createElement('div');
  gameScreen.id = 'gameScreen';
  gameScreen.style.position = 'fixed';
  gameScreen.style.top = '0';
  gameScreen.style.left = '0';
  gameScreen.style.width = '100vw';
  gameScreen.style.height = '100vh';
  gameScreen.style.background = mapData && mapData.bg ? mapData.bg : '#18191a';
  gameScreen.style.zIndex = '200';
  document.body.appendChild(gameScreen);
  // Ajout du canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'game-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  canvas.style.margin = '0 auto';
  canvas.style.background = 'transparent';
  gameScreen.appendChild(canvas);
  // UI: barres d'éjection et vies
  const ui = document.createElement('div');
  ui.id = 'game-ui';
  ui.style.position = 'absolute';
  ui.style.top = '0';
  ui.style.left = '0';
  ui.style.width = '100vw';
  ui.style.height = '100px';
  ui.style.display = 'flex';
  ui.style.justifyContent = 'space-between';
  ui.style.alignItems = 'flex-start';
  ui.style.pointerEvents = 'none';
  ui.style.zIndex = '10';
  ui.innerHTML = `
    <div id="p1-ui" style="margin:24px 0 0 48px;text-align:left;">
      <div style="font-size:1.2em;color:#ffe066;font-family:'Press Start 2P',monospace;">Joueur 1</div>
      <div id="p1-bar" style="width:220px;height:22px;background:#333;border-radius:12px;overflow:hidden;margin:8px 0 0 0;">
        <div id="p1-bar-inner" style="height:100%;width:0%;background:#ff3c00;transition:width 0.2s;"></div>
      </div>
      <div id="p1-stock" style="margin-top:8px;font-size:1.5em;color:#fff;"></div>
    </div>
    <div id="p2-ui" style="margin:24px 48px 0 0;text-align:right;">
      <div style="font-size:1.2em;color:#66e0ff;font-family:'Press Start 2P',monospace;">Joueur 2</div>
      <div id="p2-bar" style="width:220px;height:22px;background:#333;border-radius:12px;overflow:hidden;margin:8px 0 0 0;float:right;">
        <div id="p2-bar-inner" style="height:100%;width:0%;background:#ff3c00;transition:width 0.2s;"></div>
      </div>
      <div id="p2-stock" style="margin-top:8px;font-size:1.5em;color:#fff;"></div>
    </div>
  `;
  gameScreen.appendChild(ui);
  // Bouton retour menu
  const quitBtn = document.createElement('button');
  quitBtn.textContent = 'Retour Menu';
  quitBtn.style.position = 'absolute';
  quitBtn.style.top = '32px';
  quitBtn.style.left = '50%';
  quitBtn.style.transform = 'translateX(-50%)';
  quitBtn.style.zIndex = '20';
  quitBtn.style.fontSize = '1.2em';
  quitBtn.style.background = '#ffe066';
  quitBtn.style.color = '#222';
  quitBtn.style.border = 'none';
  quitBtn.style.borderRadius = '12px';
  quitBtn.style.padding = '12px 32px';
  quitBtn.style.cursor = 'pointer';
  quitBtn.onclick = () => {
    gameScreen.remove();
    document.getElementById('bg-video').style.display = '';
    showMenu();
  };
  gameScreen.appendChild(quitBtn);
  // Lancement du moteur de jeu
  launchGame(canvas, selectedCharacters, mapData);
}

// Moteur de jeu simple
function launchGame(canvas, selectedCharacters, mapData) {
  const ctx = canvas.getContext('2d');
  // Images des persos
  const characterImages = [
    'assets/lebossmetalique.png',
    'assets/leo.jpg'
  ];
  const playerSprites = [];
  let loaded = 0;
  for (let i = 0; i < 2; i++) {
    const img = new window.Image();
    img.src = characterImages[selectedCharacters[i]];
    img.onload = () => {
      loaded++;
      if (loaded === 2) requestAnimationFrame(gameLoop);
    };
    playerSprites.push(img);
  }
  // Physique
  const GRAVITY = 1.1;
  const FLOOR_Y = canvas.height * (mapData && mapData.voidY ? mapData.voidY : 0.9);
  // Plateformes dynamiques
  let platforms = [];
  if (mapData && mapData.platforms) {
    platforms = mapData.platforms.map(p => ({
      x: p.x * canvas.width,
      y: p.y * canvas.height,
      w: p.w * canvas.width,
      h: p.h * canvas.height,
      color: p.color,
      border: p.border
    }));
  } else {
    platforms = [
      { x: canvas.width/2-200, y: canvas.height-260, w: 400, h: 24, color: '#ffe066', border: '#fffbe6' }
    ];
  }
  // Joueurs
  const players = [
    {
      x: canvas.width/2-120, y: 200, vx: 0, vy: 0, w: 80, h: 80, left: 'q', right: 'd', up: 'z', down: 's', attack: 'a', color: '#ffe066', onGround: false, jumpPower: -22, ejection: 0, stock: 3, dead: false, respawnTimer: 0, hitAnim: 0
    },
    {
      x: canvas.width/2+40, y: 200, vx: 0, vy: 0, w: 80, h: 80, left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', down: 'ArrowDown', attack: '!', color: '#66e0ff', onGround: false, jumpPower: -22, ejection: 0, stock: 3, dead: false, respawnTimer: 0, hitAnim: 0
    }
  ];
  // Contrôles
  const keys = {};
  window.addEventListener('keydown', e => { keys[e.key] = true; });
  window.addEventListener('keyup', e => { keys[e.key] = false; });

  // --- Amélioration visuelle de l'attaque de base ---
  function tryAttack(attacker, defender, idx) {
    if (attacker.dead || defender.dead) return;
    // Direction de l'attaque
    const facing = attacker.vx !== 0 ? Math.sign(attacker.vx) : (defender.x > attacker.x ? 1 : -1);
    // Portée de l'attaque
    const range = 90;
    const dx = defender.x + defender.w/2 - (attacker.x + attacker.w/2);
    const dy = defender.y + defender.h/2 - (attacker.y + attacker.h/2);
    // Attaque uniquement devant
    if (Math.abs(dx) < range && Math.abs(dy) < 60 && Math.sign(dx) === facing) {
      // Ejection violente, favorise l'axe latéral
      let angle = Math.random() * Math.PI/2 - Math.PI/4 + (facing > 0 ? 0 : Math.PI); // -45° à +45° côté face
      if (Math.random() < 0.4) angle = facing > 0 ? 0 : Math.PI; // 40% chance purement latéral
      let force = 16 + defender.ejection * (0.13 + Math.random()*0.08);
      let damage = 28 + Math.random()*18;
      // Si mode tank PA actif
      if (attacker.signatureActive) {
        force *= 1.7;
        damage *= 2.2;
      }
      defender.vx += Math.cos(angle) * force;
      defender.vy += Math.sin(angle) * force - 8;
      defender.ejection += damage;
      defender.hitAnim = 18;
      defender.hitAnimDir = facing;
      defender.lastHitTime = 12;
    }
    // Animation d'attaque améliorée (arc + flash + particules)
    attacker.attackAnim = 14;
    attacker.attackAnimDir = facing;
    attacker.attackFlash = 8;
    // Génère des particules
    if (!attacker.particles) attacker.particles = [];
    for (let i = 0; i < 12; i++) {
      const a = Math.random()*Math.PI*2;
      const r = 18+Math.random()*18;
      attacker.particles.push({
        x: attacker.x+attacker.w/2+(facing||1)*50,
        y: attacker.y+attacker.h/2,
        vx: Math.cos(a)*r*0.18,
        vy: Math.sin(a)*r*0.18,
        life: 10+Math.random()*8,
        color: i%2===0?'#ffe066':'#ff3c00'
      });
    }
  }

  // --- Attaques signature associées au personnage sélectionné ---
  let signatureCooldowns = [0,0];
  let signatureActive = [0,0];
  let signatureTimers = [0,0];
  let princess = null;

  window.addEventListener('keydown', e => {
    // PA (Tank) : E pour le joueur qui a PA
    if (e.key === 'e') {
      for (let i = 0; i < 2; i++) {
        if (selectedCharacters[i] === 0 && !players[i].dead && signatureCooldowns[i] <= 0 && !signatureActive[i]) {
          signatureActive[i] = 15*60;
          signatureCooldowns[i] = 30*60;
          signatureTimers[i] = 15*60;
          players[i].signatureActive = true;
        }
      }
    }
    // Leo (Princesse) : ù pour le joueur qui a Leo
    if ((e.key === 'ù' || e.key === 'u' || e.key === 'U')) {
      for (let i = 0; i < 2; i++) {
        if (selectedCharacters[i] === 1 && !players[i].dead && signatureCooldowns[i] <= 0 && !signatureActive[i]) {
          signatureActive[i] = 15*60;
          signatureCooldowns[i] = 30*60;
          signatureTimers[i] = 15*60;
          // Invoque la princesse contre l'adversaire
          princess = {
            x: players[i].x+players[i].w/2, y: players[i].y-120, vx: 0, vy: 0, w: 60, h: 60, target: 1-i, timer: 15*60, img: null, attackTimer: 0, emoji: '👸'
          };
        }
      }
    }
  });

  // --- Boucle de jeu modifiée ---
  function gameLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Plateformes
    for (const plat of platforms) {
      ctx.save();
      ctx.fillStyle = plat.color;
      ctx.strokeStyle = plat.border;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.rect(plat.x, plat.y, plat.w, plat.h);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    // Sol (void)
    ctx.save();
    ctx.fillStyle = 'rgba(30,30,30,0.7)';
    ctx.fillRect(0, FLOOR_Y+80, canvas.width, canvas.height-FLOOR_Y-80);
    ctx.restore();
    // Particules attaque de base
    for (let i = 0; i < 2; i++) {
      const p = players[i];
      if (p.particles) {
        for (const part of p.particles) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, part.life/18);
          ctx.beginPath();
          ctx.arc(part.x, part.y, 5, 0, 2*Math.PI);
          ctx.fillStyle = part.color;
          ctx.shadowColor = part.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
          part.x += part.vx;
          part.y += part.vy;
          part.life--;
        }
        p.particles = p.particles.filter(pt => pt.life > 0);
      }
    }
    // Joueurs
    for (let i = 0; i < 2; i++) {
      const p = players[i];
      // Mort/respawn
      if (p.dead) {
        p.respawnTimer--;
        if (p.respawnTimer <= 0 && p.stock > 0) {
          respawn(p, i);
        }
        continue;
      }
      // Mouvements
      if (keys[p.left]) p.vx = -7;
      else if (keys[p.right]) p.vx = 7;
      else p.vx = 0;
      if (keys[p.up] && p.onGround) {
        p.vy = p.jumpPower;
        p.onGround = false;
      }
      // Attaque
      if (keys[p.attack] && !p.attackPressed) {
        tryAttack(p, players[1-i], i);
        p.attackPressed = true;
      }
      if (!keys[p.attack]) p.attackPressed = false;
      // Physique
      p.vy += GRAVITY;
      p.x += p.vx;
      p.y += p.vy;
      // Collisions plateformes dynamiques
      p.onGround = false;
      for (const plat of platforms) {
        if (
          p.x + p.w > plat.x && p.x < plat.x + plat.w &&
          p.y + p.h > plat.y && p.y + p.h < plat.y + plat.h + 30 &&
          p.vy > 0
        ) {
          p.y = plat.y - p.h;
          p.vy = 0;
          p.onGround = true;
        }
      }
      // Collisions sol/void
      if (p.y + p.h > FLOOR_Y) {
        p.stock--;
        p.dead = true;
        p.respawnTimer = 60;
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(p.x + p.w/2, FLOOR_Y, 60, 0, 2*Math.PI);
        ctx.fillStyle = '#ff3c00';
        ctx.fill();
        ctx.restore();
        continue;
      }
      // Bords écran
      if (p.x < 0) p.x = 0;
      if (p.x + p.w > canvas.width) p.x = canvas.width - p.w;
      // Animation de coup
      if (p.hitAnim > 0) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(p.x + p.w/2 + (p.hitAnimDir||1)*18, p.y + p.h/2, p.w/2+22, 0, 2*Math.PI);
        ctx.fillStyle = '#ff3c00';
        ctx.fill();
        ctx.restore();
        p.hitAnim--;
      }
      // Animation d'attaque améliorée
      if (p.attackAnim > 0) {
        ctx.save();
        ctx.globalAlpha = 0.5 + 0.3*Math.sin(p.attackAnim/2);
        ctx.beginPath();
        ctx.arc(p.x + p.w/2 + (p.attackAnimDir||1)*50, p.y + p.h/2, 32+6*Math.sin(p.attackAnim), 0, 2*Math.PI);
        ctx.fillStyle = '#ffe066';
        ctx.shadowColor = '#ff3c00';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();
        p.attackAnim--;
      }
      // Flash attaque
      if (p.attackFlash > 0) {
        ctx.save();
        ctx.globalAlpha = 0.18*p.attackFlash;
        ctx.beginPath();
        ctx.arc(p.x + p.w/2, p.y + p.h/2, p.w/2+32, 0, 2*Math.PI);
        ctx.fillStyle = '#fffbe6';
        ctx.fill();
        ctx.restore();
        p.attackFlash--;
      }
      // Dessin du joueur
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x + p.w/2, p.y + p.h/2, p.w/2+8, 0, 2*Math.PI);
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.drawImage(playerSprites[i], p.x, p.y, p.w, p.h);
      ctx.restore();
    }
    // --- Gestion cooldowns ---
    if (signatureCooldowns[0] > 0 && !signatureActive[0]) signatureCooldowns[0]--;
    if (signatureCooldowns[1] > 0 && !signatureActive[1]) signatureCooldowns[1]--;
    // --- Attaque signature PA (tank) ---
    for (let i = 0; i < 2; i++) {
      if (selectedCharacters[i] === 0 && signatureActive[i]) {
        players[i].color = '#b0b0b0';
        players[i].w = 90;
        players[i].h = 90;
        players[i].jumpPower = -16;
        players[i].resistance = 0.25;
        if (keys[players[i].left]) players[i].vx = -1.2;
        else if (keys[players[i].right]) players[i].vx = 1.2;
        else players[i].vx = 0;
        signatureActive[i]--;
        signatureTimers[i]--;
        if (signatureActive[i] <= 0) {
          players[i].color = '#ffe066';
          players[i].w = 80;
          players[i].h = 80;
          players[i].jumpPower = -22;
          players[i].resistance = 1;
          players[i].signatureActive = false;
        }
      }
    }
    // --- Attaque signature Leo (princesse volante) ---
    if (princess && signatureActive[princess.target === 0 ? 1 : 0]) {
      princess.timer--;
      signatureActive[princess.target === 0 ? 1 : 0]--;
      signatureTimers[princess.target === 0 ? 1 : 0]--;
      const target = players[princess.target];
      const dx = target.x+target.w/2 - princess.x;
      const dy = target.y+target.h/2 - princess.y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if (dist > 10) {
        princess.vx = dx/dist*3.5;
        princess.vy = dy/dist*3.5;
      } else {
        princess.vx = 0;
        princess.vy = 0;
      }
      princess.x += princess.vx;
      princess.y += princess.vy;
      if (princess.attackTimer <= 0 && dist < 120) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(princess.x, princess.y, 40, 0, 2*Math.PI);
        ctx.fillStyle = '#ff3c00';
        ctx.fill();
        ctx.restore();
        let angle = Math.atan2(dy, dx);
        let force = 22 + target.ejection * 0.18;
        target.vx += Math.cos(angle) * force;
        target.vy += Math.sin(angle) * force - 6;
        target.ejection += 32 + Math.random()*18;
        target.hitAnim = 16;
        target.hitAnimDir = Math.sign(dx);
        princess.attackTimer = 30;
      }
      princess.attackTimer--;
      ctx.save();
      ctx.font = '48px serif';
      ctx.globalAlpha = 0.98;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(princess.emoji, princess.x, princess.y);
      ctx.restore();
      if (princess.timer <= 0) princess = null;
    }
    // --- Cooldowns signature UI SOUS les barres de vie ---
    // UI: barres d'éjection et vies
    document.getElementById('p1-bar-inner').style.width = Math.min(players[0].ejection, 200) + 'px';
    document.getElementById('p2-bar-inner').style.width = Math.min(players[1].ejection, 200) + 'px';
    document.getElementById('p1-bar-inner').style.background = `linear-gradient(90deg,#ff3c00 ${(players[0].ejection/200)*100}%,#ffe066)`;
    document.getElementById('p2-bar-inner').style.background = `linear-gradient(90deg,#ff3c00 ${(players[1].ejection/200)*100}%,#ffe066)`;
    document.getElementById('p1-stock').innerHTML = '❤'.repeat(players[0].stock);
    document.getElementById('p2-stock').innerHTML = '❤'.repeat(players[1].stock);
    // Affichage cooldown sous la barre de vie
    let p1cd = document.getElementById('p1-cooldown');
    if (!p1cd) {
      p1cd = document.createElement('div');
      p1cd.id = 'p1-cooldown';
      p1cd.style.color = '#ffe066';
      p1cd.style.fontFamily = "'Press Start 2P', monospace";
      p1cd.style.fontSize = '1em';
      p1cd.style.marginTop = '4px';
      document.getElementById('p1-ui').appendChild(p1cd);
    }
    let p2cd = document.getElementById('p2-cooldown');
    if (!p2cd) {
      p2cd = document.createElement('div');
      p2cd.id = 'p2-cooldown';
      p2cd.style.color = '#66e0ff';
      p2cd.style.fontFamily = "'Press Start 2P', monospace";
      p2cd.style.fontSize = '1em';
      p2cd.style.marginTop = '4px';
      document.getElementById('p2-ui').appendChild(p2cd);
    }
    p1cd.textContent = (signatureActive[0] ? 'TANK ('+Math.ceil(signatureTimers[0]/60)+'s)' : (signatureCooldowns[0]>0?'CD '+Math.ceil(signatureCooldowns[0]/60)+'s':''));
    p2cd.textContent = (signatureActive[1] ? 'PRINCESSE ('+Math.ceil(signatureTimers[1]/60)+'s)' : (signatureCooldowns[1]>0?'CD '+Math.ceil(signatureCooldowns[1]/60)+'s':''));
    // Fin de partie
    if (players[0].stock <= 0 || players[1].stock <= 0) {
      ctx.save();
      ctx.globalAlpha = 0.92;
      ctx.fillStyle = '#18191a';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.globalAlpha = 1;
      ctx.font = '3em "Press Start 2P", monospace';
      ctx.fillStyle = '#ffe066';
      ctx.textAlign = 'center';
      ctx.fillText(players[0].stock <= 0 ? 'Joueur 2 gagne !' : 'Joueur 1 gagne !', canvas.width/2, canvas.height/2);
      return;
    }
    requestAnimationFrame(gameLoop);
  }
}

function showMapSelectScreen(selectedCharacters) {
  removeScreen('characterSelectScreen');
  document.getElementById('bg-video').style.display = 'none';
  let mapScreen = document.getElementById('mapSelectScreen');
  if (mapScreen) mapScreen.remove();
  mapScreen = document.createElement('div');
  mapScreen.id = 'mapSelectScreen';
  mapScreen.className = 'dynamic-screen';
  mapScreen.style.top = '10%';
  mapScreen.style.left = '50%';
  mapScreen.style.transform = 'translateX(-50%)';
  mapScreen.innerHTML = `<h2>Choisis ta map</h2>`;

  // Maps avec beaucoup plus de plateformes pour plus de fun et moins de vide !
  const maps = [
    {
      name: 'Manu Stadium',
      desc: 'Plateforme centrale + 2 flottantes + 2 latérales + 2 petites hautes.',
      id: 'manu',
      data: {
        bg: '#2a2a3a',
        platforms: [
          { x: 0.5, y: 0.85, w: 0.5, h: 0.045, color: '#ffe066', border: '#fffbe6' },
          { x: 0.32, y: 0.68, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.68, y: 0.68, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.15, y: 0.8, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.85, y: 0.8, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.25, y: 0.55, w: 0.10, h: 0.02, color: '#ffe066', border: '#fffbe6' },
          { x: 0.75, y: 0.55, w: 0.10, h: 0.02, color: '#ffe066', border: '#fffbe6' }
        ],
        voidY: 0.95
      }
    },
    {
      name: 'Simple+',
      desc: 'Plateforme centrale large + 2 moyennes + 2 petites hautes.',
      id: 'simple',
      data: {
        bg: '#232526',
        platforms: [
          { x: 0.5, y: 0.85, w: 0.7, h: 0.06, color: '#ffe066', border: '#fffbe6' },
          { x: 0.25, y: 0.7, w: 0.22, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.75, y: 0.7, w: 0.22, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.35, y: 0.55, w: 0.12, h: 0.02, color: '#ffe066', border: '#fffbe6' },
          { x: 0.65, y: 0.55, w: 0.12, h: 0.02, color: '#ffe066', border: '#fffbe6' }
        ],
        voidY: 0.96
      }
    },
    {
      name: 'Final Manu+',
      desc: 'Final D avec 2 plateformes hautes et 2 latérales.',
      id: 'final',
      data: {
        bg: 'linear-gradient(180deg,#232526 60%,#18191a 100%)',
        platforms: [
          { x: 0.5, y: 0.8, w: 0.8, h: 0.05, color: '#ffe066', border: '#fffbe6' },
          { x: 0.2, y: 0.6, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.8, y: 0.6, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.1, y: 0.9, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.9, y: 0.9, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' }
        ],
        voidY: 0.94
      }
    },
    {
      name: 'Plateforme Unique+',
      desc: 'Petite centrale + 2 latérales + 2 hautes.',
      id: 'mini',
      data: {
        bg: '#18191a',
        platforms: [
          { x: 0.5, y: 0.85, w: 0.32, h: 0.04, color: '#ffe066', border: '#fffbe6' },
          { x: 0.2, y: 0.7, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.8, y: 0.7, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.35, y: 0.55, w: 0.12, h: 0.02, color: '#ffe066', border: '#fffbe6' },
          { x: 0.65, y: 0.55, w: 0.12, h: 0.02, color: '#ffe066', border: '#fffbe6' }
        ],
        voidY: 0.97
      }
    },
    {
      name: 'Latérales+',
      desc: '3 latérales, 2 centrales, 2 hautes.',
      id: 'lateral',
      data: {
        bg: '#232526',
        platforms: [
          { x: 0.15, y: 0.8, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.7, w: 0.22, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.85, y: 0.8, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.3, y: 0.6, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.7, y: 0.6, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.5, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.85, w: 0.22, h: 0.03, color: '#ffe066', border: '#fffbe6' }
        ],
        voidY: 0.97
      }
    },
    {
      name: 'Plateformes Hautes+',
      desc: '4 hautes, 2 moyennes, 1 centrale.',
      id: 'high',
      data: {
        bg: '#232526',
        platforms: [
          { x: 0.2, y: 0.55, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.62, y: 0.55, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.35, y: 0.4, w: 0.12, h: 0.02, color: '#ffe066', border: '#fffbe6' },
          { x: 0.65, y: 0.4, w: 0.12, h: 0.02, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.7, w: 0.22, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.85, w: 0.22, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.95, w: 0.22, h: 0.03, color: '#ffe066', border: '#fffbe6' }
        ],
        voidY: 0.97
      }
    },
    {
      name: 'Plateformes Basses+',
      desc: '3 basses, 2 moyennes, 2 hautes.',
      id: 'low',
      data: {
        bg: '#232526',
        platforms: [
          { x: 0.2, y: 0.92, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.62, y: 0.92, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.8, w: 0.22, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.3, y: 0.7, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.7, y: 0.7, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.6, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.5, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' }
        ],
        voidY: 0.98
      }
    },
    {
      name: 'Mini Final+',
      desc: 'Petite centrale + 2 latérales + 2 hautes.',
      id: 'minifinal',
      data: {
        bg: '#232526',
        platforms: [
          { x: 0.5, y: 0.85, w: 0.18, h: 0.03, color: '#ffe066', border: '#fffbe6' },
          { x: 0.2, y: 0.7, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.8, y: 0.7, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.35, y: 0.55, w: 0.10, h: 0.02, color: '#ffe066', border: '#fffbe6' },
          { x: 0.65, y: 0.55, w: 0.10, h: 0.02, color: '#ffe066', border: '#fffbe6' }
        ],
        voidY: 0.98
      }
    },
    {
      name: 'Escalier+',
      desc: 'Escalier + plateformes latérales et hautes.',
      id: 'escalier',
      data: {
        bg: '#232526',
        platforms: [
          { x: 0.1, y: 0.9, w: 0.15, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.3, y: 0.75, w: 0.15, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.6, w: 0.15, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.7, y: 0.45, w: 0.15, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.85, y: 0.8, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.15, y: 0.8, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' },
          { x: 0.5, y: 0.3, w: 0.13, h: 0.025, color: '#ffe066', border: '#fffbe6' }
        ],
        voidY: 0.99
      }
    }
  ];

  // Affichage des maps en grille 5xN avec miniatures améliorées
  const mapList = document.createElement('div');
  mapList.style.display = 'grid';
  mapList.style.gridTemplateColumns = 'repeat(5, 1fr)';
  mapList.style.gap = '32px';
  mapList.style.marginTop = '32px';
  maps.forEach((map, idx) => {
    const card = document.createElement('div');
    card.style.background = '#232526';
    card.style.border = '2px solid #ffe066';
    card.style.borderRadius = '18px';
    card.style.padding = '18px 18px 12px 18px';
    card.style.cursor = 'pointer';
    card.style.minWidth = '160px';
    card.style.textAlign = 'center';
    card.style.boxShadow = '0 4px 16px 0 rgba(0,0,0,0.18)';
    card.style.transition = 'transform 0.2s, box-shadow 0.2s';
    card.onmouseenter = () => card.style.transform = 'scale(1.07)';
    card.onmouseleave = () => card.style.transform = 'scale(1)';
    card.innerHTML = `<div style='font-size:1.1em;color:#ffe066;margin-bottom:8px;'>${map.name}</div>`;
    // Canvas preview amélioré
    const preview = document.createElement('canvas');
    preview.width = 160;
    preview.height = 90;
    preview.style.display = 'block';
    preview.style.margin = '0 auto 8px auto';
    const ctxPrev = preview.getContext('2d');
    // fond
    if(map.data.bg.startsWith('linear')){
      const grad = ctxPrev.createLinearGradient(0,0,0,preview.height);
      grad.addColorStop(0, '#18191a');
      grad.addColorStop(0.6, '#18191a');
      grad.addColorStop(1, '#232526');
      ctxPrev.fillStyle = grad;
      ctxPrev.fillRect(0,0,preview.width,preview.height);
    } else {
      ctxPrev.fillStyle = map.data.bg;
      ctxPrev.fillRect(0,0,preview.width,preview.height);
    }
    // plateformes avec ombre et effet
    map.data.platforms.forEach(p => {
      ctxPrev.save();
      ctxPrev.shadowColor = '#222';
      ctxPrev.shadowBlur = 8;
      ctxPrev.fillStyle = p.color;
      ctxPrev.strokeStyle = p.border;
      ctxPrev.lineWidth = 3;
      ctxPrev.beginPath();
      ctxPrev.rect(p.x*preview.width, p.y*preview.height, p.w*preview.width, p.h*preview.height);
      ctxPrev.fill();
      ctxPrev.shadowBlur = 0;
      ctxPrev.stroke();
      ctxPrev.restore();
    });
    // Ajout d'un petit effet "spot" sur la plateforme principale
    if(map.data.platforms.length > 0) {
      const main = map.data.platforms[0];
      ctxPrev.save();
      ctxPrev.globalAlpha = 0.18;
      ctxPrev.beginPath();
      ctxPrev.ellipse(main.x*preview.width+main.w*preview.width/2, main.y*preview.height+main.h*preview.height/2, main.w*preview.width*0.7, main.h*preview.height*2.5, 0, 0, 2*Math.PI);
      ctxPrev.fillStyle = '#ffe066';
      ctxPrev.fill();
      ctxPrev.restore();
    }
    card.appendChild(preview);
    card.innerHTML += `<div style='font-size:0.95em;color:#fffbe6;margin-bottom:8px;'>${map.desc}</div>`;
    card.onclick = () => {
      mapScreen.remove();
      startGame(selectedCharacters, map.data);
    };
    mapList.appendChild(card);
  });
  mapScreen.appendChild(mapList);
  // Bouton retour
  const backBtn = document.createElement('button');
  backBtn.textContent = 'Retour';
  backBtn.className = 'back-invert';
  backBtn.style.position = 'absolute';
  backBtn.style.top = '32px';
  backBtn.style.left = '32px';
  backBtn.onclick = () => {
    mapScreen.remove();
    showCharacterSelectScreen();
  };
  mapScreen.appendChild(backBtn);
  document.body.appendChild(mapScreen);
  // S'assurer qu'aucun smash-banner n'est visible
  const banner = document.getElementById('smash-banner');
  if (banner) banner.remove();
}