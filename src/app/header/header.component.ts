import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';
import { AuthService } from '../auth/authcomponent/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  userSub: Subscription;
  constructor(public dataStorageService: DataStorageService, 
              private authService: AuthService){}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(
      user => {        
        this.isAuthenticated = !!user;
      });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onLogout()
  {
    this.authService.logout();
  }
  onFetchData(){
    this.dataStorageService.getRecipes().subscribe();
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
