/* the logic for when the user needs to edit the recipe due to errors that may occur 
after grabbing the transcript */ 
   document.addEventListener("DOMContentLoaded", () => {
    
   // ====================!!!! BACKEND !!!!!================================

    //  MOCK DATA LOADING 
    // We try to load "editRecipeData" 
    const recipeData = JSON.parse(localStorage.getItem("editRecipeData")) || {
        title: "",
        videoURL: "",
        category: "Dinner",
        ingredients: [],
        steps: []
    };

    // --- GRAB INPUT ELEMENTS ---

    const titleInput = document.getElementById("recipeTitle"); 
    const categoryInput = document.getElementById("editCategory"); 
    const videoInput = document.getElementById("videoURL");
    const ingredientsList = document.getElementById("ingredientsList");
    const stepsList = document.getElementById("stepsList");

    // --- POPULATE INPUTS WITH ACTUAL DATA ---
    if(titleInput) titleInput.value = recipeData.title || "";
    if(categoryInput) categoryInput.value = recipeData.category || "Dinner";
    if(videoInput) videoInput.value = recipeData.videoURL || "";
    function createListItem(value, list) {
        const li = document.createElement("li");

        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.className = "edit-input";
        li.appendChild(input);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => li.remove());
        li.appendChild(deleteBtn);

        list.appendChild(li);
    }

    // Populate existing ingredients and steps
    if(recipeData.ingredients) recipeData.ingredients.forEach(ing => createListItem(ing, ingredientsList));
    if(recipeData.steps) recipeData.steps.forEach(step => createListItem(step, stepsList));

    // Add new empty row buttons 
    document.getElementById("addIngredientBtn").addEventListener("click", () => createListItem("", ingredientsList));
    document.getElementById("addStepBtn").addEventListener("click", () => createListItem("", stepsList));

    // ====================!!!! BACKEND !!!!!================================
    document.getElementById("saveChangesBtn").addEventListener("click", () => {
        
        // 1. Gather all data from the form
        const updatedRecipe = {
            title: titleInput ? titleInput.value : "Untitled",
            videoURL: videoInput.value,
            category: categoryInput ? categoryInput.value : "Dinner",
            
            // Scrape all inputs from the lists
            ingredients: Array.from(ingredientsList.querySelectorAll("input")).map(i => i.value).filter(v => v.trim() !== ""),
            steps: Array.from(stepsList.querySelectorAll("input")).map(i => i.value).filter(v => v.trim() !== "")
        };

        console.log("LOADING:", updatedRecipe);

        // --- MOCK LOGIC ---
        // testing if it saves - REMOVE 
        // Save to localStorage to simulate a database update
        localStorage.setItem("editRecipeData", JSON.stringify(updatedRecipe));
        
        // Also update the 'savedRecipes' list so the change is permanent in our mock test
        let allSaved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
        const existingIndex = allSaved.findIndex(r => r.videoURL === updatedRecipe.videoURL);
        
        if (existingIndex > -1) {
            allSaved[existingIndex] = updatedRecipe; 
        } else {
            allSaved.push(updatedRecipe); 
        }
        localStorage.setItem("savedRecipes", JSON.stringify(allSaved));

        // go back to the recipe
        window.location.href = "recipe.html";
    });

    // cancel the edit
    document.getElementById("cancelEditBtn").addEventListener("click", () => {
        window.location.href = "recipe.html";
    });
});