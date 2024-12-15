// monitor.js

/**
 * System monitorujący logi i błędy w grze.
 */
const monitor = {
    logs: [],
    errors: [],

    /**
     * Dodaje nowy log do systemu.
     * @param {string} message - Wiadomość logu.
     */
    log(message) {
        this.logs.push({ timestamp: new Date(), message });
        console.log(`[LOG] ${message}`);
    },

    /**
     * Rejestruje błąd w systemie monitorującym.
     * @param {string} error - Treść błędu.
     */
    trackError(error) {
        this.errors.push({ timestamp: new Date(), error });
        console.error(`[ERROR] ${error}`);
    },

    /**
     * Waliduje stan gry.
     */
    validateGameState() {
        const { hp, experience, level } = gameState;

        if (hp < 0) {
            gameState.hp = 0;
            this.log("HP gracza zresetowane do 0.");
        }
        if (experience < 0) {
            this.trackError("Doświadczenie nie może być ujemne.");
        }
        if (level < 1) {
            this.trackError("Poziom gracza nie może być niższy niż 1.");
        }
    },

    /**
     * Waliduje ekwipunek i surowce gracza.
     */
    validateInventory() {
        for (const [resource, amount] of Object.entries(inventory.resources)) {
            if (amount < 0) {
                this.trackError(`Ilość surowca ${resource} jest ujemna.`);
            }
        }
        inventory.items.forEach(item => {
            if (!item.name || item.quantity < 0) {
                this.trackError(`Nieprawidłowy przedmiot w ekwipunku: ${JSON.stringify(item)}`);
            }
        });
    },

    /**
     * Wykonuje diagnostykę wszystkich systemów gry.
     */
    runDiagnostics() {
        this.log("Rozpoczęcie diagnostyki systemu.");
        this.validateGameState();
        this.validateInventory();
        this.log("Diagnostyka zakończona.");
    }
};

// Eksport systemu monitorowania
window.monitor = monitor;

// Inicjalizacja diagnostyki po załadowaniu strony
window.addEventListener("DOMContentLoaded", () => {
    monitor.runDiagnostics();
});
