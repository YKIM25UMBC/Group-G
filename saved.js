// the saved recipes page. 

// ----- LOGOUT -----
const logoutBtn = document.getElementById("logout-btn");
if(logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.clear(); 
    });
}

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const recipeList = document.getElementById("recipeList");
const noResults = document.getElementById("noResults");

// ====================!!!! BACKEND !!!!!================================
// ----- LOAD RECIPES -----
// This is my mock data, its loading from browser memory for testing. replace w API
let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [
    { title: "Pancakes", category: "Breakfast", id: 1 },
    { title: "Spaghetti Bolognese", category: "Dinner", id: 2 },
    { title: "Grilled Cheese", category: "Lunch", id: 3 }
];

renderRecipes(savedRecipes);

// ----- SEARCH FUNCTION -----
searchBtn.addEventListener("click", () => {
    filterRecipes();
});

// user can press "Enter" key to search
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") filterRecipes();
});

function filterRecipes() {
    const keyword = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;

    let filtered = savedRecipes.filter(r => {
        // check in case title is missing
        const rTitle = r.title ? r.title.toLowerCase() : "";
        const rCat = r.category ? r.category : "";

        const matchesKeyword = rTitle.includes(keyword);
        const matchesCategory = category === "" || rCat === category;
        
        return matchesKeyword && matchesCategory;
    });

    renderRecipes(filtered);
}

// ----- RENDER LIST -----
function renderRecipes(list) {
    recipeList.innerHTML = "";
    
    if (list.length === 0) {
        noResults.style.display = "block";
        return;
    } else {
        noResults.style.display = "none";
    }

    list.forEach((r, index) => {
        const li = document.createElement("li");
        li.dataset.index = index;
        
        // Ensure title exists
        const displayTitle = r.title || r.videoURL || "Untitled Recipe";
        const displayCat = r.category ? `(${r.category})` : "";

        li.innerHTML = `
            <div style="flex-grow:1;">
                <span class="recipe-title">${displayTitle}</span>
                <span style="font-size:0.8em; color:#888;">${displayCat}</span>
            </div>
            
            <button class="view-btn">VIEW</button>
            <button class="delete-btn" title="Delete">🗑️</button>
        `;
        recipeList.appendChild(li);
    });
}

// ----- CLICK HANDLERS (View & Delete) -----
recipeList.addEventListener("click", e => {
    const li = e.target.closest("li");
    if (!li) return;
    // array index
    const index = li.dataset.index;
    const recipe = savedRecipes[index];

    // 1. DELETE - will delete entire recipe 
    if (e.target.classList.contains("delete-btn")) {
        if(confirm("Delete this recipe?")) {
            // THIS IS MOCK LOGIC 
            savedRecipes.splice(index, 1);
            localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
            renderRecipes(savedRecipes);
        }
    }

    // 2. VIEW - takes you to the recupe page 
    if (e.target.classList.contains("view-btn") || e.target.classList.contains("recipe-title")) {
        // Save the clicked recipe as the "active" one so recipe.html knows what to load
        // ALSOOOOO MOCK DATA! just passing data through local storage to test!!! 
        localStorage.setItem("tiktokURL", recipe.videoURL || ""); 
        localStorage.setItem("recipeCategory", recipe.category || "");
        
        // backened change this w location id pls 
        window.location.href = "recipe.html";
    }
});