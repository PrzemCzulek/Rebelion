// game_logic.js

let gameState = {
    level: 1,
    experience: 0,
    nextLevel: 100,
    hp: 100, // Maksymalne zdrowie gracza
    resources: 0,
    lastAction: "Brak",
    tickInterval: 1000 // Milisekundy między kolejnymi cyklami gry
};

/**
 * Główna pętla gry - uruchamiana w określonych odstępach czasu.
 */
function gameLoop() {
    updateGameState();
    executeModules();
    monitor.validateGameState();
    updateUI(); // Synchronizacja interfejsu użytkownika
}

/**
 * Moduły gry, które mogą być rozszerzane dynamicznie.
 */
const gameModules = {
    cooldowns: () => {
        if (typeof cooldownManager !== "undefined" && cooldownManager.updateCooldowns) {
            cooldownManager.updateCooldowns();
        } else {
            monitor.log("cooldownManager nie jest zdefiniowany.");
        }
    },
    exploration: () => {
        if (typeof explorationManager !== "undefined" && explorationManager.updateExploration) {
            explorationManager.updateExploration();
        } else {
            monitor.log("explorationManager nie jest zdefiniowany.");
        }
    },
    inventory: () => {
        if (typeof inventoryManager !== "undefined" && inventoryManager.updateInventory) {
            inventoryManager.updateInventory();
        } else {
            monitor.log("inventoryManager nie jest zdefiniowany.");
        }
    }
};

/**
 * Dynamiczne wykonywanie modułów gry.
 */
function executeModules() {
    for (const module in gameModules) {
        try {
            if (typeof gameModules[module] === "function") {
                gameModules[module]();
            }
        } catch (error) {
            monitor.trackError(`Błąd w module ${module}: ${error.message}`);
        }
    }
}

/**
 * Aktualizuje stan gry, w tym poziomy i doświadczenie.
 */
function updateGameState() {
    if (gameState.experience >= gameState.nextLevel) {
        levelUp();
    }
}

/**
 * Logika awansu na wyższy poziom.
 */
function levelUp() {
    gameState.level += 1;
    gameState.experience = 0;
    gameState.nextLevel = Math.floor(gameState.nextLevel * 1.5);
    gameState.lastAction = `Awans na poziom ${gameState.level}`;
    monitor.log(`Gracz awansował na poziom ${gameState.level}`);
}

/**
 * Rejestruje nowy moduł gry.
 * @param {string} moduleName - Nazwa modułu.
 * @param {Function} moduleFunction - Funkcja obsługująca moduł.
 */
function registerGameModule(moduleName, moduleFunction) {
    if (typeof moduleFunction === "function") {
        gameModules[moduleName] = moduleFunction;
        monitor.log(`Zarejestrowano moduł: ${moduleName}`);
    } else {
        monitor.trackError(`Nie można zarejestrować modułu ${moduleName}: brak funkcji.`);
    }
}

/**
 * Funkcja inicjalizująca grę i uruchamiająca pętlę gry.
 */
function startGame() {
    monitor.log("Gra została uruchomiona.");
    setInterval(gameLoop, gameState.tickInterval);
}

/**
 * Funkcja resetująca stan gry.
 */
function resetGame() {
    gameState = {
        level: 1,
        experience: 0,
        nextLevel: 100,
        hp: 100,
        resources: 0,
        lastAction: "Brak",
        tickInterval: 1000
    };
    monitor.log("Gra została zresetowana.");
    updateUI();
}

// Eksport funkcji globalnych
window.resetGame = resetGame;
window.startGame = startGame;
window.registerGameModule = registerGameModule;

// Rozpoczęcie gry
startGame();
