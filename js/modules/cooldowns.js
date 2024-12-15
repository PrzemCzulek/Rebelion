// cooldowns.js

/**
 * Zarządzanie cooldownami akcji w grze.
 */
let cooldowns = {
    actions: {}
};

/**
 * Ustawia cooldown dla określonej akcji.
 * @param {string} action - Nazwa akcji (np. "action-woodcutting").
 * @param {number} duration - Czas trwania cooldownu w milisekundach.
 */
function setCooldown(action, duration) {
    if (!cooldowns.actions[action]) {
        cooldowns.actions[action] = false;
    }

    cooldowns.actions[action] = true;
    monitor.log(`Cooldown rozpoczęty dla: ${action} (${duration} ms)`);

    const button = document.getElementById(action);
    if (button) {
        const cooldownTimer = document.createElement("span");
        cooldownTimer.classList.add("cooldown-timer");
        button.disabled = true;
        button.appendChild(cooldownTimer);

        let remainingTime = duration;
        const interval = setInterval(() => {
            remainingTime -= 100;
            cooldownTimer.textContent = ` (${Math.ceil(remainingTime / 1000)}s)`;

            if (remainingTime <= 0) {
                clearInterval(interval);
                cooldowns.actions[action] = false;
                button.disabled = false;
                cooldownTimer.remove();
                monitor.log(`Cooldown zakończony dla: ${action}`);
            }
        }, 100);
    } else {
        monitor.log(`Przycisk o ID "${action}" nie istnieje. Cooldown został ustawiony.`);
    }
}

/**
 * Sprawdza, czy dana akcja jest na cooldownie.
 * @param {string} action - Nazwa akcji.
 * @returns {boolean} - True, jeśli akcja jest na cooldownie.
 */
function isOnCooldown(action) {
    return !!cooldowns.actions[action];
}

/**
 * Obsługuje kliknięcie z uwzględnieniem cooldownu.
 * @param {string} action - Nazwa akcji.
 * @param {Function} callback - Funkcja do wykonania, jeśli cooldown nie jest aktywny.
 */
function handleActionWithCooldown(action, callback) {
    if (isOnCooldown(action)) {
        monitor.log(`Akcja "${action}" jest na cooldownie.`);
    } else {
        callback();
        setCooldown(action, 3000); // Przykładowy cooldown: 3 sekundy
    }
}

/**
 * Inicjalizuje system cooldownów.
 */
function initializeCooldowns() {
    monitor.log("System cooldownów został zainicjalizowany.");
}

// Inicjalizacja po załadowaniu strony
window.addEventListener("DOMContentLoaded", initializeCooldowns);
