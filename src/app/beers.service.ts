import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';


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

  toggleBeer(userId?: string, beerId?: number): void{

    this.httpClient.post(`http://localhost:8080/user/${userId}/toggle-beer?beerId=${beerId}`, null)
      .subscribe(response => {
        console.log('response', response);
      },
        error => {
            this.handleError(error);
        });
  }

  handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    console.log(
      'Something bad happened; please try again later.');
  }
}
