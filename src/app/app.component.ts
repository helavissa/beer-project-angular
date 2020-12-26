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
  pageIndex = 0;
  user?: SocialUser;
  favourites: number[] = [];
  error = '';
  search = '';

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
    this.pageIndex = event ? event.pageIndex : this.pageIndex;
    this.beerService.fetchBeers(this.pageIndex,
                              event ? event.pageSize : this.pageSize,
                                      this.search)
      .subscribe(beersResult => {
        this.beers = beersResult.content;
        this.totalSize = beersResult.totalElements;
      },
        error => {
          this.error = error.message;
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

  searchBeers(): void {
    this.pageIndex = 0;
    this.fetchBeers();
  }

}
