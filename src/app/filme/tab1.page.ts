import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import {LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [MovieService]
})
export class Tab1Page {

  constructor(public movieService: MovieService, public loadingController: LoadingController) { }
  public lista_filmes = new Array<any>();
  public caminho_imagem ="https://image.tmdb.org/t/p/w500/";

  ionViewDidEnter() {
    this.carregaPagina();
    this.presentLoading();
  }
  
  async presentLoading() {
    const loading = await this.loadingController.create({

      cssClass: 'my-custom-class',
      message: 'Aguarda ai seu arrombado do caralho.',
      duration: 2000,
      spinner:"bubbles"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  private carregaPagina() {
    
    this.movieService.getPopularMovies(1, "pt").subscribe(

      data => {
        const response = (data as any);
        this.lista_filmes = this.lista_filmes.concat(response.results)
        console.log(this.lista_filmes);

      },
      erro => {
        console.log(erro);
      }
    );

  }



}
