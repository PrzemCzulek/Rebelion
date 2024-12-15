// Aktualizacja inventory.js
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

function addResource(resourceName, quantity = 1) {
    if (!inventory.resources) {
        inventory.resources = {};
    }

    if (!inventory.resources[resourceName]) {
        inventory.resources[resourceName] = 0;
    }

    inventory.resources[resourceName] += quantity;
    monitor.log(`Dodano zasób: ${resourceName} (x${quantity})`);
    updateResourcesUI();
}

function addItemToInventory(itemName, quantity = 1) {
    if (!inventory.items) {
        inventory.items = [];
    }

    const existingItem = inventory.items.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        inventory.items.push({ name: itemName, quantity });
    }
    monitor.log(`Dodano do ekwipunku: ${itemName} (x${quantity})`);
    updateInventoryUI();
}

function initializeInventory() {
    if (!inventory.items) {
        inventory.items = [];
    }

    if (!inventory.resources) {
        inventory.resources = {};
    }

    monitor.log("Ekwipunek został zainicjalizowany.");
    updateInventoryUI();
    updateResourcesUI();
}

const inventory = {
    items: [],
    resources: {}
};

// Eksport funkcji do globalnego użytku
window.addItemToInventory = addItemToInventory;
window.addResource = addResource;
window.initializeInventory = initializeInventory;
window.updateInventoryUI = updateInventoryUI;

// Inicjalizacja ekwipunku po załadowaniu strony
window.addEventListener("DOMContentLoaded", initializeInventory);

// Placeholdery dla managerów
const cooldownManager = {
    log: () => monitor.log("cooldownManager jest pusty.")
};

const explorationManager = {
    log: () => monitor.log("explorationManager jest pusty.")
};

const inventoryManager = {
    log: () => monitor.log("inventoryManager jest pusty.")
};

window.cooldownManager = cooldownManager;
window.explorationManager = explorationManager;
window.inventoryManager = inventoryManager;
