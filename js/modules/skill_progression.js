// skill_progression.js

/**
 * System biegłości dla różnych aktywności (np. zbieranie drewna, kopanie kamieni).
 */
let skills = {
    woodcutting: {
        level: 1,
        experience: 0,
        nextLevelExp: 10
    },
    mining: {
        level: 1,
        experience: 0,
        nextLevelExp: 10
    }
};

/**
 * Dodaje doświadczenie do określonej biegłości.
 * @param {string} skill - Nazwa umiejętności (np. "woodcutting", "mining").
 * @param {number} amount - Ilość zdobywanego doświadczenia.
 */
function addSkillExperience(skill, amount) {
    if (skills[skill]) {
        skills[skill].experience += amount;
        if (skills[skill].experience >= skills[skill].nextLevelExp) {
            levelUpSkill(skill);
        }
        updateSkillsUI(); // Aktualizuj UI po zmianach
    }
}

/**
 * Podnosi poziom danej umiejętności.
 * @param {string} skill - Nazwa umiejętności.
 */
function levelUpSkill(skill) {
    if (skills[skill]) {
        skills[skill].level += 1;
        skills[skill].experience -= skills[skill].nextLevelExp;
        skills[skill].nextLevelExp = Math.floor(skills[skill].nextLevelExp * 1.5);
        
        monitor.log(`Awansowano biegłość ${skill} na poziom ${skills[skill].level}.`);

        // Logika odblokowania nowych surowców
        const extractionSkills = activities.extraction;
        for (const activity in extractionSkills) {
            const { name, unlockLevel } = extractionSkills[activity];
            if (unlockLevel === skills[skill].level) {
                monitor.log(`Odblokowano nową aktywność: ${name}`);
            }
        }

        updateSkillsUI(); // Aktualizuj UI po awansie
    }
}

/**
 * Aktualizuje interfejs użytkownika dla biegłości i akcji.
 */
function updateSkillsUI() {
    const skillContainer = document.getElementById("skills");
    if (skillContainer) {
        skillContainer.innerHTML = "";
        for (const [skill, data] of Object.entries(skills)) {
            const skillElement = document.createElement("div");
            skillElement.textContent = `${skill}: Poziom ${data.level} (${data.experience}/${data.nextLevelExp} EXP)`;
            skillContainer.appendChild(skillElement);
        }
    }
}

/**
 * Dodaje nową biegłość do systemu.
 * @param {string} skill - Nazwa nowej biegłości.
 */
function addNewSkill(skill) {
    if (skills[skill]) return;
    skills[skill] = {
        level: 1,
        experience: 0,
        nextLevelExp: 10
    };
    updateSkillsUI();
}

// Inicjalizacja biegłości po załadowaniu strony
window.addEventListener("DOMContentLoaded", updateSkillsUI);
