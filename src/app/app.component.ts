import {Component, OnInit} from '@angular/core';
import {Beer, BeersService} from './beers.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  beers: Beer[] = [];

  pageSize = 10;
  totalSize = 0;

  constructor(private beerService: BeersService) {}

  ngOnInit(): void {
    this.fetchBeers();
  }

  fetchBeers(event?: PageEvent): void {
    this.beerService.fetchBeers(event ? event.pageIndex : 0,
                              event ? event.pageSize : this.pageSize)
      .subscribe(beersResult => {
        this.beers = beersResult.content;
        this.totalSize = beersResult.totalElements;
    });
  }


}
