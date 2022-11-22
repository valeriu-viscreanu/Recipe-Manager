import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from '../shared/menuitem.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() featureSelected= new EventEmitter<MenuItem>();

  onSelect(menuitem: MenuItem )  {
    this.featureSelected.emit(menuitem);
  }
}
