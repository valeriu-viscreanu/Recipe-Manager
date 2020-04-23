//TODO anki
import {NgModule} from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { ShoppingListComponent } from './shopping-list/shopping-list.component'
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },

    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule
{

}
