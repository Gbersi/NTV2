import { useState, useEffect } from 'react';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  strIngredients: string[];
  strInstructions: string;
}

export default function CocktailList() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([]);
  const [selectedCocktailId, setSelectedCocktailId] = useState<string | null>(null);
  const [cocktailDetails, setCocktailDetails] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [randomCocktail, setRandomCocktail] = useState<Cocktail | null>(null);

  // Fetch cocktails from the API
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
      .then((response) => response.json())
      .then((data) => {
        const drinks = data.drinks.map((cocktail: any) => {
          const ingredients = [];
          for (let i = 1; i <= 15; i++) {
            if (cocktail[`strIngredient${i}`]) {
              ingredients.push(cocktail[`strIngredient${i}`]);
            }
          }
          return { ...cocktail, strIngredients: ingredients };
        });
        setCocktails(drinks);
        setFilteredCocktails(drinks); // Initialize filteredCocktails with the fetched data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cocktails:', error);
        setLoading(false);
      });
  }, []);

  // Update filtered cocktails based on search query and ingredients
  useEffect(() => {
    const searchLowercased = searchQuery.toLowerCase();

    if (searchLowercased.length > 0) {
      // Search by ingredients
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchLowercased}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.drinks) {
            setFilteredCocktails(data.drinks);
          } else {
            setFilteredCocktails([]);
          }
        })
        .catch((error) => console.error('Error fetching cocktails by ingredient:', error));
    } else {
      // If it's a cocktail name search
      const filtered = cocktails.filter((cocktail) => {
        const nameMatch = cocktail.strDrink.toLowerCase().includes(searchLowercased);
        const ingredientMatch = cocktail.strIngredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchLowercased)
        );
        return nameMatch || ingredientMatch;
      });
      setFilteredCocktails(filtered);
    }
  }, [searchQuery, cocktails]);

  // Fetch cocktail details when a cocktail is selected
  const fetchCocktailDetails = (id: string) => {
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const cocktail = data.drinks[0];
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
          if (cocktail[`strIngredient${i}`]) {
            ingredients.push(cocktail[`strIngredient${i}`]);
          }
        }
        setCocktailDetails({
          ...cocktail,
          strIngredients: ingredients,
        });
        setSelectedCocktailId(id);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cocktail details:', error);
        setLoading(false);
      });
  };

  const handleBackToList = () => {
    setSelectedCocktailId(null);
    setCocktailDetails(null);
    setRandomCocktail(null); // Clear random cocktail details when returning to the list
  };

  // Sort cocktails based on selected criteria
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value);
  };

  // Sort filtered cocktails based on the selected criteria
  const sortedCocktails = [...filteredCocktails].sort((a, b) => {
    switch (sortCriteria) {
      case 'name':
        return (a.strDrink || '').localeCompare(b.strDrink || ''); // Fallback to empty string if undefined
      case 'alcoholic':
        return (a.strAlcoholic || '').localeCompare(b.strAlcoholic || ''); // Fallback to empty string if undefined
      case 'ingredients':
        return (a.strIngredients?.length || 0) - (b.strIngredients?.length || 0); // Fallback to 0 if undefined
      default:
        return 0;
    }
  });

  // Fetch a random cocktail
  const fetchRandomCocktail = () => {
    setLoading(true);
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => {
        const randomCocktail = data.drinks[0];
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
          if (randomCocktail[`strIngredient${i}`]) {
            ingredients.push(randomCocktail[`strIngredient${i}`]);
          }
        }
        setRandomCocktail({
          ...randomCocktail,
          strIngredients: ingredients,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching random cocktail:', error);
        setLoading(false);
      });
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="app-container">
      {/* Search Section */}
      <div className="search-filter-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cocktails or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search cocktails or ingredients"
          />
        </div>
        {/* Sort Dropdown */}
        <div className="sort-bar">
          <select onChange={handleSortChange} value={sortCriteria}>
            <option value="name">Sort by Name</option>
            <option value="alcoholic">Sort by Alcoholic Type</option>
            <option value="ingredients">Sort by Number of Ingredients</option>
          </select>
        </div>
      </div>

      {/* Random Cocktail Button */}
      <div className="random-cocktail-button">
        <button onClick={fetchRandomCocktail}>Get Random Cocktail</button>
      </div>

      {/* Cocktail Grid - Centered */}
      {!selectedCocktailId && !randomCocktail && (
        <div className="cocktail-grid">
          {sortedCocktails.length > 0 ? (
            sortedCocktails.map((cocktail) => (
              <div key={cocktail.idDrink} className="card">
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  onClick={() => fetchCocktailDetails(cocktail.idDrink)}
                  className="cocktail-image"
                  loading="lazy"
                />
                <h3>{cocktail.strDrink}</h3>
                {cocktail.strAlcoholic === 'Non_Alcoholic' && (
                  <p><strong>Non-Alcoholic Version Available</strong></p>
                )}
              </div>
            ))
          ) : (
            <p>No drinks found. Try a different search!</p>
          )}
        </div>
      )}

      {/* Cocktail Details - Centered */}
      {selectedCocktailId && cocktailDetails && (
        <div className="cocktail-details">
          <button onClick={handleBackToList} className="back-button">Back to List</button>
          <h1>{cocktailDetails.strDrink}</h1>
          <img src={cocktailDetails.strDrinkThumb} alt={cocktailDetails.strDrink} className="drink-image" />
          <p>{cocktailDetails.strInstructions}</p>

          <h3>Ingredients:</h3>
          <div className="ingredients">
            {cocktailDetails.strIngredients.map((ingredient, index) => (
              <div key={`${ingredient}-${index}`} className="ingredient-card">
                <img
                  src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`}
                  alt={ingredient}
                  className="ingredient-image"
                />
                <p>{ingredient}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Random Cocktail Details */}
      {randomCocktail && !selectedCocktailId && (
        <div className="cocktail-details">
          <button onClick={handleBackToList} className="back-button">Back to List</button>
          <h1>{randomCocktail.strDrink}</h1>
          <img src={randomCocktail.strDrinkThumb} alt={randomCocktail.strDrink} className="drink-image" />
          <p>{randomCocktail.strInstructions}</p>

          <h3>Ingredients:</h3>
          <div className="ingredients">
            {randomCocktail.strIngredients.map((ingredient, index) => (
              <div key={`${ingredient}-${index}`} className="ingredient-card">
                <img
                  src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`}
                  alt={ingredient}
                  className="ingredient-image"
                />
                <p>{ingredient}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
