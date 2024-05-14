import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-de-publicacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-de-publicacion.component.html',
  styleUrl: './card-de-publicacion.component.scss'
})
export class CardDePublicacionComponent {
  @Input() id: number = 0;
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
}
