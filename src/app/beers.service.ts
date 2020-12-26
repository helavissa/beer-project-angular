import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
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

  fetchBeers(page: number, pageSize: number, search?: string ): Observable<BeersResult>{
    let params = new HttpParams();
    params = params.append('page', page + '');
    params = params.append('size', pageSize + '');
    params = params.append('sort', 'id,asc');
    if (search) {
      params = params.append('searchStr', search);
    }

    return this.httpClient.get<BeersResult>(
      `http://localhost:8080/beers`, {params})
      .pipe(
        map(response => {
          return {
            content: response.content,
            totalElements: response.totalElements
          };
        }),
        delay(500));
  }

  fetchFavourites(userId?: string): Observable<number[]>{
    return this.httpClient.get<number[]>(`http://localhost:8080/user/${userId}/get-favourites`);
  }

  toggleBeer(userId?: string, beerId?: number): Observable<number>{ // TODO: error handling?
    return this.httpClient.post<number>(`http://localhost:8080/user/${userId}/toggle-beer?beerId=${beerId}`, null);
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
