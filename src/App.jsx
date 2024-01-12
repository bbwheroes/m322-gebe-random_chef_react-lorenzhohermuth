import React, { useState } from 'react';

const categories = [
  'Grundnahrungsmittel',
  'Gemüse',
  'Obst',
  'Milchprodukte und Eier',
  'Fleisch',
  'Fleischersatzprodukte',
  'Dessert',
];

const ingredientsList = {
  Grundnahrungsmittel: ['Kartoffeln', 'Reis', 'Nudeln', 'Brot', 'Quinoa'],
  Gemüse: ['Pepperoni', 'Zucchetti', 'Tomaten', 'Pilze', 'Spinat'],
  Obst: ['Apfel', 'Banane', 'Orange', 'Trauben', 'Kiwi'],
  'Milchprodukte und Eier': ['Milch', 'Käse', 'Joghurt', 'Eier', 'Butter'],
  Fleisch: ['Hackfleisch', 'Huhn', 'Rind', 'Schwein', 'Lamm'],
  Fleischersatzprodukte: ['Tofu', 'Seitan', 'Sojafleisch', 'Linsenbällchen'],
  Dessert: ['Eis', 'Schokolade', 'Kuchen', 'Früchtejoghurt', 'Pudding'],
};

const getRandomIngredient = (category) => {
  const ingredients = ingredientsList[category];
  return ingredients[Math.floor(Math.random() * ingredients.length)];
};

const getRandomDishName = (ingredients) => {
  let name = "";
  let position = 0;

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];

    if (!(ingredient.length > position)) {
      position = 0;
    }

    name += ingredient.charAt(position % ingredient.length);
    position += 1;

    if (!(ingredient.length > position)) {
      position = 0;
    }
    name += ingredient.charAt((position) % ingredient.length);
    position += 1;
  }

  return name;
};

const RandomCook = () => {
  const [ingredients, setIngredients] = useState({});
  const [randomDish, setRandomDish] = useState({});
  const [rating, setRating] = useState();

  const generateIngredients = () => {
    const generatedIngredients = {};
    for (const category of categories) {
      generatedIngredients[category] = getRandomIngredient(category);
    }
    setIngredients(generatedIngredients);
  };

  const cookRandomDish = () => {
    const dishIngredients = [];
    for (const category of categories) {
      dishIngredients.push(ingredients[category]);
    }
    console.log({ dishIngredients });
    const flattenedIngredients = dishIngredients.flat();
    console.log({ flattenedIngredients });
    const randomDishIngredients = flattenedIngredients.slice(0, Math.floor(Math.random() * 6) + 5);
    console.log({ randomDishIngredients });
    const dishName = getRandomDishName(randomDishIngredients);
    console.log({ dishName });

    setRandomDish({ name: dishName, ingredients: randomDishIngredients });
  };

  const rateDish = () => {
    let stars = 0;
    const { ingredients } = randomDish;

    console.log(ingredients, ingredientsList, ingredients.filter((ingredient) => ingredientsList['Gemüse'].includes(ingredient)).length >= 2, ingredients.filter((ingredient) => ingredientsList['Obst'].includes(ingredient)).length >= 1);

    if (ingredients.filter((ingredient) => ingredientsList['Gemüse'].includes(ingredient)).length >= 2) {
      stars += 1;
    }
    if (ingredients.filter((ingredient) => ingredientsList['Obst'].includes(ingredient)).length >= 1) {
      stars += 1;
    }
    if (
      ingredients.filter((ingredient) => ingredientsList['Fleisch'].includes(ingredient) || ingredientsList['Fleischersatzprodukte'].includes(ingredient)).length >= 1
    ) {
      stars += 1;
    }
    if (ingredients.filter((ingredient) => ingredientsList['Grundnahrungsmittel'].includes(ingredient)).length >= 1) {
      stars += 1;
    }
    if (
      ingredients.filter((ingredient) => ingredientsList['Milchprodukte und Eier'].includes(ingredient)).length <= 1
    ) {
      stars += 1;
    }

    setRating(stars);
  };

  return (
    <div>
      <h2>Random Koch</h2>
      <button onClick={generateIngredients}>Zutaten generieren</button>
      <button onClick={cookRandomDish}>Kochen</button>
      <table>
        <thead>
          <tr>
            {categories.map((category) => (
              <th key={category}>{category}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {categories.map((category) => (
              <td key={category}>{ingredients[category]}</td>
            ))}
          </tr>
        </tbody>
      </table>
      {randomDish.name && (
        <div>
          <h3>Name: {randomDish.name}</h3>
          <p>Zutaten: {randomDish.ingredients.join(', ')}</p>
        </div>
      )}
      <button onClick={rateDish}>Bewerten</button>
      {rating && <p>Bewertung: {rating > 0 ? "⭐️".repeat(rating) : "Keine Sterne"}</p>}
    </div>
  );
};

export default RandomCook;