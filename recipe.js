// recipe extraction will go here, i've filled it with mock data. 
// these need to be removed if backend can replace them.

//  SETUP & CONFIGURATION 
const els = {
    recipeTitle: document.querySelector(".left-page h1"), 
    videoLink: document.getElementById("videoLink"),
    categoryDisplay: document.getElementById("recipeCategoryDisplay"),
    ingredientsList: document.getElementById("ingredientsList"),
    stepsList: document.getElementById("stepsList"),
    thumbnail: document.getElementById("thumbnail"),
    editBtn: document.getElementById("editRecipeBtn")
};

// ====================!!!! BACKEND !!!!!================================
// Here we need to get the id from the URL and fetch the recipe details using that ID 

// --- DATA LOADING ---
// Check if we have a full recipe object from Home 
const currentRecipeJSON = localStorage.getItem("currentRecipe");
const currentRecipe = currentRecipeJSON ? JSON.parse(currentRecipeJSON) : null;
const storedUrl = currentRecipe ? currentRecipe.videoURL : (localStorage.getItem("tiktokURL") || "");
const storedCategory = currentRecipe ? currentRecipe.category : (localStorage.getItem("recipeCategory") || "Uncategorized");
const storedTitle = currentRecipe ? currentRecipe.title : "Untitled Recipe"; // <--- NEW: Get the title

// Displays any recipe data
function displayRecipe(data) {
    console.log("Rendering recipe data:", data);

    // update info 
    if (els.recipeTitle) els.recipeTitle.textContent = data.title; 
    els.videoLink.textContent = data.videoURL || "No URL provided";
    els.videoLink.href = data.videoURL || "#";
    els.categoryDisplay.textContent = data.category || "Uncategorized";
    
    // display tiktok thumbail if possible
    if (data.imageURL) {
        els.thumbnail.src = data.imageURL;
        els.thumbnail.style.display = "block";
    } else {
        // hide if no image
        els.thumbnail.style.display = "none"; 
    }

    // B. render Ingredients 
    // Clear current list
    els.ingredientsList.innerHTML = ""; 
    
    // just making sure the ingredients are an array 
    const ingredients = Array.isArray(data.ingredients) ? data.ingredients : [];
    
    ingredients.forEach(ingredientText => {
        const li = document.createElement("li");

        // 1. create button
        const btn = document.createElement("button");
        btn.className = "add-btn";
        btn.textContent = "+";

// ====================!!!! BACKEND !!!!!================================
// Here the user clicks the + to add ingredient to grocery list! 
// api call needed here  

        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            this.classList.toggle("added");

            if (this.classList.contains("added")) {
                console.log(`[BACKEND TODO]: Add "${ingredientText}" to Grocery Database`);
                // Example: addToGroceryList(ingredientText);
            }
        });
// =======================================================================
        // 3. create text
        const span = document.createElement("span");
        span.textContent = ingredientText;

        li.appendChild(btn);
        li.appendChild(span);
        els.ingredientsList.appendChild(li);
    });

    // C. steps or transcript? not sure if extraction will be a transcript or brokwn into steps
    // im going for a traditional step look but this can be modified. 
    els.stepsList.innerHTML = ""; 
    const steps = Array.isArray(data.steps) ? data.steps : [];

    steps.forEach(stepText => {
        const li = document.createElement("li");
        li.textContent = stepText;
        els.stepsList.appendChild(li);
    });
}

// ====================!!!! BACKEND !!!!!================================
// this is mock data to test 
const mockBackendData = {
    title: storedTitle, 
    videoURL: storedUrl,
    category: storedCategory,
    imageURL: "", 
    ingredients: [
        "2 large eggs",
        "1 cup all-purpose flour", 
        "1/2 cup whole milk", 
        "1 tsp vanilla extract",
        "Pinch of salt"
    ],
    steps: [
        "Preheat your oven to 350°F (175°C).",
        "Whisk together the eggs, milk, and vanilla.",
        "Gradually add the flour and salt.",
        "Bake for 20-25 minutes."
    ]
};

// check if we just came from "Edit Page" with saved changes or a fresh recipe 
const editedData = JSON.parse(localStorage.getItem("editRecipeData"));

if (editedData) {
    // If we just edited the recipe, show the edited version
    displayRecipe(editedData);
} else {
    // otherwise, show the fresh extraction (mock data i have rn!!!)
    displayRecipe(mockBackendData);
}


// MENU & EDIT LOGIC 
document.addEventListener("DOMContentLoaded", () => {
    // Menu Logic
    const menuBtn = document.querySelector(".menu-btn");
    const dropdown = document.querySelector(".dropdown-menu");

    if (menuBtn) {
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

    // Edit Button Logic
    if (els.editBtn) {
        els.editBtn.addEventListener("click", () => {
            // Scrape the CURRENT text from the page to send to Edit Screen
            const currentDisplayData = {
                title: els.recipeTitle.textContent, // <--- NEW: Grab the Title!
                videoURL: els.videoLink.href !== window.location.href ? els.videoLink.textContent : "",
                category: els.categoryDisplay.textContent,
                ingredients: Array.from(document.querySelectorAll("#ingredientsList li span")).map(s => s.textContent),
                steps: Array.from(document.querySelectorAll("#stepsList li")).map(li => li.textContent)
            };
            // save to local storage to pass it to the next page 
            localStorage.setItem("editRecipeData", JSON.stringify(currentDisplayData));
            // redirect user 
            window.location.href = "editrecipe.html";
        });
    }
});