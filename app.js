let recipes = [];

loadRecipesFromLocalStorage();

//Load and save recipes to local storage
function saveRecipesToLocalStorage() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function loadRecipesFromLocalStorage() {
  const storedRecipes = localStorage.getItem("recipes");
  if (storedRecipes) {
    recipes = JSON.parse(storedRecipes);
  }
}

// Add a new recipe to the recipes array
function addRecipe(name, description, category, date) {
  const newRecipe = {
    id: recipes.length > 0 ? recipes[recipes.length - 1].id + 1 : 1,
    name: name,
    description: description,
    category: category,
    favorite: false,
    date: date,
  };
  recipes.push(newRecipe);
  saveRecipesToLocalStorage();
}

function styleList(li) {
  
}

// Display recipes on the page
function displayRecipes(filterRecipes = recipes) {
  const recipeListContainer = document.getElementById("list");
  recipeListContainer.innerHTML = "";

  filterRecipes.forEach((recipe) => {
    const li = document.createElement("li");
    li.className = "recipe-item";
    li.style.fontFamily = "sans-serif, serif";
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.borderRadius = "20px";
    li.style.backgroundColor = "#EEF7FF";
    li.style.border = "0px";

    // Create and style the information section
    const info = document.createElement("span");
    info.innerHTML = `<strong>Name</strong>: ${recipe.name}
     <br><strong>Description</strong>: ${recipe.description}
     <br><strong>Category: ${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</strong>`;
    info.style.fontSize = "18px";
    info.style.textAlign = "left";
    info.style.flex = "1";

    // Create and style the favorite button
    const favButton = document.createElement("span");
    favButton.className = "favorite-button";
    favButton.innerHTML = recipe.favorite ? "★" : "☆";
    favButton.style.cursor = "pointer";
    favButton.style.fontSize = "30px";
    favButton.style.color = recipe.favorite ? "#ea6c46" : "";
    favButton.style.marginRight = "15px";
    favButton.style.marginBottom = "5px";

    // Favorite button hover effect
    favButton.addEventListener("mouseover", () => {
      favButton.style.color = "#ea6c46";
    });

    favButton.addEventListener("mouseout", () => {
      favButton.style.color = recipe.favorite ? "#ea6c46" : "";
    });

    // Toggle favorite status on click
    favButton.addEventListener("click", () => {
      toggleRecipeFavorite(recipe.id);
      displayRecipes();
    });

    // Create and style the delete button
    const delButton = document.createElement("span");
    delButton.className = "delete-button";
    delButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    delButton.style.cursor = "pointer";
    delButton.style.fontSize = "20px";
    delButton.style.marginLeft = "auto";
    delButton.style.marginRight = "10px";
    
    // Delete button hover effect
    delButton.addEventListener("mouseover", () => {
      delButton.style.color = "red";
    });

    delButton.addEventListener("mouseout", () => {
      delButton.style.color = "";
    });

    // Delete recipe on click
    delButton.addEventListener("click", () => {
      deleteRecipe(recipe.id);
      displayRecipes();
    });

    // Create and style the update description button
    const upDesButton = document.createElement("span");
    upDesButton.className = "update-description-button";
    upDesButton.innerHTML = '<i class="fas fa-edit"></i>';
    upDesButton.style.cursor = "pointer";
    upDesButton.style.fontSize = "20px";
    upDesButton.style.marginRight = "10px";

    // Update description button hover effect
    upDesButton.addEventListener("mouseover", () => {
      upDesButton.style.color = "blue";
    });

    upDesButton.addEventListener("mouseout", () => {
      upDesButton.style.color = "";
    });

    // Prompt for new description and update it on click
    upDesButton.addEventListener("click", () => {
      const newDescription = prompt("Enter new description:");
      if (newDescription !== null) {
        updateRecipeDescription(recipe.id, newDescription);
        displayRecipes();
      }
    });

    // Append elements to the recipe item
    li.appendChild(favButton);
    li.appendChild(info);
    li.appendChild(upDesButton);
    li.appendChild(delButton);
    
    recipeListContainer.appendChild(li);
  });
}

// Toggle the favorite status of a recipe
function toggleRecipeFavorite(id) {
  recipes.forEach((recipe) => {
    if (recipe.id === id) {
      recipe.favorite = !recipe.favorite;
      saveRecipesToLocalStorage();
    }
  });
}

// Delete a recipe from the recipes array
function deleteRecipe(id) {
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index !== -1) {
    recipes.splice(index, 1);
  }
  saveRecipesToLocalStorage();
  displayRecipes();
}

// Filter recipes to return only favorite recipes
function filterFavoriteRecipes() {
  return recipes.filter((recipe) => recipe.favorite);
}

// Sort recipes by category
function sortRecipesByCategory() {
  const sortedRecipes = recipes.sort((a, b) => {
    return a.category.localeCompare(b.category);
  });
  return sortedRecipes;
}

// Sort recipes by date
function sortRecipesByDate() {
  const sortedRecipes = recipes.sort((a, b) => {
    return a.date.localeCompare(b.date);
  });
  return sortedRecipes;
}

// Update the description of a recipe
function updateRecipeDescription(id, newDescription) {
  const recipe = recipes.find((recipe) => recipe.id === id);
  if (recipe) {
    recipe.description = newDescription;
  } else {
    console.log("Recipe not found!");
  }
  saveRecipesToLocalStorage();
}

// Prompt for a new description for a specific recipe
function promptUpdateDescription(id) {
  const newDescription = prompt("Enter new description: ");
  if (newDescription) {
    updateRecipeDescription(id, newDescription);
  }
}

// Generate a report of total, favorite, and non-favorite recipes
function generateRecipeReport() {
  const totalRecipes = recipes.length;
  const favRecipes = recipes.filter((recipe) => recipe.favorite).length;
  const notFavRecipes = totalRecipes - favRecipes;
  const reportDiv = document.getElementById("recipeReport");
  reportDiv.innerHTML = ` <p>Total Recipes: ${totalRecipes}</p> 
                          <p>Favorite Recipes: ${favRecipes}</p>
                          <p>Non-Favorite Recipes: ${notFavRecipes}</p> `;
}

// Search for recipes by name or description
function searchRecipes(searchValue) {
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchValue.toLowerCase())
  );
  return filteredRecipes;
}

// Event listener for generating the recipe report
document.getElementById("recipeReport").addEventListener("click", () => {
  generateRecipeReport();
});

// Event listener for adding a new recipe
const addButton = document.getElementById("addNew");
addButton.addEventListener("click", () => {
  const recipeName = document.getElementById("recName");
  const recipeDescription = document.getElementById("desName");
  const recipeCategory = document.getElementById("category");

  const recipeNameValue = recipeName.value;
  const recipeDescriptionValue = recipeDescription.value;
  const recipeCategoryValue = recipeCategory.value;
  const currentDateTime = new Date().toISOString();

  console.log(currentDateTime);

  if (recipeNameValue !== "" && recipeDescriptionValue !== "") {
    addRecipe(
      recipeNameValue,
      recipeDescriptionValue,
      recipeCategoryValue,
      currentDateTime
    );
  }

  // Clear input fields
  recipeName.value = "";
  recipeDescription.value = "";

  displayRecipes();
});

// Event listener for showing all recipes sorted by date
const showAllButton = document.getElementById("showAll");
showAllButton.addEventListener("click", () => {
  const sortedRecipesByDate = sortRecipesByDate();
  displayRecipes(sortedRecipesByDate);
});

// Event listener for showing favorite recipes only
document.getElementById("favRecipes").addEventListener("click", () => {
  const favoriteRecipes = filterFavoriteRecipes();
  displayRecipes(favoriteRecipes);
});

// Event listener for sorting recipes by category
document.getElementById("sortBy").addEventListener("click", () => {
  const sortedRecipesByCategory = sortRecipesByCategory();
  displayRecipes(sortedRecipesByCategory);
});

// Event listener for searching recipes
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  const searchValue = document.getElementById("searchInput").value;
  const results = searchRecipes(searchValue);
  displayRecipes(results);
  document.getElementById("searchInput").value = "";
});

// Event listener for searching recipes when Enter key is pressed
document.getElementById("searchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const searchValue = event.target.value;
    const results = searchRecipes(searchValue);
    displayRecipes(results);
    event.target.value = "";
  }
});

displayRecipes();
