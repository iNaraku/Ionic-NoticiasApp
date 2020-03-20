import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/Article';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number = 0;

  constructor() { }

  ngOnInit() {}

}
