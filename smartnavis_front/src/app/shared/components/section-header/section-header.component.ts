import { Component, Input } from '@angular/core';

import { NgIf } from '@angular/common';

@Component({
  selector: 'section-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
    @Input() public titulo?: string;
    @Input() public subtitulo?: string;

    constructor() { }
}
