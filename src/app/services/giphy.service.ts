import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private readonly TRENDING_ENDPOINT = '/trending';
  private readonly SEARCH_ENDPOINT = '/search';

  public searchInput!: string

  constructor(private _http: HttpClient) { }


  public getTrendingGiphy(): Observable<any> {
    const url = `${environment.apiUrl}${this.TRENDING_ENDPOINT}?api_key=${environment.API_KEY}&limit=24`;
    return this._http.get(url);
  }

  public searchGiphy(term: string): Observable<any> {
    const url = `${environment.apiUrl}${this.SEARCH_ENDPOINT}?api_key=${environment.API_KEY}&q=${term}&limit=24&offset=0&rating=g&lang=en`;
    return this._http.get(url);
  }

}
