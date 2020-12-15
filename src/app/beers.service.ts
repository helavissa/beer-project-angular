import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay, map} from 'rxjs/operators';


export interface Beer {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  tagLine: string;
  abv: number;
}

export interface BeersResult {
  content: Beer[];
  totalElements: number;
}

@Injectable({
  providedIn: 'root'
})

export class BeersService {

  constructor(private httpClient: HttpClient) { }

  fetchBeers(page: number, pageSize: number ): Observable<BeersResult>{

    return this.httpClient.get<BeersResult>(`http://localhost:8080/beers?page=${page}&size=${pageSize}&sort=id,asc`)
      .pipe(
        map(response => {
          return {
            content: response.content,
            totalElements: response.totalElements
          };
        }),
        delay(500));
  }

}
