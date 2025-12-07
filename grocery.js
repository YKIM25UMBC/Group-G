/* --- GROCERY LIST LOGIC --- */
document.addEventListener("DOMContentLoaded", () => {
    
    // Select Elements
    const input = document.getElementById("itemInput");
    const addBtn = document.getElementById("addBtn");
    const list = document.getElementById("groceryList");
    const clearBtn = document.getElementById("clearBtn");

// ====================!!!! BACKEND !!!!!================================
    // Load saved items from local storage - THIS IS MOCK DATA! PLS REPLACE

    let items = JSON.parse(localStorage.getItem("groceryList")) || [];
    renderList();

    // --- ADD ITEM ---
    addBtn.addEventListener("click", () => {
        addItem();
    });

    // Add item with "Enter" key
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addItem();
    });

    function addItem() {
        const text = input.value.trim();
        if (text === "") return;

        // MOCK LOGIC. REPLACE W ACTUAL ID 
        items.push({ text, checked: false });
        input.value = "";
        saveAndRender();
    }

    // --- HANDLE CLICKS (chec or delete) ---
    list.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;
        
        // BACKEND, when you connect to the database use li.dataset.id, not index 
        const index = li.dataset.index;

        // 1. Check/Uncheck Item
        if (e.target.classList.contains("item-text") || e.target === li) {
            items[index].checked = !items[index].checked;
            saveAndRender();
        }

        // 2. Delete Item
        if (e.target.classList.contains("delete-btn")) {
            // cool fade-out effect before deleting 
            li.style.opacity = "0";
            li.style.transform = "translateX(20px)";
            
            setTimeout(() => {
                items.splice(index, 1);
                saveAndRender();
            }, 200); // Wait 200ms for animation
        }
    });

    // --- CLEAR ALL ---
    clearBtn.addEventListener("click", () => {
        if(confirm("Are you sure you want to clear the list?")) {
            // BACKEND CLEAR ITEMS FROM DATABASE 
            items = [];
            saveAndRender();
        }
    });

    // --- CORE FUNCTIONS ---
    function saveAndRender() {
        localStorage.setItem("groceryList", JSON.stringify(items));
        renderList();
    }

    function renderList() {
        list.innerHTML = "";

        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.dataset.index = index;
            
            // Add styling class if checked
            const checkedClass = item.checked ? "checked" : "";
            const checkMark = item.checked ? "✔ " : "";

            // It should look like this:
        li.innerHTML = `
        <span class="item-text ${item.checked ? "checked" : ""}">${item.text}</span>

        <button class="delete-btn">🗑️</button>
        `;


            list.appendChild(li);
        });
    }
});

/* --- MENU LOGIC  --- */
const menuBtn = document.querySelector(".menu-btn");
const dropdown = document.querySelector(".dropdown-menu");
if(menuBtn){
    menuBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
}
document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu-container") && dropdown) {
        dropdown.style.display = "none";
    }
});