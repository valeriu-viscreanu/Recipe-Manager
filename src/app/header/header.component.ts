import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements  OnInit, OnDestroy{
 
  private userSub: Subscription;
  isLoggedIn = false;

  @Output() featureSelected = new EventEmitter<string>();
  constructor(private dataStorageService: DataStorageService, private authService: AuthService)
  {} 
  
  ngOnInit(): void {
    this.authService.user.subscribe(user => {this.isLoggedIn=!!user;console.log(user + ' header comp subssciption')})
  }
  onSaveData(){
    this.dataStorageService.storeRecipe();
  }

  onFetchData()
  {
    this.dataStorageService.fetchRecipe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy()
  {
    this.authService.user.unsubscribe();
  }
}
