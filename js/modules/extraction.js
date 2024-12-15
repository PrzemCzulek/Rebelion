let activeSession = null; // Deklaracja aktywnej sesji wydobycia
let activities = null; // Deklaracja aktywności wydobycia

async function loadActivities() {
    try {
        const response = await fetch("../data/activities.json");
        activities = await response.json();
        monitor.log("Dane aktywności zostały załadowane.");
    } catch (error) {
        monitor.trackError(`Błąd podczas ładowania activities.json: ${error.message}`);
    }
}

function toggleCategory(category) {
    const optionsContainer = document.getElementById("extraction-options");
    if (!optionsContainer) {
        monitor.trackError("Element #extraction-options nie został znaleziony.");
        return;
    }

    optionsContainer.innerHTML = ""; // Czyści poprzednie opcje

    if (!activities || !activities.extraction) {
        monitor.trackError("Dane aktywności wydobycia nie zostały załadowane.");
        return;
    }

    const categoryOptions = Object.entries(activities.extraction).filter(([key, value]) =>
        value.resource === category
    );

    if (categoryOptions.length === 0) {
        optionsContainer.innerHTML = "<p>Brak opcji dla tej kategorii.</p>";
        return;
    }

    categoryOptions.forEach(([key, value]) => {
        const button = document.createElement("button");
        button.textContent = value.name;
        button.id = `action-${key}`;
        button.onclick = () => toggleExtraction(key);
        optionsContainer.appendChild(button);
    });

    monitor.log(`Załadowano opcje wydobycia dla kategorii: ${category}`);
}

function toggleExtraction(activity) {
    const button = document.getElementById(`action-${activity}`);
    if (!button) {
        monitor.trackError(`Przycisk dla aktywności ${activity} nie został znaleziony.`);
        return;
    }

    if (activeSession === activity) {
        activeSession = null;
        button.classList.remove("active");
        monitor.log(`Zatrzymano wydobycie: ${activity}`);
        return;
    }

    activeSession = activity;
    button.classList.add("active");
    monitor.log(`Rozpoczęto zapętlenie wydobycia: ${activity}`);
    performExtraction(activity);
}

function performExtraction(activity) {
    if (!activities) {
        monitor.trackError("Dane aktywności nie zostały załadowane.");
        return;
    }

    const activityData = activities.extraction[activity];
    if (!activityData) {
        monitor.trackError(`Nie znaleziono danych dla aktywności: ${activity}`);
        return;
    }

    setTimeout(() => {
        addResource(activityData.resource, 1);
        monitor.log(`Wydobyto: ${activityData.resource}`);
        updateResourcesUI();

        if (activeSession === activity) {
            performExtraction(activity);
        }
    }, activityData.cooldown);
}

function renderExtractionOptions() {
    let optionsContainer = document.getElementById("extraction-options");

    if (!optionsContainer) {
        const centerPanel = document.getElementById("center-panel");
        if (!centerPanel) {
            monitor.trackError("Element #center-panel nie został znaleziony.");
            return;
        }

        // Tworzenie #extraction-options, jeśli nie istnieje
        optionsContainer = document.createElement("div");
        optionsContainer.id = "extraction-options";
        centerPanel.appendChild(optionsContainer);
        monitor.log("Element #extraction-options został dynamicznie stworzony.");
    }

    if (!activities || !activities.extraction) {
        monitor.trackError("Dane aktywności wydobycia nie zostały załadowane.");
        optionsContainer.innerHTML = "<p>Brak danych wydobycia.</p>";
        return;
    }

    optionsContainer.innerHTML = ""; // Czyści poprzednią zawartość

    const categories = Object.keys(activities.extraction);
    if (categories.length === 0) {
        optionsContainer.innerHTML = "<p>Brak dostępnych opcji wydobycia.</p>";
        return;
    }

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.onclick = () => toggleCategory(category);
        optionsContainer.appendChild(button);
    });

    monitor.log("Opcje wydobycia zostały załadowane.");
}


async function loadActivities() {
    try {
        const response = await fetch("../data/activities.json");
        activities = await response.json();
        monitor.log("Dane aktywności zostały załadowane.");
    } catch (error) {
        monitor.trackError(`Błąd podczas ładowania activities.json: ${error.message}`);
    }
}


// Eksport funkcji do globalnego użytku
window.renderExtractionOptions = renderExtractionOptions;



// Eksport funkcji do globalnego użytku
window.renderExtractionOptions = renderExtractionOptions;


// Ładowanie danych aktywności po załadowaniu strony
window.addEventListener("DOMContentLoaded", loadActivities);
