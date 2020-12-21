import {Component, OnInit} from '@angular/core';
import {Beer, BeersService} from './beers.service';
import {PageEvent} from '@angular/material/paginator';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  beers: Beer[] = [];
  pageSize = 10;
  totalSize = 0;
  user?: SocialUser;
  favourites: number[] = [];

  constructor(private beerService: BeersService,
              private authService: SocialAuthService) {}

  ngOnInit(): void {
    this.fetchBeers();
    this.authService.authState.subscribe((user) => { // set user to specified user or null in case of logout
      this.user = user;
      this.fetchFavourites(user?.id);
    });

  }

  fetchBeers(event?: PageEvent): void {
    this.beerService.fetchBeers(event ? event.pageIndex : 0,
                              event ? event.pageSize : this.pageSize)
      .subscribe(beersResult => {
        this.beers = beersResult.content;
        this.totalSize = beersResult.totalElements;
    });
  }

  fetchFavourites(userId?: string): void {
    if (userId){
      this.beerService.fetchFavourites(userId)
        .subscribe(result => {
          this.favourites = result;
        });
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
