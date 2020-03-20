import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/Article';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavorito = false;


  constructor( private iab: InAppBrowser,
               private actionSheetController: ActionSheetController,
               private socialSharing: SocialSharing,
               private dataLocalService: DataLocalService ) { }

  ngOnInit() {}

  /**
   * Abre el link de la noticia en el navegador
   */
  onClick() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  /**
   * Muestra el menú para [ Compartir / Favoritos / Cancelar ]
   */
  async lanzarMenu() {

    let guardarFavritos;

    if (this.enFavorito) {
      guardarFavritos = {
        text: 'Eliminar',
        icon: 'star-half-outline',
        handler: () => {
          this.dataLocalService.borrarFavorito(this.noticia);
        }
      };
    } else {
      guardarFavritos = {
        text: 'Favorito',
        icon: 'star-outline',
        handler: () => {
          this.dataLocalService.guardarFavorito(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share-social-outline',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            null,
            this.noticia.url
          );
        }
      },
      guardarFavritos,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

}
