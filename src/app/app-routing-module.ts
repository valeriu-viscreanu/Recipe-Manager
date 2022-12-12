import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/authcomponent/authcomponent.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";
import { RecipesDetailComponent } from "./recipes/recipes-detail/recipes-detail.component";
import { RecipesStartComponent } from "./recipes/recipes-start/recipes-start.component";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


const routes: Routes = [
    { 
        path: '', redirectTo: '/recipes', pathMatch: 'full'
    },
    {
        path: 'recipes', component: RecipesComponent,
        children: [{ path: '', component: RecipesStartComponent , resolve: [RecipeResolverService]},
                   { path: 'new', component: RecipeEditComponent  },
                   { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]},
                   { path: ':id', component: RecipesDetailComponent, resolve: [RecipeResolverService] },
    ]
    },
    {
        path: 'shopping-list', component: ShoppingListComponent,
    },
    {
        path: 'login', component: AuthComponent,
    }
];

@NgModule({
imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule{
}