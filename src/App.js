import { use, useCallback, useEffect, useState } from "react";
import "./App.css";
import video from "./cooking-animation.mp4";
import MyRecipeComponent from "./MyRecipeComponent";

function App() {
  // https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=15120dae&app_key=b1a9fbc89afe42d79a81a90f5de337c1

  const MY_ID = "15120dae";
  const MY_KEY = "b1a9fbc89afe42d79a81a90f5de337c1";

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("lemon");

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`
      );
      const data = await response.json();
      setMyRecipes(data.hits);
      console.log(data.hits);
    };
    getRecipe();
  }, [wordSubmitted]);

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  };

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  };

  return (
    <div className="App">
      <div className="heading">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <h1>Find a Recipe</h1>
      </div>

      <div>
        <form onSubmit={finalSearch} className="container">
          <input
            className="search"
            onChange={myRecipeSearch}
            value={mySearch}
          />
          <button className="buttonSearch" onClick={finalSearch}>
            <img
              src="https://img.icons8.com/fluency/48/000000/fry.png"
              alt="icon"
            />
          </button>
        </form>
      </div>

      <div className="cards">
        {myRecipes.map((element, index) => (
          <MyRecipeComponent
            key={index}
            label={element.recipe.label}
            image={element.recipe.image}
            calories={element.recipe.calories}
            ingridients={element.recipe.ingredientLines}
            mealType={element.recipe.mealType}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
