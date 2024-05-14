import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDePublicacionComponent } from './card-de-publicacion.component';

describe('CardDePublicacionComponent', () => {
  let component: CardDePublicacionComponent;
  let fixture: ComponentFixture<CardDePublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDePublicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDePublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
