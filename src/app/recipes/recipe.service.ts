import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({providedIn: 'root'})
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //      'Tasty Schnitzel',
  //      'A super-tasty Schnitzel  - just awesome',
  //      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //      [
  //        new Ingredient('Meat', 1),
  //        new Ingredient('French Fries', 20)
  //      ]
  //      ),
  //   new Recipe(
  //      'Big Fat Burguer',
  //      'What else you need to say?',
  //      'https://upload.wikimedia.org/wikipedia/commons/2/2a/Windows_7_Whopper_-_Burger_King.jpg',
  //      [
  //        new Ingredient('Buns', 2),
  //        new Ingredient('Meat', 1)
  //      ]
  //      ),

  //   new Recipe(
  //     'Another test Recipe',
  //     'this is a simply test',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     []
  //    )
  // ];

  constructor(private slService: ShoppingListService){

  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
