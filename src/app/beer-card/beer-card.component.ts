import {Component, Input, OnInit} from '@angular/core';
import {Beer} from '../beers.service';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.css']
})
export class BeerCardComponent implements OnInit {

  @Input() beer?: Beer;

  constructor() { }

  ngOnInit(): void {
  }

}
