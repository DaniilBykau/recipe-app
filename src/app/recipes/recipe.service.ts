import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>;

  constructor(private shoppingListService: ShoppingListService) {
  }

  // private recipes: Recipe[] = [
  //   new Recipe("Strawberry Juice", "delicious homemade drink with lots of bright summer flavors",
  //     "https://www.cubesnjuliennes.com/wp-content/uploads/2022/09/Strawberry-Juice-Recipe.jpg",
  //     [new Ingredient("Strawberry", 10), new Ingredient("Milk", 1)]),
  //   new Recipe("Yogurt", "Healthy homemade yogurt",
  //     "https://www.simplysissom.com/wp-content/uploads/2017/01/yogurtpaqrfaits-copy.jpg",
  //     [new Ingredient("Cup of granola", 2), new Ingredient("Container of whole milk plain yogurt", 1)]),
  //   new Recipe("Fruit tart", "This French fruit tart is made with a flaky, buttery pie crust, filled with homemade vanilla bean pastry cream," +
  //     " and topped with fresh fruit.", "https://www.modernhoney.com/wp-content/uploads/2017/04/Fruit-Tart-Recipe-8.jpg",
  //     [new Ingredient("Strawberry", 5), new Ingredient("Raspberries", 5), new Ingredient("Mango", 1)])
  // ];

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addNewIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
