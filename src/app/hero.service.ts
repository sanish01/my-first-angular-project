import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROS } from './mockheros';
import {Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private herosUrl = 'api/heros';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor( 
    private http: HttpClient,
    private messageservice: MessageService
    ) { }
    getHeros (): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.herosUrl)
        .pipe(
          tap(_ => this.log('fetched heros')),
          catchError(this.handleError<Hero[]>('getHeros', []))
        );
    }
  
    /** GET hero by id. Return `undefined` when id not found */
    getHeroNo404<Data>(id: number): Observable<Hero> {
      const url = `${this.herosUrl}/?id=${id}`;
      return this.http.get<Hero[]>(url)
        .pipe(
          map(heros => heros[0]), // returns a {0|1} element array
          tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} hero id=${id}`);
          }),
          catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }
  
    /** GET hero by id. Will 404 if id not found */
    getHero(id: number): Observable<Hero> {
      const url = `${this.herosUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    }
  
    /* GET heroes whose name contains search term */
    searchHeros(term: string): Observable<Hero[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Hero[]>(`${this.herosUrl}/?name=${term}`).pipe(
        tap(_ => this.log(`found heros matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeros', []))
      );
    }
  
    //////// Save methods //////////
  
    /** POST: add a new hero to the server */
    addHero (hero: Hero): Observable<Hero> {
      return this.http.post<Hero>(this.herosUrl, hero, this.httpOptions).pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
    }
  
    /** DELETE: delete the hero from the server */
    deleteHero (hero: Hero | number): Observable<Hero> {
      const id = typeof hero === 'number' ? hero : hero.id;
      const url = `${this.herosUrl}/${id}`;
  
      return this.http.delete<Hero>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
    }
  
    /** PUT: update the hero on the server */
    updateHero (hero: Hero): Observable<any> {
      return this.http.put(this.herosUrl, hero, this.httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }
  
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageservice.add(`HeroService: ${message}`);
    }
}
