import {Component, Input, OnInit} from '@angular/core';
import {Beer, BeersService} from '../beers.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.css']
})
export class BeerCardComponent implements OnInit {

  @Input() beer?: Beer; // TODO: is ? valid
  @Input() userId?: string;

  constructor(private beerService: BeersService) { }

  ngOnInit(): void {
  }

  toggleBeer(): void {
    this.beerService.toggleBeer(this.userId, this.beer?.id);
  }


}
