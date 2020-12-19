import {Component, OnInit} from '@angular/core';
import {Beer, BeersService} from './beers.service';
import {PageEvent} from '@angular/material/paginator';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import {CookieService} from 'ngx-cookie-service';

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

  constructor(private beerService: BeersService,
              private authService: SocialAuthService,
              private cookieService: CookieService) {}

  ngOnInit(): void {
    this.fetchBeers();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.cookieService.set('user', JSON.stringify(user));
    });

    if (this.cookieService.get('user') && !this.user){
      this.user = JSON.parse(this.cookieService.get('user'));
    }
    console.log('user', this.user);
  }

  fetchBeers(event?: PageEvent): void {
    this.beerService.fetchBeers(event ? event.pageIndex : 0,
                              event ? event.pageSize : this.pageSize)
      .subscribe(beersResult => {
        this.beers = beersResult.content;
        this.totalSize = beersResult.totalElements;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
