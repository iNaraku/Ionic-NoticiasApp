import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../models/Article';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, null) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];

    this.cargarNoticias(this.categorias[0]);
  }

  /**
   * Cambia de pantalla a la categoria seleccionada
   * @param event evento del <ion-segment>
   */
  onChange( event ) {
    this.noticias = [];

    this.cargarNoticias(event.detail.value);
  }

  /**
   * Carga las noticias correspondientes a la categoria seleccionada
   * @param categoria Nombre de la categoria seleccionada por el usuario
   */
  cargarNoticias(categoria: string, event?) {
    this.segment.value = categoria;

    this.noticiasService.getTopHeadlinesCategoria(categoria)
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

  onScroll(event) {
    this.cargarNoticias(this.segment.value, event);
  }

}
