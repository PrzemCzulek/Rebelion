function updateUI() {
    updateHealthUI();
    updateResourcesUI();
    updateInventoryUI();
    // Inne elementy UI można tu zaktualizować
}

function updateHealthUI() {
    const healthText = document.getElementById("hp");
    const healthBar = document.getElementById("health-bar");

    if (healthText && healthBar) {
        const maxHp = gameState.maxHp || 100; // Domyślne maksymalne HP
        const currentHp = gameState.hp || 0;

        // Aktualizacja tekstu HP
        healthText.textContent = `${currentHp}/${maxHp}`;

        // Aktualizacja paska zdrowia
        const progress = (currentHp / maxHp) * 100;
        healthBar.style.width = `${progress}%`;
        healthBar.textContent = `${Math.floor(progress)}%`;

        monitor.log(`HP zostało zaktualizowane: ${currentHp}/${maxHp}`);
    } else {
        monitor.trackError("Elementy #hp lub #health-bar nie zostały znalezione w DOM.");
    }
}

function updateResourcesUI() {
    const resourcesElement = document.getElementById("resources");
    if (!resourcesElement) {
        monitor.trackError("Element #resources nie został znaleziony w DOM.");
        return;
    }

    resourcesElement.innerHTML = ""; // Czyść element przed dodaniem zasobów
    for (const [resource, amount] of Object.entries(inventory.resources || {})) {
        const resourceElement = document.createElement("div");
        resourceElement.textContent = `${resource}: ${amount}`;
        resourcesElement.appendChild(resourceElement);
    }
    monitor.log("Zasoby zostały zaktualizowane.");
}

function updateInventoryUI() {
    const inventoryElement = document.getElementById("inventory");
    if (!inventoryElement) {
        monitor.log("Pominięto aktualizację: element #inventory nie istnieje w DOM.");
        return;
    }

    inventoryElement.innerHTML = ""; // Wyczyść zawartość przed dodaniem nowych elementów
    if (!inventory.items || inventory.items.length === 0) {
        inventoryElement.innerHTML = "<p>Brak przedmiotów w ekwipunku.</p>";
        return;
    }

    for (const item of inventory.items) {
        const itemElement = document.createElement("div");
        itemElement.textContent = `${item.name} (x${item.quantity})`;
        inventoryElement.appendChild(itemElement);
    }
}

function loadCategory(category) {
    const centerPanel = document.getElementById('center-panel');
    centerPanel.innerHTML = ""; // Czyści poprzednią zawartość

    switch (category) {
        case 'exploration':
            renderExplorationOptions();
            break;
        case 'extraction':
            renderExtractionOptions(); // Poprawione wywołanie
            break;
        case 'inventory':
            updateInventoryUI();
            break;
        default:
            centerPanel.innerHTML = "<p>Wybierz poprawną kategorię.</p>";
    }
}



// Eksport funkcji do globalnego użytku
window.updateUI = updateUI;
window.updateHealthUI = updateHealthUI;
window.updateResourcesUI = updateResourcesUI;
window.updateInventoryUI = updateInventoryUI;
