import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadlines } from '../models/TopHeadlines';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  page: number = 0;
  categoriaActual: string = '';
  categoriaPage: number = 0;

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  /**
   *  Proporciona titulares en tiempo real
   */
  getTopHeadlines() {
    this.page ++;
    return this.ejecutarQuery<TopHeadlines>(`/top-headlines?country=mx&page=${ this.page }`);
  }

  /**
   * Proporciona titulares en tiempo real para una categoría
   */
  getTopHeadlinesCategoria(categoria: string) {
    if (this.categoriaActual === categoria) {
      this.categoriaPage ++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<TopHeadlines>(`/top-headlines?country=mx&category=${ categoria }&page=${ this.categoriaPage }`);
  }
}
