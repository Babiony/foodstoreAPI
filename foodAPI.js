const apiKey = 'YOUR_API_KEY'; // Replace with your Spoonacular API key
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');

// Fetch recipes from the Spoonacular API
async function fetchRecipes() {

  const userInput = searchInput.value.trim();
    
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(userInput)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching data');
    const data = await response.json();

    console.log(data.meals);
    
    
    displayRecipes(data.meals);
  } catch (error) {
    console.error(error);
    recipeContainer.innerHTML = '<p>Failed to fetch recipes. Please try again later.</p>';
  }
}

// Display recipes in the UI
function displayRecipes(recipes) {
  if (!recipes) {
    recipeContainer.innerHTML = `<p>No recipes found. Try searching for something else!</p>`;
    return;
}

recipeContainer.innerHTML = recipes
    .map(recipe => `
        <div class="recipe">
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <p><strong>Category:</strong> ${recipe.strCategory}</p>
            <p><strong>Area:</strong> ${recipe.strArea}</p>
            <p><a href="${recipe.strYoutube}" target="_blank">Watch on YouTube</a></p>
            <button onclick="viewRecipeDetails(${recipe.idMeal})">View Details</button>
        </div>
    `)
    .join('');
}

// Add event listener to the search button
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert('Please enter a dish name.');
    return;
  }
  fetchRecipes(query);
});
