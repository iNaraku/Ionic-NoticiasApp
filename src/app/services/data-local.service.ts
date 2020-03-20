import { Injectable } from '@angular/core';
import { Article } from '../models/Article';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor( private storage: Storage,
               public toastController: ToastController ) {
    this.cargarFavoritos();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  /**
   * Guarda un arreglo de noticias favoritas en el local storage del dispositivo
   * @param noticia Noticia que se guardará en favoritos
   */
  guardarFavorito(noticia: Article) {

    const existe = this.noticias.find(x => x.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }

    this.presentToast('Se agregó a favoritos');

  }

  /**
   * Guardar un nuevo arreglo de noticias favoritas en el local storage
   * excluyendo la noticia a la que se le hizo dislike
   * @param noticia Noticia que se eliminará de favoritos
   */
  borrarFavorito(noticia: Article) {
    this.noticias = this.noticias.filter(x => x.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Se eliminó de favoritos');
  }

  /**
   * Carga las noticas favoritas que se cargaron en el local storage
   */
  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      this.noticias = favoritos;
    }
  }
}
