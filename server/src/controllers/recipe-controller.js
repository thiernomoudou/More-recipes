import recipeService from '../services/recipe-services';

class RecipeController {
  constructor(router){
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/recipes', this.getRecipes.bind(this));
    this.router.get('/recipes/:id', this.getSingleRecipe.bind(this));
    this.router.post('/recipes', this.postRecipe.bind(this));
    this.router.put('/recipes/:id', this.putRecipe.bind(this));
    this.router.delete('/recipes/:id', this.deleteRecipe.bind(this));
    // this.router.get('/recipes?sort=upvotes&order=des', this.sortedRecipe.bind(this));
    // this.router.get('/recipes/<recipeId>/reviews', this.postRecipeReview.bind(this));
    }

    getRecipes(req, res) {
      const recipes = recipeService.getRecipes();
      if (!recipes) {
          res.sendStatus(404);
      } else {
          res.send(recipes);
      }
    }

    getSingleRecipe(req, res) {
      const id = req.params.id;
      const recipe = recipeService.getSingleRecipe(id);

      if (!recipe) {
          res.sendStatus(404);
      } else {
          res.send(recipe);
      }
    }

    putRecipe(req, res) {
      // const id = parseInt(req.params.id, 10);
      const id = req.params.id;
      const existingRecipe = recipeService.getSingleRecipe(id);

      if (!existingRecipe) { 
              res.sendStatus(404);
      } else {
          let updateRecipe = recipeService.updateRecipe(id, req.body)
          if (updateRecipe) {
            // res.sendStatus(204);
            res.send(updateRecipe);
          } else {
              res.sendStatus(500);
          }
      }
  }

    postRecipe(req, res) {
      let data = req.body;

      let aRecipe = recipeService.addRecipe(data);

      if (aRecipe){
          // res.setHeader('Location', '/recipes/' + data.id);
          // res.sendStatus(200);
          res.send(aRecipe);
      } else {
          res.sendStatus(500);
      }
  }

    deleteRecipe(req, res){
      const id = req.params.id;
      const recipe = recipeService.deleteRecipe(id);
      if (recipe){
        res.send(recipe);
      }else{
        res.sendStatus(404);
      }
  }
}

export default RecipeController;
