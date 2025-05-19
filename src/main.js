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
      banner.textContent = 'Smash ?';
      banner.style.position = 'fixed';
      banner.style.top = '50%';
      banner.style.left = '50%';
      banner.style.transform = 'translate(-50%, -50%)';
      banner.style.background = 'rgba(34,34,34,0.97)';
      banner.style.color = '#ffe066';
      banner.style.fontSize = '3em';
      banner.style.fontFamily = "'Press Start 2P', monospace";
      banner.style.padding = '32px 120px';
      banner.style.borderRadius = '32px';
      banner.style.boxShadow = '0 8px 32px 0 rgba(0,0,0,0.45)';
      banner.style.zIndex = '100';
      banner.style.textAlign = 'center';
      banner.style.letterSpacing = '4px';
      banner.style.animation = 'fadeInUp 0.7s cubic-bezier(.23,1.02,.58,.99)';
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