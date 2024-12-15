const saveManager = {
    saveGame() {
        try {
            localStorage.setItem('gameState', JSON.stringify(gameState));
            monitor.log('Gra została zapisana.');
        } catch (error) {
            monitor.trackError('Nie udało się zapisać gry: ' + error.message);
        }
    },

    loadGame() {
        try {
            const savedState = localStorage.getItem('gameState');
            if (savedState) {
                Object.assign(gameState, JSON.parse(savedState));
                monitor.log('Gra została wczytana.');
                updateUI();
            } else {
                monitor.log('Brak zapisanego stanu gry.');
            }
        } catch (error) {
            monitor.trackError('Nie udało się wczytać gry: ' + error.message);
        }
    },

    resetGame() {
        try {
            localStorage.removeItem('gameState');
            Object.assign(gameState, {
                stats: {
                    level: 1,
                    experience: 0,
                    hp: 100,
                    maxHp: 100,
                },
                inventory: {
                    items: [],
                    resources: {},
                },
                progress: {
                    exploration: null,
                    extraction: null,
                },
                settings: {
                    darkMode: false,
                    sound: true,
                },
            });
            monitor.log('Gra została zresetowana.');
            updateUI();
        } catch (error) {
            monitor.trackError('Nie udało się zresetować gry: ' + error.message);
        }
    },
};

window.saveManager = saveManager;

window.addEventListener('DOMContentLoaded', () => saveManager.loadGame());
