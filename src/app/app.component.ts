import { Component } from '@angular/core';
import { MenuItem } from './shared/menuitem.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   menuItem: MenuItem = MenuItem.Recipe;
}
