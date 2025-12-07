// For backend: Take the URL and Name, send it to the database and return 
// a recipe ID so we can load the next page. 



document.addEventListener("DOMContentLoaded", () => {
    
    const extractBtn = document.getElementById("extractBtn");
    const nameInput = document.getElementById("recipeNameInput"); // New!
    const tiktokInput = document.getElementById("tiktokInput");
    const categorySelect = document.getElementById("recipeCategory");

    if (extractBtn) {
        extractBtn.addEventListener("click", (e) => {
            // prevent sumbission refresh 
            e.preventDefault();

            // values 
            const name = nameInput.value.trim();
            const url = tiktokInput.value.trim();
            const category = categorySelect.value;
            // validation 
            if (!url) {
                alert("Please paste a URL!");
                return;
            }
// ====================!!!! BACKEND !!!!!================================
    // Here, the action is when the user clicks the 'Extract' button. 
    // I have mock data here which was for testing, you can replace it 
    // with an API call. 
    // Delete my mock data once you connect. 
          
            // MOCK DATA - DELETE WHEN CONNECTING TO API
            // SAVE DATA FOR THE NEXT PAGE
            // We use "currentRecipe" to store the one we are looking at right now
            const newRecipe = {
                title: name || "Untitled Recipe",
                videoURL: url,
                category: category,
                ingredients: [], // Empty for now (testing testing)
                steps: []
            };
// ====================!!!! BACKEND !!!!!================================
            // save it to local straoge so recipe.html can read it 
            localStorage.setItem("currentRecipe", JSON.stringify(newRecipe));

            // send user to recipe page 
            window.location.href = "recipe.html";
        });
    }
});