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
}

function showGameModeScreen() {
  document.getElementById('menu').style.display = 'none';
  removeScreen('settingsScreen');
  if (!document.getElementById('gameModeScreen')) {
    const screen = document.createElement('div');
    screen.id = 'gameModeScreen';
    screen.style.display = 'flex';
    screen.style.flexDirection = 'column';
    screen.style.alignItems = 'flex-start';
    screen.style.position = 'absolute';
    screen.style.top = '20%';
    screen.style.left = '5%';
    screen.innerHTML = `
      <h2>Sélection du mode de jeu</h2>
      <button id="backToMenu1">Retour</button>
    `;
    document.body.appendChild(screen);
    document.getElementById('backToMenu1').onclick = showMenu;
  }
}

function showSettingsScreen() {
  document.getElementById('menu').style.display = 'none';
  removeScreen('gameModeScreen');
  if (!document.getElementById('settingsScreen')) {
    const screen = document.createElement('div');
    screen.id = 'settingsScreen';
    screen.style.display = 'flex';
    screen.style.flexDirection = 'column';
    screen.style.alignItems = 'flex-start';
    screen.style.position = 'absolute';
    screen.style.top = '20%';
    screen.style.left = '5%';
    screen.innerHTML = `
      <h2>Paramètres</h2>
      <button id="backToMenu2">Retour</button>
    `;
    document.body.appendChild(screen);
    document.getElementById('backToMenu2').onclick = showMenu;
  }
}

function removeScreen(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

document.getElementById('playBtn').onclick = showGameModeScreen;
document.getElementById('settingsBtn').onclick = showSettingsScreen;