import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beer, BeersService} from '../beers.service';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.css']
})
export class BeerCardComponent {

  @Input() beer?: Beer; // TODO: is ? valid
  @Input() userId?: string;
  @Input() isFavourite?: boolean;
  @Output() favouriteChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private beerService: BeersService) { }

  toggleBeer(): void {
    this.beerService.toggleBeer(this.userId, this.beer?.id).subscribe(response => {
      this.favouriteChange.emit();
    });
  }


}
