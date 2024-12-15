// responsiveness.js

/**
 * Mechanizm odpowiedzialny za dostosowanie interfejsu gry do różnych rozdzielczości ekranów.
 */
const responsiveness = {
    breakpoints: {
        mobile: 768,
        tablet: 1024
    },

    /**
     * Wykrywa obecny typ urządzenia na podstawie szerokości ekranu.
     * @returns {string} - "mobile", "tablet", "desktop".
     */
    getDeviceType() {
        const width = window.innerWidth;
        if (width <= this.breakpoints.mobile) return "mobile";
        if (width <= this.breakpoints.tablet) return "tablet";
        return "desktop";
    },

    /**
     * Dostosowuje układ interfejsu w zależności od typu urządzenia.
     */
    adjustLayout() {
        const deviceType = this.getDeviceType();
        const gameContainer = document.getElementById("game-container");

        if (!gameContainer) {
            monitor.trackError("Element #game-container nie został znaleziony.");
            return;
        }

        gameContainer.classList.remove("mobile-layout", "tablet-layout", "desktop-layout");
        gameContainer.classList.add(`${deviceType}-layout`);

        // Specyficzne dostosowania dla urządzeń mobilnych
        if (deviceType === "mobile") {
            this.adjustMobileLayout();
        } else {
            this.resetMobileLayout();
        }

        monitor.log(`Dostosowano układ interfejsu do urządzenia: ${deviceType}.`);
    },

    /**
     * Specyficzne ustawienia dla urządzeń mobilnych.
     */
    adjustMobileLayout() {
        const menuButtons = document.querySelectorAll("#extraction-menu button");
        menuButtons.forEach(button => {
            button.style.fontSize = "0.8rem";
            button.style.padding = "8px 12px";
        });
    },

    /**
     * Przywraca domyślne ustawienia dla urządzeń większych niż mobilne.
     */
    resetMobileLayout() {
        const menuButtons = document.querySelectorAll("#extraction-menu button");
        menuButtons.forEach(button => {
            button.style.fontSize = "1rem";
            button.style.padding = "10px 20px";
        });
    },

    /**
     * Inicjalizuje mechanizm responsywności.
     */
    init() {
        window.addEventListener("resize", () => this.adjustLayout());
        this.adjustLayout(); // Wywołanie początkowe
    }
};

// Eksport modułu responsywności
window.responsiveness = responsiveness;

// Inicjalizacja po załadowaniu strony
window.addEventListener("DOMContentLoaded", () => responsiveness.init());
