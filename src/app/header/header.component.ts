import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;
  // tslint:disable-next-line: no-trailing-whitespace
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {

  }

  ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }


  isOpen(isOpen: boolean){
    console.log(isOpen);
    this.collapsed = isOpen;
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }
}
