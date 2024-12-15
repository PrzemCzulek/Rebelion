// action_handlers.js

/**
 * Mapuje biegłości na odpowiednie surowce.
 */
function getResourceForSkill(skill) {
    const skillToResourceMap = {
        woodcutting: "wood",
        mining: "stone"
    };
    return skillToResourceMap[skill] || null;
}

/**
 * Inicjalizuje dynamiczne akcje w grze.
 * Generuje przyciski dla każdej biegłości i przypisuje im odpowiednie działania.
 */
function initializeActions() {
    monitor.log("Sekcja #actions została wyłączona w tej wersji gry.");
}


/**
 * Aktualizuje sekcję debug z ostatnią wykonaną akcją.
 * @param {string} actionDescription - Opis ostatniej akcji.
 */
function updateLastAction(actionDescription) {
    const lastActionElement = document.getElementById("last-action");
    if (lastActionElement) {
        lastActionElement.textContent = actionDescription;
    } else {
        monitor.trackError("Sekcja debug (#last-action) nie została znaleziona.");
    }
}

// Dodanie widoczności globalnej funkcji (dla potencjalnych testów)
window.updateLastAction = updateLastAction;

// Inicjalizacja akcji po załadowaniu strony
window.addEventListener("DOMContentLoaded", initializeActions);
