
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.models';
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipes: Recipe[];
  
  constructor(readonly router: Router,
              readonly route: ActivatedRoute,
              private  store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.select(s => s.recipes)
    .pipe((map(state => state.recipes)))
    .subscribe(
      (recipes)=> {
      this.recipes = recipes;
    })
  }
  onNewRecipeClick(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }  
}