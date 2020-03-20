import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../models/Article';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  /**
   * Carga la siguiente pagina de noticias al llegar al final de la pantalla
   * @param event evento del <ion-infinite-scroll>
   */
  onScroll(event) {
    this.cargarNoticias(event);
  }

  /**
   * Muestra las noticias mas relevantes en pantalla
   * @param event evento del <ion-infinite-scroll>
   */
  cargarNoticias(event?) {
    this.noticiasService.getTopHeadlines()
        .subscribe(result => {
          if (result.articles.length === 0) {
            event.target.disabled = true;
            event.target.complete();
            return;
          }

          this.noticias.push(...result.articles);

          if (event) {
            event.target.complete();
          }
        });
  }

}
