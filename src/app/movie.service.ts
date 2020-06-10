import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private chave :string="30a39ca050589b334b986e72c8c04d71";
  private caminhoPadrao:string="https://api.themoviedb.org/3";
  private servico:string ="/movie/popular";

  constructor(public http:HttpClient) { }

  public getPopularMovies(page=1, language='eng-US'){
    let filmes = `${this.caminhoPadrao}${this.servico}?api_key=${this.chave}&language=${language}&api_key=$(this.chave)`
    console.log(filmes);
    return this.http.get(filmes);

  }



}
