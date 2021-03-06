import uuid from 'node-uuid';
//let create a service class that will handle a collection (array) of recipes
class RecipeService{
  constructor(){
    this.recipes =[{id:'1', recipe:'sandwitch'}, {id:'2', recipe: 'rice'}];
  }

  getRecipes(){
    return this.recipes;
  }

  getSingleRecipe(recipeId){
    const recipe = this.recipes.filter(rec => rec.id === recipeId)[0];
    return recipe || null;
  }

  addRecipe(data){
    data.id = uuid.v4();
    this.recipes.push(data);
    return data;
  }

  updateRecipe(recipeId, data){
    const recipe = this.getSingleRecipe(recipeId);
    if(recipe){
      recipe.title = data.title ? data.title : recipe.title;
      // recipe.imageUrl = data.imageUrl ? data.imageUrl : recipe.imageUrl;
      // recipe.description = data.description ? data.description : recipe.description;
      // recipe.Ingredients = data.Ingredients ? data.Ingredients : recipe.Ingredients;
      // recipe.directions = data.directions ? data.directions : recipe.directions;

      return recipe;
    }
    return false;
  }

  deleteRecipe(recipeId){
    const recipe = this.getSingleRecipe(recipeId);
    if (recipe){
      const index = this.recipes.indexOf(recipe);
      this.recipes.splice(index, 1);
    }
  }
}

// creation a recipe service object
const recipeService = new RecipeService();
export default recipeService;
