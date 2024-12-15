const explorationData = {
    easy: { gold: 10, xp: 5, hpLoss: 1 },
    medium: { gold: 20, xp: 10, hpLoss: 5 },
    hard: { gold: 50, xp: 20, hpLoss: 10 }
};

function renderExplorationOptions() {
    const centerPanel = document.getElementById("center-panel");
    if (!centerPanel) {
        monitor.trackError("Element #center-panel nie został znaleziony.");
        return;
    }

    centerPanel.innerHTML = `<h2>Eksploracja</h2><p>Wybierz poziom trudności:</p>`;

    const difficulties = Object.keys(explorationData);
    difficulties.forEach(difficulty => {
        const button = document.createElement("button");
        button.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        button.onclick = () => startExploration(difficulty);
        centerPanel.appendChild(button);
    });
}

function startExploration(difficulty) {
    const result = explorationData[difficulty];
    if (!result) {
        monitor.trackError(`Nieznany poziom trudności eksploracji: ${difficulty}`);
        return;
    }

    inventory.resources.gold = (inventory.resources.gold || 0) + result.gold;
    gameState.experience += result.xp;
    gameState.hp -= result.hpLoss;

    updateResourcesUI();
    updateUI();

    const centerPanel = document.getElementById("center-panel");
    if (centerPanel) {
        centerPanel.innerHTML = `
            <h2>Wynik Eksploracji</h2>
            <p>Złoto: ${result.gold}</p>
            <p>XP: ${result.xp}</p>
            <p>Utrata HP: ${result.hpLoss}</p>
        `;
    }
    monitor.log(`Eksploracja zakończona: Złoto=${result.gold}, XP=${result.xp}, Utrata HP=${result.hpLoss}`);
}

// Eksport funkcji do globalnego użytku
window.renderExplorationOptions = renderExplorationOptions;
window.startExploration = startExploration;
