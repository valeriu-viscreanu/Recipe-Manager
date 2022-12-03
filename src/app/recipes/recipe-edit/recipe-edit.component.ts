import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode: boolean = false;
  id: number;
  constructor(readonly router: Router,
    readonly route: ActivatedRoute) { 
    }

  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = !!(this.id);      
    });
  }
}
